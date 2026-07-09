import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Code2, Server, Cloud, Brain } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import type { Domain } from '../home.types';

const ICON_MAP: Record<string, React.ElementType> = {
  Programmation: Code2,
  DevOps: Cloud,
  Systèmes: Server,
  IA: Brain,
};

interface DomainCardProps {
  domain: Domain;
  onPress?: () => void;
}

export const DomainCard: React.FC<DomainCardProps> = ({ domain, onPress }) => {
  const IconComponent = ICON_MAP[domain.name] || Code2;
  const gradientColor = domain.gradient?.[0] ?? '#00205B';

  return (
    <Pressable
      style={[styles.card, { backgroundColor: gradientColor }]}
      onPress={onPress}
    >
      <View style={styles.iconCircle}>
        <IconComponent size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.name}>{domain.name}</Text>
      <Text style={styles.techCount}>{domain.techCount} technologies</Text>
      {domain.isActive && (
        <View style={styles.activeBadge}>
          <Text style={styles.activeLabel}>Actif</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 130,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginRight: spacing.md,
    ...shadows.sm,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  name: {
    ...typography.h3,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  techCount: {
    ...typography.bodySmall,
    color: 'rgba(255,255,255,0.7)',
  },
  activeBadge: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  activeLabel: {
    ...typography.label,
    color: '#FFFFFF',
    fontSize: 10,
    textTransform: 'uppercase',
  },
});
