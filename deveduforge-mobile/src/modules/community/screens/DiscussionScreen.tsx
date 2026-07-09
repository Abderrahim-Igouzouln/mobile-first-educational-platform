import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { ArrowUp, ArrowDown, Bookmark, BookmarkCheck, ChevronLeft } from 'lucide-react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Avatar } from '../../../shared/components/ui/Avatar';
import { CommentItem } from '../components/CommentItem';
import { PostComposer } from '../components/PostComposer';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { useDiscussion, useComments } from '../services/communityService';
import type { Discussion, Comment, SortOption } from '../community.types';
import type { CommunityStackParamList } from '../../../core/navigation/navigation.types';

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

export default function DiscussionScreen() {
  const route = useRoute<RouteProp<CommunityStackParamList, 'DiscussionScreen'>>();
  const discussionId = route.params?.discussionId ?? '1';
  const { data: fetchedDiscussion } = useDiscussion(discussionId);
  const { data: fetchedComments } = useComments(discussionId);
  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('Populaires');

  useEffect(() => {
    if (fetchedDiscussion) setDiscussion(fetchedDiscussion);
  }, [fetchedDiscussion]);

  useEffect(() => {
    if (fetchedComments) setComments(fetchedComments);
  }, [fetchedComments]);

  const handleUpvote = () => {
    if (!discussion) return;
    setDiscussion((prev) => prev ? { ...prev, upvotes: prev.upvotes + 1 } : prev);
  };

  const handleDownvote = () => {
    if (!discussion) return;
    setDiscussion((prev) => prev ? { ...prev, downvotes: prev.downvotes + 1 } : prev);
  };

  const handleBookmark = () => {
    if (!discussion) return;
    setDiscussion((prev) => prev ? { ...prev, isBookmarked: !prev.isBookmarked } : prev);
  };

  const handleLikeComment = (commentId: string) => {
    const updateLikes = (items: Comment[]): Comment[] =>
      items.map((c) => {
        if (c.id === commentId) return { ...c, likes: c.likes + 1 };
        return { ...c, replies: updateLikes(c.replies) };
      });
    setComments(updateLikes(comments));
  };

  const handleReply = (_commentId: string) => {
    // In a real app, would focus the composer or open a reply input
  };

  const handleSubmitComment = (text: string) => {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: { id: 'current', name: 'Vous' },
      content: text,
      likes: 0,
      replies: [],
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => [...prev, newComment]);
  };

  if (!discussion) return null;

  const sortedComments = [...comments].sort((a, b) =>
    sortBy === 'Populaires' ? b.likes - a.likes : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const netVotes = discussion.upvotes - discussion.downvotes;

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite} statusBarStyle="dark">
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <Pressable style={styles.backButton} role="button" accessibilityLabel="Retour">
          <ChevronLeft size={24} color={colors.neutral.text} />
        </Pressable>

        <View style={styles.postContainer}>
          <View style={styles.authorRow}>
            <Avatar name={discussion.author.name} size={40} uri={discussion.author.avatar} />
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{discussion.author.name}</Text>
              <Text style={styles.postTime}>{timeAgo(discussion.createdAt)}</Text>
            </View>
          </View>

          <Text style={styles.title}>{discussion.title}</Text>
          <Text style={styles.content}>{discussion.content}</Text>

          <View style={styles.tagsRow}>
            {(discussion.tags ?? []).map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <View style={styles.postActions}>
            <View style={styles.voteRow}>
              <Pressable style={styles.voteButton} onPress={handleUpvote} role="button" accessibilityLabel="Voter pour">
                <ArrowUp size={20} color={colors.neutral.text} />
              </Pressable>
              <Text style={[styles.voteCount, netVotes > 0 && styles.votePositive]}>{netVotes}</Text>
              <Pressable style={styles.voteButton} onPress={handleDownvote} role="button" accessibilityLabel="Voter contre">
                <ArrowDown size={20} color={colors.neutral.text} />
              </Pressable>
            </View>
            <Pressable style={styles.bookmarkButton} onPress={handleBookmark} role="button" accessibilityLabel={discussion.isBookmarked ? 'Retirer des favoris' : 'Ajouter aux favoris'}>
              {discussion.isBookmarked ? (
                <BookmarkCheck size={20} color={colors.brand.orange} />
              ) : (
                <Bookmark size={20} color={colors.neutral.textMuted} />
              )}
            </Pressable>
          </View>
        </View>

        <View style={styles.commentsSection}>
          <View style={styles.commentsHeader}>
            <Text style={styles.commentsTitle}>
              {discussion.commentCount} réponse{discussion.commentCount > 1 ? 's' : ''}
            </Text>
            <View style={styles.sortRow}>
              {(['Populaires', 'Récents'] as SortOption[]).map((option) => (
                <Pressable
                  key={option}
                  style={[styles.sortChip, sortBy === option && styles.sortChipActive]}
                  onPress={() => setSortBy(option)}
                  role="button"
                  accessibilityState={{ selected: sortBy === option }}
                >
                  <Text style={[styles.sortText, sortBy === option && styles.sortTextActive]}>
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {sortedComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onLike={handleLikeComment}
              onReply={handleReply}
            />
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <PostComposer onSubmit={handleSubmitComment} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  backButton: {
    padding: spacing.lg,
    marginTop: spacing.sm,
  },
  postContainer: {
    backgroundColor: colors.neutral.surface,
    marginHorizontal: spacing.lg,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadows.sm,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  authorInfo: {
    marginLeft: spacing.sm,
  },
  authorName: {
    ...typography.body,
    fontWeight: '700',
    color: colors.neutral.text,
  },
  postTime: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    fontSize: 11,
  },
  title: {
    ...typography.h2,
    color: colors.neutral.text,
    marginBottom: spacing.md,
  },
  content: {
    ...typography.body,
    color: colors.neutral.textLight,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.md,
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
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
  },
  voteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  voteButton: {
    padding: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.neutral.surfaceAlt,
  },
  voteCount: {
    ...typography.h3,
    color: colors.neutral.text,
    minWidth: 28,
    textAlign: 'center',
  },
  votePositive: {
    color: colors.brand.orange,
  },
  bookmarkButton: {
    padding: spacing.sm,
  },
  commentsSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
  },
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  commentsTitle: {
    ...typography.h2,
    color: colors.neutral.text,
  },
  sortRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  sortChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.neutral.borderDark,
  },
  sortChipActive: {
    borderColor: colors.brand.orange,
    backgroundColor: colors.brand.offWhite,
  },
  sortText: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.neutral.textLight,
  },
  sortTextActive: {
    color: colors.brand.orange,
  },
  bottomSpacer: {
    height: 100,
  },
});
