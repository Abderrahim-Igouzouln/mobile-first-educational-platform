import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Platform } from 'react-native';
import { Award, ShieldCheck } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';

interface CertificatePreviewProps {
  fullName: string;
  technologyName: string;
  issueDate: string;
  certificateNumber: string;
  verificationUrl: string;
  score?: number;
  domainColor?: string;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  fullName,
  technologyName,
  issueDate,
  certificateNumber,
  verificationUrl,
  score,
  domainColor,
}) => {
  const accentColor = domainColor || colors.brand.orange;

  return (
    <View style={styles.certificate}>
      <View style={[styles.borderTop, { backgroundColor: accentColor }]} />
      <View style={styles.borderPattern}>
        {Array.from({ length: 6 }).map((_, i) => (
          <View key={i} style={[styles.patternDot, { backgroundColor: accentColor + '30' }]} />
        ))}
      </View>

      <View style={styles.content}>
        <View style={styles.logoRow}>
          <View style={[styles.logoBadge, { backgroundColor: accentColor + '15' }]}>
            <Award size={28} color={accentColor} />
          </View>
          <View>
            <Text style={styles.logoText}>DevEduForge</Text>
            <Text style={styles.logoSub}>Certification Officielle</Text>
          </View>
        </View>

        <View style={styles.seal}>
          <View style={[styles.sealInner, { borderColor: accentColor }]}>
            <ShieldCheck size={28} color={accentColor} />
          </View>
        </View>

        <Text style={styles.certifies}>Certifie que</Text>
        <Text style={styles.fullName}>{fullName}</Text>
        <Text style={styles.hasCompleted}>a complété avec succès la certification</Text>
        <Text style={styles.techName}>{technologyName}</Text>

        {score !== undefined && (
          <View style={[styles.scoreBadge, { backgroundColor: accentColor + '12' }]}>
            <Text style={[styles.scoreValue, { color: accentColor }]}>Score: {score}%</Text>
          </View>
        )}

        <View style={styles.divider} />

        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <Text style={styles.footerLabel}>Date d'émission</Text>
            <Text style={styles.footerValue}>{issueDate}</Text>
          </View>
          <View style={styles.footerItem}>
            <Text style={styles.footerLabel}>N° Certificat</Text>
            <Text style={styles.footerValue}>{certificateNumber}</Text>
          </View>
        </View>

        <Text style={styles.verifyText}>Vérifier: {verificationUrl}</Text>
      </View>

      <View style={[styles.borderBottom, { backgroundColor: accentColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  certificate: {
    backgroundColor: '#FFFDF7',
    borderRadius: radius.xl,
    overflow: 'hidden',
    ...shadows.md,
  },
  borderTop: {
    height: 8,
  },
  borderBottom: {
    height: 8,
  },
  borderPattern: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  patternDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  content: {
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.xxl,
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  logoBadge: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    ...typography.h2,
    color: colors.brand.navy,
  },
  logoSub: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
  },
  seal: {
    position: 'absolute',
    top: spacing.xl,
    right: spacing.xl,
  },
  sealInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral.surface,
  },
  certifies: {
    ...typography.body,
    color: colors.neutral.textMuted,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  fullName: {
    ...typography.display,
    color: colors.neutral.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  hasCompleted: {
    ...typography.body,
    color: colors.neutral.textLight,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  techName: {
    ...typography.h1,
    color: colors.brand.navy,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  scoreBadge: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    marginBottom: spacing.xl,
  },
  scoreValue: {
    ...typography.h3,
  },
  divider: {
    width: '60%',
    height: 1,
    backgroundColor: colors.neutral.border,
    marginBottom: spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: spacing.lg,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerLabel: {
    ...typography.label,
    color: colors.neutral.textMuted,
    marginBottom: spacing.xs,
  },
  footerValue: {
    ...typography.body,
    color: colors.neutral.text,
    fontWeight: '600',
  },
  verifyText: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    fontStyle: 'italic',
  },
});
