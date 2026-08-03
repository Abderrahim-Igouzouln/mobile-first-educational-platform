import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';
import { typography } from '../../../constants/typography';
import { spacing } from '../../../constants/spacing';
import { radius } from '../../../constants/radius';

interface ChipProps {
  label: string;
  selected: boolean;
  onPress?: () => void;
}

export const Chip: React.FC<ChipProps> = ({ label, selected, onPress }) => {
  return (
    <Pressable
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      role="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.neutral.borderDark,
    backgroundColor: colors.neutral.surface,
  },
  chipSelected: {
    borderColor: colors.brand.orange,
    backgroundColor: colors.brand.offWhite,
  },
  label: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    fontWeight: '600',
  },
  labelSelected: {
    color: colors.brand.orange,
  },
});
