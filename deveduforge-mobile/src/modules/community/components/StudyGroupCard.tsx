import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Users, Circle } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import type { StudyGroup } from '../community.types';

interface StudyGroupCardProps {
  group: StudyGroup;
  onPress: () => void;
  onJoinToggle: (groupId: string) => void;
}

export const StudyGroupCard: React.FC<StudyGroupCardProps> = ({ group, onPress, onJoinToggle }) => {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      role="button"
    >
      <View style={styles.topRow}>
        <View style={styles.iconContainer}>
          <Users size={20} color={colors.brand.navy} />
        </View>
        <View style={styles.activeBadge}>
          <Circle size={8} color={colors.semantic.success} fill={colors.semantic.success} />
          <Text style={styles.activeText}>{group.activeUsers} actifs</Text>
        </View>
      </View>

      <Text style={styles.name} numberOfLines={1}>{group.name}</Text>
      <Text style={styles.memberCount}>
        {group.memberCount} membre{group.memberCount > 1 ? 's' : ''}
      </Text>
      <Text style={styles.description} numberOfLines={2}>{group.description}</Text>

      <View style={styles.categoryTag}>
        <Text style={styles.categoryText}>{group.category}</Text>
      </View>

      <Pressable
        style={[styles.joinButton, group.isJoined && styles.joinButtonActive]}
        onPress={(e: any) => { e?.stopPropagation?.(); onJoinToggle(group.id); }}
        accessibilityLabel={group.isJoined ? 'Quitter le groupe' : 'Rejoindre le groupe'}
      >
        <Text style={[styles.joinText, group.isJoined && styles.joinTextActive]}>
          {group.isJoined ? 'Rejoint' : 'Rejoindre'}
        </Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginRight: spacing.md,
    width: 220,
    ...shadows.sm,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.brand.offWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.pill,
    backgroundColor: colors.semantic.successBg,
  },
  activeText: {
    ...typography.bodySmall,
    fontSize: 10,
    color: colors.semantic.success,
    fontWeight: '600',
  },
  name: {
    ...typography.h3,
    color: colors.neutral.text,
    marginBottom: spacing.xxs,
  },
  memberCount: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    marginBottom: spacing.md,
    lineHeight: 18,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.pill,
    backgroundColor: colors.brand.offWhite,
    marginBottom: spacing.md,
  },
  categoryText: {
    ...typography.bodySmall,
    fontSize: 10,
    color: colors.brand.navy,
    fontWeight: '600',
  },
  joinButton: {
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.brand.orange,
    alignItems: 'center',
  },
  joinButtonActive: {
    borderColor: colors.neutral.borderDark,
    backgroundColor: colors.neutral.surfaceAlt,
  },
  joinText: {
    ...typography.button,
    fontSize: 13,
    color: colors.brand.orange,
  },
  joinTextActive: {
    color: colors.neutral.textLight,
  },
});
