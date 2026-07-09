import { Request, Response, NextFunction } from 'express';
import { redis } from '../config/redis';

const MAINTENANCE_KEY = 'app:maintenance';
const MAINTENANCE_CACHE_TTL = 30;

let cachedMaintenance: { enabled: boolean; message?: string } | null = null;
let lastFetch = 0;

async function getMaintenanceStatus(): Promise<{ enabled: boolean; message?: string }> {
  const now = Date.now();
  if (cachedMaintenance && now - lastFetch < MAINTENANCE_CACHE_TTL * 1000) {
    return cachedMaintenance;
  }

  try {
    if (redis) {
      const raw = await redis.get(MAINTENANCE_KEY);
      if (raw) {
        cachedMaintenance = JSON.parse(raw);
        lastFetch = now;
        return cachedMaintenance!;
      }
    }
  } catch {}

  cachedMaintenance = { enabled: false };
  lastFetch = now;
  return cachedMaintenance;
}

export const maintenanceModeMiddleware = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const maintenance = await getMaintenanceStatus();

    if (maintenance.enabled) {
      const adminRoutes = ['/api/v1/admin'];
      const isAdmin = req.user?.role === 'admin' || req.user?.role === 'superadmin';
      const isAdminPath = adminRoutes.some(route => req.path.startsWith(route));

      if (isAdmin && isAdminPath) {
        next();
        return;
      }

      res.status(503).json({
        success: false,
        error: {
          code: 'MAINTENANCE_MODE',
          message: maintenance.message ?? 'Application en maintenance. Veuillez réessayer plus tard.',
        },
      });
      return;
    }

    next();
  } catch {
    next();
  }
};
