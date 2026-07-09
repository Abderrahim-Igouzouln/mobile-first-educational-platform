import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors.util';
import { sendError } from '../utils/apiResponse.util';
import { logger } from '../config/logger';

export function errorHandlerMiddleware(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError && err.isOperational) {
    sendError(res, err);
    return;
  }

  logger.error('Unhandled error', {
    requestId: (req as any).requestId,
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  sendError(
    res,
    new AppError(500, 'INTERNAL_ERROR', 'Une erreur interne est survenue.'),
  );
}
