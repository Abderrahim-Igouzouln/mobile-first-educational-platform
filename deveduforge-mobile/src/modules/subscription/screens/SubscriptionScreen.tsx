import React, { useCallback } from 'react';
import { ScrollView, View, Text, FlatList, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Shield, XCircle, CreditCard, Zap, Clock, ArrowRight } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { LoadingSpinner } from '../../../shared/components/ui/LoadingSpinner';
import { FeatureComparisonTable } from '../components/FeatureComparisonTable';
import { PlanCard } from '../components/PlanCard';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { usePlans, useMySubscription } from '../services/subscriptionService';
import type { ProfileStackParamList } from '../../../core/navigation/navigation.types';
import type { Plan } from '../subscription.types';

type NavigationProp = NativeStackNavigationProp<ProfileStackParamList>;

export default function SubscriptionScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { data: plans = [], isLoading: plansLoading } = usePlans();
  const { data: currentPlan, isLoading: subLoading } = useMySubscription();

  const handleSelectPlan = useCallback(
    (plan: Plan) => {
      if (plan.id === 'free') return;
      navigation.navigate('PaymentScreen', {
        planId: plan.id,
        planName: plan.name,
        price: plan.price,
      });
    },
    [navigation],
  );

  const renderPlanCard = useCallback(
    ({ item }: { item: Plan }) => (
      <PlanCard
        plan={item}
        isCurrent={item.id === currentPlan?.planId}
        isHighlighted={item.id === 'premium_plus'}
        onSelect={handleSelectPlan}
      />
    ),
    [currentPlan?.planId, handleSelectPlan],
  );

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite} statusBarStyle="dark">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <View style={styles.headerAccent} />
          <Text style={styles.headerTitle}>Choisissez votre formule</Text>
          <Text style={styles.headerSubtitle}>
            Accédez à tous les outils pour maîtriser le développement web et décrochez vos
            certifications.
          </Text>
        </View>

        <View style={styles.currentPlanCard}>
          <View style={styles.currentPlanAccent} />
          <View style={styles.currentPlanBody}>
            <Text style={styles.currentPlanTitle}>Abonnement Actuel</Text>
            {subLoading ? (
              <LoadingSpinner />
            ) : currentPlan?.status === 'pending' ? (
              <View style={styles.currentPlanDetails}>
                <View style={styles.currentPlanInfo}>
                  <Text style={styles.currentPlanName}>{currentPlan.planName}</Text>
                  <Text style={styles.currentPlanStatusPending}>En attente</Text>
                </View>
                <Text style={styles.currentPlanPrice}>
                  {currentPlan.price} {currentPlan.currency}/mois
                </Text>
                <Text style={styles.pendingNote}>
                  Paiement en cours de traitement.
                </Text>
                <View style={styles.pendingAction}>
                  <Text style={styles.pendingActionLabel} numberOfLines={2}>
                    Vous avez fermé la page Stripe ? Reprenez le paiement.
                  </Text>
                  <Text
                    style={styles.retryLink}
                    onPress={() =>
                      navigation.navigate('PaymentScreen', {
                        planId: currentPlan.planId,
                        planName: currentPlan.planName,
                        price: currentPlan.price,
                      })
                    }
                  >
                    Reprendre le paiement
                    <ArrowRight size={14} color={colors.brand.orange} />
                  </Text>
                </View>
              </View>
            ) : currentPlan && currentPlan.price > 0 ? (
              <View style={styles.currentPlanDetails}>
                <View style={styles.currentPlanInfo}>
                  <Text style={styles.currentPlanName}>{currentPlan.planName}</Text>
                  <Text style={styles.currentPlanStatus}>Actif</Text>
                </View>
                <Text style={styles.currentPlanPrice}>
                  {currentPlan.price} {currentPlan.currency}/mois
                </Text>
                {currentPlan.renewalDate && (
                  <Text style={styles.currentPlanRenewal}>
                    Prochain renouvellement : {currentPlan.renewalDate}
                  </Text>
                )}
              </View>
            ) : (
              <View style={styles.noSubscription}>
                <XCircle size={24} color={colors.neutral.textMuted} />
                <Text style={styles.noSubscriptionText}>Aucun abonnement actif</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.plansSection}>
          {plansLoading ? (
            <View style={styles.plansLoading}>
              <LoadingSpinner size="large" />
            </View>
          ) : (
            <FlatList
              data={plans}
              renderItem={renderPlanCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.plansList}
              snapToInterval={312}
              decelerationRate="fast"
            />
          )}
        </View>

        <FeatureComparisonTable />

        <View style={styles.notesCard}>
          <Zap size={20} color={colors.brand.orange} />
          <View style={styles.notesContent}>
            <View style={styles.noteRow}>
              <Shield size={16} color={colors.semantic.success} />
              <Text style={styles.noteText}>Paiement sécurisé via Stripe</Text>
            </View>
            <View style={styles.noteDivider} />
            <View style={styles.noteRow}>
              <CreditCard size={16} color={colors.brand.orange} />
              <Text style={styles.noteText}>Annulation à tout moment</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xl,
  },
  headerAccent: {
    width: 40,
    height: 4,
    backgroundColor: colors.brand.orange,
    borderRadius: 2,
    marginBottom: spacing.lg,
  },
  headerTitle: {
    ...typography.display,
    fontSize: 28,
    color: colors.brand.navy,
    marginBottom: spacing.sm,
  },
  headerSubtitle: {
    ...typography.body,
    color: colors.neutral.textLight,
    lineHeight: 24,
  },
  currentPlanCard: {
    flexDirection: 'row',
    marginHorizontal: spacing.xxl,
    marginBottom: spacing.xxl,
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.lg,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    overflow: 'hidden',
  },
  currentPlanAccent: {
    width: 4,
    backgroundColor: colors.brand.orange,
  },
  currentPlanBody: {
    flex: 1,
    padding: spacing.xl,
  },
  currentPlanTitle: {
    ...typography.label,
    color: colors.neutral.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.md,
  },
  currentPlanDetails: {
    gap: spacing.xs,
  },
  currentPlanInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currentPlanName: {
    ...typography.h2,
    color: colors.brand.navy,
  },
  currentPlanStatus: {
    ...typography.label,
    color: colors.neutral.surface,
    backgroundColor: colors.semantic.success,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
    overflow: 'hidden',
    fontWeight: '700',
    fontSize: 12,
  },
  currentPlanStatusPending: {
    ...typography.label,
    color: colors.neutral.surface,
    backgroundColor: '#d97706',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
    overflow: 'hidden',
    fontWeight: '700',
    fontSize: 12,
  },
  pendingNote: {
    ...typography.bodySmall,
    color: '#d97706',
    marginTop: spacing.xs,
  },
  pendingAction: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
    gap: spacing.xs,
  },
  pendingActionLabel: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
  },
  retryLink: {
    ...typography.body,
    color: colors.brand.orange,
    fontWeight: '600',
  },
  currentPlanPrice: {
    ...typography.h3,
    color: colors.neutral.textLight,
    fontSize: 18,
  },
  currentPlanRenewal: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    marginTop: spacing.xs,
  },
  noSubscription: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  noSubscriptionText: {
    ...typography.body,
    color: colors.neutral.textMuted,
  },
  plansSection: {
    marginBottom: spacing.md,
  },
  plansLoading: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
  },
  plansList: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.sm,
  },
  notesCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: spacing.xxl,
    marginTop: spacing.xxl,
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    gap: spacing.md,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  notesContent: {
    flex: 1,
    gap: spacing.md,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  noteDivider: {
    height: 1,
    backgroundColor: colors.neutral.border,
  },
  noteText: {
    ...typography.body,
    color: colors.neutral.text,
    fontSize: 14,
  },
  bottomSpacer: {
    height: spacing.huge + spacing.xxl,
  },
});
