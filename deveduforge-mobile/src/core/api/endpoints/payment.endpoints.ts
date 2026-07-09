import { apiClient } from '../apiClient';
import type { ApiResponse } from '../api.types';

export interface Plan {
  id: string;
  code: string;
  name: string;
  priceMad: string;
  billingInterval: 'monthly' | 'annual' | 'none';
  features: unknown;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  plan: Plan;
  status: 'active' | 'past_due' | 'canceled' | 'expired' | 'pending';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  paymentProvider: string;
  providerSubscriptionId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutSession {
  url: string | null;
  sessionId: string | null;
}

export interface Payment {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'refunded';
  providerPaymentId: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  number: string;
  paymentId: string;
  pdfUrl?: string;
  issuedAt: string;
}

export const getPlans = async (): Promise<Plan[]> => {
  const response = await apiClient.get<ApiResponse<Plan[]>>('/payments/plans');
  return response.data.data;
};

export const getPlanByCode = async (code: string): Promise<Plan> => {
  const response = await apiClient.get<ApiResponse<Plan>>(`/payments/plans/${code}`);
  return response.data.data;
};

export const createSubscription = async (planCode: string): Promise<Subscription> => {
  const response = await apiClient.post<ApiResponse<Subscription>>('/payments/subscriptions', { planCode });
  return response.data.data;
};

export const getMySubscription = async (): Promise<Subscription | null> => {
  const response = await apiClient.get<ApiResponse<Subscription | null>>('/payments/subscriptions/me');
  return response.data.data;
};

export const createCheckoutSession = async (data: { planCode: string; successUrl: string; cancelUrl: string }): Promise<CheckoutSession> => {
  const response = await apiClient.post<ApiResponse<CheckoutSession>>('/payments/create-checkout-session', data);
  return response.data.data;
};

export const getPayments = async (): Promise<Payment[]> => {
  const response = await apiClient.get<ApiResponse<Payment[]>>('/payments/payments');
  return response.data.data;
};

export const getInvoices = async (): Promise<Invoice[]> => {
  const response = await apiClient.get<ApiResponse<Invoice[]>>('/payments/invoices');
  return response.data.data;
};
