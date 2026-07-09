import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert, Platform } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, Download, Share2, ShieldCheck, Maximize2, Award } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Button } from '../../../shared/components/ui/Button';
import { Modal } from '../../../shared/components/ui/Modal';
import { CertificatePreview } from '../components/CertificatePreview';
import type { CertificationStackParamList } from '../../../core/navigation/navigation.types';
import { useCertificates } from '../services/certificationService';

type NavProp = NativeStackNavigationProp<CertificationStackParamList, 'CertificationDetailScreen'>;
type ScreenRoute = RouteProp<CertificationStackParamList, 'CertificationDetailScreen'>;

export default function CertificateDetailScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();
  const { data: certificates = [] } = useCertificates();
  const certificate = certificates.find(c => c.id === route.params?.certificationId);
  const [fullScreenVisible, setFullScreenVisible] = useState(false);

  const displayScore = certificate?.totalQuestions && certificate.totalQuestions > 0
    ? Math.round((certificate.score / certificate.totalQuestions) * 100)
    : certificate?.score ?? 0;

  const displayLevel = certificate?.level
    ? certificate.level.charAt(0).toUpperCase() + certificate.level.slice(1)
    : 'N/A';

  const handleDownload = () => {
    Alert.alert('Téléchargement', 'Le certificat sera téléchargé au format PDF.');
  };

  const handleShare = () => {
    Alert.alert('Partager', 'Ouverture des options de partage...');
  };

  const handleVerify = () => {
    Alert.alert('Vérification', 'Redirection vers la page de vérification...');
  };

  if (!certificate) return null;

  return (
    <ScreenWrapper backgroundColor={colors.neutral.surfaceAlt}>
      <View style={styles.topBar}>
        <Pressable
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color={colors.neutral.text} />
        </Pressable>
        <Text style={styles.topBarTitle}>Mon Certificat</Text>
        <Pressable
          style={styles.fullscreenBtn}
          onPress={() => setFullScreenVisible(true)}
        >
          <Maximize2 size={20} color={colors.neutral.text} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <CertificatePreview
          fullName={certificate.fullName}
          technologyName={certificate.technologyName}
          issueDate={certificate.issueDate}
          certificateNumber={certificate.certificateNumber}
          verificationUrl={certificate.verificationUrl}
          score={displayScore}
          domainColor={certificate.domainColor || colors.brand.navy}
        />

        <View style={styles.metaCard}>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Award size={16} color={colors.neutral.textMuted} />
              <Text style={styles.metaLabel}>Domaine</Text>
              <Text style={styles.metaValue}>{certificate.domainName ?? 'N/A'}</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Award size={16} color={colors.neutral.textMuted} />
              <Text style={styles.metaLabel}>Niveau</Text>
              <Text style={styles.metaValue}>{displayLevel}</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Award size={16} color={colors.neutral.textMuted} />
              <Text style={styles.metaLabel}>Score</Text>
              <Text style={[styles.metaValue, { color: colors.semantic.success }]}>
                {displayScore}%
              </Text>
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

        <View style={{ height: spacing.huge }} />
      </ScrollView>

      <Modal
        visible={fullScreenVisible}
        title="Certificat"
        onClose={() => setFullScreenVisible(false)}
      >
        <CertificatePreview
          fullName={certificate.fullName}
          technologyName={certificate.technologyName}
          issueDate={certificate.issueDate}
          certificateNumber={certificate.certificateNumber}
          verificationUrl={certificate.verificationUrl}
          score={displayScore}
          domainColor={certificate.domainColor || colors.brand.navy}
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
