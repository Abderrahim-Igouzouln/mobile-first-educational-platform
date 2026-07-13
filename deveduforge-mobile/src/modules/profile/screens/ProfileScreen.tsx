import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert, Linking } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {
  User,
  Crown,
  Award,
  Globe,
  Sun,
  Moon,
  Bell,
  Database,
  Shield,
  HelpCircle,
  Info,
  LogOut,
  Trash2,
  ChevronRight,
  GraduationCap,
  Trophy,
  Bookmark,
} from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Card } from '../../../shared/components/ui/display/Card';
import { Modal } from '../../../shared/components/ui/display/Modal';
import { Button } from '../../../shared/components/ui/input/Button';
import { LoadingSpinner } from '../../../shared/components/ui/feedback/LoadingSpinner';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { useAuth } from '../../../core/auth/useAuth';
import { useAppSelector } from '../../../lib/redux/hooks/useAppSelector';
import { useAppDispatch } from '../../../lib/redux/hooks/useAppDispatch';
import { setTheme } from '../../../lib/redux/slices/ui.slice';
import { useProfile } from '../services/profileService';
import { ProfileAvatar } from '../components/ProfileAvatar';
import { ProfileStatCard } from '../components/ProfileStatCard';
import { MenuItem } from '../components/MenuItem';
import type { ProfileStackParamList } from '../../../core/navigation/navigation.types';

type NavigationProp = NativeStackNavigationProp<ProfileStackParamList>;

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { user, logout } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.ui.theme);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const initials = user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : '??';
  const memberSince = user
    ? new Date(user.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })
    : '';

  const handleLogout = async () => {
    setShowLogoutConfirm(false);
    await logout();
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(false);
    Alert.alert(
      'Supprimer le compte',
      'Pour supprimer votre compte, veuillez vous ré-authentifier.',
      [{ text: 'OK' }],
    );
  };

  const handleThemeToggle = () => {
    dispatch(setTheme(themeMode === 'dark' ? 'light' : 'dark'));
  };

  const handleHelpPress = () => {
    Linking.openURL('https://deveduforge.com/help');
  };

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite} statusBarStyle="dark">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <ProfileAvatar initials={initials} imageUrl={user?.avatar} size={96} />
          <Text style={styles.name}>
            {user ? `${user.firstName} ${user.lastName}` : 'Utilisateur'}
          </Text>
          <Text style={styles.email}>{user?.email ?? ''}</Text>
          {memberSince ? (
            <Text style={styles.memberSince}>Membre depuis {memberSince}</Text>
          ) : null}
        </View>

        {profileLoading ? (
          <View style={styles.statsRow}>
            <LoadingSpinner size="large" />
          </View>
        ) : (
          <View style={styles.statsRow}>
            <ProfileStatCard value={profile?.stats.streak?.toString() ?? '0'} label="Streak (jours)" />
            <ProfileStatCard value={profile?.stats.completedLessons?.toString() ?? '0'} label="Leçons complétées" />
            <ProfileStatCard value={profile?.stats.averageScore ? `${profile.stats.averageScore}%` : '0%'} label="Score moyen" />
            <ProfileStatCard value={profile?.stats.rank ?? 'Débutant'} label="Rang" />
          </View>
        )}

        <Card style={styles.cardSection}>
          <MenuItem
            icon={User}
            label="Modifier le profil"
            onPress={() => navigation.navigate('EditProfileScreen')}
          />
          <View style={styles.separator} />
          <MenuItem
            icon={Trophy}
            label="Succès"
            onPress={() => navigation.navigate('AchievementsScreen')}
          />
          <View style={styles.separator} />
          <MenuItem
            icon={Bookmark}
            label="Cours sauvegardés"
            onPress={() => navigation.navigate('SavedCoursesScreen')}
          />
          <View style={styles.separator} />
          <MenuItem
            icon={Crown}
            label="Abonnement"
            onPress={() => navigation.navigate('SubscriptionScreen')}
          />
          <View style={styles.separator} />
          {(user?.role === 'instructor' || user?.role === 'admin' || user?.role === 'superadmin') && (
            <>
              <MenuItem
                icon={GraduationCap}
                label="Espace Instructeur"
                onPress={() => navigation.navigate('InstructorDashboardScreen')}
              />
              <View style={styles.separator} />
            </>
          )}
          <MenuItem
            icon={Award}
            label="Mes Certificats"
            rightElement={<ChevronRight size={20} color={colors.neutral.textMuted} />}
          />
          <View style={styles.separator} />
          <MenuItem
            icon={Globe}
            label="Langue"
            onPress={() => navigation.navigate('LanguageScreen')}
          />
          <View style={styles.separator} />
          <MenuItem
            icon={themeMode === 'dark' ? Moon : Sun}
            label="Apparence"
            rightElement={
              <View style={styles.toggleRow}>
                <Sun size={16} color={themeMode === 'dark' ? colors.neutral.textMuted : colors.brand.orange} />
                <View style={[styles.toggleTrack, themeMode === 'dark' && styles.toggleTrackDark]}>
                  <View style={[styles.toggleThumb, themeMode === 'dark' && styles.toggleThumbDark]} />
                </View>
                <Moon size={16} color={themeMode === 'dark' ? colors.brand.navy : colors.neutral.textMuted} />
              </View>
            }
            onPress={handleThemeToggle}
          />
          <View style={styles.separator} />
          <MenuItem
            icon={Bell}
            label="Centre de notifications"
            onPress={() => navigation.navigate('NotificationCenterScreen')}
          />
          <View style={styles.separator} />
          <MenuItem
            icon={Bell}
            label="Préférences de notifications"
            onPress={() => navigation.navigate('NotificationSettingsScreen')}
          />
          <View style={styles.separator} />
          <MenuItem
            icon={Database}
            label="Données et Stockage"
            onPress={() => navigation.navigate('DataSettingsScreen')}
          />
          <View style={styles.separator} />
          <MenuItem
            icon={Shield}
            label="Sécurité"
            onPress={() => navigation.navigate('SecurityScreen')}
          />
          <View style={styles.separator} />
          <MenuItem
            icon={HelpCircle}
            label="Centre d'Aide"
            onPress={() => navigation.navigate('HelpScreen')}
          />
          <View style={styles.separator} />
          <MenuItem
            icon={Info}
            label="À Propos"
            onPress={() => navigation.navigate('AboutScreen')}
          />
          <View style={styles.separator} />
          <MenuItem
            icon={LogOut}
            label="Déconnexion"
            onPress={() => setShowLogoutConfirm(true)}
          />
          <View style={styles.separator} />
          <MenuItem
            icon={Trash2}
            label="Supprimer le compte"
            danger
            onPress={() => setShowDeleteConfirm(true)}
          />
        </Card>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <Modal
        visible={showLogoutConfirm}
        title="Déconnexion"
        onClose={() => setShowLogoutConfirm(false)}
      >
        <Text style={styles.modalText}>Êtes-vous sûr de vouloir vous déconnecter ?</Text>
        <Button variant="primary" fullWidth onPress={handleLogout}>
          Se déconnecter
        </Button>
      </Modal>

      <Modal
        visible={showDeleteConfirm}
        title="Supprimer le compte"
        onClose={() => setShowDeleteConfirm(false)}
        destructive
      >
        <Text style={styles.modalText}>
          Cette action est irréversible. Toutes vos données seront supprimées.
        </Text>
        <Button variant="danger" fullWidth onPress={handleDeleteAccount}>
          Supprimer mon compte
        </Button>
      </Modal>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    alignItems: 'center',
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  name: {
    ...typography.h1,
    color: colors.neutral.text,
    marginTop: spacing.md,
  },
  email: {
    ...typography.body,
    color: colors.neutral.textLight,
    marginTop: spacing.xxs,
  },
  memberSince: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    marginTop: spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  cardSection: {
    marginHorizontal: spacing.lg,
    padding: 0,
    paddingVertical: spacing.xs,
  },
  separator: {
    height: 1,
    backgroundColor: colors.neutral.border,
    marginHorizontal: spacing.lg,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  toggleTrack: {
    width: 40,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.neutral.borderDark,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleTrackDark: {
    backgroundColor: colors.brand.navy,
  },
  toggleThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.neutral.surface,
    alignSelf: 'flex-start',
  },
  toggleThumbDark: {
    alignSelf: 'flex-end',
  },
  bottomSpacer: {
    height: spacing.huge,
  },
  modalText: {
    ...typography.body,
    color: colors.neutral.text,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
});
