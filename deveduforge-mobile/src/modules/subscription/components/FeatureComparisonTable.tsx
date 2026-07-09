import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';

const PLANS = ['free', 'premium', 'premium_plus'] as const;
const PLAN_LABELS: Record<string, string> = {
  free: 'Gratuit',
  premium: 'Premium',
  premium_plus: 'Premium+',
};

interface FeatureRow {
  label: string;
  values: Record<string, boolean>;
}

const FEATURES: FeatureRow[] = [
  { label: 'Accès aux cours', values: { free: true, premium: true, premium_plus: true } },
  { label: 'Exercices pratiques', values: { free: true, premium: true, premium_plus: true } },
  { label: 'Statistiques avancées', values: { free: false, premium: true, premium_plus: true } },
  { label: 'Support prioritaire', values: { free: false, premium: true, premium_plus: true } },
  { label: 'Certifications', values: { free: false, premium: false, premium_plus: true } },
  { label: 'Projets tutorés', values: { free: false, premium: false, premium_plus: true } },
];

export const FeatureComparisonTable: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comparaison des formules</Text>

      <View style={styles.table}>
        <View style={styles.headerRow}>
          <View style={styles.headerLabelCell}>
            <Text style={styles.headerLabel}>Fonctionnalités</Text>
          </View>
          {PLANS.map((plan) => {
            const isHighlighted = plan === 'premium_plus';
            return (
              <View key={plan} style={[styles.headerCell, isHighlighted && styles.headerCellHighlighted]}>
                <Text style={[styles.headerText, isHighlighted && styles.headerTextHighlighted]}>
                  {PLAN_LABELS[plan]}
                </Text>
              </View>
            );
          })}
        </View>

        {FEATURES.map((feature, index) => (
          <View key={index} style={[styles.row, index % 2 === 1 && styles.rowAlt]}>
            <View style={styles.labelCell}>
              <Text style={styles.label}>{feature.label}</Text>
            </View>
            {PLANS.map((plan) => {
              const isHighlighted = plan === 'premium_plus';
              return (
                <View key={plan} style={[styles.cell, isHighlighted && styles.cellHighlighted]}>
                  {feature.values[plan] ? (
                    <View style={styles.checkCircle}>
                      <Check size={14} color={colors.neutral.surface} />
                    </View>
                  ) : (
                    <View style={styles.emptyCircle} />
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.xxl,
    paddingHorizontal: spacing.xxl,
  },
  title: {
    ...typography.h2,
    color: colors.brand.navy,
    marginBottom: spacing.lg,
    textAlign: 'center',
    fontSize: 20,
  },
  table: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.neutral.border,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: colors.brand.navy,
    paddingVertical: spacing.lg,
  },
  headerLabelCell: {
    flex: 2,
    paddingLeft: spacing.lg,
    justifyContent: 'center',
  },
  headerLabel: {
    ...typography.label,
    color: colors.neutral.surface,
    fontSize: 13,
    letterSpacing: 0.5,
  },
  headerCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCellHighlighted: {
    backgroundColor: colors.brand.orange,
  },
  headerText: {
    ...typography.label,
    color: colors.neutral.surface,
    fontSize: 13,
    fontWeight: '600',
  },
  headerTextHighlighted: {
    fontWeight: '800',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: spacing.md + 2,
    backgroundColor: colors.neutral.surface,
  },
  rowAlt: {
    backgroundColor: colors.brand.offWhite,
  },
  labelCell: {
    flex: 2,
    paddingLeft: spacing.lg,
    justifyContent: 'center',
  },
  label: {
    ...typography.body,
    color: colors.neutral.text,
    fontSize: 14,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellHighlighted: {
    backgroundColor: 'rgba(230,81,0,0.04)',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.semantic.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.neutral.borderDark,
  },
});
