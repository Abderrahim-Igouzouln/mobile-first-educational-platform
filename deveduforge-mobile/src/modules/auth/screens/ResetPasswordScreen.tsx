import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { FormInput } from '../../../shared/components/forms/FormInput';
import { Button } from '../../../shared/components/ui/Button';
import { resetPassword } from '../../../core/api/endpoints/auth.endpoints';
import { PasswordStrengthIndicator } from '../components/PasswordStrengthIndicator';
import { resetPasswordSchema, ResetPasswordFormData } from '../auth.validation';
import type { AuthStackParamList } from '../../../core/navigation/navigation.types';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;
type ResetRouteProp = RouteProp<AuthStackParamList, 'ResetPassword'>;

export default function ResetPasswordScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ResetRouteProp>();
  const token = route.params?.token;
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { control, handleSubmit, watch, formState: { isSubmitting } } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
    defaultValues: { password: '', confirmPassword: '' },
  });

  const password = watch('password');

  const onSubmit = async (data: ResetPasswordFormData) => {
    setError('');
    try {
      await resetPassword({ token, password: data.password });
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  if (success) {
    return (
      <ScreenWrapper backgroundColor={colors.neutral.surface}>
        <View style={styles.successContainer}>
          <Text style={styles.successTitle}>Mot de passe réinitialisé</Text>
          <Text style={styles.successSubtitle}>
            Votre mot de passe a été modifié avec succès.
          </Text>
          <Button
            onPress={() => navigation.navigate('Login')}
            fullWidth
            size="lg"
          >
            Se connecter
          </Button>
        </View>
      </ScreenWrapper>
    );
  }

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
            <Text style={styles.title}>Nouveau mot de passe</Text>
            <Text style={styles.subtitle}>
              Choisissez un mot de passe sécurisé
            </Text>
          </View>

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.form}>
            <View>
              <FormInput<ResetPasswordFormData>
                name="password"
                control={control}
                label="Nouveau mot de passe"
                leftIcon={Lock}
                secureTextEntry
                autoComplete="new-password"
              />
              <PasswordStrengthIndicator password={password || ''} />
            </View>

            <FormInput<ResetPasswordFormData>
              name="confirmPassword"
              control={control}
              label="Confirmer le mot de passe"
              leftIcon={Lock}
              secureTextEntry
              autoComplete="new-password"
            />

            <Button
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
              fullWidth
              size="lg"
            >
              Réinitialiser
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
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
    gap: spacing.lg,
  },
  successTitle: {
    ...typography.h1,
    color: colors.semantic.success,
    textAlign: 'center',
  },
  successSubtitle: {
    ...typography.bodyLarge,
    color: colors.neutral.textLight,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
});
