/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterInput:
 *       type: object
 *       required: [email, password, firstName, lastName]
 *       properties:
 *         email: { type: string, format: email, example: user@example.com }
 *         password: { type: string, format: password, example: "Mot2p@sse!" }
 *         firstName: { type: string, example: Jean }
 *         lastName: { type: string, example: Dupont }
 *         phone: { type: string, example: "+212600000000" }
 *     LoginInput:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email: { type: string, format: email }
 *         password: { type: string, format: password }
 *         deviceInfo: { type: string }
 *         ipAddress: { type: string }
 *     TokenResponse:
 *       type: object
 *       properties:
 *         accessToken: { type: string }
 *         refreshToken: { type: string }
 *         expiresIn: { type: integer }
 *     AuthResponse:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             id: { type: string, format: uuid }
 *             email: { type: string, format: email }
 *             firstName: { type: string }
 *             lastName: { type: string }
 *             role: { type: string }
 *         tokens: { $ref: '#/components/schemas/TokenResponse' }
 *
 * /auth/register:
 *   post:
 *     tags: [Authentification]
 *     summary: Inscription
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/RegisterInput' } } } }
 *     responses:
 *       201: { description: Compte créé, email de vérification envoyé }
 *       409: { description: Email déjà utilisé }
 *
 * /auth/login:
 *   post:
 *     tags: [Authentification]
 *     summary: Connexion
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/LoginInput' } } } }
 *     responses:
 *       200: { description: Connexion réussie, content: { application/json: { schema: { $ref: '#/components/schemas/AuthResponse' } } } }
 *       401: { description: Email ou mot de passe incorrect }
 *       423: { description: Compte verrouillé (trop de tentatives) }
 *
 * /auth/refresh:
 *   post:
 *     tags: [Authentification]
 *     summary: Rafraîchir le token
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, properties: { refreshToken: { type: string } } } } } }
 *     responses: { 200: { description: Nouveaux tokens } }
 *
 * /auth/logout:
 *   post:
 *     tags: [Authentification]
 *     summary: Déconnexion
 *     security: [{ bearerAuth: [] }]
 *     responses: { 204: { description: Déconnecté } }
 *
 * /auth/logout-all:
 *   post:
 *     tags: [Authentification]
 *     summary: Déconnexion de tous les appareils
 *     security: [{ bearerAuth: [] }]
 *     responses: { 204: { description: Toutes les sessions fermées } }
 *
 * /auth/verify-email:
 *   post:
 *     tags: [Authentification]
 *     summary: Vérifier l'email
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, properties: { token: { type: string } } } } } }
 *     responses: { 200: { description: Email vérifié } }
 *
 * /auth/forgot-password:
 *   post:
 *     tags: [Authentification]
 *     summary: Mot de passe oublié
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, properties: { email: { type: string, format: email } } } } } }
 *     responses: { 200: { description: Email envoyé si le compte existe } }
 *
 * /auth/reset-password:
 *   post:
 *     tags: [Authentification]
 *     summary: Réinitialiser le mot de passe
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, properties: { token: { type: string }, password: { type: string, format: password } } } } } }
 *     responses: { 200: { description: Mot de passe réinitialisé } }
 *
 * /auth/change-password:
 *   post:
 *     tags: [Authentification]
 *     summary: Changer le mot de passe
 *     security: [{ bearerAuth: [] }]
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, properties: { currentPassword: { type: string }, newPassword: { type: string, format: password } } } } } }
 *     responses: { 200: { description: Mot de passe changé } }
 *
 * /auth/me:
 *   get:
 *     tags: [Authentification]
 *     summary: Profil de l'utilisateur connecté
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Profil utilisateur } }
 */
import { Router } from 'express';
import * as authController from './auth.controller';
import { validationMiddleware } from '../../middleware/validation.middleware';
import { authRateLimiter, emailRateLimiter } from '../../middleware/rateLimiter.middleware';
import { extractUser } from './auth.middleware';
import { registerSchema, loginSchema, refreshSchema, verifyEmailSchema,
  resendVerificationSchema, forgotPasswordSchema, resetPasswordSchema,
  changePasswordSchema } from './auth.validation';

const router = Router();

router.post('/register', authRateLimiter, validationMiddleware(registerSchema), authController.register);
router.post('/login', authRateLimiter, validationMiddleware(loginSchema), authController.login);
router.post('/refresh', authRateLimiter, validationMiddleware(refreshSchema), authController.refresh);
router.post('/logout', extractUser, authController.logout);
router.post('/logout-all', extractUser, authController.logoutAll);
router.post('/verify-email', emailRateLimiter, validationMiddleware(verifyEmailSchema), authController.verifyEmail);
router.post('/resend-verification', emailRateLimiter, validationMiddleware(resendVerificationSchema), authController.resendVerification);
router.post('/forgot-password', emailRateLimiter, validationMiddleware(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', validationMiddleware(resetPasswordSchema), authController.resetPassword);
router.post('/change-password', extractUser, validationMiddleware(changePasswordSchema), authController.changePassword);
router.get('/me', extractUser, authController.getMe);

export default router;
