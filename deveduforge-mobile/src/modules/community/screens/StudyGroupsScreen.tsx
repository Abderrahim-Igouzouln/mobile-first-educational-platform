import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Search, Plus, Users } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { StudyGroupCard } from '../components/StudyGroupCard';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { useStudyGroups, useToggleJoinGroup } from '../services/communityService';
import type { StudyGroup } from '../community.types';

const FILTERS = ['Tous', 'Rejoints', 'Programmation', 'DevOps', 'Mobile', 'Data Science', 'Design', 'Backend'];

export default function StudyGroupsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tous');
  const { data: fetchedGroups = [] } = useStudyGroups();
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const toggleJoinMutation = useToggleJoinGroup();

  useEffect(() => {
    if (fetchedGroups.length > 0) {
      setGroups(fetchedGroups);
    }
  }, [fetchedGroups]);

  const handleJoinToggle = (groupId: string) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, isJoined: !g.isJoined } : g)),
    );
    toggleJoinMutation.mutate(groupId);
  };

  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === 'Tous' ||
      (activeFilter === 'Rejoints' && group.isJoined) ||
      group.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite} statusBarStyle="dark">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Groupes d'étude</Text>
          <Text style={styles.subtitle}>
            {groups.length} groupes disponibles
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color={colors.neutral.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Rechercher un groupe..."
            placeholderTextColor={colors.neutral.textMuted}
            accessibilityLabel="Rechercher un groupe"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          {FILTERS.map((filter) => (
            <Pressable
              key={filter}
              style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
              onPress={() => setActiveFilter(filter)}
              role="button"
              accessibilityState={{ selected: activeFilter === filter }}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
                {filter}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {filteredGroups.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Users size={48} color={colors.neutral.textMuted} />
            <Text style={styles.emptyTitle}>Aucun groupe trouvé</Text>
            <Text style={styles.emptyText}>
              Essayez de modifier vos filtres ou votre recherche.
            </Text>
          </Card>
        ) : (
          <View style={styles.groupsList}>
            {filteredGroups.map((group) => (
              <StudyGroupCard
                key={group.id}
                group={group}
                onPress={() => {}}
                onJoinToggle={handleJoinToggle}
              />
            ))}
          </View>
        )}

        <Card style={styles.createCard}>
          <Users size={32} color={colors.brand.orange} />
          <Text style={styles.createTitle}>Vous ne trouvez pas votre groupe ?</Text>
          <Text style={styles.createText}>
            Créez votre propre groupe d'étude et invitez d'autres membres à vous rejoindre.
          </Text>
          <Button variant="primary" icon={Plus} onPress={() => {}}>
            Créer un groupe
          </Button>
        </Card>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.display,
    color: colors.neutral.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.neutral.textLight,
    marginTop: spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.surface,
    marginHorizontal: spacing.lg,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.neutral.border,
    ...shadows.sm,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.neutral.text,
    paddingVertical: spacing.md,
  },
  filtersScroll: {
    marginBottom: spacing.xxl,
  },
  filtersContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.neutral.borderDark,
    backgroundColor: colors.neutral.surface,
  },
  filterChipActive: {
    borderColor: colors.brand.orange,
    backgroundColor: colors.brand.offWhite,
  },
  filterText: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.neutral.textLight,
  },
  filterTextActive: {
    color: colors.brand.orange,
  },
  groupsList: {
    paddingHorizontal: spacing.lg,
  },
  emptyCard: {
    marginHorizontal: spacing.lg,
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.neutral.text,
    marginTop: spacing.md,
  },
  emptyText: {
    ...typography.body,
    color: colors.neutral.textLight,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  createCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xxl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  createTitle: {
    ...typography.h3,
    color: colors.neutral.text,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  createText: {
    ...typography.body,
    color: colors.neutral.textLight,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  bottomSpacer: {
    height: spacing.huge,
  },
});
