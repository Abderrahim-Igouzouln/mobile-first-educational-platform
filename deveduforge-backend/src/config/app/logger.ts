import winston from 'winston';

const sensitiveFields = ['password', 'token', 'accessToken', 'refreshToken', 'cardNumber', 'cvv', 'secret'];

const sanitize = winston.format((info) => {
  const sanitized = { ...info };
  const redact = (obj: Record<string, unknown>): Record<string, unknown> => {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (sensitiveFields.some((f) => key.toLowerCase().includes(f.toLowerCase()))) {
        result[key] = '[REDACTED]';
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        result[key] = redact(value as Record<string, unknown>);
      } else {
        result[key] = value;
      }
    }
    return result;
  };
  return redact(sanitized) as winston.Logform.TransformableInfo;
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    sanitize(),
    winston.format.timestamp(),
    winston.format.json(),
  ),
  defaultMeta: { service: 'deveduforge-api' },
  transports: [
    new winston.transports.Console({
      format: process.env.NODE_ENV === 'development'
        ? winston.format.combine(winston.format.colorize(), winston.format.simple())
        : winston.format.json(),
    }),
  ],
});
