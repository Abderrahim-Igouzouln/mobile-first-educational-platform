import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MessageSquare, ArrowUp, Clock } from 'lucide-react-native';
import { Avatar } from '../../../shared/components/ui/Avatar';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import type { Discussion } from '../community.types';

interface DiscussionCardProps {
  discussion: Discussion;
  onPress: () => void;
  compact?: boolean;
}

const timeAgo = (dateStr: string): string => {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return 'à l\'instant';
  if (diff < 3600) return `${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}j`;
  return new Date(dateStr).toLocaleDateString('fr-FR');
};

export const DiscussionCard: React.FC<DiscussionCardProps> = ({ discussion, onPress, compact }) => {
  const netVotes = discussion.upvotes - discussion.downvotes;

  return (
    <Pressable
      style={[styles.card, compact && styles.cardCompact]}
      onPress={onPress}
      role="button"
    >
      <View style={styles.header}>
        <Avatar name={discussion.author.name} size={compact ? 28 : 36} uri={discussion.author.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.authorName} numberOfLines={1}>{discussion.author.name}</Text>
          <View style={styles.metaRow}>
            <Clock size={12} color={colors.neutral.textMuted} />
            <Text style={styles.timeText}>{timeAgo(discussion.createdAt)}</Text>
          </View>
        </View>
      </View>

      <Text style={[styles.title, compact && styles.titleCompact]} numberOfLines={2}>
        {discussion.title}
      </Text>

      {!compact && (
        <Text style={styles.preview} numberOfLines={2}>
          {discussion.content}
        </Text>
      )}

      <View style={styles.tagsRow}>
        {(discussion.tags ?? []).slice(0, 3).map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <ArrowUp size={14} color={netVotes > 0 ? colors.brand.orange : colors.neutral.textMuted} />
          <Text style={[styles.footerText, netVotes > 0 && styles.footerHighlight]}>{netVotes}</Text>
        </View>
        <View style={styles.footerItem}>
          <MessageSquare size={14} color={colors.neutral.textMuted} />
          <Text style={styles.footerText}>{discussion.commentCount}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  cardCompact: {
    padding: spacing.md,
    marginBottom: 0,
    marginRight: spacing.md,
    width: 260,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  headerText: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  authorName: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.neutral.text,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    marginTop: 2,
  },
  timeText: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    fontSize: 11,
  },
  title: {
    ...typography.h3,
    color: colors.neutral.text,
    marginBottom: spacing.xs,
  },
  titleCompact: {
    ...typography.body,
    fontWeight: '600',
  },
  preview: {
    ...typography.body,
    color: colors.neutral.textLight,
    marginBottom: spacing.sm,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  tag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.pill,
    backgroundColor: colors.brand.offWhite,
  },
  tagText: {
    ...typography.bodySmall,
    fontSize: 11,
    color: colors.brand.navy,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  footerText: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    fontWeight: '600',
  },
  footerHighlight: {
    color: colors.brand.orange,
  },
});
