import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Lock } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { FormInput } from '../../../shared/components/forms/FormInput';
import { Button } from '../../../shared/components/ui/input/Button';
import { useAuth } from '../../../core/auth/useAuth';
import { PasswordStrengthIndicator } from '../components/PasswordStrengthIndicator';
import { TermsCheckbox } from '../components/TermsCheckbox';
import { registerSchema, RegisterFormData } from '../auth.validation';
import type { AuthStackParamList } from '../../../core/navigation/navigation.types';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { register: authRegister } = useAuth();
  const [error, setError] = useState('');

  const { control, handleSubmit, watch, formState: { isSubmitting, errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setError('');
    try {
      await authRegister({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'inscription');
    }
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
            <Text style={styles.title}>Créer un compte</Text>
            <Text style={styles.subtitle}>Rejoignez DevEduForge</Text>
          </View>

          <View style={styles.form}>
            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <FormInput<RegisterFormData>
              name="firstName"
              control={control}
              label="Prénom"
              leftIcon={User}
              autoCapitalize="words"
              autoComplete="given-name"
            />

            <FormInput<RegisterFormData>
              name="lastName"
              control={control}
              label="Nom"
              leftIcon={User}
              autoCapitalize="words"
              autoComplete="family-name"
            />

            <FormInput<RegisterFormData>
              name="email"
              control={control}
              label="Email"
              leftIcon={Mail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <View>
              <FormInput<RegisterFormData>
                name="password"
                control={control}
                label="Mot de passe"
                leftIcon={Lock}
                secureTextEntry
                autoComplete="new-password"
              />
              <PasswordStrengthIndicator password={password || ''} />
            </View>

            <FormInput<RegisterFormData>
              name="confirmPassword"
              control={control}
              label="Confirmer le mot de passe"
              leftIcon={Lock}
              secureTextEntry
              autoComplete="new-password"
            />

            <Controller
              name="acceptTerms"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TermsCheckbox
                  checked={!!value}
                  onToggle={() => onChange(!value)}
                  error={errors.acceptTerms?.message}
                />
              )}
            />

            <Button
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
              fullWidth
              size="lg"
            >
              S'inscrire
            </Button>
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Déjà un compte ?</Text>
            <Pressable onPress={() => navigation.goBack()}>
              <Text style={styles.footerLink}> Se connecter</Text>
            </Pressable>
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
    paddingVertical: spacing.xxxl,
  },
  header: {
    marginBottom: spacing.xxl,
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
  errorBox: {
    backgroundColor: colors.semantic.errorBg,
    padding: spacing.md,
    borderRadius: 8,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.semantic.error,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xxxl,
  },
  footerText: {
    ...typography.body,
    color: colors.neutral.textLight,
  },
  footerLink: {
    ...typography.body,
    color: colors.brand.orange,
    fontWeight: '700',
  },
});
