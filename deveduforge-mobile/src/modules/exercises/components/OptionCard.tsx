import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { CheckCircle2, XCircle } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';

type OptionState = 'default' | 'selected' | 'correct' | 'incorrect';

interface OptionCardProps {
  text: string;
  state: OptionState;
  onPress: () => void;
  disabled?: boolean;
}

const STATE_STYLES: Record<
  OptionState,
  { border: string; bg: string; text: string; showIcon: boolean; icon: 'check' | 'cross' | null }
> = {
  default: {
    border: colors.neutral.border,
    bg: colors.neutral.surface,
    text: colors.neutral.text,
    showIcon: false,
    icon: null,
  },
  selected: {
    border: colors.brand.navy,
    bg: '#E8EDF5',
    text: colors.brand.navy,
    showIcon: false,
    icon: null,
  },
  correct: {
    border: colors.semantic.success,
    bg: colors.semantic.successBg,
    text: colors.semantic.success,
    showIcon: true,
    icon: 'check',
  },
  incorrect: {
    border: colors.semantic.error,
    bg: colors.semantic.errorBg,
    text: colors.semantic.error,
    showIcon: true,
    icon: 'cross',
  },
};

export const OptionCard: React.FC<OptionCardProps> = ({ text, state, onPress, disabled }) => {
  const style = STATE_STYLES[state];

  return (
    <Pressable
      style={[styles.container, { borderColor: style.border, backgroundColor: style.bg }]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[styles.radio, { borderColor: style.border }]}>
        {(state === 'selected' || state === 'correct') && (
          <View style={[styles.radioFill, { backgroundColor: style.border }]} />
        )}
        {state === 'incorrect' && (
          <View style={[styles.radioFill, { backgroundColor: colors.semantic.error }]} />
        )}
      </View>
      <Text style={[styles.text, { color: style.text }]}>{text}</Text>
      {style.showIcon && (
        <View style={styles.iconWrap}>
          {style.icon === 'check' ? (
            <CheckCircle2 size={20} color={colors.semantic.success} />
          ) : (
            <XCircle size={20} color={colors.semantic.error} />
          )}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  radioFill: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  text: {
    ...typography.body,
    flex: 1,
  },
  iconWrap: {
    marginLeft: spacing.sm,
  },
});
