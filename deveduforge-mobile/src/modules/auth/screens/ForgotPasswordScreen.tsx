import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { FormInput } from '../../../shared/components/forms/FormInput';
import { Button } from '../../../shared/components/ui/Button';
import { forgotPasswordSchema, ForgotPasswordFormData } from '../auth.validation';
import { forgotPassword } from '../../../core/api/endpoints/auth.endpoints';

const COOLDOWN_SECONDS = 60;

export default function ForgotPasswordScreen() {
  const [cooldown, setCooldown] = useState(0);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
    defaultValues: { email: '' },
  });

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startCooldown = useCallback(() => {
    setCooldown(COOLDOWN_SECONDS);
    timerRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError('');
    try {
      await forgotPassword(data.email);
    } catch {
      // Generic — don't reveal if email exists
    }
    setSent(true);
    startCooldown();
  };

  return (
    <ScreenWrapper backgroundColor={colors.neutral.surface}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Mot de passe oublié</Text>
            <Text style={styles.subtitle}>
              Saisissez votre email pour recevoir un lien de réinitialisation
            </Text>
          </View>

          {sent ? (
            <View style={styles.successBox}>
              <Text style={styles.successText}>
                Si un email existe, vous recevrez un lien de réinitialisation.
              </Text>
            </View>
          ) : null}

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.form}>
            <FormInput<ForgotPasswordFormData>
              name="email"
              control={control}
              label="Email"
              leftIcon={Mail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <Button
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
              disabled={cooldown > 0}
              fullWidth
              size="lg"
            >
              {cooldown > 0 ? `Renvoyer (${cooldown}s)` : sent ? 'Renvoyer' : 'Envoyer'}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: spacing.xxl,
    justifyContent: 'center',
  },
  header: {
    marginBottom: spacing.xxxl,
  },
  title: {
    ...typography.display,
    color: colors.brand.navy,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodyLarge,
    color: colors.neutral.textLight,
  },
  form: {
    gap: spacing.lg,
  },
  successBox: {
    backgroundColor: colors.semantic.successBg,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
  },
  successText: {
    ...typography.bodySmall,
    color: colors.semantic.success,
  },
  errorBox: {
    backgroundColor: colors.semantic.errorBg,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.semantic.error,
  },
});
