import rateLimit from 'express-rate-limit';

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: { code: 'RATE_LIMIT', message: 'Trop de tentatives, réessayez plus tard.' } },
  standardHeaders: true,
  legacyHeaders: false,
});

export const emailRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: { success: false, error: { code: 'RATE_LIMIT', message: 'Trop de demandes, réessayez plus tard.' } },
  standardHeaders: true,
  legacyHeaders: false,
});

export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: { code: 'RATE_LIMIT', message: 'Trop de requêtes, réessayez plus tard.' } },
  standardHeaders: true,
  legacyHeaders: false,
});
