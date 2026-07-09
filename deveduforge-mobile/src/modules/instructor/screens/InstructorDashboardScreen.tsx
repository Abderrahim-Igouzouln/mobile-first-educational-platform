import React, { useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BookOpen, Users, BarChart2, PlusCircle, Star, ArrowRight } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Card } from '../../../shared/components/ui/Card';
import { Badge } from '../../../shared/components/ui/Badge';
import { SkeletonLoader } from '../../../shared/components/ui/SkeletonLoader';
import { useTheme } from '../../../shared/hooks/useTheme';
import { spacing } from '../../../shared/constants/spacing';
import { useInstructorStats, useInstructorCourses } from '../services/instructorService';
import type { ProfileStackParamList } from '../../../core/navigation/navigation.types';
import type { InstructorCourse } from '../../../core/api/endpoints/instructor.endpoints';

type NavProp = NativeStackNavigationProp<ProfileStackParamList>;

export function InstructorDashboardScreen() {
  const { colors, typography } = useTheme();
  const navigation = useNavigation<NavProp>();
  const { data: stats, isLoading: statsLoading } = useInstructorStats();
  const { data: courses, isLoading: coursesLoading } = useInstructorCourses();

  const statCards = [
    { icon: BookOpen, label: 'Mes cours', value: stats?.totalCourses ?? 0, color: colors.brand.navy },
    { icon: Users, label: 'Étudiants', value: stats?.totalStudents ?? 0, color: colors.brand.orange },
    { icon: Star, label: 'Note moyenne', value: stats?.avgRating ?? 0, color: colors.semantic.success },
    { icon: BarChart2, label: 'Complétions', value: stats?.completions ?? 0, color: colors.semantic.info },
  ];

  const renderCourseCard = useCallback(
    (course: InstructorCourse) => (
      <Card key={course.id} style={styles.courseRow}>
        <View style={styles.courseRowLeft}>
          <Text style={[typography.h3, { color: colors.neutral.text }]} numberOfLines={1}>
            {course.title}
          </Text>
          <Text style={[typography.bodySmall, { color: colors.neutral.textLight }]}>
            {course.lessonCount} leçons · {course.studentCount} étudiants
          </Text>
        </View>
        <Badge
          label={course.isPublished ? 'Publié' : 'Brouillon'}
          variant={course.isPublished ? 'success' : 'default'}
        />
      </Card>
    ),
    [colors, typography]
  );

  return (
    <ScreenWrapper backgroundColor={colors.neutral.surface}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: spacing.lg }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { marginBottom: spacing.xl }]}>
          <View style={{ flex: 1 }}>
            <Text style={[typography.display, { color: colors.neutral.text }]}>
              Mon espace
            </Text>
            <Text style={[typography.h1, { color: colors.brand.navy }]}>
              instructeur
            </Text>
            <Text style={[typography.body, { color: colors.neutral.textLight, marginTop: spacing.xs }]}>
              Gérez vos cours et suivez vos étudiants
            </Text>
          </View>
          <Pressable
            style={[styles.createButton, { backgroundColor: colors.brand.orange }]}
            onPress={() => navigation.navigate('ProfileScreen')}
          >
            <PlusCircle size={20} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.statsGrid}>
          {statCards.map((card) => (
            <Card key={card.label} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: `${card.color}15` }]}>
                <card.icon size={24} color={card.color} />
              </View>
              {statsLoading ? (
                <SkeletonLoader width={60} height={28} borderRadius={4} />
              ) : (
                <Text style={[typography.h1, { color: card.color }]}>{card.value}</Text>
              )}
              <Text style={[typography.bodySmall, { color: colors.neutral.textLight }]}>
                {card.label}
              </Text>
            </Card>
          ))}
        </View>

        <View style={[styles.sectionHeader, { marginTop: spacing.xxl }]}>
          <Text style={[typography.h2, { color: colors.neutral.text }]}>
            Mes cours ({courses?.length ?? 0})
          </Text>
        </View>

        {coursesLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <View key={i} style={{ marginBottom: spacing.sm }}>
                <SkeletonLoader width="100%" height={80} borderRadius={12} />
              </View>
            ))
          : courses?.map(renderCourseCard)}
        {!coursesLoading && courses?.length === 0 && (
          <Text style={[typography.body, { color: colors.neutral.textMuted, textAlign: 'center', paddingVertical: spacing.xxl }]}>
            Vous n'avez pas encore de cours.
          </Text>
        )}

        {stats && stats.pendingReviews > 0 && (
          <>
            <Text style={[typography.h2, { color: colors.neutral.text, marginTop: spacing.xxl, marginBottom: spacing.md }]}>
              Soumissions en attente ({stats.pendingReviews})
            </Text>
            <Card>
              <Text style={[typography.body, { color: colors.semantic.warning }]}>
                {stats.pendingReviews} soumission(s) de projet attendent votre évaluation.
              </Text>
              <View style={[styles.row, { marginTop: spacing.sm }]}>
                <Text style={[typography.label, { color: colors.brand.orange }]}>
                  Voir la file d'attente
                </Text>
                <ArrowRight size={16} color={colors.brand.orange} />
              </View>
            </Card>
          </>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: spacing.xxl,
    paddingBottom: spacing.huge,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  createButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
  courseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    padding: spacing.lg,
  },
  courseRowLeft: {
    flex: 1,
    marginRight: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
