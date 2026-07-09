import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  ArrowLeft,
  ChevronRight,
  FileUp,
  Send,
  RotateCcw,
  ExternalLink,
} from 'lucide-react-native';
import type { Project, ProjectStep } from '../projects.types';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Button } from '../../../shared/components/ui/Button';
import { Card } from '../../../shared/components/ui/Card';
import { ProjectStatusBadge } from '../components/ProjectStatusBadge';
import { ProjectStepItem } from '../components/ProjectStepItem';
import { SubmissionCard } from '../components/SubmissionCard';
import { useProjectDetail } from '../services/projectService';

type TabKey = 'enonce' | 'etapes' | 'rendu';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'enonce', label: 'Énoncé' },
  { key: 'etapes', label: 'Étapes' },
  { key: 'rendu', label: 'Rendu' },
];

export const ProjectDetailScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('etapes');
  const [submissionDescription, setSubmissionDescription] = useState('');

  const { data: project, isLoading } = useProjectDetail('p1');

  const [steps, setSteps] = useState<ProjectStep[]>([]);

  React.useEffect(() => {
    if (project) {
      setSteps(project.steps);
    }
  }, [project]);

  const handleToggleStep = (stepId: string) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, completed: !s.completed } : s)),
    );
  };

  const completedSteps = steps.filter((s) => s.completed).length;
  const totalSteps = steps.length;

  const statusVariant = (() => {
    switch (project?.status) {
      case 'approuve':
        return 'success' as const;
      case 'a_revoir':
        return 'warning' as const;
      case 'soumis':
        return 'info' as const;
      case 'en_cours':
        return 'info' as const;
      default:
        return 'default' as const;
    }
  })();

  if (isLoading) {
    return (
      <ScreenWrapper>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.brand.orange} />
        </View>
      </ScreenWrapper>
    );
  }

  if (!project) {
    return (
      <ScreenWrapper>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>Projet introuvable</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.topBar}>
        <Pressable style={styles.backButton}>
          <ArrowLeft size={20} color={colors.neutral.text} />
        </Pressable>
        <Text style={styles.topTitle} numberOfLines={1}>
          {project.title}
        </Text>
        <View style={styles.backButton} />
      </View>

      <View style={styles.statusRow}>
        <ProjectStatusBadge status={project.status} />
        <View style={styles.durationBadge}>
          <Text style={styles.durationBadgeText}>{project.duration}</Text>
        </View>
      </View>

      <View style={styles.tabRow}>
        {TABS.map((tab) => (
          <Pressable
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {activeTab === 'enonce' && (
        <ScrollView
          style={styles.tabContent}
          contentContainerStyle={styles.tabContentInner}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{project.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Prérequis et livrables</Text>
            {(project.requirements ?? []).map((req, index) => (
              <View key={index} style={styles.requirementRow}>
                <View style={styles.bullet} />
                <Text style={styles.requirementText}>{req}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technologies utilisées</Text>
            <View style={styles.techRow}>
              {(project.technologies ?? []).map((tech) => (
                <View key={tech} style={styles.techTag}>
                  <Text style={styles.techTagText}>{tech}</Text>
                </View>
              ))}
            </View>
          </View>

          {project.resources && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ressources</Text>
              {project.resources.map((res, index) => (
                <Pressable key={index} style={styles.resourceRow}>
                  <ExternalLink size={16} color={colors.brand.orange} />
                  <Text style={styles.resourceText}>{res.label}</Text>
                  <ChevronRight size={16} color={colors.neutral.textMuted} />
                </Pressable>
              ))}
            </View>
          )}
        </ScrollView>
      )}

      {activeTab === 'etapes' && (
        <ScrollView
          style={styles.tabContent}
          contentContainerStyle={styles.tabContentInner}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.progressRow}>
            <Text style={styles.progressText}>
              {completedSteps}/{totalSteps} étapes complétées
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(completedSteps / totalSteps) * 100}%` },
                ]}
              />
            </View>
          </View>

          {steps.map((step) => (
            <ProjectStepItem key={step.id} step={step} onToggle={handleToggleStep} />
          ))}
        </ScrollView>
      )}

      {activeTab === 'rendu' && (
        <ScrollView
          style={styles.tabContent}
          contentContainerStyle={styles.tabContentInner}
          showsVerticalScrollIndicator={false}
        >
          {project.userSubmission && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Soumission précédente</Text>
              <SubmissionCard submission={project.userSubmission} />
              {project.status === 'a_revoir' && (
                <Button
                  variant="outline"
                  icon={RotateCcw}
                  fullWidth
                  onPress={() => {}}
                >
                  Rouvrir et modifier
                </Button>
              )}
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nouvelle soumission</Text>

            <View style={styles.uploadArea}>
              <FileUp size={32} color={colors.neutral.textMuted} />
              <Text style={styles.uploadText}>
                Appuyez pour joindre un fichier ou une capture d'écran
              </Text>
            </View>

            <TextInput
              style={styles.textArea}
              value={submissionDescription}
              onChangeText={setSubmissionDescription}
              placeholder="Ajoutez une description de votre travail..."
              placeholderTextColor={colors.neutral.textMuted}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <Button icon={Send} fullWidth onPress={() => {}}>
              Soumettre
            </Button>
          </View>
        </ScrollView>
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.neutral.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTitle: {
    ...typography.h3,
    color: colors.neutral.text,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: spacing.sm,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  durationBadge: {
    backgroundColor: colors.neutral.surfaceAlt,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.pill,
  },
  durationBadgeText: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    fontWeight: '500',
  },
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    backgroundColor: colors.neutral.surfaceAlt,
    borderRadius: radius.md,
    padding: spacing.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.md - 2,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.neutral.surface,
    ...shadows.sm,
  },
  tabText: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.brand.orange,
  },
  tabContent: {
    flex: 1,
  },
  tabContentInner: {
    paddingHorizontal: spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? spacing.xxxl : spacing.xxl,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.neutral.text,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.bodyLarge,
    color: colors.neutral.textLight,
    lineHeight: 24,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brand.orange,
    marginTop: 6,
  },
  requirementText: {
    ...typography.body,
    color: colors.neutral.textLight,
    flex: 1,
  },
  techRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  techTag: {
    backgroundColor: colors.brand.offWhite,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  techTagText: {
    ...typography.bodySmall,
    color: colors.brand.navy,
    fontWeight: '600',
  },
  resourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.border,
    gap: spacing.sm,
  },
  resourceText: {
    ...typography.body,
    color: colors.brand.orange,
    fontWeight: '500',
    flex: 1,
  },
  progressRow: {
    marginBottom: spacing.lg,
  },
  progressText: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.neutral.surfaceAlt,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.brand.orange,
    borderRadius: 3,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: colors.neutral.border,
    borderStyle: 'dashed',
    borderRadius: radius.md,
    paddingVertical: spacing.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    backgroundColor: colors.neutral.surfaceAlt,
  },
  uploadText: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  textArea: {
    ...typography.body,
    color: colors.neutral.text,
    backgroundColor: colors.neutral.surface,
    borderWidth: 1.5,
    borderColor: colors.neutral.border,
    borderRadius: radius.md,
    padding: spacing.md,
    minHeight: 100,
    marginBottom: spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...typography.body,
    color: colors.neutral.textMuted,
  },
});
