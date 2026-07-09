/**
 * @openapi
 * /notifications/notifications:
 *   get:
 *     tags: [Notifications]
 *     summary: Mes notifications
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Notifications avec count non-lues } }
 *
 * /notifications/notifications/{id}/read:
 *   patch:
 *     tags: [Notifications]
 *     summary: Marquer comme lue
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     responses: { 204: { description: Marquée } }
 *
 * /notifications/notifications/read-all:
 *   patch:
 *     tags: [Notifications]
 *     summary: Tout marquer comme lu
 *     security: [{ bearerAuth: [] }]
 *     responses: { 204: { description: Toutes marquées } }
 *
 * /notifications/push-tokens:
 *   post:
 *     tags: [Notifications]
 *     summary: Enregistrer un token push
 *     security: [{ bearerAuth: [] }]
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, properties: { token: { type: string }, platform: { type: string, enum: [ios, android, web] } } } } } }
 *     responses: { 200: { description: Token enregistré } }
 *
 * /notifications/push-tokens/{token}:
 *   delete:
 *     tags: [Notifications]
 *     summary: Désenregistrer un token push
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: token, required: true, schema: { type: string } }]
 *     responses: { 204: { description: Token supprimé } }
 *
 * /notifications/notifications/send:
 *   post:
 *     tags: [Notifications - Admin]
 *     summary: Envoyer une notification
 *     security: [{ bearerAuth: [] }]
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, properties: { userId: { type: string, format: uuid }, type: { type: string }, title: { type: string }, body: { type: string } } } } } }
 *     responses: { 200: { description: Notification envoyée } }
 */
import { Router } from 'express';
import * as notificationController from './notification.controller';
import { extractUser } from '../auth/auth.middleware';
import { roleMiddleware } from '../../middleware/role.middleware';
import { validationMiddleware } from '../../middleware/validation.middleware';
import { registerPushTokenSchema, sendNotificationSchema } from './notification.validation';
import { Role } from '../../constants/roles';

const router = Router();

router.get('/notifications', extractUser, notificationController.getNotifications);
router.patch('/notifications/:id/read', extractUser, notificationController.markAsRead);
router.patch('/notifications/read-all', extractUser, notificationController.markAllAsRead);
router.post('/push-tokens', extractUser, validationMiddleware(registerPushTokenSchema), notificationController.registerPushToken);
router.delete('/push-tokens/:token', extractUser, notificationController.unregisterPushToken);
router.post('/notifications/send', extractUser, roleMiddleware(Role.ADMIN, Role.SUPERADMIN), validationMiddleware(sendNotificationSchema), notificationController.sendNotification);

export default router;
