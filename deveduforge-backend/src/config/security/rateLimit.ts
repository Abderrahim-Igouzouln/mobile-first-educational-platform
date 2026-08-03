import rateLimit from 'express-rate-limit';

export const rateLimitConfig = {
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  maxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  authMax: Number(process.env.RATE_LIMIT_AUTH_MAX) || 5,
};

export const contentRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  keyGenerator: (req) => req.user?.id ?? req.ip ?? 'anonymous',
  message: {
    success: false,
    error: { code: 'TOO_MANY_REQUESTS', message: 'Trop de requêtes. Veuillez ralentir.' },
  },
  skip: (req) => req.user?.role === 'admin' || req.user?.role === 'superadmin',
});

export const downloadRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  keyGenerator: (req) => req.user?.id ?? req.ip ?? 'anonymous',
  message: {
    success: false,
    error: { code: 'DOWNLOAD_LIMIT', message: 'Limite de téléchargement atteinte. Réessayez dans 1 heure.' },
  },
});
