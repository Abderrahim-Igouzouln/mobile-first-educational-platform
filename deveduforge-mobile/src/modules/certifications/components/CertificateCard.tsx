import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Download, Share2, ShieldCheck, Award, Code2, FileJson, Terminal, Smartphone, Container, Cloud } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { Badge } from '../../../shared/components/ui/Badge';
import { CertificationBadge } from './CertificationBadge';
import type { Certificate } from '../certifications.types';

const ICON_MAP: Record<string, React.ElementType> = {
  Code2, FileJson, Terminal, Smartphone, Container, Cloud,
};

interface CertificateCardProps {
  certificate: Certificate;
  onPress: () => void;
  onDownload?: () => void;
  onShare?: () => void;
  onVerify?: () => void;
}

const levelLabel: Record<string, string> = {
  debutant: 'Débutant',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé',
  expert: 'Expert',
};

const levelColor: Record<string, string> = {
  debutant: colors.semantic.success,
  intermediaire: colors.semantic.info,
  avance: colors.semantic.warning,
  expert: colors.semantic.error,
};

export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  onPress,
  onDownload,
  onShare,
  onVerify,
}) => {
  const scorePercent = Math.round((certificate.score / certificate.totalQuestions) * 100);
  const gradeColor = scorePercent >= 90 ? colors.semantic.success : scorePercent >= 70 ? colors.semantic.info : colors.semantic.warning;
  const TechIcon = certificate.technologyIcon ? ICON_MAP[certificate.technologyIcon] : null;

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
            {TechIcon && (
              <TechIcon
                color={certificate.domainColor || colors.brand.navy}
                size={24}
              />
            )}
          </View>
          <CertificationBadge earned label="Certifié" />
        </View>

        <Text style={styles.techName} numberOfLines={1}>
          {certificate.technologyName}
        </Text>

        {certificate.domainName && (
          <Text style={styles.domainName}>{certificate.domainName}</Text>
        )}

        <View style={styles.metaRow}>
          <View style={[styles.levelDot, { backgroundColor: levelColor[certificate.level] || colors.neutral.textMuted }]} />
          <Text style={styles.metaText}>{levelLabel[certificate.level] || certificate.level}</Text>
          <View style={styles.metaSep} />
          <Award size={14} color={gradeColor} />
          <Text style={[styles.metaText, { color: gradeColor }]}>{scorePercent}%</Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.detailText}>Délivré le {certificate.issueDate}</Text>
          <Text style={styles.detailText}>N° {certificate.certificateNumber}</Text>
        </View>

        <View style={styles.actions}>
          {onDownload && (
            <Pressable style={styles.actionBtn} onPress={(e: any) => { e?.stopPropagation?.(); onDownload(); }}>
              <Download size={16} color={colors.brand.navy} />
              <Text style={styles.actionLabel}>PDF</Text>
            </Pressable>
          )}
          {onShare && (
            <Pressable style={styles.actionBtn} onPress={(e: any) => { e?.stopPropagation?.(); onShare(); }}>
              <Share2 size={16} color={colors.brand.navy} />
              <Text style={styles.actionLabel}>Partager</Text>
            </Pressable>
          )}
          {onVerify && (
            <Pressable style={styles.actionBtn} onPress={(e: any) => { e?.stopPropagation?.(); onVerify(); }}>
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
  wrapper: {
    borderRadius: radius.xl,
    overflow: 'hidden',
    ...shadows.sm,
  },
  gradient: {
    padding: spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.neutral.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  techName: {
    ...typography.h3,
    color: colors.neutral.text,
    marginBottom: spacing.xxs,
  },
  domainName: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    marginBottom: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  levelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  metaText: {
    ...typography.bodySmall,
    color: colors.neutral.text,
    fontWeight: '600',
  },
  metaSep: {
    width: 1,
    height: 12,
    backgroundColor: colors.neutral.border,
    marginHorizontal: spacing.sm,
  },
  details: {
    marginBottom: spacing.md,
  },
  detailText: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    marginBottom: spacing.xxs,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
    paddingTop: spacing.md,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.neutral.surfaceAlt,
  },
  actionLabel: {
    ...typography.label,
    fontSize: 11,
    color: colors.neutral.text,
  },
});
