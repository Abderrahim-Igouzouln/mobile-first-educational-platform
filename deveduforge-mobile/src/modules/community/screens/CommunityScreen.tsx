import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { Plus, Users, MessageSquare, Circle, TrendingUp } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { DiscussionCard } from '../components/DiscussionCard';
import { StudyGroupCard } from '../components/StudyGroupCard';
import { TopicChip } from '../components/TopicChip';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { useTrendingTopics, useDiscussions, useStudyGroups, useToggleJoinGroup } from '../services/communityService';
import type { StudyGroup } from '../community.types';

export default function CommunityScreen() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const { data: topics = [] } = useTrendingTopics();
  const { data: discussions = [] } = useDiscussions();
  const { data: fetchedGroups = [] } = useStudyGroups();
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const toggleJoinMutation = useToggleJoinGroup();

  useEffect(() => {
    if (fetchedGroups.length > 0) {
      setGroups(fetchedGroups);
    }
  }, [fetchedGroups]);

  const toggleTopic = (label: string) => {
    setSelectedTopics((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label],
    );
  };

  const handleJoinToggle = (groupId: string) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, isJoined: !g.isJoined } : g)),
    );
    toggleJoinMutation.mutate(groupId);
  };

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite} statusBarStyle="dark">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Communauté</Text>
          <Text style={styles.subtitle}>Apprenez ensemble</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Users size={20} color={colors.brand.orange} />
            <Text style={styles.statValue}>12,340+</Text>
            <Text style={styles.statLabel}>Membres</Text>
          </View>
          <View style={styles.statCard}>
            <MessageSquare size={20} color={colors.semantic.info} />
            <Text style={styles.statValue}>1,247</Text>
            <Text style={styles.statLabel}>Discussions</Text>
          </View>
          <View style={styles.statCard}>
            <Circle size={20} color={colors.semantic.success} />
            <Text style={styles.statValue}>89</Text>
            <Text style={styles.statLabel}>En ligne</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={18} color={colors.neutral.text} />
            <Text style={styles.sectionTitle}>Tendances</Text>
          </View>
          <View style={styles.topicsRow}>
            {topics.map((topic) => (
              <TopicChip
                key={topic.id}
                label={topic.label}
                count={topic.count}
                selected={selectedTopics.includes(topic.label)}
                onPress={() => toggleTopic(topic.label)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discussions populaires</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {discussions.slice(0, 4).map((discussion) => (
              <View key={discussion.id} style={styles.horizontalCard}>
                <DiscussionCard discussion={discussion} onPress={() => {}} compact />
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Questions récentes</Text>
          {discussions.map((discussion) => (
            <DiscussionCard key={discussion.id} discussion={discussion} onPress={() => {}} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Groupes d'étude</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {groups.map((group) => (
              <StudyGroupCard
                key={group.id}
                group={group}
                onPress={() => {}}
                onJoinToggle={handleJoinToggle}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <Pressable
        style={styles.fab}
        role="button"
        accessibilityLabel="Nouvelle publication"
      >
        <Plus size={24} color={colors.neutral.surface} />
      </Pressable>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
  },
  title: {
    ...typography.display,
    color: colors.neutral.text,
  },
  subtitle: {
    ...typography.bodyLarge,
    color: colors.neutral.textLight,
    marginTop: spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  statValue: {
    ...typography.h2,
    color: colors.neutral.text,
    marginTop: spacing.xs,
  },
  statLabel: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    marginTop: spacing.xxs,
  },
  section: {
    marginBottom: spacing.xxl,
    paddingLeft: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.neutral.text,
    marginBottom: spacing.md,
  },
  topicsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingRight: spacing.lg,
  },
  horizontalScroll: {
    marginBottom: spacing.sm,
    paddingRight: spacing.lg,
  },
  horizontalCard: {
    width: 260,
  },
  bottomSpacer: {
    height: 100,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.brand.orange,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
});
