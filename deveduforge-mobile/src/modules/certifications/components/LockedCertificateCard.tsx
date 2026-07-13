import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Lock, Award, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import type { Certificate } from '../certifications.types';

interface LockedCertificateCardProps {
  certificate: Certificate;
  progressPercent?: number;
  onPress: () => void;
  onPay?: () => void;
}

export const LockedCertificateCard: React.FC<LockedCertificateCardProps> = ({
  certificate,
  progressPercent = 0,
  onPress,
  onPay,
}) => {
  const isLocked = certificate.status === 'locked';
  const isUnlocked = certificate.status === 'unlocked';

  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
      <LinearGradient
        colors={isLocked ? ['#F0F0F0', '#FAFAFA'] : ['#FFF8E1', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.topRow}>
          <View style={[styles.iconWrap, isLocked && styles.iconWrapLocked]}>
            {isLocked ? (
              <Lock size={22} color={colors.neutral.textMuted} />
            ) : (
              <Award size={22} color={colors.semantic.warning} />
            )}
          </View>
          <View style={[styles.statusBadge, { backgroundColor: isLocked ? colors.neutral.surfaceAlt : colors.semantic.warning + '20' }]}>
            <Text style={[styles.statusText, { color: isLocked ? colors.neutral.textMuted : colors.semantic.warning }]}>
              {isLocked ? 'Verrouillé' : 'Débloqué'}
            </Text>
          </View>
        </View>

        <Text style={[styles.techName, isLocked && styles.techNameLocked]} numberOfLines={1}>
          {certificate.technologyName}
        </Text>

        {isLocked && (
          <View style={styles.progressSection}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${Math.min(progressPercent, 100)}%` }]} />
            </View>
            <Text style={styles.progressText}>{Math.round(progressPercent)}% du cours complété</Text>
            <Text style={styles.lockedHint}>Terminez le cours pour débloquer ce certificat</Text>
          </View>
        )}

        {isUnlocked && (
          <View style={styles.unlockedSection}>
            <Text style={styles.priceText}>{certificate.priceMad} MAD</Text>
            <Text style={styles.unlockedHint}>Certificat débloqué — procédez au paiement pour l'obtenir</Text>
            {onPay && (
              <Pressable style={styles.payBtn} onPress={(e) => { e?.stopPropagation?.(); onPay(); }}>
                <Award size={16} color={colors.neutral.surface} />
                <Text style={styles.payBtnText}>Payer maintenant</Text>
              </Pressable>
            )}
          </View>
        )}

        <View style={styles.viewRow}>
          <Award size={14} color={isLocked ? colors.neutral.textMuted : colors.semantic.warning} />
          <Text style={[styles.viewText, isLocked && styles.viewTextLocked]}>
            Voir les détails
          </Text>
          <ChevronRight size={14} color={isLocked ? colors.neutral.textMuted : colors.neutral.text} />
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
  iconWrapLocked: { backgroundColor: colors.neutral.border },
  statusBadge: { paddingHorizontal: spacing.md, paddingVertical: spacing.xxs, borderRadius: radius.pill },
  statusText: { ...typography.label, fontSize: 11 },
  techName: { ...typography.h3, color: colors.neutral.text, marginBottom: spacing.xs },
  techNameLocked: { color: colors.neutral.textMuted },
  progressSection: { marginBottom: spacing.md },
  progressBarBg: { height: 6, borderRadius: 3, backgroundColor: colors.neutral.border, marginBottom: spacing.sm, overflow: 'hidden' },
  progressBarFill: { height: 6, borderRadius: 3, backgroundColor: colors.brand.navy },
  progressText: { ...typography.label, color: colors.neutral.textMuted, marginBottom: spacing.xxs },
  lockedHint: { ...typography.bodySmall, color: colors.neutral.textLight, fontStyle: 'italic' },
  unlockedSection: { marginBottom: spacing.md },
  priceText: { ...typography.h2, color: colors.semantic.warning, marginBottom: spacing.xxs },
  unlockedHint: { ...typography.bodySmall, color: colors.neutral.textLight, marginBottom: spacing.sm },
  payBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: colors.semantic.warning, paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, borderRadius: radius.md, alignSelf: 'flex-start' },
  payBtnText: { ...typography.label, color: colors.neutral.surface, fontWeight: '700' },
  viewRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, borderTopWidth: 1, borderTopColor: colors.neutral.border, paddingTop: spacing.md },
  viewText: { ...typography.bodySmall, color: colors.neutral.text, fontWeight: '600' },
  viewTextLocked: { color: colors.neutral.textMuted },
});
