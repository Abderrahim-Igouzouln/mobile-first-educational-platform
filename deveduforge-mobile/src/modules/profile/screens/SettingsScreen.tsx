import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ChevronRight,
  Globe,
  Lock,
  Bell,
  Database,
  Info,
  Palette,
} from 'lucide-react-native';
import type { ProfileStackParamList } from '../../../core/navigation/navigation.types';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';

type NavProp = NativeStackNavigationProp<ProfileStackParamList, 'SettingsScreen'>;

interface SettingItem {
  icon: React.ElementType;
  label: string;
  description: string;
  screen: keyof ProfileStackParamList;
}

const SETTINGS_SECTIONS: Array<{ title: string; items: SettingItem[] }> = [
  {
    title: 'Préférences',
    items: [
      { icon: Globe, label: 'Langue', description: 'Français, العربية', screen: 'LanguageScreen' },
      { icon: Lock, label: 'Sécurité', description: 'Mot de passe, biométrie', screen: 'SecurityScreen' },
      { icon: Bell, label: 'Notifications', description: 'Alertes, rappels', screen: 'NotificationSettingsScreen' },
    ],
  },
  {
    title: 'Application',
    items: [
      { icon: Database, label: 'Données', description: 'Stockage, cache', screen: 'DataSettingsScreen' },
      { icon: Info, label: 'À propos', description: 'Version, licence', screen: 'AboutScreen' },
    ],
  },
];

const ICON_COLORS: Record<string, string> = {
  Globe: '#1565C0',
  Lock: colors.brand.orange,
  Bell: '#7b2d8b',
  Database: colors.semantic.success,
  Info: colors.neutral.textLight,
};

export default function SettingsScreen() {
  const navigation = useNavigation<NavProp>();

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite} statusBarStyle="dark">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Paramètres</Text>
          <Text style={styles.subtitle}>Personnalisez votre expérience</Text>
        </View>

        {SETTINGS_SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, index) => {
                const Icon = item.icon;
                const iconColor = ICON_COLORS[item.label] || colors.brand.navy;
                return (
                  <Pressable
                    key={item.label}
                    style={[
                      styles.settingItem,
                      index < section.items.length - 1 && styles.settingItemBorder,
                    ]}
                    onPress={() => (navigation.navigate as any)(item.screen)}
                  >
                    <View style={[styles.iconWrap, { backgroundColor: `${iconColor}15` }]}>
                      <Icon size={20} color={iconColor} />
                    </View>
                    <View style={styles.settingContent}>
                      <Text style={styles.settingLabel}>{item.label}</Text>
                      <Text style={styles.settingDescription}>{item.description}</Text>
                    </View>
                    <ChevronRight size={18} color={colors.neutral.textMuted} />
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
  },
  title: {
    ...typography.display,
    color: colors.neutral.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.neutral.textLight,
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.neutral.textMuted,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
    paddingLeft: spacing.sm,
  },
  sectionCard: {
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.lg,
    ...shadows.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    ...typography.body,
    color: colors.neutral.text,
    fontWeight: '600',
  },
  settingDescription: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    marginTop: 2,
  },
  bottomSpacer: {
    height: spacing.huge,
  },
});
