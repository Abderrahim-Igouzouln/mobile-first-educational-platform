import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => {
    if (times > 5) return null;
    return Math.min(times * 200, 2000);
  },
  tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
  lazyConnect: true,
});

redis.on('error', () => {
  // Redis unavailable — caching will be disabled
});
