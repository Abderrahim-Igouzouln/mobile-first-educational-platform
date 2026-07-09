import { prisma } from '../../config/database';
import { Prisma } from '@prisma/client';

export class AuthRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({ where: { id }, data });
  }

  async saveRefreshToken(data: Prisma.RefreshTokenCreateInput) {
    return prisma.refreshToken.create({ data });
  }

  async findRefreshTokenByHash(tokenHash: string) {
    return prisma.refreshToken.findFirst({ where: { tokenHash, revokedAt: null } });
  }

  async revokeRefreshToken(id: string) {
    return prisma.refreshToken.update({ where: { id }, data: { revokedAt: new Date() } });
  }

  async revokeAllUserRefreshTokens(userId: string) {
    return prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  async createEmailVerificationToken(data: Prisma.EmailVerificationTokenCreateInput) {
    return prisma.emailVerificationToken.create({ data });
  }

  async findEmailVerificationToken(tokenHash: string) {
    return prisma.emailVerificationToken.findFirst({
      where: { tokenHash, usedAt: null, expiresAt: { gte: new Date() } },
    });
  }

  async markEmailVerificationUsed(id: string) {
    return prisma.emailVerificationToken.update({ where: { id }, data: { usedAt: new Date() } });
  }

  async createPasswordResetToken(data: Prisma.PasswordResetTokenCreateInput) {
    return prisma.passwordResetToken.create({ data });
  }

  async findPasswordResetToken(tokenHash: string) {
    return prisma.passwordResetToken.findFirst({
      where: { tokenHash, usedAt: null, expiresAt: { gte: new Date() } },
    });
  }

  async markPasswordResetUsed(id: string) {
    return prisma.passwordResetToken.update({ where: { id }, data: { usedAt: new Date() } });
  }
}
