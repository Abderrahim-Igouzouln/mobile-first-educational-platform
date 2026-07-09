import { z } from 'zod';

export const submitProjectSchema = z.object({
  repositoryUrl: z.string().url().optional().nullable(),
  fileUrl: z.string().url().optional().nullable(),
}).refine((data) => data.repositoryUrl || data.fileUrl, { message: 'Fournissez repositoryUrl ou fileUrl.' });

export const reviewSubmissionSchema = z.object({
  score: z.number().int().min(0).max(100),
  feedback: z.string().min(1).max(2000),
});

export const addCommentSchema = z.object({
  content: z.string().min(1).max(1000),
});
