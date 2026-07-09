import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Layout, Server, Smartphone, Cloud, Code2, FileJson, Terminal, Container, ChevronRight } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { CourseProgress } from './CourseProgress';
import type { Domain } from '../courses.types';

const ICON_MAP: Record<string, React.ElementType> = {
  Layout, Server, Smartphone, Cloud, Code2, FileJson, Terminal, Container,
};

interface DomainCardProps {
  domain: Domain;
  onPress: () => void;
}

export const DomainCard: React.FC<DomainCardProps> = ({ domain, onPress }) => {
  const IconComponent = domain.icon ? ICON_MAP[domain.icon] : null;
  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
      <LinearGradient
        colors={domain.gradientColors ?? ['#00205B', '#1A3A7A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.iconContainer}>
          {IconComponent && <IconComponent color="#FFFFFF" size={28} />}
        </View>
        <Text style={styles.name} numberOfLines={2}>
          {domain.name}
        </Text>
        <Text style={styles.techCount}>
          {domain.technologiesCount > 0
            ? `${domain.technologiesCount} technologie${domain.technologiesCount > 1 ? 's' : ''}`
            : 'Aucune technologie'}
        </Text>
        <CourseProgress
          completed={domain.completedCount}
          total={domain.technologiesCount}
          size="sm"
          showLabel={false}
        />
        <View style={styles.arrowContainer}>
          <ChevronRight size={16} color="rgba(255,255,255,0.6)" />
        </View>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '48%',
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  gradient: {
    borderRadius: radius.xl,
    padding: spacing.lg,
    minHeight: 170,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  name: {
    ...typography.h3,
    color: '#FFFFFF',
    marginBottom: spacing.xxs,
  },
  techCount: {
    ...typography.bodySmall,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: spacing.sm,
  },
  arrowContainer: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
  },
});
