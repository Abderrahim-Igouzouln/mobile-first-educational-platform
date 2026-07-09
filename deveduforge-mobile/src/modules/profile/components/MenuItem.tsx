import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { LucideIcon, ChevronRight } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
  danger?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  label,
  rightElement,
  onPress,
  danger = false,
}) => {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      role="button"
      accessibilityLabel={label}
    >
      <View style={styles.left}>
        <Icon size={22} color={danger ? colors.semantic.error : colors.neutral.textLight} />
        <Text style={[styles.label, danger && styles.dangerLabel]}>{label}</Text>
      </View>
      {rightElement ?? (
        <ChevronRight size={20} color={colors.neutral.textMuted} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.md,
  },
  label: {
    ...typography.body,
    color: colors.neutral.text,
    flex: 1,
  },
  dangerLabel: {
    color: colors.semantic.error,
  },
});
