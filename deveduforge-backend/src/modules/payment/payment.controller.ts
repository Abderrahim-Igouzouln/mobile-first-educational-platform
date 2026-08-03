import { Request, Response, NextFunction } from 'express';
import { PaymentService } from './payment.service';
import { sendSuccess, sendCreated } from '../../utils/response/apiResponse.util';

const paymentService = new PaymentService();

export async function getPlans(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const plans = await paymentService.getPlans(); sendSuccess(res, plans); } catch (err) { next(err); }
}

export async function getPlan(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const plan = await paymentService.getPlan(req.params.code); sendSuccess(res, plan); } catch (err) { next(err); }
}

export async function createPlan(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const plan = await paymentService.createPlan(req.body); sendCreated(res, plan); } catch (err) { next(err); }
}

export async function updatePlan(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const plan = await paymentService.updatePlan(req.params.id, req.body); sendSuccess(res, plan); } catch (err) { next(err); }
}

export async function createSubscription(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const sub = await paymentService.createSubscription(req.user!.id, req.body.planCode); sendCreated(res, sub); } catch (err) { next(err); }
}

export async function getUserSubscription(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const sub = await paymentService.getUserSubscription(req.user!.id); sendSuccess(res, sub); } catch (err) { next(err); }
}

export async function createCheckoutSession(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const result = await paymentService.createCheckoutSession(req.user!.id, req.body.planCode, req.body.successUrl, req.body.cancelUrl); sendSuccess(res, result); } catch (err) { next(err); }
}

export async function createCertificateCheckoutSession(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await paymentService.createCertificateCheckoutSession(req.user!.id, req.body.certificateId, req.body.successUrl, req.body.cancelUrl);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

export async function handleStripeWebhook(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const sig = req.headers['stripe-signature'] as string;
    const result = await paymentService.handleStripeWebhook(req.body, sig);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

export async function getPaymentHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const history = await paymentService.getPaymentHistory(req.user!.id); sendSuccess(res, history); } catch (err) { next(err); }
}

export async function getInvoices(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const invoices = await paymentService.getInvoices(req.user!.id); sendSuccess(res, invoices); } catch (err) { next(err); }
}

export async function viewInvoice(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const html = await paymentService.getInvoiceHtml(req.params.id);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (err) { next(err); }
}
