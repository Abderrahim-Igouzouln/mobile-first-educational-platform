/**
 * @openapi
 * /admin/stats:
 *   get:
 *     tags: [Admin]
 *     summary: Statistiques générales
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Stats (utilisateurs, cours, abonnements, soumissions) } }
 *
 * /admin/config:
 *   get:
 *     tags: [Admin]
 *     summary: Configuration système
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Configuration } }
 *   patch:
 *     tags: [Admin]
 *     summary: Mettre à jour la configuration
 *     security: [{ bearerAuth: [] }]
 *     requestBody: { content: { application/json: { schema: { type: object, properties: { MAINTENANCE_MODE: { type: string }, MAX_LOGIN_ATTEMPTS: { type: string }, ACCOUNT_LOCK_DURATION_MINUTES: { type: string } } } } } }
 *     responses: { 200: { description: Configuration mise à jour } }
 */
import { Router } from 'express';
import * as adminController from './admin.controller';
import { extractUser } from '../auth/auth.middleware';
import { roleMiddleware } from '../../middleware/role.middleware';
import { Role } from '../../constants/roles';

const router = Router();

router.get('/stats', extractUser, roleMiddleware(Role.ADMIN, Role.SUPERADMIN), adminController.getDashboardStats);
router.get('/config', extractUser, roleMiddleware(Role.ADMIN, Role.SUPERADMIN), adminController.getSystemConfig);
router.patch('/config', extractUser, roleMiddleware(Role.ADMIN, Role.SUPERADMIN), adminController.updateSystemConfig);

router.get('/users', extractUser, roleMiddleware(Role.ADMIN, Role.SUPERADMIN), adminController.listUsers);
router.get('/users/:id', extractUser, roleMiddleware(Role.ADMIN, Role.SUPERADMIN), adminController.getUserDetail);
router.patch('/users/:id/status', extractUser, roleMiddleware(Role.ADMIN, Role.SUPERADMIN), adminController.updateUserStatus);
router.delete('/users/:id', extractUser, roleMiddleware(Role.ADMIN, Role.SUPERADMIN), adminController.deleteUser);

export default router;
