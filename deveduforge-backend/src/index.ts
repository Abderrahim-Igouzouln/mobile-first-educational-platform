import 'dotenv/config';
import './types/express';
import { createServer } from './server';
import { prisma } from './config/database/prisma';
import { redis } from './config/database/redis';
import { logger } from './config/app/logger';
import { sentry } from './config/app/sentry';
import { environment } from './config/app/environment';

async function bootstrap(): Promise<void> {
  logger.info('Starting DevEduForge API', {
    environment: environment.NODE_ENV,
    version: environment.APP_VERSION,
  });

  try {
    await prisma.$connect();
    logger.info('Database connection established');
  } catch (error) {
    logger.error('Failed to connect to database', { error });
    process.exit(1);
  }

  try {
    await redis.ping();
    logger.info('Redis connection established');
  } catch (error) {
    logger.warn('Redis connection failed — caching disabled', { error });
  }

  const app = createServer();

  const server = app.listen(environment.PORT, () => {
    logger.info(`Server listening on port ${environment.PORT}`);
  });

  const shutdown = async (signal: string) => {
    logger.info(`${signal} received — shutting down gracefully`);
    server.close(() => {
      logger.info('HTTP server closed');
    });
    await prisma.$disconnect();
    try { await redis.quit(); } catch { /* Redis not connected */ }
    process.exit(0);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch((error) => {
  logger.error('Fatal error during bootstrap', { error });
  sentry.captureException(error);
  process.exit(1);
});
