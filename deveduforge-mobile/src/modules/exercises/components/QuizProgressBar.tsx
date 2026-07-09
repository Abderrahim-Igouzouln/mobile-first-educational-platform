import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';

interface QuizProgressBarProps {
  current: number;
  total: number;
  timeFormatted: string;
  timeRemaining: number;
}

export const QuizProgressBar: React.FC<QuizProgressBarProps> = ({
  current,
  total,
  timeFormatted,
  timeRemaining,
}) => {
  const progress = total > 0 ? current / total : 0;
  const isLowTime = timeRemaining > 0 && timeRemaining <= 30;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.progressLabel}>
          {current}/{total}
        </Text>
        <View style={styles.timer}>
          <Clock size={14} color={isLowTime ? colors.semantic.error : colors.neutral.textLight} />
          <Text
            style={[
              styles.timerText,
              isLowTime && styles.timerLow,
            ]}
          >
            {timeFormatted}
          </Text>
        </View>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.neutral.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  progressLabel: {
    ...typography.h3,
    color: colors.neutral.text,
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  timerText: {
    ...typography.body,
    color: colors.neutral.textLight,
    fontWeight: '600',
  },
  timerLow: {
    color: colors.semantic.error,
  },
  track: {
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.neutral.surfaceAlt,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.brand.orange,
  },
});
