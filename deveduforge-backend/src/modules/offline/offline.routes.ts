/**
 * @openapi
 * /offline/manifest:
 *   get:
 *     tags: [Hors-ligne]
 *     summary: Manifeste des cours pour le mode hors-ligne
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: "Manifeste avec contenu des lecons" } }
 *
 * /offline/sync:
 *   post:
 *     tags: [Hors-ligne]
 *     summary: "Synchroniser la progression hors-ligne"
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               updates:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     lessonId:
 *                       type: string
 *                       format: uuid
 *                     status:
 *                       type: string
 *                       enum: [not_started, in_progress, completed]
 *                     timeSpentSec:
 *                       type: integer
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *     responses: { 200: { description: "Resultats de la synchro (conflits serveur-gagnant)" } }
 */
import { Router } from 'express';
import * as offlineController from './offline.controller';
import { extractUser } from '../auth/auth.middleware';
import { validationMiddleware } from '../../middleware/validation.middleware';
import { z } from 'zod';

const syncSchema = z.object({
  updates: z.array(z.object({
    lessonId: z.string().uuid(),
    status: z.enum(['not_started', 'in_progress', 'completed']),
    timeSpentSec: z.number().int().min(0).optional(),
    updatedAt: z.string().datetime(),
  })),
});

const router = Router();

router.get('/manifest', extractUser, offlineController.getOfflineManifest);
router.post('/sync', extractUser, validationMiddleware(syncSchema), offlineController.syncProgress);

export default router;
