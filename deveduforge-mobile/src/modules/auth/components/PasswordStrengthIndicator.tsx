import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../shared/constants/colors';
import { spacing } from '../../../shared/constants/spacing';
import { typography } from '../../../shared/constants/typography';
import { checkPasswordStrength } from '../../../core/utils/passwordStrength';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const SEGMENT_COLORS = ['#C62828', '#F57F17', '#2E7D32', '#1B5E20'];

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  if (!password) return null;

  const { score, label } = checkPasswordStrength(password);

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        {Array.from({ length: 4 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.segment,
              {
                backgroundColor: i < score ? SEGMENT_COLORS[Math.min(score - 1, 3)] : colors.neutral.border,
              },
            ]}
          />
        ))}
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  barContainer: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  segment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  label: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
  },
});
