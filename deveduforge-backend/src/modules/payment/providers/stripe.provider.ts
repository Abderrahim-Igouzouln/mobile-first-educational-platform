import Stripe from 'stripe';
import { stripe } from '../../../config/stripe';

export class StripeProvider {
  async createCheckoutSession(params: {
    priceMad: number;
    planCode: string;
    planName: string;
    successUrl: string;
    cancelUrl: string;
    clientReferenceId: string;
  }): Promise<Stripe.Checkout.Session> {
    const rate = Number(process.env.STRIPE_MAD_TO_EUR_RATE || '0.092');
    const unitAmount = Math.max(Math.round(params.priceMad * rate * 100), 50);

    return stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: params.planName,
            description: `Plan ${params.planCode}`,
          },
          unit_amount: unitAmount,
        },
        quantity: 1,
      }],
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      client_reference_id: params.clientReferenceId,
      metadata: { planCode: params.planCode },
    });
  }

  async constructWebhookEvent(payload: Buffer, signature: string): Promise<Stripe.Event> {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not configured.');
    }
    return stripe.webhooks.constructEvent(payload, signature, secret);
  }
}
