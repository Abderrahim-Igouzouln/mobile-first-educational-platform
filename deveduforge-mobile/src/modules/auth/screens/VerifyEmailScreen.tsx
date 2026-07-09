import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { MailCheck } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Button } from '../../../shared/components/ui/Button';
import type { AuthStackParamList } from '../../../core/navigation/navigation.types';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;
type VerifyRouteProp = RouteProp<AuthStackParamList, 'VerifyEmail'>;

const COOLDOWN_SECONDS = 60;

export default function VerifyEmailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<VerifyRouteProp>();
  const email = route.params?.email;
  const [cooldown, setCooldown] = useState(COOLDOWN_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  useEffect(() => {
    startCooldown();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startCooldown]);

  const handleResend = () => {
    startCooldown();
  };

  return (
    <ScreenWrapper backgroundColor={colors.neutral.surface}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <MailCheck size={64} color={colors.brand.orange} />
        </View>

        <Text style={styles.title}>Vérifiez votre email</Text>

        {email ? (
          <Text style={styles.subtitle}>
            Un lien de vérification a été envoyé à{' '}
            <Text style={styles.email}>{email}</Text>
          </Text>
        ) : (
          <Text style={styles.subtitle}>
            Un lien de vérification vous a été envoyé par email.
          </Text>
        )}

        <Text style={styles.hint}>
          Cliquez sur le lien dans l'email pour activer votre compte.
        </Text>

        <View style={styles.actions}>
          <Button
            onPress={handleResend}
            disabled={cooldown > 0}
            variant="outline"
            fullWidth
            size="md"
          >
            {cooldown > 0 ? `Renvoyer l'email (${cooldown}s)` : "Renvoyer l'email"}
          </Button>

          <Button
            onPress={() => navigation.navigate('Login')}
            variant="ghost"
            fullWidth
            size="md"
          >
            Retour à la connexion
          </Button>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.brand.offWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    ...typography.h1,
    color: colors.brand.navy,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.bodyLarge,
    color: colors.neutral.textLight,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.sm,
  },
  email: {
    fontWeight: '700',
    color: colors.brand.navy,
  },
  hint: {
    ...typography.body,
    color: colors.neutral.textMuted,
    textAlign: 'center',
    marginBottom: spacing.xxxl,
  },
  actions: {
    width: '100%',
    gap: spacing.md,
  },
});
