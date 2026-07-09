import { z } from 'zod';

export const submitAnswerSchema = z.object({
  questionId: z.string().uuid(),
  selectedOptionId: z.string().uuid().optional(),
  textAnswer: z.string().optional(),
});

export const submitExerciseSchema = z.object({
  answers: z.array(z.object({
    questionId: z.string().uuid(),
    selectedOptionId: z.string().uuid().optional(),
    textAnswer: z.string().optional(),
  })),
  timeSpentSec: z.number().int().min(0).optional(),
});
