import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/database/prisma';
import { sendSuccess } from '../../utils/response/apiResponse.util';

export async function trackEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await prisma.userEvent.create({
      data: { userId: req.user?.id, event: req.body.event, properties: req.body.properties },
    });
    sendSuccess(res, { tracked: true });
  } catch (err) { next(err); }
}

export async function getDashboardOverview(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [dailyStats, courseStats, userStats] = await Promise.all([
      prisma.dailyStats.findMany({ orderBy: { date: 'desc' }, take: 30 }),
      prisma.courseAnalytics.groupBy({ by: ['courseId'], _sum: { value: true }, where: { metric: 'enrollments' } }),
      prisma.userEvent.groupBy({ by: ['event'], _count: true, where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } }),
    ]);
    sendSuccess(res, { dailyStats, courseStats, userStats });
  } catch (err) { next(err); }
}
