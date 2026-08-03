import { PrismaClient } from '@prisma/client';

const poolMax = parseInt(process.env.DATABASE_POOL_MAX || '20', 10);

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'warn', 'error']
    : ['warn', 'error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
        ? `${process.env.DATABASE_URL}${process.env.DATABASE_URL.includes('?') ? '&' : '?'}connection_limit=${poolMax}`
        : undefined,
    },
  },
});
