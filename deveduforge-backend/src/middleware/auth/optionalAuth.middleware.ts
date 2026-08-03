import { Request, Response, NextFunction } from 'express';
import { jwtConfig } from '../../config/security/jwt';
import jwt from 'jsonwebtoken';

export async function optionalAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return next();

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, jwtConfig.accessSecret) as any;
    req.user = { id: payload.sub, email: payload.email || '', role: payload.role, locale: payload.locale || 'fr', emailVerifiedAt: payload.emailVerifiedAt ? new Date(payload.emailVerifiedAt) : null };
  } catch {
    // Silently ignore invalid tokens
  }
  next();
}
