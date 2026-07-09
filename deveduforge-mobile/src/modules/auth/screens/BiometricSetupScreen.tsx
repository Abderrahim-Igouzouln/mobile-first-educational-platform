import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Fingerprint, ShieldCheck } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Button } from '../../../shared/components/ui/Button';
import { LoadingSpinner } from '../../../shared/components/ui/LoadingSpinner';

export default function BiometricSetupScreen() {
  const [biometricType, setBiometricType] = useState<string>('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkBiometrics = async () => {
      try {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (!hasHardware) {
          setLoading(false);
          return;
        }

        const enrolled = await LocalAuthentication.isEnrolledAsync();
        setIsAvailable(true);
        setIsEnrolled(enrolled);

        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
          setBiometricType('empreinte digitale');
        } else if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
          setBiometricType('reconnaissance faciale');
        } else if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
          setBiometricType('reconnaissance iridienne');
        } else {
          setBiometricType('biométrie');
        }
      } catch {
        // Device doesn't support biometrics
      } finally {
        setLoading(false);
      }
    };

    checkBiometrics();
  }, []);

  const handleToggle = async (value: boolean) => {
    if (value && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authentifiez-vous pour activer le déverrouillage biométrique',
        fallbackLabel: 'Utiliser le mot de passe',
      });
      if (result.success) {
        setEnabled(true);
      }
    } else {
      setEnabled(false);
    }
  };

  if (loading) {
    return (
      <ScreenWrapper backgroundColor={colors.neutral.surface}>
        <LoadingSpinner fullScreen />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper backgroundColor={colors.neutral.surface}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.iconContainer}>
          <Fingerprint size={64} color={colors.brand.orange} />
        </View>

        <Text style={styles.title}>Déverrouillage biométrique</Text>
        <Text style={styles.subtitle}>
          Utilisez votre {biometricType || 'biométrie'} pour déverrouiller l'application rapidement et en toute sécurité.
        </Text>

        {!isAvailable ? (
          <View style={styles.infoBox}>
            <ShieldCheck size={20} color={colors.neutral.textMuted} />
            <Text style={styles.infoText}>
              La biométrie n'est pas disponible sur cet appareil.
            </Text>
          </View>
        ) : !isEnrolled ? (
          <View style={styles.infoBox}>
            <ShieldCheck size={20} color={colors.semantic.warning} />
            <Text style={styles.infoText}>
              Aucune donnée biométrique n'est enregistrée sur cet appareil. Ajoutez une empreinte ou un visage dans les paramètres de votre appareil.
            </Text>
          </View>
        ) : (
          <View style={styles.toggleRow}>
            <View style={styles.toggleText}>
              <Text style={styles.toggleLabel}>Activer la biométrie</Text>
              <Text style={styles.toggleHint}>
                Déverrouillez l'application avec votre {biometricType}
              </Text>
            </View>
            <Switch
              value={enabled}
              onValueChange={handleToggle}
              trackColor={{ false: colors.neutral.border, true: colors.brand.orangeLight }}
              thumbColor={enabled ? colors.brand.orange : colors.neutral.textMuted}
            />
          </View>
        )}

        <View style={styles.securityNote}>
          <ShieldCheck size={16} color={colors.neutral.textMuted} />
          <Text style={styles.securityText}>
            Vos données biométriques ne quittent jamais votre appareil. Elles sont stockées localement et ne sont pas partagées avec nos serveurs.
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.huge,
    paddingBottom: spacing.xxxl,
    alignItems: 'center',
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
    marginBottom: spacing.xxxl,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.neutral.surfaceAlt,
    padding: spacing.lg,
    borderRadius: radius.md,
    marginBottom: spacing.xxl,
    width: '100%',
  },
  infoText: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    flex: 1,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.neutral.surfaceAlt,
    borderRadius: radius.md,
    marginBottom: spacing.xxl,
  },
  toggleText: {
    flex: 1,
    marginRight: spacing.lg,
  },
  toggleLabel: {
    ...typography.body,
    fontWeight: '600',
    color: colors.neutral.text,
  },
  toggleHint: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    marginTop: spacing.xxs,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  securityText: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    flex: 1,
  },
});
