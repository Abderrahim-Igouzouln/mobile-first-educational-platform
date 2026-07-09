import React, { useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { FormInput } from '../../../shared/components/forms/FormInput';
import { Button } from '../../../shared/components/ui/Button';
import { useAuth } from '../../../core/auth/useAuth';
import { loginSchema, LoginFormData } from '../auth.validation';
import type { AuthStackParamList } from '../../../core/navigation/navigation.types';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormData) => {
    setError('');
    try {
      await login(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Email ou mot de passe incorrect');
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
            <Text style={styles.welcome}>Bienvenue</Text>
            <Text style={styles.subtitle}>Connectez-vous à votre compte</Text>
          </View>

          <View style={styles.form}>
            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <FormInput<LoginFormData>
              name="email"
              control={control}
              label="Email"
              leftIcon={Mail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <FormInput<LoginFormData>
              name="password"
              control={control}
              label="Mot de passe"
              leftIcon={Lock}
              secureTextEntry
              autoComplete="password"
            />

            <Pressable
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotRow}
            >
              <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
            </Pressable>

            <Button
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
              fullWidth
              size="lg"
            >
              Se connecter
            </Button>
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Pas encore de compte ?</Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={styles.footerLink}> S'inscrire</Text>
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
    justifyContent: 'center',
  },
  header: {
    marginBottom: spacing.xxxl,
  },
  welcome: {
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
  forgotRow: {
    alignSelf: 'flex-end',
  },
  forgotText: {
    ...typography.bodySmall,
    color: colors.brand.orange,
    fontWeight: '600',
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
