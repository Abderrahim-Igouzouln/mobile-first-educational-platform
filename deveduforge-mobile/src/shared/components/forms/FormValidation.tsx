import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

type ValidationType = 'error' | 'success' | 'info';

interface FormValidationProps {
  message?: string;
  type?: ValidationType;
}

const ICON_MAP: Record<ValidationType, React.ComponentType<{ size: number; color: string }>> = {
  error: AlertCircle,
  success: CheckCircle2,
  info: Info,
};

const COLOR_MAP: Record<ValidationType, string> = {
  error: colors.semantic.error,
  success: colors.semantic.success,
  info: colors.semantic.info,
};

export const FormValidation: React.FC<FormValidationProps> = ({ message, type = 'info' }) => {
  if (!message) return null;

  const Icon = ICON_MAP[type];
  const iconColor = COLOR_MAP[type];

  return (
    <View style={styles.container}>
      <Icon size={16} color={iconColor} />
      <Text style={[styles.text, { color: iconColor }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  text: {
    ...typography.bodySmall,
    flex: 1,
  },
});
