import cors from 'cors';
import { corsConfig } from '../../config/security/cors';

export const corsMiddleware = cors({
  origin: corsConfig.allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Idempotency-Key'],
  maxAge: 86400,
});
