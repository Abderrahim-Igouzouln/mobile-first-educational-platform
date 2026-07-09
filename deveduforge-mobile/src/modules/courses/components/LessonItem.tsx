import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CheckCircle2, PlayCircle, Lock, ChevronRight, FileText, Video, Code2, StickyNote } from 'lucide-react-native';
import { LucideIcon } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import type { Lesson, LessonStatus } from '../courses.types';

interface LessonItemProps {
  lesson: Lesson;
  index: number;
  onPress: () => void;
}

const statusIcon: Record<LessonStatus, LucideIcon> = {
  completed: CheckCircle2,
  current: PlayCircle,
  locked: Lock,
  available: PlayCircle,
};

const statusColor: Record<LessonStatus, string> = {
  completed: colors.semantic.success,
  current: colors.brand.orange,
  locked: colors.neutral.textMuted,
  available: colors.neutral.textLight,
};

const typeIcon: Record<string, LucideIcon> = {
  lecture: FileText,
  video: Video,
  exercise: Code2,
  project: StickyNote,
  quiz: StickyNote,
};

export const LessonItem: React.FC<LessonItemProps> = ({ lesson, index, onPress }) => {
  const StatusIcon = statusIcon[lesson.status];
  const statusCol = statusColor[lesson.status];
  const TypeIcon = typeIcon[lesson.type] || FileText;

  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      disabled={lesson.status === 'locked'}
    >
      <View style={[styles.numberCircle, { borderColor: statusCol }]}>
        {lesson.status === 'completed' ? (
          <StatusIcon size={18} color={statusCol} />
        ) : (
          <Text style={[styles.numberText, { color: statusCol }]}>{index + 1}</Text>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <TypeIcon size={14} color={colors.neutral.textMuted} style={styles.typeIcon} />
          <Text
            style={[
              styles.title,
              lesson.status === 'locked' && styles.titleLocked,
              lesson.status === 'completed' && styles.titleCompleted,
            ]}
            numberOfLines={1}
          >
            {lesson.title}
          </Text>
        </View>

        <View style={styles.metaRow}>
          {lesson.duration > 0 && (
            <Text style={styles.meta}>
              {Math.ceil(lesson.duration / 60)} min
            </Text>
          )}
          {lesson.exercisesCount > 0 && (
            <>
              <Text style={styles.metaSeparator}>·</Text>
              <Text style={styles.meta}>
                {lesson.exercisesCount} exercice{lesson.exercisesCount > 1 ? 's' : ''}
              </Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.rightSection}>
        {lesson.status === 'current' && (
          <View style={styles.currentBadge}>
            <Text style={styles.currentBadgeText}>En cours</Text>
          </View>
        )}
        <ChevronRight
          size={16}
          color={lesson.status === 'locked' ? colors.neutral.textMuted : colors.neutral.textLight}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  numberCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  numberText: {
    ...typography.h3,
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xxs,
  },
  typeIcon: {
    marginRight: spacing.xs,
  },
  title: {
    ...typography.body,
    color: colors.neutral.text,
    flex: 1,
  },
  titleLocked: {
    color: colors.neutral.textMuted,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.neutral.textLight,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meta: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
  },
  metaSeparator: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    marginHorizontal: spacing.xs,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  currentBadge: {
    backgroundColor: colors.brand.orange + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.pill,
    marginRight: spacing.sm,
  },
  currentBadgeText: {
    ...typography.label,
    fontSize: 10,
    color: colors.brand.orange,
  },
});
