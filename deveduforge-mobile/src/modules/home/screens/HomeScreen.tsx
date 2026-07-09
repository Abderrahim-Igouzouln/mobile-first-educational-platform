import React, { useCallback } from 'react';
import { ScrollView, RefreshControl, View, Text, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { Header } from '../components/Header';
import { ProgressCard } from '../components/ProgressCard';
import { DomainCarousel } from '../components/DomainCarousel';
import { ContinueLearningCard } from '../components/ContinueLearningCard';
import { StatsWidget } from '../components/StatsWidget';
import { RecentActivityList } from '../components/RecentActivityList';
import { useAuth } from '../../../core/auth/useAuth';
import { useDomains, useContinueLearning, useUserStats } from '../services/homeService';

export default function HomeScreen() {
  const { user } = useAuth();
  const { data: domains = [], refetch: refetchDomains, isRefetching: domainsRefetching } = useDomains();
  const { data: continueLearning = [], refetch: refetchContinue, isRefetching: continueRefetching } = useContinueLearning();
  const { data: stats = [], refetch: refetchStats, isRefetching: statsRefetching } = useUserStats();

  const refreshing = domainsRefetching || continueRefetching || statsRefetching;

  const onRefresh = useCallback(() => {
    refetchDomains();
    refetchContinue();
    refetchStats();
  }, [refetchDomains, refetchContinue, refetchStats]);

  const firstName = user?.firstName || '';
  const currentLesson = continueLearning[0];

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite} statusBarStyle="dark">
      <Header firstName={firstName} notificationCount={0} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.brand.navy} />
        }
      >
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Bonsoir, {firstName}</Text>
          <Text style={styles.wave}>👋</Text>
        </View>

        <ProgressCard
          courseName={currentLesson?.technologyName || 'Parcours React'}
          moduleLabel="Module 1/1"
          progress={currentLesson?.progress ?? 42}
          remainingLessons={0}
          style={styles.progressCard}
        />

        <DomainCarousel
          domains={domains}
          onDomainPress={(domain) => {}}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reprendre</Text>
          <ContinueLearningCard
            lesson={currentLesson || { id: '', technologyName: 'Aucun cours', lessonTitle: 'Commencez un nouveau cours', progress: 0, icon: 'BookOpen' }}
            onPress={() => {}}
          />
        </View>

        <StatsWidget stats={stats} />

        <RecentActivityList activities={[]} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  greetingText: {
    ...typography.h2,
    color: colors.neutral.text,
  },
  wave: {
    fontSize: 22,
    marginLeft: spacing.sm,
  },
  progressCard: {
    marginBottom: spacing.xs,
  },
  section: {
    marginTop: spacing.xxl,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.neutral.text,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
});
