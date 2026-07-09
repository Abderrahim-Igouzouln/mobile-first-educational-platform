/**
 * @openapi
 * components:
 *   schemas:
 *     SubscriptionPlan:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid }
 *         code: { type: string, example: "premium_monthly" }
 *         name: { type: string }
 *         priceMad: { type: number, format: decimal }
 *         billingInterval: { type: string, enum: [monthly, annual] }
 *         features: { type: object }
 *         isActive: { type: boolean }
 *
 * /payments/plans:
 *   get:
 *     tags: [Paiements]
 *     summary: Liste des plans actifs
 *     responses: { 200: { description: Plans, content: { application/json: { schema: { type: array, items: { $ref: '#/components/schemas/SubscriptionPlan' } } } } } }
 *   post:
 *     tags: [Paiements - Admin]
 *     summary: Créer un plan
 *     security: [{ bearerAuth: [] }]
 *     responses: { 201: { description: Plan créé } }
 *
 * /payments/plans/{code}:
 *   get:
 *     tags: [Paiements]
 *     summary: Détail d'un plan
 *     parameters: [{ in: path, name: code, required: true, schema: { type: string } }]
 *     responses: { 200: { description: Plan } }
 *
 * /payments/subscriptions:
 *   post:
 *     tags: [Paiements]
 *     summary: Créer un abonnement gratuit
 *     security: [{ bearerAuth: [] }]
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, properties: { planCode: { type: string } } } } } }
 *     responses: { 201: { description: Abonnement créé } }
 *
 * /payments/subscriptions/me:
 *   get:
 *     tags: [Paiements]
 *     summary: Mon abonnement
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Abonnement avec plan } }
 *
 * /payments/create-checkout-session:
 *   post:
 *     tags: [Paiements]
 *     summary: Créer une session Checkout Stripe
 *     security: [{ bearerAuth: [] }]
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, properties: { planCode: { type: string }, successUrl: { type: string }, cancelUrl: { type: string } } } } } }
 *     responses: { 201: { description: URL de checkout Stripe } }
 *
 * /payments/payments:
 *   get:
 *     tags: [Paiements]
 *     summary: Historique des paiements
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Paiements } }
 *
 * /payments/invoices:
 *   get:
 *     tags: [Paiements]
 *     summary: Factures
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Factures } }
 */
import { Router } from 'express';
import * as paymentController from './payment.controller';
import { extractUser } from '../auth/auth.middleware';
import { roleMiddleware } from '../../middleware/role.middleware';
import { validationMiddleware } from '../../middleware/validation.middleware';
import { createSubscriptionSchema, createCheckoutSessionSchema, updatePlanSchema } from './payment.validation';
import { Role } from '../../constants/roles';

const router = Router();

router.get('/plans', paymentController.getPlans);
router.get('/plans/:code', paymentController.getPlan);
router.post('/plans', extractUser, roleMiddleware(Role.ADMIN, Role.SUPERADMIN), validationMiddleware(updatePlanSchema), paymentController.createPlan);
router.patch('/plans/:id', extractUser, roleMiddleware(Role.ADMIN, Role.SUPERADMIN), validationMiddleware(updatePlanSchema), paymentController.updatePlan);
router.post('/subscriptions', extractUser, validationMiddleware(createSubscriptionSchema), paymentController.createSubscription);
router.get('/subscriptions/me', extractUser, paymentController.getUserSubscription);
router.post('/create-checkout-session', extractUser, validationMiddleware(createCheckoutSessionSchema), paymentController.createCheckoutSession);
router.get('/payments', extractUser, paymentController.getPaymentHistory);
router.get('/invoices', extractUser, paymentController.getInvoices);
router.get('/invoices/:id/view', paymentController.viewInvoice);

export default router;
