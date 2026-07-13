import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, MessageCircle, Mail, FileText, ChevronRight, ExternalLink } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Card } from '../../../shared/components/ui/display/Card';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';

const FAQ_ITEMS = [
  { q: 'Comment démarrer un cours ?', a: 'Rendez-vous dans l\'onglet Cours, choisissez un domaine puis une technologie pour commencer.' },
  { q: 'Comment obtenir un certificat ?', a: 'Complétez toutes les leçons, les exercices et le projet d\'un cours pour débloquer le certificat.' },
  { q: 'Comment contacter un mentor ?', a: 'Allez dans l\'onglet Communauté > Mentorat pour trouver et contacter un mentor.' },
  { q: 'Puis-je télécharger les cours ?', a: 'Oui, utilisez le mode hors-ligne disponible dans les paramètres de chaque cours.' },
];

export default function HelpScreen() {
  const navigation = useNavigation();

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite} statusBarStyle="dark">
      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color={colors.neutral.text} />
        </Pressable>
        <Text style={styles.topBarTitle}>Aide & Support</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Card style={styles.contactCard}>
          <Text style={styles.contactTitle}>Contactez-nous</Text>
          <Pressable style={styles.contactRow} onPress={() => Linking.openURL('mailto:support@deveduforge.com')}>
            <Mail size={18} color={colors.brand.navy} />
            <Text style={styles.contactText}>support@deveduforge.com</Text>
            <ExternalLink size={16} color={colors.neutral.textMuted} />
          </Pressable>
          <Pressable style={styles.contactRow} onPress={() => Linking.openURL('https://deveduforge.com/contact')}>
            <MessageCircle size={18} color={colors.brand.navy} />
            <Text style={styles.contactText}>Formulaire de contact</Text>
            <ExternalLink size={16} color={colors.neutral.textMuted} />
          </Pressable>
        </Card>

        <Text style={styles.faqTitle}>Questions fréquentes</Text>
        {FAQ_ITEMS.map((item, i) => (
          <Card key={i} style={styles.faqCard}>
            <Text style={styles.faqQ}>{item.q}</Text>
            <Text style={styles.faqA}>{item.a}</Text>
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
  contactCard: { padding: spacing.lg, marginBottom: spacing.xl },
  contactTitle: { ...typography.h3, color: colors.neutral.text, marginBottom: spacing.md },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
  contactText: { ...typography.body, color: colors.neutral.text, flex: 1 },
  faqTitle: { ...typography.h3, color: colors.neutral.text, marginBottom: spacing.md },
  faqCard: { padding: spacing.lg, marginBottom: spacing.sm },
  faqQ: { ...typography.body, color: colors.neutral.text, fontWeight: '600', marginBottom: spacing.xs },
  faqA: { ...typography.bodySmall, color: colors.neutral.textLight },
});
