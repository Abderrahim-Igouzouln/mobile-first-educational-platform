import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { sendSuccess, sendCreated, sendNoContent } from '../../utils/response/apiResponse.util';

const authService = new AuthService();

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await authService.register(req.body);
    sendCreated(res, result);
  } catch (err) { next(err); }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await authService.login({
      ...req.body,
      ipAddress: req.ip,
      deviceInfo: req.headers['user-agent'],
    });
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

export async function refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await authService.refresh(
      req.body.refreshToken,
      req.headers['user-agent'],
      req.ip,
    );
    sendSuccess(res, result);
  } catch (err) { next(err); }
}

export async function logout(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await authService.logout(req.body.refreshToken);
    sendNoContent(res);
  } catch (err) { next(err); }
}

export async function logoutAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await authService.logoutAll(req.user!.id, req.body.refreshToken);
    sendNoContent(res);
  } catch (err) { next(err); }
}

export async function verifyEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await authService.verifyEmail(req.body.token);
    sendSuccess(res, { message: 'Email vérifié avec succès.' });
  } catch (err) { next(err); }
}

export async function resendVerification(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await authService.resendVerification(req.body.email);
    sendSuccess(res, { message: 'Si cet email existe, un nouveau lien de vérification a été envoyé.' });
  } catch (err) { next(err); }
}

export async function forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await authService.forgotPassword(req.body.email);
    sendSuccess(res, { message: 'Si cet email existe, vous recevrez un lien de réinitialisation.' });
  } catch (err) { next(err); }
}

export async function resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await authService.resetPassword(req.body.token, req.body.password);
    sendSuccess(res, { message: 'Mot de passe réinitialisé avec succès.' });
  } catch (err) { next(err); }
}

export async function changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await authService.changePassword(req.user!.id, req.body.currentPassword, req.body.newPassword);
    sendSuccess(res, { message: 'Mot de passe modifié avec succès.' });
  } catch (err) { next(err); }
}

export async function getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await authService.getMe(req.user!.id);
    sendSuccess(res, user);
  } catch (err) { next(err); }
}
