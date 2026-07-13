import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Card } from '../../../shared/components/ui/display/Card';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';

const TERMS_SECTIONS = [
  { title: '1. Acceptation des conditions', content: 'En utilisant DevEduForge, vous acceptez les présentes conditions d\'utilisation. Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser nos services.' },
  { title: '2. Compte utilisateur', content: 'Vous êtes responsable de la confidentialité de votre compte et de vos mots de passe. Vous devez nous informer immédiatement de toute utilisation non autorisée de votre compte.' },
  { title: '3. Certificats et paiements', content: 'Les certificats sont délivrés après completion complète du cours. Un paiement unique est requis pour télécharger le certificat. Aucun remboursement n\'est possible après téléchargement.' },
  { title: '4. Propriété intellectuelle', content: 'Tout le contenu du cours est la propriété de DevEduForge. Vous ne pouvez pas redistribuer, revendre ou partager votre accès aux cours.' },
  { title: '5. Abonnements', content: 'Les abonnements sont renouvelés automatiquement. Vous pouvez annuler à tout moment depuis les paramètres de votre compte.' },
  { title: '6. Protection des données', content: 'Nous collectons et traitons vos données conformément à notre politique de confidentialité. Vous disposez d\'un droit d\'accès, de rectification et de suppression de vos données.' },
];

export default function LegalScreen() {
  const navigation = useNavigation();

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite} statusBarStyle="dark">
      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color={colors.neutral.text} />
        </Pressable>
        <Text style={styles.topBarTitle}>Conditions d\'utilisation</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.lastUpdated}>Dernière mise à jour : 1 juillet 2026</Text>

        {TERMS_SECTIONS.map((section, i) => (
          <Card key={i} style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </Card>
        ))}

        <View style={{ height: spacing.huge }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.neutral.surface, justifyContent: 'center', alignItems: 'center', ...shadows.sm },
  topBarTitle: { ...typography.h3, color: colors.neutral.text },
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: spacing.huge },
  lastUpdated: { ...typography.bodySmall, color: colors.neutral.textMuted, marginBottom: spacing.xl, textAlign: 'center' },
  sectionCard: { padding: spacing.lg, marginBottom: spacing.md },
  sectionTitle: { ...typography.h3, color: colors.neutral.text, marginBottom: spacing.sm },
  sectionContent: { ...typography.body, color: colors.neutral.textLight, lineHeight: 22 },
});
