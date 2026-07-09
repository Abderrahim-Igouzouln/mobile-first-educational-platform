import { Request, Response, NextFunction } from 'express';
import { NotificationService } from './notification.service';
import { sendSuccess, sendNoContent } from '../../utils/apiResponse.util';

const notificationService = new NotificationService();

export async function getNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const data = await notificationService.getNotifications(req.user!.id); sendSuccess(res, data); } catch (err) { next(err); }
}

export async function markAsRead(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { await notificationService.markAsRead(req.user!.id, req.params.id); sendNoContent(res); } catch (err) { next(err); }
}

export async function markAllAsRead(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { await notificationService.markAllAsRead(req.user!.id); sendNoContent(res); } catch (err) { next(err); }
}

export async function registerPushToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const result = await notificationService.registerPushToken(req.user!.id, req.body.token, req.body.platform); sendSuccess(res, result); } catch (err) { next(err); }
}

export async function unregisterPushToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { await notificationService.unregisterPushToken(req.user!.id, req.params.token); sendNoContent(res); } catch (err) { next(err); }
}

export async function sendNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const notif = await notificationService.sendNotification(req.body.userId, req.body.type, req.body.title, req.body.body); sendSuccess(res, notif); } catch (err) { next(err); }
}
