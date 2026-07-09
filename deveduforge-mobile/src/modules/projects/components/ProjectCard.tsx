import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Clock, FolderCode } from 'lucide-react-native';
import type { Project, DifficultyLevel } from '../projects.types';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { ProjectStatusBadge } from './ProjectStatusBadge';

interface ProjectCardProps {
  project: Project;
  onPress: () => void;
}

const DIFFICULTY_CONFIG: Record<DifficultyLevel, { label: string; bg: string; text: string }> = {
  debutant: { label: 'Débutant', bg: '#E8F5E9', text: colors.semantic.success },
  intermediaire: { label: 'Intermédiaire', bg: '#FFF8E1', text: colors.semantic.warning },
  avance: { label: 'Avancé', bg: '#FFEBEE', text: colors.semantic.error },
};

const GRADIENT_COLORS: Record<DifficultyLevel, readonly [string, string]> = {
  debutant: ['#E8F5E9', '#C8E6C9'] as const,
  intermediaire: ['#FFF8E1', '#FFECB3'] as const,
  avance: ['#FFEBEE', '#FFCDD2'] as const,
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onPress }) => {
  const diffConfig = DIFFICULTY_CONFIG[project.difficulty];
  const [gradientStart, gradientEnd] = GRADIENT_COLORS[project.difficulty];

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={[styles.imagePlaceholder, { backgroundColor: gradientStart }]}>
        <FolderCode size={32} color={diffConfig.text} />
      </View>

      <View style={styles.body}>
        <View style={styles.difficultyRow}>
          <View style={[styles.difficultyBadge, { backgroundColor: diffConfig.bg }]}>
            <Text style={[styles.difficultyText, { color: diffConfig.text }]}>
              {diffConfig.label}
            </Text>
          </View>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {project.title}
        </Text>

        <View style={styles.techRow}>
          {project.technologies.slice(0, 3).map((tech) => (
            <View key={tech} style={styles.techTag}>
              <Text style={styles.techTagText}>{tech}</Text>
            </View>
          ))}
          {project.technologies.length > 3 && (
            <Text style={styles.techMore}>+{project.technologies.length - 3}</Text>
          )}
        </View>

        <View style={styles.footer}>
          <View style={styles.durationRow}>
            <Clock size={14} color={colors.neutral.textMuted} />
            <Text style={styles.durationText}>{project.duration}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  imagePlaceholder: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    padding: spacing.md,
  },
  difficultyRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.pill,
  },
  difficultyText: {
    ...typography.label,
    fontSize: 10,
    textTransform: 'uppercase',
  },
  title: {
    ...typography.body,
    color: colors.neutral.text,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  techRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  techTag: {
    backgroundColor: colors.neutral.surfaceAlt,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.sm,
  },
  techTagText: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    fontSize: 10,
  },
  techMore: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    fontSize: 10,
    alignSelf: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  durationText: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
  },
});
