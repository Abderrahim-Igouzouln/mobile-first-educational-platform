import { z } from 'zod';

export const updateUserRoleSchema = z.object({
  role: z.enum(['guest', 'student', 'instructor', 'moderator', 'admin', 'superadmin']),
});

export const moderateContentSchema = z.object({
  action: z.enum(['warn', 'remove', 'ban']),
  reason: z.string().min(1),
});

export const systemConfigSchema = z.object({
  maintenanceMode: z.boolean(),
  maintenanceMessage: z.string().optional(),
});
