import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/database';
import { sendSuccess } from '../../utils/apiResponse.util';

export async function getAuditLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        skip, take: limit, orderBy: { createdAt: 'desc' },
        include: { actor: { select: { id: true, firstName: true, lastName: true, email: true } } },
      }),
      prisma.auditLog.count(),
    ]);

    sendSuccess(res, {
      logs: logs.map((l) => ({ id: l.id, actor: l.actor ? { id: l.actor.id, firstName: l.actor.firstName, lastName: l.actor.lastName, email: l.actor.email } : null, action: l.action, targetType: l.targetType, targetId: l.targetId, metadata: l.metadata, ipAddress: l.ipAddress, createdAt: l.createdAt })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) { next(err); }
}
