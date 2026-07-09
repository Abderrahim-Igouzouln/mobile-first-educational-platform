import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/database';
import { sendSuccess } from '../../utils/apiResponse.util';

export async function getDashboardStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [userCount, courseCount, activeSubscriptions, pendingSubmissions] = await Promise.all([
      prisma.user.count({ where: { status: 'active' } }),
      prisma.course.count({ where: { isPublished: true } }),
      prisma.userSubscription.count({ where: { status: 'active' } }),
      prisma.projectSubmission.count({ where: { status: 'submitted' } }),
    ]);
    sendSuccess(res, { userCount, courseCount, activeSubscriptions, pendingSubmissions });
  } catch (err) { next(err); }
}

export async function getSystemConfig(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    sendSuccess(res, {
      maintenanceMode: process.env.MAINTENANCE_MODE === 'true',
      maxLoginAttempts: parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5'),
      accountLockDurationMinutes: parseInt(process.env.ACCOUNT_LOCK_DURATION_MINUTES || '15'),
    });
  } catch (err) { next(err); }
}

export async function updateSystemConfig(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const allowedKeys = ['MAINTENANCE_MODE', 'MAX_LOGIN_ATTEMPTS', 'ACCOUNT_LOCK_DURATION_MINUTES'];
    for (const [key, value] of Object.entries(req.body)) {
      if (allowedKeys.includes(key)) {
        process.env[key] = String(value);
      }
    }
    sendSuccess(res, { message: 'Configuration mise à jour.' });
  } catch (err) { next(err); }
}

export async function listUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20));
    const status = req.query.status as string | undefined;
    const role = req.query.role as string | undefined;
    const search = req.query.search as string | undefined;

    const where: any = {};
    if (status) where.status = status;
    if (role) where.role = role;
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: { id: true, email: true, firstName: true, lastName: true, role: true, status: true, locale: true, emailVerifiedAt: true, createdAt: true, lastLoginAt: true, failedLoginAttempts: true, lockedUntil: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    sendSuccess(res, { items: users, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (err) { next(err); }
}

export async function getUserDetail(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: { id: true, email: true, firstName: true, lastName: true, role: true, status: true, locale: true, avatarUrl: true, emailVerifiedAt: true, createdAt: true, updatedAt: true, lastLoginAt: true, failedLoginAttempts: true, lockedUntil: true },
    });
    if (!user) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Utilisateur introuvable.' } });
      return;
    }
    sendSuccess(res, user);
  } catch (err) { next(err); }
}

export async function updateUserStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { status } = req.body;
    if (!['active', 'suspended', 'deleted'].includes(status)) {
      res.status(400).json({ success: false, error: { code: 'INVALID_STATUS', message: 'Statut invalide. Utilisez active, suspended ou deleted.' } });
      return;
    }
    const user = await prisma.user.update({ where: { id: req.params.id }, data: { status } });
    sendSuccess(res, { id: user.id, status: user.status });
  } catch (err) { next(err); }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await prisma.user.update({ where: { id: req.params.id }, data: { status: 'deleted', deletedAt: new Date() } });
    await prisma.refreshToken.updateMany({ where: { userId: req.params.id, revokedAt: null }, data: { revokedAt: new Date() } });
    sendSuccess(res, { message: 'Utilisateur désactivé.' });
  } catch (err) { next(err); }
}
