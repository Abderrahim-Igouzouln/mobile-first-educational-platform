import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../../utils/security/jwt.util';
import { UnauthorizedError } from '../../utils/response/errors.util';

export async function extractUser(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedError('Token manquant ou invalide.');
    }
    const token = authHeader.split(' ')[1];
    const payload = verifyAccessToken(token);
    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role as any,
      locale: payload.locale || 'fr',
      emailVerifiedAt: payload.emailVerifiedAt ? new Date(payload.emailVerifiedAt) : null,
    };
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      next(new UnauthorizedError('Token expiré.'));
    } else if (err instanceof UnauthorizedError) {
      next(err);
    } else {
      next(new UnauthorizedError('Token invalide.'));
    }
  }
}
