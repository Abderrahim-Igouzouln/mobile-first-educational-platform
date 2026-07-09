/**
 * @openapi
 * /analytics/track:
 *   post:
 *     tags: [Analytics]
 *     summary: Enregistrer un événement utilisateur
 *     security: [{ bearerAuth: [] }]
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, properties: { event: { type: string }, properties: { type: object } } } } } }
 *     responses: { 200: { description: Événement enregistré } }
 *
 * /analytics/overview:
 *   get:
 *     tags: [Analytics - Admin]
 *     summary: Vue d'ensemble analytique
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: DailyStats, courseStats, userStats } }
 */
import { Router } from 'express';
import * as analyticsController from './analytics.controller';
import { extractUser } from '../auth/auth.middleware';
import { roleMiddleware } from '../../middleware/role.middleware';
import { Role } from '../../constants/roles';
import { validationMiddleware } from '../../middleware/validation.middleware';
import { z } from 'zod';

const trackEventSchema = z.object({
  event: z.string().min(1),
  properties: z.any().optional(),
});

const router = Router();

router.post('/track', extractUser, validationMiddleware(trackEventSchema), analyticsController.trackEvent);
router.get('/overview', extractUser, roleMiddleware(Role.ADMIN, Role.SUPERADMIN), analyticsController.getDashboardOverview);

export default router;
