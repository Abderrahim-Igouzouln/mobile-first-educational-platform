import { Request, Response, NextFunction } from 'express';
import { InstructorService } from './instructor.service';
import { sendSuccess } from '../../utils/apiResponse.util';

const instructorService = new InstructorService();

export async function getStats(req: Request, res: Response, next: NextFunction) {
  try {
    const stats = await instructorService.getStats(req.user!.id);
    sendSuccess(res, stats);
  } catch (err) {
    next(err);
  }
}

export async function getCourses(req: Request, res: Response, next: NextFunction) {
  try {
    const courses = await instructorService.getCourses(req.user!.id);
    sendSuccess(res, courses);
  } catch (err) {
    next(err);
  }
}
