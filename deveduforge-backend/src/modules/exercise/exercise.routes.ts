/**
 * @openapi
 * /exercises/lessons/{lessonId}/exercise:
 *   get:
 *     tags: [Exercices]
 *     summary: Recuperer l exercice d une lecon
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: lessonId, required: true, schema: { type: string, format: uuid } }]
 *     responses: { 200: { description: "Exercice avec questions (sans isCorrect)" } }
 *
 * /exercises/exercises/{id}/answer:
 *   post:
 *     tags: [Exercices]
 *     summary: Soumettre une reponse a une question
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionId:
 *                 type: string
 *                 format: uuid
 *               selectedOptionId:
 *                 type: string
 *                 format: uuid
 *               textAnswer:
 *                 type: string
 *     responses: { 200: { description: "isCorrect, pointsEarned" } }
 *
 * /exercises/exercises/{id}/submit:
 *   post:
 *     tags: [Exercices]
 *     summary: Soumettre toutes les reponses
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     selectedOptionId:
 *                       type: string
 *                     textAnswer:
 *                       type: string
 *     responses: { 200: { description: "Score, passed, attemptNumber" } }
 */
import { Router } from 'express';
import * as exerciseController from './exercise.controller';
import { extractUser } from '../auth/auth.middleware';
import { validationMiddleware } from '../../middleware/validation/validation.middleware';
import { submitAnswerSchema, submitExerciseSchema } from './exercise.validation';

const router = Router();

router.get('/lessons/:lessonId/exercise', extractUser, exerciseController.getExercise);
router.post('/exercises/:id/answer', extractUser, validationMiddleware(submitAnswerSchema), exerciseController.submitAnswer);
router.post('/exercises/:id/submit', extractUser, validationMiddleware(submitExerciseSchema), exerciseController.submitExercise);

export default router;
