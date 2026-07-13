import { Request, Response, NextFunction } from 'express';
import { Role } from '../../constants/roles';
import { ForbiddenError } from '../../utils/response/errors.util';

export function ownershipMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const resourceUserId = req.params.userId || req.body.userId;
  if (resourceUserId && req.user && req.user.id !== resourceUserId && req.user.role !== Role.ADMIN && req.user.role !== Role.SUPERADMIN) {
    next(new ForbiddenError('Vous n\'êtes pas autorisé à modifier cette ressource.'));
    return;
  }
  next();
}
