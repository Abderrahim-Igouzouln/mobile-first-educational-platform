import { NotificationRepository } from './notification.repository';
import { NotFoundError } from '../../utils/errors.util';

const repo = new NotificationRepository();

export class NotificationService {
  async getNotifications(userId: string) {
    const [notifications, unreadCount] = await Promise.all([
      repo.findNotifications(userId),
      repo.findUnreadCount(userId),
    ]);
    return {
      notifications: notifications.map((n) => ({ id: n.id, type: n.type, title: n.title, body: n.body, data: n.data, readAt: n.readAt, createdAt: n.createdAt })),
      unreadCount,
    };
  }

  async markAsRead(_userId: string, notificationId: string) {
    const notif = await repo.markAsRead(notificationId);
    if (!notif) throw new NotFoundError('Notification introuvable.');
    return notif;
  }

  async markAllAsRead(userId: string) {
    await repo.markAllAsRead(userId);
  }

  async registerPushToken(userId: string, token: string, platform: string) {
    return repo.registerPushToken(userId, token, platform);
  }

  async unregisterPushToken(userId: string, token: string) {
    await repo.unregisterPushToken(userId, token);
  }

  async sendNotification(userId: string, type: string, title: string, body?: string) {
    return repo.createNotification({ userId, type, title, body });
  }
}
