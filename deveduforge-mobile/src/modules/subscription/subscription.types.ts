export type PlanId = 'free' | 'premium' | 'premium_plus';
export type SubscriptionStatus = 'active' | 'pending' | 'cancelled' | 'expired' | 'none';

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  currency: string;
  period: string;
  features: string[];
  isPopular?: boolean;
}

export interface CurrentSubscription {
  planId: PlanId;
  planName: string;
  status: SubscriptionStatus;
  price: number;
  currency: string;
  renewalDate?: string;
  startDate?: string;
}
