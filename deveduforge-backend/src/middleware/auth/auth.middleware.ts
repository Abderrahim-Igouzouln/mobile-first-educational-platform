import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../../utils/security/jwt.util';
import { prisma } from '../../config/database/prisma';
import { UnauthorizedError } from '../../utils/response/errors.util';

export async function authMiddleware(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedError('Token manquant ou invalide.');
    }
    const token = authHeader.split(' ')[1];
    const payload = verifyAccessToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, role: true, locale: true, emailVerifiedAt: true, status: true },
    });
    if (!user || user.status !== 'active') {
      throw new UnauthorizedError('Utilisateur introuvable ou inactif.');
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role as any,
      locale: user.locale,
      emailVerifiedAt: user.emailVerifiedAt,
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
