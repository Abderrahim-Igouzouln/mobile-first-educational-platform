/**
 * @openapi
 * /courses/{courseId}/reviews:
 *   get:
 *     tags: [Courses]
 *     summary: Avis d'un cours
 *     parameters: [{ in: path, name: courseId, required: true, schema: { type: string, format: uuid } }]
 *     responses: { 200: { description: Liste des avis avec moyenne } }
 *   post:
 *     tags: [Courses]
 *     summary: Soumettre un avis
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: courseId, required: true, schema: { type: string, format: uuid } }]
 *     responses: { 201: { description: Avis créé ou mis à jour } }
 */
import { Router } from 'express';
import * as reviewController from './review.controller';
import { extractUser } from '../auth/auth.middleware';

const router = Router();

router.get('/courses/:courseId/reviews', reviewController.getReviews);
router.post('/courses/:courseId/reviews', extractUser, reviewController.submitReview);

export default router;
