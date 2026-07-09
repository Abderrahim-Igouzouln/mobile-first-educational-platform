import React from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { ArrowRight, Code2 } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import type { ContinueLearning } from '../home.types';

interface ContinueLearningCardProps {
  lesson: ContinueLearning;
  onPress?: () => void;
}

export const ContinueLearningCard: React.FC<ContinueLearningCardProps> = ({ lesson, onPress }) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.iconWrap}>
        <Code2 size={22} color={colors.brand.navy} />
      </View>
      <View style={styles.content}>
        <Text style={styles.techName} numberOfLines={1}>
          {lesson.technologyName}
        </Text>
        <Text style={styles.lessonTitle} numberOfLines={1}>
          {lesson.lessonTitle}
        </Text>
        <View style={styles.miniProgress}>
          <View style={styles.miniBar}>
            <View
              style={[
                styles.miniFill,
                { width: `${Math.min(lesson.progress, 100)}%` },
              ]}
            />
          </View>
          <Text style={styles.miniLabel}>{lesson.progress}%</Text>
        </View>
      </View>
      <ArrowRight size={18} color={colors.neutral.textMuted} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadows.sm,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.neutral.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
    marginRight: spacing.sm,
  },
  techName: {
    ...typography.label,
    color: colors.neutral.textMuted,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  lessonTitle: {
    ...typography.body,
    color: colors.neutral.text,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  miniProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  miniBar: {
    flex: 1,
    height: 4,
    backgroundColor: colors.neutral.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  miniFill: {
    height: '100%',
    backgroundColor: colors.brand.orange,
    borderRadius: 2,
  },
  miniLabel: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    width: 32,
    textAlign: 'right',
  },
});
