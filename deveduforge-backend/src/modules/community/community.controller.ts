import { Request, Response, NextFunction } from 'express';
import { CommunityService } from './community.service';
import { sendSuccess, sendCreated, sendNoContent } from '../../utils/apiResponse.util';

const communityService = new CommunityService();

export async function getPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const page = parseInt(req.query.page as string) || 1; const limit = parseInt(req.query.limit as string) || 20; const data = await communityService.getPosts(page, limit); sendSuccess(res, data); } catch (err) { next(err); }
}

export async function getPostsCursor(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const cursor = req.query.cursor as string | undefined;
    const limit = parseInt(req.query.limit as string) || 20;
    const data = await communityService.getPostsCursor(cursor, limit);
    sendSuccess(res, data);
  } catch (err) { next(err); }
}

export async function getPost(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const post = await communityService.getPost(req.params.id); sendSuccess(res, post); } catch (err) { next(err); }
}

export async function createPost(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const post = await communityService.createPost(req.user!.id, req.body.title, req.body.content); sendCreated(res, post); } catch (err) { next(err); }
}

export async function updatePost(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const post = await communityService.updatePost(req.params.id, req.user!.id, req.user!.role, req.body); sendSuccess(res, post); } catch (err) { next(err); }
}

export async function deletePost(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { await communityService.deletePost(req.params.id, req.user!.id, req.user!.role); sendNoContent(res); } catch (err) { next(err); }
}

export async function toggleLike(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const result = await communityService.toggleLike(req.params.id, req.user!.id); sendSuccess(res, result); } catch (err) { next(err); }
}

export async function addComment(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const comment = await communityService.addComment(req.params.id, req.user!.id, req.body.content); sendCreated(res, comment); } catch (err) { next(err); }
}

export async function getLeaderboard(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { const period = (req.query.period as string) || 'weekly'; const data = await communityService.getLeaderboard(period); sendSuccess(res, data); } catch (err) { next(err); }
}

export async function reportPost(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { await communityService.reportPost(req.user!.id, req.params.id, req.body.reason); sendNoContent(res); } catch (err) { next(err); }
}
