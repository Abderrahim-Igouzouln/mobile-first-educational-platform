import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ProjectStatus } from '../projects.types';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
}

const STATUS_CONFIG: Record<ProjectStatus, { label: string; bg: string; text: string }> = {
  a_faire: { label: 'À faire', bg: '#F5F5F5', text: '#9E9E9E' },
  en_cours: { label: 'En cours', bg: '#E3F2FD', text: '#1565C0' },
  soumis: { label: 'Soumis', bg: '#FFF8E1', text: '#F57F17' },
  approuve: { label: 'Approuvé', bg: '#E8F5E9', text: '#2E7D32' },
  a_revoir: { label: 'À revoir', bg: '#FFF3E0', text: '#E65100' },
};

export const ProjectStatusBadge: React.FC<ProjectStatusBadgeProps> = ({ status }) => {
  const config = STATUS_CONFIG[status];

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.label, { color: config.text }]}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.pill,
  },
  label: {
    ...typography.label,
    fontSize: 11,
    textTransform: 'uppercase',
  },
});
