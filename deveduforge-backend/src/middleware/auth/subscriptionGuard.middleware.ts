import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/database/prisma';
import { ForbiddenError } from '../../utils/response/errors.util';

export interface SubscriptionGuardOptions {
  requiredPlan?: 'PREMIUM' | 'PREMIUM_PLUS';
}

export const subscriptionGuard = (options: SubscriptionGuardOptions = {}) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user?.id) {
        next(new ForbiddenError('Authentification requise'));
        return;
      }

      const subscription = await prisma.userSubscription.findUnique({
        where: { userId: req.user.id },
        include: { plan: true },
      });

      if (!subscription || subscription.status !== 'active') {
        next(new ForbiddenError('Abonnement actif requis'));
        return;
      }

      if (options.requiredPlan) {
        const planHierarchy: Record<string, number> = {
          FREE: 0,
          PREMIUM: 1,
          PREMIUM_PLUS: 2,
        };

        const planCode = subscription.plan.code.toUpperCase();
        const userLevel = planHierarchy[planCode] ?? 0;
        const requiredLevel = planHierarchy[options.requiredPlan] ?? 1;

        if (userLevel < requiredLevel) {
          next(new ForbiddenError(
            `Plan ${options.requiredPlan} requis. Plan actuel : ${subscription.plan.code}`
          ));
          return;
        }
      }

      next();
    } catch (err) {
      next(err);
    }
  };

export const subscriptionGuardMiddleware = subscriptionGuard;
