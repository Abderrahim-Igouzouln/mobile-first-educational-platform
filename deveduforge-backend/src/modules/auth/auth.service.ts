import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { AuthRepository } from './auth.repository';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt.util';
import { generateRandomToken, hashToken } from '../../utils/crypto.util';
import { sendEmail } from '../../utils/email.util';
import { AppError } from '../../utils/errors.util';
import { ErrorCodes } from '../../constants/errorCodes';
import { prisma } from '../../config/database';
import { Role } from '../../constants/roles';

export class AuthService {
  private repo = new AuthRepository();

  async register(input: { email: string; password: string; firstName: string; lastName: string }) {
    const existing = await this.repo.findByEmail(input.email);
    if (existing) {
      return { success: true, message: "Si cet email n'est pas déjà utilisé, vous recevrez un message de confirmation." };
    }

    const passwordHash = await bcrypt.hash(input.password, 12);
    const user = await this.repo.create({
      email: input.email,
      passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
      role: Role.STUDENT,
    });

    const token = generateRandomToken();
    const tokenHash = hashToken(token);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.$transaction(async (tx) => {
      await tx.emailVerificationToken.create({
        data: { tokenHash, expiresAt, userId: user.id },
      });

      await tx.auditLog.create({
        data: { actorId: user.id, action: 'user.registered', targetType: 'User', targetId: user.id },
      });

      await sendEmail(
        user.email,
        'Vérifiez votre adresse email',
        `<p>Merci de vous être inscrit. Utilisez ce token pour vérifier votre email : <strong>${token}</strong></p>`,
      ).catch(() => {});
    });

    return { success: true, message: "Si cet email n'est pas déjà utilisé, vous recevrez un message de confirmation." };
  }

  async login(input: { email: string; password: string; ipAddress?: string; deviceInfo?: string }) {
    const user = await this.repo.findByEmail(input.email);
    if (!user || user.status !== 'active') {
      throw new AppError(401, ErrorCodes.AUTH_INVALID_CREDENTIALS, 'Email ou mot de passe incorrect.');
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      const remaining = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000);
      throw new AppError(423, ErrorCodes.AUTH_ACCOUNT_LOCKED, `Compte verrouillé. Réessayez dans ${remaining} minutes.`);
    }

    const valid = await bcrypt.compare(input.password, user.passwordHash);
    if (!valid) {
      const attempts = user.failedLoginAttempts + 1;
      const maxAttempts = parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5', 10);
      const lockMinutes = parseInt(process.env.ACCOUNT_LOCK_DURATION_MINUTES || '15', 10);

      if (attempts >= maxAttempts) {
        await this.repo.update(user.id, {
          failedLoginAttempts: attempts,
          lockedUntil: new Date(Date.now() + lockMinutes * 60 * 1000),
        });
        throw new AppError(423, ErrorCodes.AUTH_ACCOUNT_LOCKED, `Compte verrouillé pour ${lockMinutes} minutes.`);
      }

      await this.repo.update(user.id, { failedLoginAttempts: attempts });
      throw new AppError(401, ErrorCodes.AUTH_INVALID_CREDENTIALS, 'Email ou mot de passe incorrect.');
    }

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: user.id },
        data: { failedLoginAttempts: 0, lockedUntil: null, lastLoginAt: new Date(), lastLoginIp: input.ipAddress },
      });

      await tx.auditLog.create({
        data: { actorId: user.id, action: 'user.login', targetType: 'User', targetId: user.id, ipAddress: input.ipAddress },
      });
    });

    const tokens = await this.generateTokens(user.id, input.deviceInfo, input.ipAddress);

    return {
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role },
      tokens,
    };
  }

  async refresh(refreshTokenStr: string, deviceInfo?: string, ipAddress?: string) {
    let payload;
    try {
      payload = verifyRefreshToken(refreshTokenStr);
    } catch {
      throw new AppError(401, ErrorCodes.AUTH_TOKEN_INVALID, 'Refresh token invalide ou expiré.');
    }

    const tokenHash = hashToken(refreshTokenStr);
    const stored = await this.repo.findRefreshTokenByHash(tokenHash);
    if (!stored) {
      await this.repo.revokeAllUserRefreshTokens(payload.sub);
      throw new AppError(401, ErrorCodes.AUTH_REFRESH_TOKEN_REVOKED, 'Refresh token révoqué. Tous vos appareils ont été déconnectés.');
    }

    const user = await this.repo.findById(payload.sub);
    if (!user || user.status !== 'active') {
      throw new AppError(401, ErrorCodes.AUTH_TOKEN_INVALID, 'Utilisateur introuvable ou inactif.');
    }

    await this.repo.revokeRefreshToken(stored.id);

    const tokens = await this.generateTokens(user.id, deviceInfo ?? stored.deviceInfo ?? undefined, ipAddress ?? stored.ipAddress ?? undefined);

    return {
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role },
      tokens,
    };
  }

  async logout(refreshTokenStr: string) {
    const tokenHash = hashToken(refreshTokenStr);
    const stored = await this.repo.findRefreshTokenByHash(tokenHash);
    if (stored) {
      await this.repo.revokeRefreshToken(stored.id);
    }
  }

  async logoutAll(userId: string, currentTokenStr?: string) {
    if (currentTokenStr) {
      const currentHash = hashToken(currentTokenStr);
      const current = await this.repo.findRefreshTokenByHash(currentHash);
      if (current) {
        await this.repo.revokeAllUserRefreshTokens(userId);
        return;
      }
      throw new AppError(401, ErrorCodes.AUTH_TOKEN_INVALID, 'Token fourni invalide.');
    }
    await this.repo.revokeAllUserRefreshTokens(userId);
  }

  async verifyEmail(token: string) {
    const tokenHash = hashToken(token);
    const stored = await this.repo.findEmailVerificationToken(tokenHash);
    if (!stored) {
      throw new AppError(400, ErrorCodes.AUTH_TOKEN_INVALID, 'Token de vérification invalide ou expiré.');
    }

    await prisma.$transaction(async (tx) => {
      await tx.emailVerificationToken.update({ where: { id: stored.id }, data: { usedAt: new Date() } });
      await tx.user.update({ where: { id: stored.userId }, data: { emailVerifiedAt: new Date() } });
      await tx.auditLog.create({
        data: { actorId: stored.userId, action: 'user.email_verified', targetType: 'User', targetId: stored.userId },
      });
    });
  }

  async resendVerification(email: string) {
    const user = await this.repo.findByEmail(email);
    if (user && !user.emailVerifiedAt) {
      const token = generateRandomToken();
      const tokenHash = hashToken(token);
      await this.repo.createEmailVerificationToken({
        tokenHash,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        user: { connect: { id: user.id } },
      });
      await sendEmail(user.email, 'Vérifiez votre adresse email', `<p>Token : <strong>${token}</strong></p>`).catch(() => {});
    }
  }

  async forgotPassword(email: string) {
    const user = await this.repo.findByEmail(email);
    if (user) {
      const token = generateRandomToken();
      const tokenHash = hashToken(token);
      await this.repo.createPasswordResetToken({
        tokenHash,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
        user: { connect: { id: user.id } },
      });
      await sendEmail(user.email, 'Réinitialisation de mot de passe', `<p>Token : <strong>${token}</strong></p>`).catch(() => {});
    }
  }

  async resetPassword(token: string, newPassword: string) {
    const tokenHash = hashToken(token);
    const stored = await this.repo.findPasswordResetToken(tokenHash);
    if (!stored) {
      throw new AppError(400, ErrorCodes.AUTH_TOKEN_INVALID, 'Token de réinitialisation invalide ou expiré.');
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await prisma.$transaction(async (tx) => {
      await tx.passwordResetToken.update({ where: { id: stored.id }, data: { usedAt: new Date() } });
      await tx.user.update({ where: { id: stored.userId }, data: { passwordHash } });
      await tx.refreshToken.updateMany({ where: { userId: stored.userId, revokedAt: null }, data: { revokedAt: new Date() } });
      await tx.auditLog.create({
        data: { actorId: stored.userId, action: 'user.password_reset', targetType: 'User', targetId: stored.userId },
      });
    });
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.repo.findById(userId);
    if (!user) throw new AppError(404, ErrorCodes.USER_NOT_FOUND, 'Utilisateur introuvable.');

    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid) {
      throw new AppError(400, ErrorCodes.AUTH_INVALID_CREDENTIALS, 'Mot de passe actuel incorrect.');
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await prisma.$transaction(async (tx) => {
      await tx.user.update({ where: { id: userId }, data: { passwordHash } });
      await tx.refreshToken.updateMany({ where: { userId, revokedAt: null }, data: { revokedAt: new Date() } });
      await tx.auditLog.create({
        data: { actorId: userId, action: 'user.password_changed', targetType: 'User', targetId: userId },
      });
    });
  }

  async getMe(userId: string) {
    const user = await this.repo.findById(userId);
    if (!user) throw new AppError(404, ErrorCodes.USER_NOT_FOUND, 'Utilisateur introuvable.');
    return {
      id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName,
      role: user.role, locale: user.locale, avatarUrl: user.avatarUrl,
      emailVerifiedAt: user.emailVerifiedAt, status: user.status,
      createdAt: user.createdAt, lastLoginAt: user.lastLoginAt,
    };
  }

  private async generateTokens(userId: string, deviceInfo?: string, ipAddress?: string) {
    const user = await this.repo.findById(userId);
    if (!user) throw new AppError(404, ErrorCodes.USER_NOT_FOUND, 'Utilisateur introuvable.');

    const tokenId = uuidv4();
    const accessToken = signAccessToken({ sub: user.id, email: user.email, role: user.role, locale: user.locale, emailVerifiedAt: user.emailVerifiedAt?.toISOString() ?? null });
    const refreshTokenStr = signRefreshToken({ sub: user.id, tokenId });

    const tokenHash = hashToken(refreshTokenStr);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await this.repo.saveRefreshToken({ tokenHash, deviceInfo, ipAddress, expiresAt, user: { connect: { id: user.id } } });

    return { accessToken, refreshToken: refreshTokenStr };
  }
}
