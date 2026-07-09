import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { BookOpen } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';

interface ProgressCardProps {
  courseName: string;
  moduleLabel: string;
  progress: number;
  remainingLessons: number;
  style?: ViewStyle;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  courseName,
  moduleLabel,
  progress,
  remainingLessons,
  style,
}) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <BookOpen size={20} color="#FFFFFF" />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.courseName}>{courseName}</Text>
          <Text style={styles.moduleLabel}>{moduleLabel}</Text>
        </View>
      </View>
      <View style={styles.progressSection}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]} />
        </View>
        <View style={styles.progressMeta}>
          <Text style={styles.progressText}>{progress}%</Text>
          <Text style={styles.remainingText}>{remainingLessons} leçons restantes</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.brand.navy,
    borderRadius: radius.xl,
    padding: spacing.xl,
    ...shadows.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  textWrap: {
    flex: 1,
  },
  courseName: {
    ...typography.h3,
    color: '#FFFFFF',
  },
  moduleLabel: {
    ...typography.bodySmall,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  progressSection: {
    gap: spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.brand.orange,
    borderRadius: 4,
  },
  progressMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    ...typography.h2,
    color: colors.brand.orange,
  },
  remainingText: {
    ...typography.bodySmall,
    color: 'rgba(255,255,255,0.7)',
  },
});
