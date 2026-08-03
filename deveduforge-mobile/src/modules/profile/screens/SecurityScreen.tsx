import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Switch, Alert } from 'react-native';
import { Lock, Fingerprint, Smartphone } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Card } from '../../../shared/components/ui/display/Card';
import { Input } from '../../../shared/components/ui/input/Input';
import { Button } from '../../../shared/components/ui/input/Button';
import { LoadingSpinner } from '../../../shared/components/ui/feedback/LoadingSpinner';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { useAppDispatch } from '../../../lib/redux/hooks/useAppDispatch';
import { useAppSelector } from '../../../lib/redux/hooks/useAppSelector';
import { setBiometricEnabled } from '../../../lib/redux/slices/auth.slice';
import { useSessions } from '../services/profileService';
import { apiClient } from '../../../core/api/apiClient';

export default function SecurityScreen() {
  const dispatch = useAppDispatch();
  const biometricEnabled = useAppSelector((state) => state.auth.biometricEnabled);
  const { data: sessions = [], isLoading: sessionsLoading } = useSessions();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Erreur', 'Les nouveaux mots de passe ne correspondent pas.');
      return;
    }
    if (newPassword.length < 8) {
      Alert.alert('Erreur', 'Le nouveau mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    setIsChangingPassword(true);
    try {
      await apiClient.post('/auth/change-password', { currentPassword, newPassword });
      Alert.alert('Succès', 'Mot de passe modifié avec succès.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      Alert.alert('Erreur', err?.response?.data?.error?.message || 'Échec de la modification du mot de passe.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Changer le mot de passe</Text>
          <View style={styles.form}>
            <Input
              label="Mot de passe actuel"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              leftIcon={Lock}
            />
            <Input
              label="Nouveau mot de passe"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              leftIcon={Lock}
            />
            <Input
              label="Confirmer le mot de passe"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              leftIcon={Lock}
            />
            <Button onPress={handleChangePassword} fullWidth loading={isChangingPassword}>
              Changer le mot de passe
            </Button>
          </View>
        </Card>

        <Card style={styles.card}>
          <View style={styles.biometricRow}>
            <View style={styles.biometricLeft}>
              <Fingerprint size={22} color={colors.neutral.textLight} />
              <Text style={styles.biometricLabel}>Authentification biométrique</Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={(val: boolean) => { dispatch(setBiometricEnabled(val)); }}
              trackColor={{ false: colors.neutral.borderDark as string, true: colors.brand.orange as string }}
              thumbColor={colors.neutral.surface as string}
              ios_backgroundColor={colors.neutral.borderDark as string}
            />
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Où suis-je connecté ?</Text>
          {sessionsLoading ? (
            <LoadingSpinner />
          ) : sessions.length === 0 ? (
            <Text style={styles.emptyText}>Aucune session active</Text>
          ) : sessions.map((session, index) => (
            <React.Fragment key={session.id}>
              <View style={styles.sessionRow}>
                <Smartphone size={20} color={colors.neutral.textLight} />
                <View style={styles.sessionInfo}>
                  <View style={styles.sessionHeader}>
                    <Text style={styles.sessionDevice}>{session.device}</Text>
                    {session.isCurrent && (
                      <View style={styles.currentBadge}>
                        <Text style={styles.currentBadgeText}>Actuel</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.sessionMeta}>{session.location}</Text>
                  <Text style={styles.sessionMeta}>{session.lastActive}</Text>
                </View>
              </View>
              {index < sessions.length - 1 && <View style={styles.separator} />}
            </React.Fragment>
          ))}
        </Card>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  card: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.neutral.text,
    marginBottom: spacing.lg,
  },
  form: {
    gap: spacing.md,
  },
  biometricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  biometricLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  biometricLabel: {
    ...typography.body,
    color: colors.neutral.text,
  },
  sessionRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  sessionInfo: {
    flex: 1,
    gap: spacing.xxs,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sessionDevice: {
    ...typography.body,
    color: colors.neutral.text,
    fontWeight: '600',
  },
  currentBadge: {
    backgroundColor: colors.semantic.successBg,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: 4,
  },
  currentBadgeText: {
    ...typography.label,
    color: colors.semantic.success,
    fontSize: 10,
    textTransform: 'uppercase',
  },
  sessionMeta: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
  },
  separator: {
    height: 1,
    backgroundColor: colors.neutral.border,
    marginVertical: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.neutral.textMuted,
    textAlign: 'center',
    paddingVertical: spacing.md,
  },
});
