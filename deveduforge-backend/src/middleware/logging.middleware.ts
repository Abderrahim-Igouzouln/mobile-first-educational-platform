import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

export function loggingMiddleware(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();
  res.on('finish', () => {
    logger.info('HTTP Request', {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: Date.now() - start,
      requestId: (req as any).requestId,
    });
  });
  next();
}
