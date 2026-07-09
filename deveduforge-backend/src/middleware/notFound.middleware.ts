import { Request, Response } from 'express';

export function notFoundMiddleware(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Ressource non trouvée',
    },
    meta: {
      requestId: (req as any).requestId || '',
      timestamp: new Date().toISOString(),
    },
  });
}
