import { z } from 'zod';

export const createSubscriptionSchema = z.object({
  planCode: z.string().min(1),
});

export const createCheckoutSessionSchema = z.object({
  planCode: z.string().min(1),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

export const updatePlanSchema = z.object({
  name: z.string().min(1).optional(),
  priceMad: z.number().positive().optional(),
  billingInterval: z.enum(['monthly', 'annual']).optional(),
  features: z.any().optional(),
  isActive: z.boolean().optional(),
});
