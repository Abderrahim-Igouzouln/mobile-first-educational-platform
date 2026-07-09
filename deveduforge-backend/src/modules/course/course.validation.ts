import { z } from 'zod';

export const createCourseSchema = z.object({
  technologyId: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  estimatedDurationMin: z.number().int().positive(),
});

export const updateCourseSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(5000).optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  estimatedDurationMin: z.number().int().positive().optional(),
});

export const createLessonSchema = z.object({
  title: z.string().min(1).max(200),
  contentMarkdown: z.string().min(1),
  order: z.number().int().positive(),
  durationMin: z.number().int().positive(),
  videoUrl: z.string().url().optional().nullable(),
});

export const reorderLessonsSchema = z.object({
  courseId: z.string().uuid(),
  lessonIds: z.array(z.string().uuid()),
});

export const completeLessonSchema = z.object({
  timeSpentSec: z.number().int().min(0).optional(),
});
