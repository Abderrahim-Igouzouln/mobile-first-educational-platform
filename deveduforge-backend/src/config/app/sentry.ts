import { logger } from './logger';

const sentryDsn = process.env.SENTRY_DSN || '';

export const sentry = {
  captureException: (error: unknown): void => {
    if (sentryDsn) {
      // Sentry.init({ dsn: sentryDsn, environment: process.env.SENTRY_ENVIRONMENT });
      // Sentry.captureException(error);
    }
    logger.warn('Unhandled exception captured', { err: error });
  },
};
