import { Request, Response, NextFunction } from 'express';
import { ProgressService } from './progress.service';
import { sendSuccess } from '../../utils/response/apiResponse.util';

const progressService = new ProgressService();

export async function getDashboard(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const data = await progressService.getDashboard(req.user!.id); sendSuccess(res, data); } catch (err) { next(err); }
}

export async function getAchievements(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const data = await progressService.getAchievements(req.user!.id); sendSuccess(res, data); } catch (err) { next(err); }
}

export async function getActivityCalendar(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const data = await progressService.getActivityCalendar(req.user!.id); sendSuccess(res, data); } catch (err) { next(err); }
}

export async function getStreak(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const data = await progressService.getStreak(req.user!.id); sendSuccess(res, data); } catch (err) { next(err); }
}

export async function getTimeSeries(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const days = parseInt(req.query.days as string, 10) || 30;
    const data = await progressService.getTimeSeries(req.user!.id, days);
    sendSuccess(res, data);
  } catch (err) { next(err); }
}

export async function getDomainBreakdown(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await progressService.getDomainBreakdown(req.user!.id);
    sendSuccess(res, data);
  } catch (err) { next(err); }
}

export async function getPlatformComparison(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await progressService.getPlatformComparison(req.user!.id);
    sendSuccess(res, data);
  } catch (err) { next(err); }
}
