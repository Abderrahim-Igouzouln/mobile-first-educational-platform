import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';
import { typography } from '../../../constants/typography';
import { radius } from '../../../constants/radius';
import { spacing } from '../../../constants/spacing';

type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'default';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const BADGE_STYLES: Record<BadgeVariant, { bg: string; text: string }> = {
  success: { bg: colors.semantic.successBg, text: colors.semantic.success },
  error: { bg: colors.semantic.errorBg, text: colors.semantic.error },
  warning: { bg: colors.semantic.warningBg, text: colors.semantic.warning },
  info: { bg: colors.semantic.infoBg, text: colors.semantic.info },
  default: { bg: colors.neutral.surfaceAlt, text: colors.neutral.textLight },
};

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'default' }) => {
  const badgeStyle = BADGE_STYLES[variant];

  return (
    <View style={[styles.badge, { backgroundColor: badgeStyle.bg }]}>
      <Text style={[styles.label, { color: badgeStyle.text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.pill,
  },
  label: {
    ...typography.label,
    fontSize: 11,
    textTransform: 'uppercase',
  },
});
