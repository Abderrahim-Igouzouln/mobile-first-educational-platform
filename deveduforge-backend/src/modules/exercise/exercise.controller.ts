import { Request, Response, NextFunction } from 'express';
import { ExerciseService } from './exercise.service';
import { sendSuccess } from '../../utils/response/apiResponse.util';

const exerciseService = new ExerciseService();

export async function getExercise(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const exercise = await exerciseService.getExercise(req.params.lessonId);
    sendSuccess(res, exercise);
  } catch (err) { next(err); }
}

export async function submitAnswer(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await exerciseService.submitAnswer(req.user!.id, req.params.id, req.body.questionId, req.body.selectedOptionId, req.body.textAnswer);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

export async function submitExercise(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await exerciseService.submitExercise(req.user!.id, req.params.id, req.body.answers);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}
