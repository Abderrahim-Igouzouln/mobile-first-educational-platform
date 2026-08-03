import { prisma } from '../../config/database/prisma';
import { UserRepository } from './user.repository';
import { NotFoundError, ForbiddenError } from '../../utils/response/errors.util';

const repo = new UserRepository();

export class UserService {
  async getProfile(userId: string) {
    const user = await repo.findByIdWithStats(userId);
    if (!user || user.status === 'deleted') throw new NotFoundError('Utilisateur introuvable.');

    const completed = await repo.countCompletedLessons(userId);
    const inProgress = await repo.countInProgressLessons(userId);

    const streak = user.streaks;
    const count = user._count;

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      role: user.role,
      locale: user.locale,
      emailVerifiedAt: user.emailVerifiedAt?.toISOString() || null,
      status: user.status,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
      stats: {
        streak: streak?.currentStreak || 0,
        completedLessons: completed,
        inProgressLessons: inProgress,
        certificatesCount: count.certificates,
        submissionsCount: count.projectSubmissions,
        achievementsCount: count.achievements,
      },
      preferences: {
        locale: user.locale,
        notifications: { email: true, push: true, sms: false },
        offlineMode: false,
      },
    };
  }

  async updateProfile(userId: string, data: { firstName?: string; lastName?: string; avatarUrl?: string | null; phone?: string | null }) {
    const user = await repo.findById(userId);
    if (!user || user.status === 'deleted') throw new NotFoundError('Utilisateur introuvable.');
    return repo.update(userId, data);
  }

  async updatePreferences(userId: string, data: { locale?: string; notifications?: any; offlineMode?: boolean }) {
    const user = await repo.findById(userId);
    if (!user || user.status === 'deleted') throw new NotFoundError('Utilisateur introuvable.');

    const updateData: any = {};
    if (data.locale) updateData.locale = data.locale;

    await prisma.userActivity.create({
      data: { userId, type: 'preferences.updated', metadata: data },
    }).catch(() => {});

    return repo.update(userId, updateData);
  }

  async deleteAccount(userId: string) {
    const user = await repo.findById(userId);
    if (!user || user.status === 'deleted') throw new NotFoundError('Utilisateur introuvable.');

    const anonymizedEmail = `deleted-${user.id}@deleted`;

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: {
          email: anonymizedEmail,
          firstName: 'Compte',
          lastName: 'Supprimé',
          phone: null,
          avatarUrl: null,
          status: 'deleted',
          deletedAt: new Date(),
          emailVerifiedAt: null,
        },
      });

      await tx.refreshToken.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });

      await tx.auditLog.create({
        data: { actorId: userId, action: 'user.deleted', targetType: 'User', targetId: userId },
      });
    });
  }

  async exportData(userId: string) {
    const user = await repo.findByIdWithRelations(userId);
    if (!user) throw new NotFoundError('Utilisateur introuvable.');

    return {
      profile: {
        id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName,
        phone: user.phone, role: user.role, locale: user.locale, createdAt: user.createdAt,
      },
      progress: user.userProgress.map((p) => ({
        lessonId: p.lessonId, lessonTitle: p.lesson.title, status: p.status, timeSpentSec: p.timeSpentSec,
      })),
      certificates: user.certificates.map((c) => ({
        number: c.certificateNumber, technology: c.technology.name, score: c.scorePercent, issuedAt: c.issuedAt,
      })),
      payments: user.payments.map((p) => ({
        amount: p.amountMad, currency: p.currency, status: p.status, provider: p.provider, createdAt: p.createdAt,
      })),
      submissions: user.projectSubmissions.map((s) => ({
        projectTitle: s.project.title, status: s.status, submittedAt: s.submittedAt,
      })),
    };
  }

  async getUserById(id: string) {
    const user = await repo.findById(id);
    if (!user) throw new NotFoundError('Utilisateur introuvable.');
    const { passwordHash, ...safe } = user;
    void passwordHash;
    return safe;
  }

  async updateUserStatus(actorId: string, targetId: string, status: string, reason?: string) {
    const target = await repo.findById(targetId);
    if (!target) throw new NotFoundError('Utilisateur introuvable.');
    if (target.role === 'superadmin') throw new ForbiddenError('Impossible de modifier un superadmin.');

    const updated = await repo.update(targetId, { status, failedLoginAttempts: status === 'active' ? 0 : undefined, lockedUntil: status === 'active' ? null : undefined });

    await prisma.auditLog.create({
      data: { actorId, action: `user.${status}`, targetType: 'User', targetId, metadata: { reason } },
    });

    return updated;
  }
}
