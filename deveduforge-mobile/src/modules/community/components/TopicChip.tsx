import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';

interface TopicChipProps {
  label: string;
  count?: number;
  selected?: boolean;
  onPress: () => void;
}

export const TopicChip: React.FC<TopicChipProps> = ({ label, count, selected, onPress }) => {
  return (
    <Pressable
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      role="button"
      accessibilityState={{ selected: !!selected }}
      accessibilityLabel={`${label}${count ? `, ${count} discussions` : ''}`}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {label}
        {count !== undefined ? ` (${count})` : ''}
      </Text>
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
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
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
