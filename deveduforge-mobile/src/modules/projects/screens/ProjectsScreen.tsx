import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TextInput, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Search, FolderOpen } from 'lucide-react-native';
import type { Project } from '../projects.types';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Chip } from '../../../shared/components/ui/Chip';
import { Card } from '../../../shared/components/ui/Card';
import { EmptyState } from '../../../shared/components/ui/EmptyState';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectStatusBadge } from '../components/ProjectStatusBadge';
import { useProjects, useMyProjects } from '../services/projectService';

type FilterKey = 'tous' | 'debutant' | 'intermediaire' | 'avance';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'tous', label: 'Tous' },
  { key: 'debutant', label: 'Débutant' },
  { key: 'intermediaire', label: 'Intermédiaire' },
  { key: 'avance', label: 'Avancé' },
];

export const ProjectsScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('tous');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: projects = [], isLoading } = useProjects();
  const { data: myProjects = [] } = useMyProjects();

  const filteredProjects = useMemo(() => {
    let result = projects;

    if (activeFilter !== 'tous') {
      result = result.filter((p) => p.difficulty === activeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [activeFilter, searchQuery, projects]);

  const handleProjectPress = (project: Project) => {
    // navigation.navigate('ProjectDetailScreen', { projectId: project.id });
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Projets pratiques</Text>
        <Text style={styles.headerSubtitle}>
          {isLoading ? 'Chargement...' : `${projects.length} projets disponibles`}
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={18} color={colors.neutral.textMuted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Rechercher un projet..."
          placeholderTextColor={colors.neutral.textMuted}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
        contentContainerStyle={styles.filterContent}
      >
        {FILTERS.map((filter) => (
          <Chip
            key={filter.key}
            label={filter.label}
            selected={activeFilter === filter.key}
            onPress={() => setActiveFilter(filter.key)}
          />
        ))}
      </ScrollView>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.brand.orange} />
        </View>
      ) : (
        <FlatList
          data={filteredProjects}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            myProjects.length > 0 ? (
              <View style={styles.myProjectsSection}>
                <Text style={styles.sectionTitle}>Mes projets</Text>
                {myProjects.slice(0, 3).map((project) => (
                  <Card key={project.id} style={styles.myProjectCard}>
                    <View style={styles.myProjectRow}>
                      <View style={styles.myProjectInfo}>
                        <Text style={styles.myProjectTitle} numberOfLines={1}>
                          {project.title}
                        </Text>
                        <ProjectStatusBadge status={project.status} />
                      </View>
                    </View>
                  </Card>
                ))}
                <Text style={styles.sectionTitle}>Tous les projets</Text>
              </View>
            ) : null
          }
          ListEmptyComponent={
            <EmptyState
              icon={FolderOpen}
              title="Aucun projet trouvé"
              message={searchQuery ? 'Essayez un autre terme de recherche.' : 'Aucun projet disponible pour ce filtre.'}
            />
          }
          renderItem={({ item }) => (
            <View style={styles.gridItem}>
              <ProjectCard project={item} onPress={() => handleProjectPress(item)} />
            </View>
          )}
        />
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    ...typography.h1,
    color: colors.neutral.text,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.xl,
    backgroundColor: colors.neutral.surfaceAlt,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 44,
    marginBottom: spacing.md,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.neutral.text,
    height: '100%',
    padding: 0,
  },
  filterRow: {
    marginBottom: spacing.lg,
  },
  filterContent: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  myProjectsSection: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.neutral.text,
    marginBottom: spacing.md,
    marginHorizontal: spacing.xl,
  },
  myProjectCard: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.sm,
  },
  myProjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  myProjectInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  myProjectTitle: {
    ...typography.body,
    color: colors.neutral.text,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: spacing.huge,
  },
  gridRow: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  gridItem: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
