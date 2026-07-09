import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Check, Crown, Star } from 'lucide-react-native';
import { Button } from '../../../shared/components/ui/Button';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import type { Plan } from '../subscription.types';

interface PlanCardProps {
  plan: Plan;
  isCurrent?: boolean;
  isHighlighted?: boolean;
  onSelect: (plan: Plan) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, isCurrent, isHighlighted, onSelect }) => {
  const isFree = plan.id === 'free';

  const containerStyle: ViewStyle = {
    ...styles.card,
    ...(isHighlighted ? styles.cardHighlighted : {}),
    ...(isCurrent && !isHighlighted ? styles.cardCurrent : {}),
  };

  const nameColor = isHighlighted ? colors.neutral.surface : colors.brand.navy;
  const priceColor = isHighlighted ? colors.neutral.surface : colors.brand.navy;
  const periodColor = isHighlighted ? colors.neutral.surface : colors.neutral.textMuted;
  const featureColor = isHighlighted ? colors.neutral.surface : colors.neutral.text;

  return (
    <View style={containerStyle}>
      {isHighlighted && (
        <View style={styles.popularBadge}>
          <Crown size={14} color={colors.brand.navy} />
          <Text style={styles.popularText}>Populaire</Text>
        </View>
      )}
      {isCurrent && !isHighlighted && (
        <View style={styles.currentBadge}>
          <Text style={styles.currentBadgeText}>Actuel</Text>
        </View>
      )}

      <Text style={[styles.planName, { color: nameColor }]}>{plan.name}</Text>

      <View style={styles.priceRow}>
        <Text style={[styles.price, { color: priceColor }]}>
          {plan.price === 0 ? 'Gratuit' : `${plan.price} ${plan.currency}`}
        </Text>
        {plan.price > 0 && (
          <Text style={[styles.period, { color: periodColor }]}>/{plan.period}</Text>
        )}
      </View>

      <View style={styles.features}>
        {plan.features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <View style={[styles.checkCircle, isHighlighted && styles.checkCircleHighlighted]}>
              <Check size={12} color={isHighlighted ? colors.brand.navy : colors.neutral.surface} />
            </View>
            <Text style={[styles.featureText, { color: featureColor }]}>{feature}</Text>
          </View>
        ))}
      </View>

      {!isCurrent && (
        <Button
          variant={isHighlighted ? 'primary' : 'outline'}
          size="md"
          fullWidth
          onPress={() => onSelect(plan)}
        >
          {isFree ? 'Commencer gratuitement' : 'Choisir ce plan'}
        </Button>
      )}

      {isCurrent && (
        <View style={styles.currentLabel}>
          <Star size={16} color={isHighlighted ? colors.brand.orange : colors.brand.orange} />
          <Text style={[styles.currentLabelText, { color: isHighlighted ? colors.neutral.surface : colors.neutral.textLight }]}>
            Plan actuel
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 280,
    backgroundColor: colors.neutral.surface,
    borderRadius: 20,
    padding: spacing.xxl,
    marginRight: spacing.lg,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  },
  cardHighlighted: {
    backgroundColor: colors.brand.navy,
    borderWidth: 2,
    borderColor: colors.brand.orange,
    boxShadow: '0 8px 24px rgba(230,81,0,0.2)',
  },
  cardCurrent: {
    borderWidth: 1.5,
    borderColor: colors.brand.orange,
  },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand.orange,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
    marginBottom: spacing.lg,
    gap: spacing.xs,
  },
  popularText: {
    ...typography.label,
    color: colors.neutral.surface,
    fontSize: 12,
    fontWeight: '700',
  },
  currentBadge: {
    backgroundColor: colors.brand.orange,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
    marginBottom: spacing.lg,
  },
  currentBadgeText: {
    ...typography.label,
    color: colors.neutral.surface,
    fontSize: 12,
    fontWeight: '700',
  },
  planName: {
    ...typography.h2,
    fontSize: 22,
    marginBottom: spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.xxl,
  },
  price: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '800',
  },
  period: {
    ...typography.body,
    fontSize: 16,
    marginLeft: spacing.xs,
  },
  features: {
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.semantic.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleHighlighted: {
    backgroundColor: colors.brand.orange,
  },
  featureText: {
    ...typography.body,
    fontSize: 14,
    flex: 1,
  },
  currentLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(230,81,0,0.2)',
    marginTop: spacing.sm,
  },
  currentLabelText: {
    ...typography.label,
    fontSize: 13,
    fontWeight: '600',
  },
});
