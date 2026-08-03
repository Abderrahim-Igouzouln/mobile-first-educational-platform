import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Share, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, Download, Share2, ShieldCheck, Award } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { Card } from '../../../shared/components/ui/display/Card';
import { Badge } from '../../../shared/components/ui/display/Badge';
import type { CertificationStackParamList } from '../../../core/navigation/navigation.types';
import { useCertificates } from '../services/certificationService';

type NavProp = NativeStackNavigationProp<CertificationStackParamList, 'CertificateViewScreen'>;
type ScreenRoute = RouteProp<CertificationStackParamList, 'CertificateViewScreen'>;

export default function CertificateViewScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();
  const { certificateNumber } = route.params;
  const { data: certificates = [] } = useCertificates();
  const certificate = certificates.find(c => c.certificateNumber === certificateNumber || c.id === certificateNumber);

  if (!certificate) {
    return (
      <ScreenWrapper backgroundColor={colors.brand.offWhite} statusBarStyle="dark">
        <View style={styles.center}>
          <Award size={64} color={colors.neutral.textMuted} />
          <Text style={styles.notFoundTitle}>Certificat introuvable</Text>
          <Text style={styles.notFoundText}>Aucun certificat trouvé avec ce numéro.</Text>
          <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>Retour</Text>
          </Pressable>
        </View>
      </ScreenWrapper>
    );
  }

  const handleDownload = () => {
    Alert.alert('Téléchargement', 'Le certificat sera téléchargé au format PDF.');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `J'ai obtenu mon certificat "${certificate.technologyName}" sur DevEduForge !`,
      });
    } catch {
      // user cancelled
    }
  };

  const handleVerify = () => {
    Alert.alert(
      'Vérification',
      `Numéro de certificat : ${certificate.certificateNumber}\n\nVous pouvez vérifier ce certificat sur notre plateforme.`,
    );
  };

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite} statusBarStyle="dark">
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={colors.neutral.text} />
        </Pressable>

        <View style={styles.certificateCard}>
          <View style={styles.certHeader}>
            <Award size={48} color={colors.brand.orange} />
            <Text style={styles.certTitle}>{certificate.technologyName}</Text>
            <Text style={styles.certSubtitle}>DevEduForge</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.certBody}>
            <Text style={styles.certLabel}>Décerné à</Text>
            <Text style={styles.certRecipient}>{certificate.fullName}</Text>

            <Text style={styles.certLabel}>Date d'obtention</Text>
            <Text style={styles.certValue}>
              {certificate.issuedAt
                ? new Date(certificate.issuedAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : '—'}
            </Text>

            <Text style={styles.certLabel}>Numéro de certificat</Text>
            <Text style={styles.certValueMono}>{certificate.certificateNumber}</Text>

            <View style={styles.scoreRow}>
              <Badge variant="success" label={`Score : ${certificate.scorePercent}%`} />
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.actionBtn} onPress={handleDownload}>
            <Download size={20} color={colors.neutral.text} />
            <Text style={styles.actionText}>Télécharger</Text>
          </Pressable>
          <Pressable style={styles.actionBtn} onPress={handleShare}>
            <Share2 size={20} color={colors.neutral.text} />
            <Text style={styles.actionText}>Partager</Text>
          </Pressable>
          <Pressable style={styles.actionBtn} onPress={handleVerify}>
            <ShieldCheck size={20} color={colors.neutral.text} />
            <Text style={styles.actionText}>Vérifier</Text>
          </Pressable>
        </View>

        <Card style={styles.verifyCard}>
          <ShieldCheck size={24} color={colors.brand.orange} />
          <Text style={styles.verifyText}>
            Ce certificat est vérifiable. Partagez le numéro avec un employeur pour qu'il puisse
            confirmer son authenticité.
          </Text>
        </Card>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: spacing.lg, paddingBottom: spacing.huge },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xxl },
  notFoundTitle: { ...typography.h2, color: colors.neutral.text, marginTop: spacing.lg },
  notFoundText: { ...typography.body, color: colors.neutral.textLight, marginTop: spacing.sm, textAlign: 'center' },
  backBtn: { marginTop: spacing.xxl, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, backgroundColor: colors.brand.orange, borderRadius: radius.md },
  backBtnText: { ...typography.body, color: colors.neutral.surface, fontWeight: '700' },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md },
  certificateCard: { backgroundColor: colors.neutral.surface, borderRadius: radius.xl, padding: spacing.xxl, ...shadows.md, borderWidth: 1, borderColor: colors.neutral.border },
  certHeader: { alignItems: 'center', gap: spacing.sm },
  certTitle: { ...typography.h1, color: colors.neutral.text, textAlign: 'center' },
  certSubtitle: { ...typography.bodyLarge, color: colors.brand.orange, fontWeight: '700' },
  divider: { height: 1, backgroundColor: colors.neutral.border, marginVertical: spacing.xl },
  certBody: { gap: spacing.sm },
  certLabel: { ...typography.label, color: colors.neutral.textMuted, textTransform: 'uppercase', marginTop: spacing.sm },
  certRecipient: { ...typography.h2, color: colors.neutral.text },
  certValue: { ...typography.body, color: colors.neutral.textLight },
  certValueMono: { ...typography.code, color: colors.neutral.text, fontSize: 13 },
  scoreRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  actions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: spacing.xxl, marginBottom: spacing.lg },
  actionBtn: { alignItems: 'center', gap: spacing.xs, padding: spacing.md },
  actionText: { ...typography.bodySmall, color: colors.neutral.text, fontWeight: '600' },
  verifyCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg },
  verifyText: { ...typography.bodySmall, color: colors.neutral.textLight, flex: 1 },
});
