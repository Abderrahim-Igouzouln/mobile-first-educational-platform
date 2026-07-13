import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import * as paymentEndpoints from '../../../core/api/endpoints/payment.endpoints';
import type { Plan, CurrentSubscription } from '../subscription.types';

const parseFeatures = (features: unknown): string[] => {
  if (Array.isArray(features)) return features as string[];
  if (typeof features === 'string') {
    try { features = JSON.parse(features); } catch { return []; }
  }
  if (features && typeof features === 'object') {
    const obj = features as Record<string, unknown>;
    const labels: Record<string, string> = {
      maxCourses: 'Cours',
      maxExercises: 'Exercices',
      maxProjects: 'Projets',
      certificates: 'Certificats',
      premiumSupport: 'Support premium',
    };
    return Object.entries(obj)
      .filter(([k, v]) => k.startsWith('max') || !!v)
      .map(([k, v]) => {
        if (k.startsWith('max') && (v === -1 || v === '-1')) return `${labels[k] || k.replace('max', '')} illimités`;
        if (k.startsWith('max')) return `${labels[k] || k.replace('max', '')}: ${v} maximum`;
        return labels[k] || k;
      });
  }
  return [];
};

const mapPlan = (p: paymentEndpoints.Plan): Plan => ({
  id: p.code as Plan['id'],
  name: p.name,
  price: Number(p.priceMad),
  currency: 'MAD',
  period: p.billingInterval === 'monthly' ? 'mois' : p.billingInterval === 'annual' ? 'an' : '',
  features: parseFeatures(p.features),
  isPopular: false,
});

const mapSubscription = (s: paymentEndpoints.Subscription): CurrentSubscription => ({
  planId: s.plan.code as Plan['id'],
  planName: s.plan.name,
  status: s.status === 'active' ? 'active' : s.status === 'pending' ? 'pending' : s.status === 'canceled' ? 'cancelled' : s.status === 'expired' ? 'expired' : 'none',
  price: Number(s.plan.priceMad),
  currency: 'MAD',
  renewalDate: s.currentPeriodEnd,
  startDate: s.currentPeriodStart,
});

export const usePlans = () =>
  useQuery({
    queryKey: [...queryKeys.user.all, 'plans'],
    queryFn: async () => {
      const data = await paymentEndpoints.getPlans();
      return data.map(mapPlan);
    },
  });

export const useMySubscription = () =>
  useQuery({
    queryKey: queryKeys.user.subscription(),
    queryFn: async (): Promise<CurrentSubscription | null> => {
      const data = await paymentEndpoints.getMySubscription();
      if (!data) return null;
      return mapSubscription(data);
    },
  });

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (planCode: string) => paymentEndpoints.createSubscription(planCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.subscription() });
    },
  });
};

export const useCreateCheckoutSession = () =>
  useMutation({
    mutationFn: (data: { planCode: string; successUrl: string; cancelUrl: string }) =>
      paymentEndpoints.createCheckoutSession(data),
  });

export const useCreateCertificateCheckoutSession = () =>
  useMutation({
    mutationFn: (data: { certificateId: string; successUrl: string; cancelUrl: string }) =>
      paymentEndpoints.createCertificateCheckoutSession(data),
  });

export const useGetPayments = () =>
  useQuery({
    queryKey: [...queryKeys.user.all, 'payments'],
    queryFn: () => paymentEndpoints.getPayments(),
  });

export const useGetInvoices = () =>
  useQuery({
    queryKey: [...queryKeys.user.all, 'invoices'],
    queryFn: () => paymentEndpoints.getInvoices(),
  });
