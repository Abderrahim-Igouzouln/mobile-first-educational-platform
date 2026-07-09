/**
 * @openapi
 * /community/posts:
 *   get:
 *     tags: [Communauté]
 *     summary: Liste des publications (paginated)
 *     parameters: [{ in: query, name: page, schema: { type: integer, default: 1 } }, { in: query, name: limit, schema: { type: integer, default: 20 } }]
 *     responses: { 200: { description: Publications paginées } }
 *   post:
 *     tags: [Communauté]
 *     summary: Créer une publication
 *     security: [{ bearerAuth: [] }]
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, properties: { title: { type: string }, content: { type: string } } } } } }
 *     responses: { 201: { description: Publication créée } }
 *
 * /community/posts/{id}:
 *   get:
 *     tags: [Communauté]
 *     summary: Détail d'une publication
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     responses: { 200: { description: Publication avec commentaires } }
 *   patch:
 *     tags: [Communauté]
 *     summary: Modifier sa publication
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     responses: { 200: { description: Publication modifiée } }
 *   delete:
 *     tags: [Communauté]
 *     summary: Supprimer sa publication
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     responses: { 204: { description: Publication supprimée } }
 *
 * /community/posts/{id}/like:
 *   post:
 *     tags: [Communauté]
 *     summary: Like/Unlike
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     responses: { 200: { description: Like basculé } }
 *
 * /community/posts/{id}/comments:
 *   post:
 *     tags: [Communauté]
 *     summary: Commenter
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, properties: { content: { type: string } } } } } }
 *     responses: { 201: { description: Commentaire ajouté } }
 *
 * /community/posts/{id}/report:
 *   post:
 *     tags: [Communauté]
 *     summary: Signaler une publication
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     responses: { 204: { description: Signalement enregistré } }
 *
 * /community/leaderboard:
 *   get:
 *     tags: [Communauté]
 *     summary: Classement
 *     parameters: [{ in: query, name: period, schema: { type: string, enum: [daily, weekly, monthly, all_time], default: weekly } }]
 *     responses: { 200: { description: Classement } }
 */
import { Router } from 'express';
import * as communityController from './community.controller';
import { extractUser } from '../auth/auth.middleware';
import { validationMiddleware } from '../../middleware/validation.middleware';
import { createPostSchema, addCommentSchema } from './community.validation';

const router = Router();

router.get('/posts', communityController.getPosts);
router.get('/posts-cursor', communityController.getPostsCursor);
router.get('/posts/:id', communityController.getPost);
router.post('/posts', extractUser, validationMiddleware(createPostSchema), communityController.createPost);
router.patch('/posts/:id', extractUser, validationMiddleware(createPostSchema), communityController.updatePost);
router.delete('/posts/:id', extractUser, communityController.deletePost);
router.post('/posts/:id/like', extractUser, communityController.toggleLike);
router.post('/posts/:id/comments', extractUser, validationMiddleware(addCommentSchema), communityController.addComment);
router.post('/posts/:id/report', extractUser, communityController.reportPost);
router.get('/leaderboard', communityController.getLeaderboard);

export default router;
