import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/database/prisma';
import { sendSuccess } from '../../utils/response/apiResponse.util';

export async function getOfflineManifest(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const courses = await prisma.course.findMany({
      where: { isPublished: true },
      include: { lessons: { select: { id: true, title: true, contentMarkdown: true, order: true, durationMin: true } }, technology: { select: { name: true } } },
    });

    const manifest = courses.map((c) => ({
      courseId: c.id,
      courseTitle: c.title,
      technologyName: c.technology.name,
      lastUpdated: c.updatedAt,
      lessons: c.lessons.map((l) => ({
        lessonId: l.id,
        title: l.title,
        contentMarkdown: l.contentMarkdown,
        order: l.order,
        durationMin: l.durationMin,
      })),
    }));

    sendSuccess(res, { manifest, generatedAt: new Date() });
  } catch (err) { next(err); }
}

export async function syncProgress(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { updates } = req.body;
    const results: Array<{ lessonId: string; status: string; synced: boolean }> = [];

    for (const update of updates) {
      const existing = await prisma.userProgress.findUnique({
        where: { userId_lessonId: { userId: req.user!.id, lessonId: update.lessonId } },
      });

      if (existing && existing.updatedAt > new Date(update.updatedAt)) {
        results.push({ lessonId: update.lessonId, status: existing.status, synced: false });
      } else {
        await prisma.userProgress.upsert({
          where: { userId_lessonId: { userId: req.user!.id, lessonId: update.lessonId } },
          update: { status: update.status, timeSpentSec: update.timeSpentSec ?? 0, completedAt: update.status === 'completed' ? new Date() : null },
          create: { userId: req.user!.id, lessonId: update.lessonId, status: update.status, timeSpentSec: update.timeSpentSec ?? 0, completedAt: update.status === 'completed' ? new Date() : undefined },
        });
        results.push({ lessonId: update.lessonId, status: update.status, synced: true });
      }
    }

    sendSuccess(res, { results });
  } catch (err) { next(err); }
}
