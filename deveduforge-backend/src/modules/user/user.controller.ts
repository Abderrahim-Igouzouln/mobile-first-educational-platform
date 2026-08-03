import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { sendSuccess, sendNoContent } from '../../utils/response/apiResponse.util';

const userService = new UserService();

export async function getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const profile = await userService.getProfile(req.user!.id);
    sendSuccess(res, profile);
  } catch (err) { next(err); }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const updated = await userService.updateProfile(req.user!.id, req.body);
    const profile = await userService.getProfile(updated.id);
    sendSuccess(res, profile);
  } catch (err) { next(err); }
}

export async function updatePreferences(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await userService.updatePreferences(req.user!.id, req.body);
    const profile = await userService.getProfile(req.user!.id);
    sendSuccess(res, profile);
  } catch (err) { next(err); }
}

export async function deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await userService.deleteAccount(req.user!.id);
    sendNoContent(res);
  } catch (err) { next(err); }
}

export async function exportData(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await userService.exportData(req.user!.id);
    sendSuccess(res, data);
  } catch (err) { next(err); }
}

export async function getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await userService.getUserById(req.params.id);
    sendSuccess(res, user);
  } catch (err) { next(err); }
}

export async function updateUserStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const updated = await userService.updateUserStatus(req.user!.id, req.params.id, req.body.status, req.body.reason);
    sendSuccess(res, updated);
  } catch (err) { next(err); }
}
