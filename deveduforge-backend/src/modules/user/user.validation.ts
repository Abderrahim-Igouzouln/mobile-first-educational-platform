import { z } from 'zod';

export const updateProfileSchema = z.object({
  firstName: z.string().min(1).max(50).trim().optional(),
  lastName: z.string().min(1).max(50).trim().optional(),
  avatarUrl: z.string().url().optional().nullable(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Format E.164 requis.').optional().nullable(),
});

export const updatePreferencesSchema = z.object({
  locale: z.enum(['fr', 'en', 'ar']).optional(),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    sms: z.boolean(),
  }).optional(),
  offlineMode: z.boolean().optional(),
});

export const updateStatusSchema = z.object({
  status: z.enum(['active', 'suspended']),
  reason: z.string().max(500).optional(),
});
