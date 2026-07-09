/**
 * @openapi
 * /projects/courses/{courseId}/projects:
 *   get:
 *     tags: [Projets]
 *     summary: Liste des projets d'un cours
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: courseId, required: true, schema: { type: string, format: uuid } }]
 *     responses: { 200: { description: Projets } }
 *
 * /projects/projects/{id}:
 *   get:
 *     tags: [Projets]
 *     summary: Détail d'un projet
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     responses: { 200: { description: Projet } }
 *
 * /projects/projects/{id}/submit:
 *   post:
 *     tags: [Projets]
 *     summary: Soumettre un projet
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, properties: { repositoryUrl: { type: string, format: uri }, fileUrl: { type: string, format: uri } } } } } }
 *     responses: { 201: { description: Soumission créée } }
 *
 * /projects/submissions:
 *   get:
 *     tags: [Projets]
 *     summary: Mes soumissions
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Soumissions avec reviews et commentaires } }
 *
 * /projects/submissions/{id}/review:
 *   post:
 *     tags: [Projets - Instructor]
 *     summary: Review une soumission
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, properties: { score: { type: integer, min: 0, max: 100 }, feedback: { type: string } } } } } }
 *     responses: { 200: { description: Review enregistrée } }
 *
 * /projects/submissions/{id}/comments:
 *   post:
 *     tags: [Projets]
 *     summary: Ajouter un commentaire
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, properties: { content: { type: string } } } } } }
 *     responses: { 201: { description: Commentaire ajouté } }
 */
import { Router } from 'express';
import * as projectController from './project.controller';
import { extractUser } from '../auth/auth.middleware';
import { roleMiddleware } from '../../middleware/role.middleware';
import { validationMiddleware } from '../../middleware/validation.middleware';
import { submitProjectSchema, reviewSubmissionSchema, addCommentSchema } from './project.validation';
import { Role } from '../../constants/roles';

const router = Router();

router.get('/courses/:courseId/projects', extractUser, projectController.getProjects);
router.get('/projects/:id', extractUser, projectController.getProjectDetail);
router.post('/projects/:id/submit', extractUser, validationMiddleware(submitProjectSchema), projectController.submitProject);
router.get('/submissions', extractUser, projectController.getSubmissions);
router.post('/submissions/:id/review', extractUser, roleMiddleware(Role.INSTRUCTOR, Role.ADMIN, Role.SUPERADMIN), validationMiddleware(reviewSubmissionSchema), projectController.reviewSubmission);
router.post('/submissions/:id/comments', extractUser, validationMiddleware(addCommentSchema), projectController.addComment);

export default router;
