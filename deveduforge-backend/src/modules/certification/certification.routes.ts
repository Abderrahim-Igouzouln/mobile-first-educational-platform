/**
 * @openapi
 * /certifications/certificates:
 *   get:
 *     tags: [Certifications]
 *     summary: Mes certificats (tous les cours, avec statut locked/unlocked/paid)
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Liste des certificats avec statut } }
 *
 * /certifications/courses/{courseId}/completion-status:
 *   get:
 *     tags: [Certifications]
 *     summary: Statut de complétion d'un cours
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: courseId, required: true, schema: { type: string, format: uuid } }]
 *     responses: { 200: { description: Progression leçons/exercices/projet } }
 *
 * /certifications/certificates/{id}/checkout:
 *   get:
 *     tags: [Certifications]
 *     summary: Récupérer les infos de paiement pour un certificat débloqué
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     responses: { 200: { description: Montant et infos de paiement } }
 *
 * /certifications/certificates/{id}/download:
 *   post:
 *     tags: [Certifications]
 *     summary: Télécharger le PDF du certificat (nécessite paiement)
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     responses: { 200: { description: PDF du certificat (base64 ou URL) } }
 *
 * /certifications/certificates/issue:
 *   post:
 *     tags: [Certifications - Instructor]
 *     summary: Délivrer un certificat
 *     security: [{ bearerAuth: [] }]
 *     responses: { 201: { description: Certificat créé avec QR code HMAC } }
 *
 * /certifications/certificates/verify/{number}:
 *   get:
 *     tags: [Certifications]
 *     summary: Vérifier un certificat (public)
 *     parameters: [{ in: path, name: number, required: true, schema: { type: string, example: "DEF-XXXX-XXXX" } }]
 *     responses: { 200: { description: Informations du certificat } }
 *
 * /certifications/certificates/{id}/revoke:
 *   post:
 *     tags: [Certifications - Admin]
 *     summary: Révoquer un certificat
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string, format: uuid } }]
 *     responses: { 200: { description: Certificat révoqué } }
 */
import { Router } from 'express';
import * as certificationController from './certification.controller';
import { extractUser } from '../auth/auth.middleware';
import { roleMiddleware } from '../../middleware/auth/role.middleware';
import { validationMiddleware } from '../../middleware/validation/validation.middleware';
import { issueCertificateSchema } from './certification.validation';
import { Role } from '../../constants/roles';

const router = Router();

router.get('/certificates', extractUser, certificationController.getCertificates);
router.get('/courses/:courseId/completion-status', extractUser, certificationController.getCompletionStatus);
router.post('/certificates/:id/checkout', extractUser, certificationController.requestCheckout);
router.post('/certificates/:id/download', extractUser, certificationController.downloadCertificate);
router.post('/certificates/issue', extractUser, roleMiddleware(Role.INSTRUCTOR, Role.ADMIN, Role.SUPERADMIN), validationMiddleware(issueCertificateSchema), certificationController.issueCertificate);
router.get('/certificates/verify/:number', certificationController.verifyCertificate);
router.post('/certificates/:id/revoke', extractUser, roleMiddleware(Role.ADMIN, Role.SUPERADMIN), certificationController.revokeCertificate);

export default router;
