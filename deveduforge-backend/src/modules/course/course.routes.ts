/**
 * @openapi
 * components:
 *   schemas:
 *     CourseResponse:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid }
 *         title: { type: string }
 *         description: { type: string }
 *         level: { type: string, enum: [beginner, intermediate, advanced] }
 *         estimatedDurationMin: { type: integer }
 *         lessonCount: { type: integer }
 *         progressPercent: { type: integer }
 *     LessonResponse:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid }
 *         title: { type: string }
 *         order: { type: integer }
 *         status: { type: string, enum: [not_started, in_progress, completed] }
 *         isLocked: { type: boolean }
 *     DomainResponse:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid }
 *         slug: { type: string }
 *         name: { type: string }
 *         icon: { type: string }
 *         colorTheme: { type: string }
 *         technologyCount: { type: integer }
 *
 * /courses/domains:
 *   get:
 *     tags: [Cours]
 *     summary: Liste des domaines
 *     responses: { 200: { description: Domaines, content: { application/json: { schema: { type: array, items: { $ref: '#/components/schemas/DomainResponse' } } } } } }
 *
 * /courses/domains/{slug}/technologies:
 *   get:
 *     tags: [Cours]
 *     summary: Technologies d'un domaine
 *     parameters: [{ in: path, name: slug, required: true, schema: { type: string } }]
 *     responses: { 200: { description: Technologies avec statut de verrouillage } }
 *
 * /courses/technologies/{slug}/courses:
 *   get:
 *     tags: [Cours]
 *     summary: Cours d'une technologie
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: slug, required: true, schema: { type: string } }]
 *     responses: { 200: { description: Liste des cours avec progression } }
 *
 * /courses/courses/{id}:
 *   get:
 *     tags: [Cours]
 *     summary: Détail d'un cours (leçons)
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     responses: { 200: { description: Cours avec leçons et statut de déverrouillage } }
 *
 * /courses/lessons/{id}/complete:
 *   post:
 *     tags: [Cours]
 *     summary: Marquer une leçon comme terminée
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     requestBody: { content: { application/json: { schema: { type: object, properties: { timeSpentSec: { type: integer } } } } } }
 *     responses: { 200: { description: Leçon complétée } }
 *
 * /courses/lessons/{id}/bookmark:
 *   post:
 *     tags: [Cours]
 *     summary: Ajouter/retirer un signet
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     responses: { 200: { description: Signet basculé } }
 *
 * /courses/bookmarks:
 *   get:
 *     tags: [Cours]
 *     summary: Liste des signets
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Signets } }
 *
 * /courses/continue-learning:
 *   get:
 *     tags: [Cours]
 *     summary: Dernière leçon en cours
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Leçon en cours ou null } }
 */
import { Router } from 'express';
import * as courseController from './course.controller';
import { extractUser } from '../auth/auth.middleware';
import { roleMiddleware } from '../../middleware/role.middleware';
import { validationMiddleware } from '../../middleware/validation.middleware';
import { createCourseSchema, updateCourseSchema, createLessonSchema, reorderLessonsSchema, completeLessonSchema } from './course.validation';
import { Role } from '../../constants/roles';
import { optionalAuth } from '../../middleware/optionalAuth.middleware';

const router = Router();

router.get('/domains', courseController.getDomains);
router.get('/domains/:slug/technologies', optionalAuth, courseController.getTechnologies);
router.get('/technologies/:slug', optionalAuth, courseController.getTechnologyDetail);
router.get('/technologies/:slug/courses', extractUser, courseController.getCourses);
router.get('/courses/:id', extractUser, courseController.getCourseDetail);
router.get('/lessons/:id', extractUser, courseController.getLesson);
router.post('/lessons/:id/complete', extractUser, validationMiddleware(completeLessonSchema), courseController.completeLesson);
router.post('/lessons/:id/bookmark', extractUser, courseController.toggleBookmark);
router.get('/bookmarks', extractUser, courseController.getBookmarks);
router.get('/continue-learning', extractUser, courseController.getContinueLearning);
router.post('/courses', extractUser, roleMiddleware(Role.INSTRUCTOR, Role.ADMIN, Role.SUPERADMIN), validationMiddleware(createCourseSchema), courseController.createCourse);
router.patch('/courses/:id', extractUser, roleMiddleware(Role.INSTRUCTOR, Role.ADMIN, Role.SUPERADMIN), validationMiddleware(updateCourseSchema), courseController.updateCourse);
router.post('/courses/:id/publish', extractUser, roleMiddleware(Role.INSTRUCTOR, Role.ADMIN, Role.SUPERADMIN), courseController.publishCourse);
router.post('/courses/:id/lessons', extractUser, roleMiddleware(Role.INSTRUCTOR, Role.ADMIN, Role.SUPERADMIN), validationMiddleware(createLessonSchema), courseController.addLesson);
router.post('/lessons/reorder', extractUser, roleMiddleware(Role.INSTRUCTOR, Role.ADMIN, Role.SUPERADMIN), validationMiddleware(reorderLessonsSchema), courseController.reorderLessons);

export default router;
