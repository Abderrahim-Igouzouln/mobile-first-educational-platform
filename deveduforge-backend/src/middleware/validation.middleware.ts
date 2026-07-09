import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ValidationError } from '../utils/errors.util';

export function validationMiddleware(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      next(new ValidationError('Données invalides', result.error.flatten().fieldErrors));
      return;
    }
    req.body = result.data;
    next();
  };
}
