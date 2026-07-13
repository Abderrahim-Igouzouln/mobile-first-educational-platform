import { Request, Response, NextFunction } from 'express';
import { CourseService } from './course.service';
import { sendSuccess, sendCreated, sendNoContent } from '../../utils/response/apiResponse.util';

const courseService = new CourseService();

export async function getDomains(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const domains = await courseService.getDomains();
    sendSuccess(res, domains);
  } catch (err) { next(err); }
}

export async function getTechnologies(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await courseService.getTechnologies(req.params.slug, req.user?.id);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

export async function getTechnologyDetail(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await courseService.getTechnologyDetail(req.params.slug);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

export async function getCourses(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const courses = await courseService.getCourses(req.params.slug, req.user!.id);
    sendSuccess(res, courses);
  } catch (err) { next(err); }
}

export async function getCourseDetail(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const course = await courseService.getCourseDetail(req.params.id, req.user!.id);
    sendSuccess(res, course);
  } catch (err) { next(err); }
}

export async function getLesson(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const lesson = await courseService.getLesson(req.params.id, req.user!.id);
    sendSuccess(res, lesson);
  } catch (err) { next(err); }
}

export async function completeLesson(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await courseService.completeLesson(req.params.id, req.user!.id, req.body.timeSpentSec);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

export async function toggleBookmark(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await courseService.toggleBookmark(req.params.id, req.user!.id);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

export async function getBookmarks(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const bookmarks = await courseService.getBookmarks(req.user!.id);
    sendSuccess(res, bookmarks);
  } catch (err) { next(err); }
}

export async function getContinueLearning(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await courseService.getContinueLearning(req.user!.id);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

export async function createCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const course = await courseService.createCourse(req.body, req.user!.id);
    sendCreated(res, course);
  } catch (err) { next(err); }
}

export async function updateCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const course = await courseService.updateCourse(req.params.id, req.body, req.user!.id, req.user!.role);
    sendSuccess(res, course);
  } catch (err) { next(err); }
}

export async function publishCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const course = await courseService.publishCourse(req.params.id, req.user!.id, req.user!.role);
    sendSuccess(res, course);
  } catch (err) { next(err); }
}

export async function addLesson(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const lesson = await courseService.addLesson(req.params.id, req.body, req.user!.id, req.user!.role);
    sendCreated(res, lesson);
  } catch (err) { next(err); }
}

export async function reorderLessons(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await courseService.reorderLessons(req.body.courseId, req.body.lessonIds);
    sendNoContent(res);
  } catch (err) { next(err); }
}
