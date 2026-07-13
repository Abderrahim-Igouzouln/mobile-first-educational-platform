import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Share, Platform } from 'react-native';
import { useNavigation, useRoute, RouteProp, CommonActions } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, Download, Share2, ShieldCheck, Award, Lock, CreditCard } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Button } from '../../../shared/components/ui/input/Button';
import { Modal } from '../../../shared/components/ui/display/Modal';
import { CertificatePreview } from '../components/CertificatePreview';
import type { CertificationStackParamList } from '../../../core/navigation/navigation.types';
import { useCertificates, useDownloadCertificate } from '../services/certificationService';

type NavProp = NativeStackNavigationProp<CertificationStackParamList, 'CertificationDetailScreen'>;
type ScreenRoute = RouteProp<CertificationStackParamList, 'CertificationDetailScreen'>;

export default function CertificateDetailScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();
  const { data: certificates = [] } = useCertificates();
  const downloadMutation = useDownloadCertificate();
  const certificate = certificates.find(c => c.id === route.params?.certificationId);
  const [fullScreenVisible, setFullScreenVisible] = useState(false);

  const isPaid = certificate?.status === 'paid';
  const isUnlocked = certificate?.status === 'unlocked';
  const isLocked = certificate?.status === 'locked';

  const handleDownload = useCallback(async () => {
    if (!certificate) return;
    try {
      const result = await downloadMutation.mutateAsync(certificate.id);
      const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:4000';
      const url = result.pdfUrl || `${apiBaseUrl}${result.pdfData ? '/api/v1/certifications/certificates/' + certificate.id + '/download' : ''}`;
      if (Platform.OS === 'web') {
        window.open(url, '_blank');
      } else {
        await Share.share({ url, message: `Mon certificat ${certificate.certificateNumber}` });
      }
    } catch {}
  }, [certificate, downloadMutation]);

  const handleShare = useCallback(async () => {
    if (!certificate) return;
    try {
      await Share.share({
        message: `Je viens d'obtenir mon certificat ${certificate.technologyName} sur DevEduForge ! 🎉`,
        url: certificate.verificationUrl ?? '',
      });
    } catch {}
  }, [certificate]);

  const handleVerify = useCallback(() => {
    if (!certificate?.verificationUrl) return;
    if (Platform.OS === 'web') {
      window.open(certificate.verificationUrl, '_blank');
    } else {
      navigation.navigate('CertificateViewScreen', { certificateNumber: certificate.certificateNumber });
    }
  }, [certificate, navigation]);

  const handlePay = useCallback(() => {
    if (!certificate) return;
    const parent = navigation.getParent();
    if (parent) {
      parent.dispatch(
        CommonActions.navigate({
          name: 'ProfileTab',
          params: {
            screen: 'PaymentScreen',
            params: {
              type: 'certificate',
              certificateId: certificate.id,
              amountMad: certificate.priceMad,
              technologyName: certificate.technologyName,
            },
          },
        })
      );
    }
  }, [certificate, navigation]);

  if (!certificate) return null;

  return (
    <ScreenWrapper backgroundColor={colors.neutral.surfaceAlt}>
      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color={colors.neutral.text} />
        </Pressable>
        <Text style={styles.topBarTitle}>
          {isPaid ? 'Mon Certificat' : isUnlocked ? 'Certificat débloqué' : 'Certificat verrouillé'}
        </Text>
        {isPaid && (
          <Pressable style={styles.fullscreenBtn} onPress={() => setFullScreenVisible(true)}>
            <Download size={20} color={colors.neutral.text} />
          </Pressable>
        )}
        {!isPaid && <View style={{ width: 36 }} />}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {isLocked && (
          <View style={styles.statusCard}>
            <View style={[styles.statusIconWrap, { backgroundColor: colors.neutral.border }]}>
              <Lock size={32} color={colors.neutral.textMuted} />
            </View>
            <Text style={styles.statusTitle}>Certificat verrouillé</Text>
            <Text style={styles.statusDesc}>
              Terminez le cours {certificate.technologyName} pour débloquer ce certificat.
            </Text>
          </View>
        )}

        {isUnlocked && (
          <View style={styles.statusCard}>
            <View style={[styles.statusIconWrap, { backgroundColor: colors.semantic.warning + '20' }]}>
              <Award size={32} color={colors.semantic.warning} />
            </View>
            <Text style={styles.statusTitle}>Certificat débloqué</Text>
            <Text style={styles.statusDesc}>
              Félicitations ! Vous avez complété le cours. Procédez au paiement pour obtenir votre certificat.
            </Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Prix</Text>
              <Text style={styles.priceValue}>{certificate.priceMad} MAD</Text>
            </View>
            <Button variant="primary" icon={CreditCard} fullWidth onPress={handlePay}>
              Payer {certificate.priceMad} MAD
            </Button>
          </View>
        )}

        {isPaid && (
          <>
            <CertificatePreview
              fullName={certificate.fullName ?? ''}
              technologyName={certificate.technologyName}
              issueDate={certificate.issuedAt ?? ''}
              certificateNumber={certificate.certificateNumber}
              verificationUrl={certificate.verificationUrl ?? ''}
              score={certificate.scorePercent}
            />

            <View style={styles.metaCard}>
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Award size={16} color={colors.neutral.textMuted} />
                  <Text style={styles.metaLabel}>Score</Text>
                  <Text style={[styles.metaValue, { color: colors.semantic.success }]}>
                    {certificate.scorePercent}%
                  </Text>
                </View>
                <View style={styles.metaDivider} />
                <View style={styles.metaItem}>
                  <Award size={16} color={colors.neutral.textMuted} />
                  <Text style={styles.metaLabel}>Délivré le</Text>
                  <Text style={styles.metaValue}>{certificate.issuedAt}</Text>
                </View>
              </View>
            </View>

            <View style={styles.actions}>
              <Button variant="primary" icon={Download} fullWidth onPress={handleDownload}>
                Télécharger PDF
              </Button>
              <View style={{ height: spacing.md }} />
              <Button variant="secondary" icon={Share2} fullWidth onPress={handleShare}>
                Partager
              </Button>
              <View style={{ height: spacing.md }} />
              <Button variant="outline" icon={ShieldCheck} fullWidth onPress={handleVerify}>
                Vérifier
              </Button>
            </View>
          </>
        )}

        <View style={{ height: spacing.huge }} />
      </ScrollView>

      <Modal
        visible={fullScreenVisible}
        title="Certificat"
        onClose={() => setFullScreenVisible(false)}
      >
        <CertificatePreview
          fullName={certificate.fullName ?? ''}
          technologyName={certificate.technologyName}
          issueDate={certificate.issuedAt ?? ''}
          certificateNumber={certificate.certificateNumber}
          verificationUrl={certificate.verificationUrl ?? ''}
          score={certificate.scorePercent}
        />
      </Modal>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.neutral.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  topBarTitle: {
    ...typography.h3,
    color: colors.neutral.text,
  },
  fullscreenBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.neutral.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  statusCard: {
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.lg,
    padding: spacing.xxl,
    alignItems: 'center',
    ...shadows.sm,
  },
  statusIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  statusTitle: {
    ...typography.h2,
    color: colors.neutral.text,
    marginBottom: spacing.sm,
  },
  statusDesc: {
    ...typography.body,
    color: colors.neutral.textLight,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: spacing.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.neutral.surfaceAlt,
    borderRadius: radius.md,
  },
  priceLabel: {
    ...typography.body,
    color: colors.neutral.textLight,
  },
  priceValue: {
    ...typography.h2,
    color: colors.semantic.warning,
  },
  metaCard: {
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
    ...shadows.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  metaItem: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.neutral.border,
    marginHorizontal: spacing.sm,
  },
  metaLabel: {
    ...typography.label,
    color: colors.neutral.textMuted,
    marginTop: spacing.xxs,
  },
  metaValue: {
    ...typography.body,
    color: colors.neutral.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  actions: {
    marginBottom: spacing.xl,
  },
});
