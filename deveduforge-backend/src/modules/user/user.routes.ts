/**
 * @openapi
 * /users/me/profile:
 *   get:
 *     tags: [Utilisateurs]
 *     summary: Profil de l'utilisateur connecté
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Profil détaillé avec statistiques } }
 *   patch:
 *     tags: [Utilisateurs]
 *     summary: Mettre à jour le profil
 *     security: [{ bearerAuth: [] }]
 *     requestBody: { content: { application/json: { schema: { type: object, properties: { firstName: { type: string }, lastName: { type: string }, avatarUrl: { type: string, format: uri }, phone: { type: string } } } } } }
 *     responses: { 200: { description: Profil mis à jour } }
 *
 * /users/me/preferences:
 *   patch:
 *     tags: [Utilisateurs]
 *     summary: Mettre à jour les préférences
 *     security: [{ bearerAuth: [] }]
 *     requestBody: { content: { application/json: { schema: { type: object, properties: { locale: { type: string, enum: [fr, en, ar] }, notifications: { type: object, properties: { email: { type: boolean }, push: { type: boolean }, sms: { type: boolean } } }, offlineMode: { type: boolean } } } } } }
 *     responses: { 200: { description: Préférences mises à jour } }
 *
 * /users/me:
 *   delete:
 *     tags: [Utilisateurs]
 *     summary: Supprimer son compte (soft-delete)
 *     security: [{ bearerAuth: [] }]
 *     responses: { 204: { description: Compte supprimé } }
 *
 * /users/me/export:
 *   get:
 *     tags: [Utilisateurs]
 *     summary: Exporter ses données (RGPD)
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Données exportées (JSON) } }
 *
 * /users/{id}:
 *   get:
 *     tags: [Utilisateurs - Admin]
 *     summary: Obtenir un utilisateur par ID
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     responses: { 200: { description: Utilisateur } }
 *
 * /users/{id}/status:
 *   patch:
 *     tags: [Utilisateurs - Admin]
 *     summary: Modifier le statut d'un utilisateur (activer/suspendre)
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, properties: { status: { type: string, enum: [active, suspended] }, reason: { type: string } } } } } }
 *     responses: { 200: { description: Statut mis à jour } }
 */
import { Router } from 'express';
import * as userController from './user.controller';
import { extractUser } from '../auth/auth.middleware';
import { roleMiddleware } from '../../middleware/auth/role.middleware';
import { validationMiddleware } from '../../middleware/validation/validation.middleware';
import { updateProfileSchema, updatePreferencesSchema, updateStatusSchema } from './user.validation';
import { Role } from '../../constants/roles';

const router = Router();

router.get('/me/profile', extractUser, userController.getProfile);
router.patch('/me/profile', extractUser, validationMiddleware(updateProfileSchema), userController.updateProfile);
router.patch('/me/preferences', extractUser, validationMiddleware(updatePreferencesSchema), userController.updatePreferences);
router.delete('/me', extractUser, userController.deleteAccount);
router.get('/me/export', extractUser, userController.exportData);
router.get('/:id', extractUser, roleMiddleware(Role.ADMIN, Role.SUPERADMIN), userController.getUserById);
router.patch('/:id/status', extractUser, roleMiddleware(Role.ADMIN, Role.SUPERADMIN), validationMiddleware(updateStatusSchema), userController.updateUserStatus);

export default router;
