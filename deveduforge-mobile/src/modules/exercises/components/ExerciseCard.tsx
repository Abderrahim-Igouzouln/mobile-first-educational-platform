import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChevronRight, CheckCircle2, XCircle, Clock } from 'lucide-react-native';
import type { Exercise, DifficultyLevel } from '../exercises.types';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { Card } from '../../../shared/components/ui/Card';

interface ExerciseCardProps {
  exercise: Exercise;
  onPress: () => void;
}

const DIFFICULTY_CONFIG: Record<
  DifficultyLevel,
  { label: string; bg: string; text: string }
> = {
  facile: { label: 'Facile', bg: '#E8F5E9', text: colors.semantic.success },
  moyen: { label: 'Moyen', bg: '#FFF8E1', text: colors.semantic.warning },
  difficile: { label: 'Difficile', bg: '#FFEBEE', text: colors.semantic.error },
};

const STATUS_ICON = {
  pending: Clock,
  passed: CheckCircle2,
  failed: XCircle,
} as const;

const STATUS_COLOR = {
  pending: colors.neutral.textMuted,
  passed: colors.semantic.success,
  failed: colors.semantic.error,
} as const;

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onPress }) => {
  const diffConfig = DIFFICULTY_CONFIG[exercise.difficulty];
  const StatusIcon = STATUS_ICON[exercise.status];
  const statusColor = STATUS_COLOR[exercise.status];

  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.row}>
        <View style={styles.numberBadge}>
          <Text style={styles.numberText}>{exercise.number}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {exercise.title}
          </Text>

          <View style={styles.metaRow}>
            <View style={[styles.badge, { backgroundColor: diffConfig.bg }]}>
              <Text style={[styles.badgeText, { color: diffConfig.text }]}>
                {diffConfig.label}
              </Text>
            </View>

            <Text style={styles.questionCount}>
              {exercise.questionsCount} question{exercise.questionsCount > 1 ? 's' : ''}
            </Text>
          </View>

          {exercise.status !== 'pending' && (
            <View style={styles.scoreRow}>
              <StatusIcon size={14} color={statusColor} />
              <Text style={[styles.scoreText, { color: statusColor }]}>
                {exercise.bestScore != null ? `${exercise.bestScore}%` : 'Terminé'}
              </Text>
            </View>
          )}
        </View>

        <ChevronRight size={20} color={colors.neutral.textMuted} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.brand.offWhite,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  numberText: {
    ...typography.h3,
    color: colors.brand.navy,
  },
  content: {
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    ...typography.body,
    color: colors.neutral.text,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.pill,
  },
  badgeText: {
    ...typography.label,
    fontSize: 10,
    textTransform: 'uppercase',
  },
  questionCount: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  scoreText: {
    ...typography.bodySmall,
    fontWeight: '600',
  },
});
