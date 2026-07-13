import { prisma } from '../../config/database/prisma';

export class AuditService {
  async log(actorId: string | undefined, action: string, targetType: string, targetId?: string, metadata?: any, ipAddress?: string) {
    return prisma.auditLog.create({ data: { actorId, action, targetType, targetId, metadata, ipAddress } });
  }
}
