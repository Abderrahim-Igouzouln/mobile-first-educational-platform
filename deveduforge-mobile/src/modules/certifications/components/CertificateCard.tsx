import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Download, Share2, ShieldCheck, Award } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import type { Certificate } from '../certifications.types';

interface CertificateCardProps {
  certificate: Certificate;
  onPress: () => void;
  onDownload?: () => void;
  onShare?: () => void;
  onVerify?: () => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  onPress,
  onDownload,
  onShare,
  onVerify,
}) => {
  const gradeColor = certificate.scorePercent >= 90 ? colors.semantic.success : certificate.scorePercent >= 70 ? colors.semantic.info : colors.semantic.warning;

  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
      <LinearGradient
        colors={['#F5F5F5', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.topRow}>
          <View style={styles.iconWrap}>
            <Award size={24} color={colors.brand.navy} />
          </View>
          <View style={styles.badgeWrap}>
            <View style={[styles.statusDot, { backgroundColor: colors.semantic.success }]} />
            <Text style={styles.badgeText}>Certifié</Text>
          </View>
        </View>

        <Text style={styles.techName} numberOfLines={1}>
          {certificate.technologyName}
        </Text>

        <View style={styles.metaRow}>
          <Award size={14} color={gradeColor} />
          <Text style={[styles.metaText, { color: gradeColor }]}>{certificate.scorePercent}%</Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.detailText}>Délivré le {certificate.issuedAt}</Text>
          <Text style={styles.detailText}>N° {certificate.certificateNumber}</Text>
        </View>

        <View style={styles.actions}>
          {onDownload && (
            <Pressable style={styles.actionBtn} onPress={(e) => { e?.stopPropagation?.(); onDownload(); }}>
              <Download size={16} color={colors.brand.navy} />
              <Text style={styles.actionLabel}>PDF</Text>
            </Pressable>
          )}
          {onShare && (
            <Pressable style={styles.actionBtn} onPress={(e) => { e?.stopPropagation?.(); onShare(); }}>
              <Share2 size={16} color={colors.brand.navy} />
              <Text style={styles.actionLabel}>Partager</Text>
            </Pressable>
          )}
          {onVerify && (
            <Pressable style={styles.actionBtn} onPress={(e) => { e?.stopPropagation?.(); onVerify(); }}>
              <ShieldCheck size={16} color={colors.semantic.success} />
              <Text style={[styles.actionLabel, { color: colors.semantic.success }]}>Vérifier</Text>
            </Pressable>
          )}
        </View>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: { borderRadius: radius.xl, overflow: 'hidden', ...shadows.sm },
  gradient: { padding: spacing.lg },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  iconWrap: { width: 44, height: 44, borderRadius: radius.md, backgroundColor: colors.neutral.surfaceAlt, justifyContent: 'center', alignItems: 'center' },
  badgeWrap: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  badgeText: { ...typography.label, color: colors.neutral.text },
  techName: { ...typography.h3, color: colors.neutral.text, marginBottom: spacing.xxs },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm, gap: spacing.xs },
  metaText: { ...typography.bodySmall, fontWeight: '600' },
  details: { marginBottom: spacing.md },
  detailText: { ...typography.bodySmall, color: colors.neutral.textLight, marginBottom: spacing.xxs },
  actions: { flexDirection: 'row', gap: spacing.sm, borderTopWidth: 1, borderTopColor: colors.neutral.border, paddingTop: spacing.md },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingVertical: spacing.xs, paddingHorizontal: spacing.md, borderRadius: radius.pill, backgroundColor: colors.neutral.surfaceAlt },
  actionLabel: { ...typography.label, fontSize: 11, color: colors.neutral.text },
});
