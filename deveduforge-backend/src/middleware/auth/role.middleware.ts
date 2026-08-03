import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../../utils/response/errors.util';
import { Role } from '../../constants/roles';

const roleHierarchy: Record<string, number> = {
  [Role.GUEST]: 0,
  [Role.STUDENT]: 1,
  [Role.INSTRUCTOR]: 2,
  [Role.MODERATOR]: 3,
  [Role.ADMIN]: 4,
  [Role.SUPERADMIN]: 5,
};

export function roleMiddleware(...allowedRoles: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new ForbiddenError('Authentification requise.'));
      return;
    }
    const userLevel = roleHierarchy[req.user.role] ?? -1;
    const minLevel = Math.min(...allowedRoles.map((r) => roleHierarchy[r] ?? -1));
    if (userLevel < minLevel) {
      next(new ForbiddenError('Vous n\'avez pas les droits nécessaires.'));
      return;
    }
    next();
  };
}
