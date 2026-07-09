import 'dotenv/config';
import './types/express';
import { createServer } from './server';
import { prisma } from './config/database';
import { redis } from './config/redis';
import { logger } from './config/logger';
import { sentry } from './config/sentry';
import { environment } from './config/environment';

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
    await redis.quit();
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
