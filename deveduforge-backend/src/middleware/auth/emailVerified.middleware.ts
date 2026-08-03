import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../../utils/response/errors.util';

export const requireEmailVerified = (
  req: Request, _res: Response, next: NextFunction
): void => {
  if (!req.user) {
    next(new ForbiddenError('Authentification requise'));
    return;
  }

  if (!req.user.emailVerifiedAt) {
    next(new ForbiddenError(
      'Vérification d\'email requise. Veuillez vérifier votre boîte de réception.'
    ));
    return;
  }

  next();
};
