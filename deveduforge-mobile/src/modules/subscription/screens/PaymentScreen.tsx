import React, { useState, useCallback, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Linking,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Lock, CheckCircle, ExternalLink, RefreshCw, CreditCard } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Card } from '../../../shared/components/ui/display/Card';
import { Button } from '../../../shared/components/ui/input/Button';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { useCreateCheckoutSession, useMySubscription, useCreateCertificateCheckoutSession } from '../services/subscriptionService';
import type { ProfileStackParamList } from '../../../core/navigation/navigation.types';

type NavigationProp = NativeStackNavigationProp<ProfileStackParamList>;
type ScreenRouteProp = RouteProp<ProfileStackParamList, 'PaymentScreen'>;

type PaymentStatus = 'idle' | 'loading' | 'redirected' | 'success' | 'failure';

export default function PaymentScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { type = 'subscription', planId = '', planName = '', price = 0, certificateId = '', amountMad = 0, technologyName = '' } = route.params;

  const createCheckoutSession = useCreateCheckoutSession();
  const createCertificateCheckoutSession = useCreateCertificateCheckoutSession();
  const { data: subscription, refetch: refetchSubscription } = useMySubscription();

  const displayName = type === 'certificate' ? `Certificat ${technologyName}` : planName;
  const displayPrice = type === 'certificate' ? amountMad : price;

  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type === 'subscription') {
      if (subscription?.status === 'active') {
        setStatus('success');
      } else if (subscription?.status === 'pending') {
        setStatus('redirected');
      }
    }
  }, [subscription, type]);

  const handlePay = useCallback(async () => {
    setLoading(true);

    try {
      const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:4000';

      const successUrl = `${apiBaseUrl}/payment/success`;
      const cancelUrl = `${apiBaseUrl}/payment/cancel`;

      let result: { url: string | null; sessionId: string | null };

      if (type === 'certificate') {
        result = await createCertificateCheckoutSession.mutateAsync({
          certificateId,
          successUrl,
          cancelUrl,
        });
      } else {
        result = await createCheckoutSession.mutateAsync({
          planCode: planId,
          successUrl,
          cancelUrl,
        });
      }

      setLoading(false);

      if (!result.url) {
        if (type === 'subscription') {
          navigation.replace('PaymentSuccessScreen', {
            planName,
            startDate: new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }),
            nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }),
          });
        }
        return;
      }

      setCheckoutUrl(result.url);
      setStatus('redirected');

      if (Platform.OS === 'web') {
        window.open(result.url, '_blank');
      } else {
        await Linking.openURL(result.url);
      }
    } catch {
      setLoading(false);
      setStatus('failure');
    }
  }, [type, planId, planName, certificateId, navigation, createCheckoutSession, createCertificateCheckoutSession]);

  const checkStatus = useCallback(async () => {
    if (type !== 'subscription') return;
    setLoading(true);
    try {
      const { data: sub } = await refetchSubscription();
      setLoading(false);
      if (sub?.status === 'active') {
        setStatus('success');
        setTimeout(() => {
          navigation.replace('PaymentSuccessScreen', {
            planName,
            startDate: sub.startDate || new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }),
            nextBilling: sub.renewalDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }),
          });
        }, 600);
      } else {
        setStatus('redirected');
      }
    } catch {
      setLoading(false);
      setStatus('redirected');
    }
  }, [refetchSubscription, navigation, planName, type]);

  const handleRetry = useCallback(() => {
    setStatus('idle');
    setCheckoutUrl(null);
  }, []);

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite} statusBarStyle="dark">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <View style={styles.securityBadge}>
            <Lock size={14} color={colors.semantic.success} />
            <Text style={styles.securityText}>Paiement sécurisé via Stripe</Text>
          </View>
          <Text style={styles.headerTitle}>Finaliser le paiement</Text>
        </View>

        <Card style={styles.orderSummary}>
          <Text style={styles.summaryTitle}>Récapitulatif</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{displayName}</Text>
            <Text style={styles.summaryValue}>{displayPrice} MAD</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{displayPrice} MAD</Text>
          </View>
          {type === 'subscription' && <Text style={styles.renewalNote}>Renouvellement mensuel automatique</Text>}
        </Card>

        <View style={styles.paySection}>
          {status === 'redirected' && (
            <Card style={styles.redirectCard}>
              <ExternalLink size={24} color={colors.brand.navy} />
              <Text style={styles.redirectTitle}>Paiement en cours</Text>
              <Text style={styles.redirectText}>
                Stripe s'est ouvert dans une nouvelle fenêtre. Une fois le paiement effectué, revenez ici et cliquez sur "Vérifier le paiement".
              </Text>
              <Button
                variant="primary"
                size="md"
                fullWidth
                icon={RefreshCw}
                onPress={checkStatus}
                loading={loading}
              >
                Vérifier le paiement
              </Button>
            </Card>
          )}

          {status === 'failure' && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>
                Impossible de créer la session de paiement. Veuillez réessayer.
              </Text>
            </View>
          )}

          {status === 'success' && (
            <View style={styles.successBanner}>
              <CheckCircle size={18} color={colors.semantic.success} />
              <Text style={styles.successText}>Paiement réussi ! Redirection...</Text>
            </View>
          )}

          {(status === 'idle' || status === 'failure') && (
            <>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                icon={ExternalLink}
                loading={loading}
                onPress={handlePay}
              >
                Payer {displayPrice} MAD via Stripe
              </Button>
              {status === 'failure' && (
                <Button
                  variant="ghost"
                  size="md"
                  fullWidth
                  onPress={handleRetry}
                >
                  Réessayer
                </Button>
              )}
            </>
          )}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
    alignItems: 'center',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.semantic.successBg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    marginBottom: spacing.md,
  },
  securityText: {
    ...typography.bodySmall,
    color: colors.semantic.success,
    fontWeight: '600',
  },
  headerTitle: {
    ...typography.h1,
    color: colors.neutral.text,
    textAlign: 'center',
  },
  orderSummary: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  summaryTitle: {
    ...typography.label,
    color: colors.neutral.textMuted,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  summaryLabel: {
    ...typography.body,
    color: colors.neutral.text,
  },
  summaryValue: {
    ...typography.h3,
    color: colors.neutral.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral.border,
    marginVertical: spacing.sm,
  },
  totalLabel: {
    ...typography.h3,
    color: colors.neutral.text,
  },
  totalValue: {
    ...typography.h2,
    color: colors.brand.navy,
  },
  renewalNote: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  paySection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  redirectCard: {
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.xxl,
  },
  redirectTitle: {
    ...typography.h3,
    color: colors.neutral.text,
    textAlign: 'center',
  },
  redirectText: {
    ...typography.body,
    color: colors.neutral.textLight,
    textAlign: 'center',
  },
  errorBanner: {
    backgroundColor: colors.semantic.errorBg,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.semantic.error,
    textAlign: 'center',
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.semantic.successBg,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  successText: {
    ...typography.bodySmall,
    color: colors.semantic.success,
    flex: 1,
  },
  bottomSpacer: {
    height: spacing.huge,
  },
});
