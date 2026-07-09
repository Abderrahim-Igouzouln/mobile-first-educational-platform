import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HelpCircle, CheckCircle2, Clock, Percent } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface ResultStatsRowProps {
  totalQuestions: number;
  correctAnswers: number;
  duration: number;
  score: number;
}

const formatDuration = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
};

export const ResultStatsRow: React.FC<ResultStatsRowProps> = ({
  totalQuestions,
  correctAnswers,
  duration,
  score,
}) => {
  const stats: StatItem[] = [
    {
      icon: <HelpCircle size={20} color={colors.brand.navy} />,
      value: String(totalQuestions),
      label: 'Questions',
    },
    {
      icon: <CheckCircle2 size={20} color={colors.semantic.success} />,
      value: String(correctAnswers),
      label: 'Bonnes réponses',
    },
    {
      icon: <Clock size={20} color={colors.brand.orange} />,
      value: formatDuration(duration),
      label: 'Temps',
    },
    {
      icon: <Percent size={20} color={colors.neutral.textLight} />,
      value: `${score}%`,
      label: 'Score',
    },
  ];

  return (
    <View style={styles.container}>
      {stats.map((item, index) => (
        <View key={index} style={styles.item}>
          <View style={styles.iconWrap}>{item.icon}</View>
          <Text style={styles.value}>{item.value}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.xl,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.neutral.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xxs,
  },
  value: {
    ...typography.h2,
    color: colors.neutral.text,
  },
  label: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    textAlign: 'center',
  },
});
