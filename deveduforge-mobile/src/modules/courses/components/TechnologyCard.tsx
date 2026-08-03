import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Code2, FileJson, Terminal, Smartphone, Container, Cloud, Lock } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { Badge } from '../../../shared/components/ui/display/Badge';
import { CourseProgress } from './CourseProgress';
import type { Technology } from '../courses.types';

const ICON_MAP: Record<string, React.ElementType> = {
  Code2, FileJson, Terminal, Smartphone, Container, Cloud,
};

interface TechnologyCardProps {
  technology: Technology;
  onPress: () => void;
}

const levelLabel: Record<string, string> = {
  debutant: 'Débutant',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé',
  expert: 'Expert',
};

const statusConfig: Record<
  string,
  { label: string; variant: 'success' | 'info' | 'warning' | 'default' }
> = {
  locked: { label: 'Locked', variant: 'default' },
  nouveau: { label: 'Nouveau', variant: 'warning' },
  en_cours: { label: 'En cours', variant: 'info' },
  termine: { label: 'Terminé', variant: 'success' },
};

export const TechnologyCard: React.FC<TechnologyCardProps> = ({ technology, onPress }) => {
  const isLocked = technology.isLocked;
  const IconComponent = technology.icon ? ICON_MAP[technology.icon] : null;
  const statusKey =
    technology.completedCoursesCount === technology.coursesCount && technology.coursesCount > 0
      ? 'termine'
      : technology.completedCoursesCount > 0
        ? 'en_cours'
        : 'nouveau';

  const badgeConfig = isLocked
    ? { label: 'Locked', variant: 'default' as const }
    : statusConfig[statusKey];

  return (
    <Pressable
      style={[styles.wrapper, isLocked && styles.wrapperLocked]}
      onPress={onPress}
      disabled={isLocked}
    >
      <View style={styles.card}>
        <View style={styles.topRow}>
          <View
            style={[
              styles.iconContainer,
              technology.domainColor && { backgroundColor: technology.domainColor + '20' },
            ]}
          >
            {IconComponent && (
              <IconComponent
                color={technology.domainColor || colors.brand.navy}
                size={24}
              />
            )}
          </View>
          <Badge label={badgeConfig.label} variant={badgeConfig.variant} />
        </View>

        <Text style={styles.name} numberOfLines={1}>
          {technology.name}
        </Text>

        {technology.description && (
          <Text style={styles.description} numberOfLines={2}>
            {technology.description}
          </Text>
        )}

        <View style={styles.levelRow}>
          <Text style={styles.levelLabel}>Niveau</Text>
          <View
            style={[
              styles.levelDot,
              { backgroundColor: levelColor(technology.level) },
            ]}
          />
          <Text style={[styles.levelValue, { color: levelColor(technology.level) }]}>
            {levelLabel[technology.level] || technology.level}
          </Text>
        </View>

        <CourseProgress
          completed={technology.completedCoursesCount}
          total={technology.coursesCount}
          size="sm"
          showLabel={true}
        />
      </View>

      {isLocked && (
        <LinearGradient
          colors={['rgba(11,18,32,0.6)', 'rgba(11,18,32,0.85)']}
          style={styles.lockOverlay}
        >
          <View style={styles.lockCircle}>
            <Lock size={24} color={colors.neutral.surface} />
          </View>
          <Text style={styles.lockText}>Contenu verrouillé</Text>
        </LinearGradient>
      )}
    </Pressable>
  );
};

const levelColor = (level: string): string => {
  switch (level) {
    case 'debutant':
      return colors.semantic.success;
    case 'intermediaire':
      return colors.semantic.info;
    case 'avance':
      return colors.semantic.warning;
    case 'expert':
      return colors.semantic.error;
    default:
      return colors.neutral.textMuted;
  }
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radius.xl,
    backgroundColor: colors.neutral.surface,
    ...shadows.sm,
    overflow: 'hidden',
  },
  wrapperLocked: {
    opacity: 0.9,
  },
  card: {
    padding: spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.neutral.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    ...typography.h3,
    color: colors.neutral.text,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    marginBottom: spacing.sm,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  levelLabel: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    marginRight: spacing.sm,
  },
  levelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  levelValue: {
    ...typography.bodySmall,
    fontWeight: '600',
  },
  lockOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.xl,
  },
  lockCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  lockText: {
    ...typography.body,
    color: colors.neutral.surface,
    fontWeight: '600',
  },
});
