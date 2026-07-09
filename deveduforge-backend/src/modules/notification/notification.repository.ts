import { prisma } from '../../config/database';

export class NotificationRepository {
  async findNotifications(userId: string, limit = 50) {
    return prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: limit });
  }

  async findUnreadCount(userId: string) {
    return prisma.notification.count({ where: { userId, readAt: null } });
  }

  async markAsRead(id: string) {
    return prisma.notification.update({ where: { id }, data: { readAt: new Date() } });
  }

  async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({ where: { userId, readAt: null }, data: { readAt: new Date() } });
  }

  async createNotification(data: any) {
    return prisma.notification.create({ data });
  }

  async registerPushToken(userId: string, token: string, platform: string) {
    return prisma.pushToken.upsert({
      where: { userId_token: { userId, token } },
      update: { platform },
      create: { userId, token, platform },
    });
  }

  async unregisterPushToken(userId: string, token: string) {
    return prisma.pushToken.deleteMany({ where: { userId, token } });
  }

  async findUserPushTokens(userId: string) {
    return prisma.pushToken.findMany({ where: { userId } });
  }
}
