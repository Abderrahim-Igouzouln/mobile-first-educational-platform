import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { helmetMiddleware } from './middleware/security/helmet.middleware';
import { corsMiddleware } from './middleware/security/cors.middleware';
import { compressionMiddleware } from './middleware/performance/compression.middleware';
import { requestIdMiddleware } from './middleware/request/requestId.middleware';
import { loggingMiddleware } from './middleware/request/logging.middleware';
import { sanitizeMiddleware } from './middleware/security/sanitize.middleware';
import { globalRateLimiter } from './middleware/security/rateLimiter.middleware';
import { errorHandlerMiddleware } from './middleware/error/errorHandler.middleware';
import { notFoundMiddleware } from './middleware/error/notFound.middleware';
import { routes } from './modules/routes';
import { swaggerSpec } from './config/integrations/swagger';
import { handleStripeWebhook } from './modules/payment/payment.controller';

export function createApp(): express.Application {
  const app = express();

  app.use(helmetMiddleware);
  app.use(corsMiddleware);
  app.use(compressionMiddleware);

  app.get('/health', (_req, res) => {
    res.json({ success: true, data: { status: 'ok', timestamp: new Date().toISOString(), uptime: process.uptime() } });
  });

  app.use('/api/v1/payments/webhooks/stripe', express.raw({ type: 'application/json' }), handleStripeWebhook);

  app.use(express.json({ limit: '1mb' }));
  app.use(requestIdMiddleware);
  app.use(sanitizeMiddleware);
  app.use(loggingMiddleware);
  app.use(globalRateLimiter);

  if (process.env.NODE_ENV !== 'production') {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
    app.use('/api/docs.json', (_req, res) => { res.setHeader('Content-Type', 'application/json'); res.json(swaggerSpec); });
  }

  app.get('/payment/success', (_req, res) => {
    res.send(`<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Paiement réussi - DevEduForge</title><style>body{font-family:sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;background:#f5f5f5}.card{background:#fff;border-radius:16px;padding:48px;text-align:center;box-shadow:0 4px 24px rgba(0,0,0,.1)}.check{width:64px;height:64px;border-radius:50%;background:#16a34a;display:flex;align-items:center;justify-content:center;margin:0 auto 24px;color:#fff;font-size:32px}h1{color:#00205B;margin:0 0 8px}p{color:#6b7280;margin:0 0 24px}.btn{display:inline-block;padding:12px 32px;background:#E65100;color:#fff;text-decoration:none;border-radius:8px;font-weight:600}</style></head><body><div class="card"><div class="check">&#10003;</div><h1>Paiement réussi !</h1><p>Votre abonnement est maintenant actif.<br>Vous pouvez fermer cette page et retourner à l'application.</p><a class="btn" href="/">Retour à l'accueil</a></div></body></html>`);
  });
  app.get('/payment/cancel', (_req, res) => {
    res.send(`<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Paiement annulé - DevEduForge</title><style>body{font-family:sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;background:#f5f5f5}.card{background:#fff;border-radius:16px;padding:48px;text-align:center;box-shadow:0 4px 24px rgba(0,0,0,.1)}.icon{width:64px;height:64px;border-radius:50%;background:#ef4444;display:flex;align-items:center;justify-content:center;margin:0 auto 24px;color:#fff;font-size:32px}h1{color:#00205B;margin:0 0 8px}p{color:#6b7280;margin:0 0 24px}.btn{display:inline-block;padding:12px 32px;background:#E65100;color:#fff;text-decoration:none;border-radius:8px;font-weight:600}</style></head><body><div class="card"><div class="icon">&#10007;</div><h1>Paiement annulé</h1><p>Vous avez annulé le paiement.<br>Vous pouvez réessayer depuis l'application.</p><a class="btn" href="/">Retour à l'accueil</a></div></body></html>`);
  });

  const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
  app.use('/uploads', express.static(uploadDir));

  app.use('/api/v1', routes);

  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  return app;
}
