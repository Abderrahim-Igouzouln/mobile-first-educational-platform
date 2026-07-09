import { Request, Response, NextFunction } from 'express';
import { ProjectService } from './project.service';
import { sendSuccess, sendCreated } from '../../utils/apiResponse.util';

const projectService = new ProjectService();

export async function getProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const projects = await projectService.getProjects(req.params.courseId);
    sendSuccess(res, projects);
  } catch (err) { next(err); }
}

export async function getProjectDetail(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const project = await projectService.getProjectDetail(req.params.id);
    sendSuccess(res, project);
  } catch (err) { next(err); }
}

export async function submitProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const submission = await projectService.submitProject(req.user!.id, req.params.id, req.body);
    sendCreated(res, submission);
  } catch (err) { next(err); }
}

export async function getSubmissions(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const submissions = await projectService.getSubmissions(req.user!.id);
    sendSuccess(res, submissions);
  } catch (err) { next(err); }
}

export async function reviewSubmission(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await projectService.reviewSubmission(req.user!.id, req.params.id, req.body.score, req.body.feedback);
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

export async function addComment(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const comment = await projectService.addComment(req.user!.id, req.params.id, req.body.content);
    sendCreated(res, comment);
  } catch (err) { next(err); }
}
