import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';

interface TermsCheckboxProps {
  checked: boolean;
  onToggle: () => void;
  error?: string;
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ checked, onToggle, error }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.row}
        onPress={onToggle}

        role="checkbox"
        accessibilityState={{ checked }}
      >
        <View style={[styles.box, checked && styles.boxChecked]}>
          {checked && <Check size={14} color={colors.neutral.surface} strokeWidth={3} />}
        </View>
        <Text style={styles.text}>
          J'accepte les{' '}
          <Text style={styles.link}>Conditions d'Utilisation</Text>
        </Text>
      </Pressable>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.neutral.borderDark,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutral.surface,
  },
  boxChecked: {
    backgroundColor: colors.brand.orange,
    borderColor: colors.brand.orange,
  },
  text: {
    ...typography.body,
    color: colors.neutral.text,
    flex: 1,
  },
  link: {
    color: colors.brand.navy,
    textDecorationLine: 'underline',
  },
  error: {
    ...typography.bodySmall,
    color: colors.semantic.error,
  },
});
