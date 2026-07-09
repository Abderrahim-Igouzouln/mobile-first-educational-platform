import React from 'react';
import { View, Text, Pressable, StyleSheet, Linking } from 'react-native';
import { ExternalLink } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Card } from '../../../shared/components/ui/Card';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import Constants from 'expo-constants';

export default function AboutScreen() {
  const appVersion = Constants.expoConfig?.version ?? '1.0.0';
  const buildNumber = Constants.platform?.ios?.buildNumber ?? Constants.platform?.android?.versionCode?.toString() ?? '1';

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite}>
      <View style={styles.container}>
        <View style={styles.logoSection}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>DEF</Text>
          </View>
          <Text style={styles.appName}>DevEduForge</Text>
          <Text style={styles.version}>Version {appVersion} (Build {buildNumber})</Text>
        </View>

        <Card style={styles.linksCard}>
          <Pressable
            style={styles.linkRow}
            onPress={() => Linking.openURL('https://deveduforge.com/privacy')}
          >
            <Text style={styles.linkText}>Politique de confidentialité</Text>
            <ExternalLink size={18} color={colors.neutral.textMuted} />
          </Pressable>
          <View style={styles.separator} />
          <Pressable
            style={styles.linkRow}
            onPress={() => Linking.openURL('https://deveduforge.com/terms')}
          >
            <Text style={styles.linkText}>Conditions d'utilisation</Text>
            <ExternalLink size={18} color={colors.neutral.textMuted} />
          </Pressable>
        </Card>

        <Text style={styles.copyright}>DevEduForge © 2026</Text>
        <Text style={styles.rights}>Tous droits réservés.</Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    alignItems: 'center',
  },
  logoSection: {
    alignItems: 'center',
    paddingTop: spacing.huge,
    paddingBottom: spacing.xxxl,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.brand.navy,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoText: {
    ...typography.h1,
    color: colors.neutral.surface,
    fontWeight: '900',
  },
  appName: {
    ...typography.h1,
    color: colors.neutral.text,
    marginBottom: spacing.xs,
  },
  version: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
  },
  linksCard: {
    width: '100%',
    padding: 0,
    paddingVertical: spacing.xs,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
  linkText: {
    ...typography.body,
    color: colors.brand.orange,
  },
  separator: {
    height: 1,
    backgroundColor: colors.neutral.border,
    marginHorizontal: spacing.lg,
  },
  copyright: {
    ...typography.body,
    color: colors.neutral.textLight,
    marginTop: 'auto',
    paddingBottom: spacing.sm,
  },
  rights: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    paddingBottom: spacing.xxl,
  },
});
