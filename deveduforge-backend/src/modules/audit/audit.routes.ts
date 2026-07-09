/**
 * @openapi
 * /audit/logs:
 *   get:
 *     tags: [Audit]
 *     summary: Journal d'audit (paginated)
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: query, name: page, schema: { type: integer, default: 1 } }, { in: query, name: limit, schema: { type: integer, default: 50 } }]
 *     responses: { 200: { description: Logs d'audit avec pagination } }
 */
import { Router } from 'express';
import * as auditController from './audit.controller';
import { extractUser } from '../auth/auth.middleware';
import { roleMiddleware } from '../../middleware/role.middleware';
import { Role } from '../../constants/roles';

const router = Router();

router.get('/logs', extractUser, roleMiddleware(Role.ADMIN, Role.SUPERADMIN), auditController.getAuditLogs);

export default router;
