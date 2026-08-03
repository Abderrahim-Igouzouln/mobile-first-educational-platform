import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Heart, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react-native';
import { Avatar } from '../../../shared/components/ui/display/Avatar';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import type { Comment } from '../community.types';

interface CommentItemProps {
  comment: Comment;
  onLike: (commentId: string) => void;
  onReply: (commentId: string) => void;
  depth?: number;
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

export const CommentItem: React.FC<CommentItemProps> = ({ comment, onLike, onReply, depth = 0 }) => {
  const [showReplies, setShowReplies] = useState(true);
  const hasReplies = (comment.replies ?? []).length > 0;

  return (
    <View style={[styles.container, depth > 0 && styles.nestedContainer]}>
      <View style={styles.commentRow}>
        <Avatar name={comment.author.name} size={32} uri={comment.author.avatar} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.authorName}>{comment.author.name}</Text>
            <Text style={styles.timeText}>{timeAgo(comment.createdAt)}</Text>
          </View>
          <Text style={styles.body}>{comment.content}</Text>
          <View style={styles.actions}>
            <Pressable
              style={styles.actionButton}
              onPress={() => onLike(comment.id)}
              role="button"
              accessibilityLabel="Aimer ce commentaire"
            >
              <Heart size={14} color={colors.neutral.textMuted} />
              <Text style={styles.actionText}>{comment.likes}</Text>
            </Pressable>
            <Pressable
              style={styles.actionButton}
              onPress={() => onReply(comment.id)}
              role="button"
              accessibilityLabel="Répondre"
            >
              <MessageCircle size={14} color={colors.neutral.textMuted} />
              <Text style={styles.actionText}>Répondre</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {hasReplies && (
        <>
          <Pressable
            style={styles.toggleReplies}
            onPress={() => setShowReplies(!showReplies)}
            role="button"
            accessibilityLabel={showReplies ? 'Masquer les réponses' : 'Afficher les réponses'}
          >
            {showReplies ? (
              <ChevronUp size={14} color={colors.neutral.textMuted} />
            ) : (
              <ChevronDown size={14} color={colors.neutral.textMuted} />
            )}
            <Text style={styles.toggleText}>
              {showReplies ? 'Masquer' : `${(comment.replies ?? []).length} réponse${(comment.replies ?? []).length > 1 ? 's' : ''}`}
            </Text>
          </Pressable>

          {showReplies && (comment.replies ?? []).map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onLike={onLike}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.sm,
  },
  nestedContainer: {
    marginLeft: spacing.xl,
    paddingLeft: spacing.md,
    borderLeftWidth: 2,
    borderLeftColor: colors.neutral.border,
  },
  commentRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xxs,
  },
  authorName: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.neutral.text,
  },
  timeText: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    fontSize: 11,
  },
  body: {
    ...typography.body,
    color: colors.neutral.text,
    marginBottom: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    paddingVertical: spacing.xxs,
  },
  actionText: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    fontSize: 12,
  },
  toggleReplies: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
    marginLeft: spacing.xxl,
    paddingVertical: spacing.xs,
  },
  toggleText: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    fontWeight: '600',
    fontSize: 12,
  },
});
