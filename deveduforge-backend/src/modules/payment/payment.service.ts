import { randomUUID } from 'crypto';
import { PaymentRepository } from './payment.repository';
import { StripeProvider } from './providers/stripe.provider';
import { NotFoundError, ConflictError } from '../../utils/errors.util';

const repo = new PaymentRepository();
const stripeProvider = new StripeProvider();

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

export class PaymentService {
  async getPlans() {
    return repo.findActivePlans();
  }

  async getPlan(code: string) {
    const plan = await repo.findPlanByCode(code);
    if (!plan) throw new NotFoundError('Plan introuvable.');
    return plan;
  }

  async createPlan(data: { code: string; name: string; priceMad: number; billingInterval: string; features: any }) {
    const existing = await repo.findPlanByCode(data.code);
    if (existing) throw new ConflictError('Ce code de plan existe déjà.');
    return repo.createPlan(data as any);
  }

  async updatePlan(id: string, data: any) {
    const plan = await repo.findPlanById(id);
    if (!plan) throw new NotFoundError('Plan introuvable.');
    return repo.updatePlan(id, data);
  }

  async createSubscription(userId: string, planCode: string) {
    const plan = await repo.findPlanByCode(planCode);
    if (!plan) throw new NotFoundError('Plan introuvable.');

    const existing = await repo.findUserSubscription(userId);
    if (existing) throw new ConflictError('Vous avez déjà un abonnement.');

    const now = new Date();
    const end = new Date(now);
    end.setMonth(end.getMonth() + (plan.billingInterval === 'annual' ? 12 : 1));

    const isFree = Number(plan.priceMad) === 0;

    return repo.createUserSubscription({
      status: isFree ? 'active' : 'pending',
      currentPeriodStart: now,
      currentPeriodEnd: end,
      cancelAtPeriodEnd: false,
      paymentProvider: 'stripe',
      user: { connect: { id: userId } },
      plan: { connect: { id: plan.id } },
    } as any);
  }

  async getUserSubscription(userId: string) {
    const sub = await repo.findUserSubscription(userId);
    if (!sub) return null;

    const plan = await repo.findPlanById(sub.planId);
    return { ...sub, plan };
  }

  async createCheckoutSession(userId: string, planCode: string, successUrl: string, cancelUrl: string) {
    const plan = await repo.findPlanByCode(planCode);
    if (!plan) throw new NotFoundError('Plan introuvable.');

    const existing = await repo.findUserSubscription(userId);
    if (existing) throw new ConflictError('Vous avez déjà un abonnement.');

    const isFree = Number(plan.priceMad) === 0;
    if (isFree) {
      return { url: null, sessionId: null };
    }

    const now = new Date();
    const end = new Date(now);
    end.setMonth(end.getMonth() + (plan.billingInterval === 'annual' ? 12 : 1));

    const subscription = await repo.createUserSubscription({
      status: 'pending',
      currentPeriodStart: now,
      currentPeriodEnd: end,
      cancelAtPeriodEnd: false,
      paymentProvider: 'stripe',
      user: { connect: { id: userId } },
      plan: { connect: { id: plan.id } },
    } as any);

    const idempotencyKey = randomUUID();

    const payment = await repo.createPayment({
      amountMad: plan.priceMad,
      status: 'pending',
      provider: 'stripe',
      providerPaymentId: '',
      idempotencyKey,
      user: { connect: { id: userId } },
      subscription: { connect: { id: subscription.id } },
    } as any);

    const session = await stripeProvider.createCheckoutSession({
      priceMad: Number(plan.priceMad),
      planCode: plan.code,
      planName: plan.name,
      successUrl,
      cancelUrl,
      clientReferenceId: userId,
    });

    await repo.updatePaymentStatus(payment.id, 'pending', session.id);

    return { url: session.url, sessionId: session.id };
  }

  async handleStripeWebhook(payload: Buffer, signature: string) {
    const event = await stripeProvider.constructWebhookEvent(payload, signature);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as StripeSession;
        const payment = await repo.findPaymentByProviderId(session.id);
        if (!payment) break;

        await repo.updatePaymentStatus(payment.id, 'succeeded', session.payment_intent as string);

        if (payment.subscriptionId) {
          await repo.updateUserSubscription(payment.subscriptionId, { status: 'active' } as any);

          const invNumber = `INV-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
          const invoice = await repo.createInvoice({
            invoiceNumber: invNumber,
            payment: { connect: { id: payment.id } },
          } as any);

          const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:4000';
          const pdfUrl = `${apiBaseUrl}/api/v1/payments/invoices/${invoice.id}/view`;
          await repo.updateInvoicePdfUrl(invoice.id, pdfUrl);
        }
        break;
      }
      case 'checkout.session.expired': {
        const session = event.data.object as StripeSession;
        const payment = await repo.findPaymentByProviderId(session.id);
        if (payment) {
          await repo.updatePaymentStatus(payment.id, 'failed', session.id);
          if (payment.subscriptionId) {
            await repo.updateUserSubscription(payment.subscriptionId, { status: 'expired' } as any);
          }
        }
        break;
      }
    }

    return { received: true };
  }

  async getInvoiceHtml(invoiceId: string) {
    const invoice = await repo.findInvoiceById(invoiceId);
    if (!invoice) throw new NotFoundError('Facture introuvable.');

    const user = invoice.payment.user;
    const plan = invoice.payment.subscription?.plan;
    const amount = Number(invoice.payment.amountMad).toFixed(2);

    const safeFirstName = escapeHtml(user.firstName);
    const safeLastName = escapeHtml(user.lastName);
    const safeEmail = escapeHtml(user.email);
    const safePlanName = escapeHtml(plan?.name || 'Premium');
    const safeInvoiceNumber = escapeHtml(invoice.invoiceNumber);

    return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Facture ${safeInvoiceNumber} - DevEduForge</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: #f3f4f6; display: flex; justify-content: center; padding: 40px 16px; }
    .invoice { background: #fff; max-width: 720px; width: 100%; border-radius: 16px; padding: 48px; box-shadow: 0 4px 24px rgba(0,0,0,.08); }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
    .brand h1 { font-size: 24px; color: #00205B; font-weight: 800; }
    .brand p { font-size: 14px; color: #6b7280; margin-top: 4px; }
    .status { background: #dcfce7; color: #16a34a; padding: 4px 14px; border-radius: 999px; font-size: 13px; font-weight: 600; }
    .meta { display: flex; justify-content: space-between; margin-bottom: 32px; padding: 20px; background: #f9fafb; border-radius: 12px; }
    .meta h3 { font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 4px; }
    .meta p { font-size: 15px; color: #00205B; font-weight: 600; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    th { text-align: left; padding: 10px 0; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: .5px; border-bottom: 2px solid #e5e7eb; }
    td { padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; color: #374151; }
    td:last-child, th:last-child { text-align: right; }
    .total td { border-bottom: none; padding-top: 16px; font-weight: 700; font-size: 18px; color: #00205B; }
    .total td:last-child { font-size: 22px; }
    .footer { text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb; font-size: 13px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="invoice">
    <div class="header">
      <div class="brand">
        <h1>DevEduForge</h1>
        <p>Facture ${safeInvoiceNumber}</p>
      </div>
      <span class="status">Payée</span>
    </div>
    <div class="meta">
      <div>
        <h3>Client</h3>
        <p>${safeFirstName} ${safeLastName}</p>
        <p style="font-weight:400;font-size:13px;color:#6b7280">${safeEmail}</p>
      </div>
      <div style="text-align:right">
        <h3>Date d'émission</h3>
        <p>${new Date(invoice.issuedAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
    </div>
    <table>
      <tr><th>Description</th><th>Montant</th></tr>
      <tr><td>Abonnement ${safePlanName}${plan?.billingInterval === 'annual' ? ' (annuel)' : ' (mensuel)'}</td><td>${amount} MAD</td></tr>
      <tr class="total"><td>Total</td><td>${amount} MAD</td></tr>
    </table>
    <div class="footer">
      DevEduForge &mdash; Paiement sécurisé via Stripe &mdash; ${safeInvoiceNumber}
    </div>
  </div>
</body>
</html>`;
  }

  async getInvoices(userId: string) {
    return repo.findInvoicesByUser(userId);
  }

  async getPaymentHistory(userId: string) {
    return repo.findPaymentsByUser(userId);
  }
}

interface StripeSession {
  id: string;
  payment_intent: string | null;
}
