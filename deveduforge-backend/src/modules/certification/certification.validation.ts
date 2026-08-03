import { z } from 'zod';

export const issueCertificateSchema = z.object({
  courseId: z.string().uuid(),
  scorePercent: z.number().int().min(0).max(100),
});
