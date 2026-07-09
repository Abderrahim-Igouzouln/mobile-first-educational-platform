import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  AccessibilityState,
} from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';
import { radius } from '../../constants/radius';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: LucideIcon;
  fullWidth?: boolean;
  onPress: () => void;
  children: React.ReactNode;
}

const SIZE_MAP: Record<ButtonSize, { minHeight: number; horizontalPadding: number; textStyle: TextStyle }> = {
  sm: { minHeight: 36, horizontalPadding: spacing.md, textStyle: { ...typography.label, fontSize: 12 } },
  md: { minHeight: 44, horizontalPadding: spacing.xl, textStyle: typography.button },
  lg: { minHeight: 52, horizontalPadding: spacing.xxl, textStyle: typography.button },
};

const VARIANT_STYLES: Record<ButtonVariant, { bg: string; text: string; border?: string }> = {
  primary: { bg: colors.brand.orange, text: colors.neutral.surface },
  secondary: { bg: colors.brand.navy, text: colors.neutral.surface },
  outline: { bg: 'transparent', text: colors.brand.navy, border: colors.neutral.borderDark },
  ghost: { bg: 'transparent', text: colors.neutral.textLight },
  danger: { bg: colors.semantic.error, text: colors.neutral.surface },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  fullWidth = false,
  onPress,
  children,
}) => {
  const isDisabled = disabled || loading;
  const sizeConfig = SIZE_MAP[size];
  const variantStyle = VARIANT_STYLES[variant];

  const containerStyle: ViewStyle = {
    minHeight: sizeConfig.minHeight,
    paddingHorizontal: sizeConfig.horizontalPadding,
    backgroundColor: isDisabled ? colors.neutral.surfaceAlt : variantStyle.bg,
    borderWidth: variantStyle.border ? 1 : 0,
    borderColor: isDisabled ? colors.neutral.border : variantStyle.border,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: isDisabled ? 0.6 : 1,
  };

  if (fullWidth) {
    containerStyle.width = '100%';
  }

  const accessibilityState: AccessibilityState = { disabled: isDisabled, busy: loading };

  return (
    <Pressable
      style={containerStyle}
      onPress={onPress}
      disabled={isDisabled}
      role="button"
      accessibilityState={accessibilityState}
      accessibilityLabel={typeof children === 'string' ? children : undefined}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? colors.brand.orange : colors.neutral.surface}
        />
      ) : (
        <>
          {Icon && (
            <Icon
              size={size === 'sm' ? 16 : 20}
              color={variant === 'outline' || variant === 'ghost' ? colors.brand.orange : colors.neutral.surface}
              style={{ marginRight: spacing.sm }}
            />
          )}
          <Text
            style={[
              sizeConfig.textStyle,
              { color: variant === 'outline' || variant === 'ghost' ? (isDisabled ? colors.neutral.textMuted : variantStyle.text) : colors.neutral.surface },
            ]}
          >
            {children}
          </Text>
        </>
      )}
    </Pressable>
  );
};
