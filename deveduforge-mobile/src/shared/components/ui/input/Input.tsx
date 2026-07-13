import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput as RNTextInput,
  Text,
  Pressable,
  StyleSheet,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { LucideIcon, Eye, EyeOff } from 'lucide-react-native';
import { colors } from '../../../constants/colors';
import { typography } from '../../../constants/typography';
import { spacing } from '../../../constants/spacing';
import { radius } from '../../../constants/radius';

interface InputProps extends Omit<RNTextInputProps, 'style'> {
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
  leftIcon?: LucideIcon;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  secureTextEntry,
  leftIcon: LeftIcon,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = secureTextEntry;

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  const isDisabled = rest.editable === false;

  const containerStyle = [
    styles.container,
    isFocused && !error && styles.containerFocused,
    error && styles.containerError,
    isDisabled && styles.containerDisabled,
  ];

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={containerStyle}>
        {LeftIcon && (
          <LeftIcon
            size={20}
            color={error ? colors.semantic.error : isFocused ? colors.brand.navy : colors.neutral.textMuted}
            style={styles.leftIcon}
          />
        )}
        <RNTextInput
          style={styles.input}
          placeholderTextColor={colors.neutral.textMuted}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isPassword && !showPassword}
          {...rest}
        />
        {isPassword && (
          <Pressable
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.eyeButton}
            role="button"
            accessibilityLabel={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          >
            {showPassword ? (
              <EyeOff size={20} color={colors.neutral.textMuted} />
            ) : (
              <Eye size={20} color={colors.neutral.textMuted} />
            )}
          </Pressable>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  label: {
    ...typography.label,
    color: colors.neutral.text,
    textTransform: 'uppercase',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.neutral.border,
    borderRadius: radius.md,
    backgroundColor: colors.neutral.surface,
    paddingHorizontal: spacing.md,
    minHeight: 48,
  },
  containerFocused: {
    borderColor: colors.brand.navy,
  },
  containerError: {
    borderColor: colors.semantic.error,
  },
  containerDisabled: {
    backgroundColor: colors.neutral.surfaceAlt,
    opacity: 0.6,
  },
  leftIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.neutral.text,
    paddingVertical: spacing.sm,
  },
  eyeButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.semantic.error,
  },
});
