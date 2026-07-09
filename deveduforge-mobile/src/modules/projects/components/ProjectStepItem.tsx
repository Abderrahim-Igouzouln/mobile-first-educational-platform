import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CheckCircle2, Circle, ExternalLink } from 'lucide-react-native';
import type { ProjectStep } from '../projects.types';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';

interface ProjectStepItemProps {
  step: ProjectStep;
  onToggle: (stepId: string) => void;
}

export const ProjectStepItem: React.FC<ProjectStepItemProps> = ({ step, onToggle }) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => onToggle(step.id)}
    >
      <View style={styles.checkbox}>
        {step.completed ? (
          <CheckCircle2 size={24} color={colors.semantic.success} />
        ) : (
          <Circle size={24} color={colors.neutral.textMuted} />
        )}
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, step.completed && styles.titleCompleted]}>
          {step.title}
        </Text>
        <Text style={styles.description}>{step.description}</Text>

        {step.resources && (
          <View style={styles.resourceRow}>
            <ExternalLink size={14} color={colors.brand.orange} />
            <Text style={styles.resourceText}>{step.resources}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
  },
  checkbox: {
    marginRight: spacing.md,
    paddingTop: spacing.xxs,
  },
  content: {
    flex: 1,
  },
  title: {
    ...typography.body,
    color: colors.neutral.text,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  titleCompleted: {
    color: colors.neutral.textMuted,
    textDecorationLine: 'line-through',
  },
  description: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    marginBottom: spacing.sm,
  },
  resourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  resourceText: {
    ...typography.bodySmall,
    color: colors.brand.orange,
    fontWeight: '500',
  },
});
