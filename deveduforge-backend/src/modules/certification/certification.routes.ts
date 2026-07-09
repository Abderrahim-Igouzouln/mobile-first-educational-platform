/**
 * @openapi
 * /certifications/certificates:
 *   get:
 *     tags: [Certifications]
 *     summary: Mes certificats
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Liste des certificats } }
 *
 * /certifications/certificates/issue:
 *   post:
 *     tags: [Certifications - Instructor]
 *     summary: Délivrer un certificat
 *     security: [{ bearerAuth: [] }]
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, properties: { technologyId: { type: string, format: uuid }, scorePercent: { type: integer, min: 0, max: 100 } } } } } }
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
import { roleMiddleware } from '../../middleware/role.middleware';
import { validationMiddleware } from '../../middleware/validation.middleware';
import { issueCertificateSchema } from './certification.validation';
import { Role } from '../../constants/roles';

const router = Router();

router.get('/certificates', extractUser, certificationController.getCertificates);
router.post('/certificates/issue', extractUser, roleMiddleware(Role.INSTRUCTOR, Role.ADMIN, Role.SUPERADMIN), validationMiddleware(issueCertificateSchema), certificationController.issueCertificate);
router.get('/certificates/verify/:number', certificationController.verifyCertificate);
router.post('/certificates/:id/revoke', extractUser, roleMiddleware(Role.ADMIN, Role.SUPERADMIN), certificationController.revokeCertificate);

export default router;
