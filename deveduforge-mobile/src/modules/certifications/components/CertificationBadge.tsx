import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Award } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { radius } from '../../../shared/constants/radius';
import { spacing } from '../../../shared/constants/spacing';

interface CertificationBadgeProps {
  earned: boolean;
  label?: string;
  size?: 'sm' | 'md';
}

export const CertificationBadge: React.FC<CertificationBadgeProps> = ({
  earned,
  label,
  size = 'md',
}) => {
  const isSmall = size === 'sm';
  const iconSize = isSmall ? 16 : 20;

  return (
    <View style={[styles.badge, earned ? styles.earned : styles.available, isSmall && styles.badgeSm]}>
      <Award
        size={iconSize}
        color={earned ? colors.semantic.success : colors.neutral.textMuted}
      />
      {label && (
        <Text
          style={[
            styles.label,
            earned ? styles.earnedLabel : styles.availableLabel,
            isSmall && styles.labelSm,
          ]}
        >
          {label}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    gap: spacing.xs,
  },
  badgeSm: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
  },
  earned: {
    backgroundColor: colors.semantic.successBg,
  },
  available: {
    backgroundColor: colors.neutral.surfaceAlt,
  },
  label: {
    ...typography.label,
    fontSize: 11,
  },
  labelSm: {
    fontSize: 10,
  },
  earnedLabel: {
    color: colors.semantic.success,
  },
  availableLabel: {
    color: colors.neutral.textMuted,
  },
});
