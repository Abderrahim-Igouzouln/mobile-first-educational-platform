import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import type { StatItem } from '../home.types';

interface StatsWidgetProps {
  stats: StatItem[];
}

export const StatsWidget: React.FC<StatsWidgetProps> = ({ stats }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Statistiques</Text>
      <View style={styles.grid}>
        {stats.map((stat) => (
          <View key={stat.id} style={styles.statCard}>
            <View style={styles.statRow}>
              <Text
                style={[
                  styles.statValue,
                  stat.isHighlighted && { color: colors.brand.orange },
                ]}
              >
                {stat.value}
              </Text>
              {stat.suffix ? (
                <Text
                  style={[
                    styles.statSuffix,
                    stat.isHighlighted && { color: colors.brand.orange },
                  ]}
                >
                  {stat.suffix}
                </Text>
              ) : null}
            </View>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.xxl,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.neutral.text,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.xs,
  },
  statValue: {
    ...typography.h1,
    color: colors.neutral.text,
  },
  statSuffix: {
    ...typography.h3,
    color: colors.neutral.text,
    marginLeft: 2,
  },
  statLabel: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    textAlign: 'center',
  },
});
