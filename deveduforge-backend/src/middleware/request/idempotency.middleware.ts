import { Request, Response, NextFunction } from 'express';
import { redis } from '../../config/database/redis';

export const idempotencyMiddleware = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  const key = req.headers['idempotency-key'] as string;
  if (!key || req.method !== 'POST') {
    next();
    return;
  }

  if (!redis) {
    next();
    return;
  }

  const cacheKey = `idempotency:${req.user?.id ?? 'anon'}:${key}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      const previousResponse = JSON.parse(cached);
      res.status(previousResponse.status).json(previousResponse.body);
      return;
    }

    const originalJson = res.json.bind(res);
    res.json = function (body: unknown) {
      if (res.statusCode < 400) {
        redis.setex(cacheKey, 86400, JSON.stringify({ status: res.statusCode, body }))
          .catch(() => {});
      }
      return originalJson(body);
    };

    next();
  } catch {
    next();
  }
};
