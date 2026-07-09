import { z } from 'zod';

export const updateProgressSchema = z.object({
  lessonId: z.string().uuid(),
  status: z.enum(['in_progress', 'completed']),
  timeSpentSec: z.number().int().positive().optional(),
});
