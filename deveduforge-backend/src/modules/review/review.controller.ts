import { Request, Response, NextFunction } from 'express';
import { ReviewService } from './review.service';
import { sendSuccess, sendCreated } from '../../utils/response/apiResponse.util';

const reviewService = new ReviewService();

export async function getReviews(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await reviewService.getReviews(req.params.courseId);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

export async function submitReview(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await reviewService.submitReview(req.user!.id, req.params.courseId, req.body.rating, req.body.comment);
    sendCreated(res, result);
  } catch (err) { next(err); }
}
