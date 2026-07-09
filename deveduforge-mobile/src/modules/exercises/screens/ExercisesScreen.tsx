import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, PenTool } from 'lucide-react-native';
import type { ExerciseStackParamList } from '../../../core/navigation/navigation.types';
import type { Exercise } from '../exercises.types';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { LoadingSpinner } from '../../../shared/components/ui/LoadingSpinner';
import { EmptyState } from '../../../shared/components/ui/EmptyState';
import { ExerciseCard } from '../components/ExerciseCard';
import { useExercise } from '../services/exerciseService';

type NavProp = NativeStackNavigationProp<ExerciseStackParamList, 'ExercisesScreen'>;
type ScreenRoute = RouteProp<ExerciseStackParamList, 'ExercisesScreen'>;

type TabKey = 'pending' | 'completed' | 'all';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'pending', label: 'À faire' },
  { key: 'completed', label: 'Terminés' },
  { key: 'all', label: 'Tous' },
];

export const ExercisesScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();
  const { lessonId = '', lessonTitle } = route.params ?? {};
  const [activeTab, setActiveTab] = useState<TabKey>('pending');

  const { data, isLoading } = useExercise(lessonId);

  const exercises = useMemo(() => (data?.exercise ? [data.exercise] : []), [data]);

  const filteredExercises = useMemo(() => {
    switch (activeTab) {
      case 'pending':
        return exercises.filter((e) => e.status === 'pending');
      case 'completed':
        return exercises.filter((e) => e.status === 'passed' || e.status === 'failed');
      default:
        return exercises;
    }
  }, [activeTab, exercises]);

  const handleExercisePress = (exercise: Exercise) => {
    navigation.navigate('QuizScreen', { exerciseId: exercise.id, lessonId });
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <ScreenWrapper>
      <View style={styles.topBar}>
        <Pressable style={styles.backCircle} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color={colors.neutral.text} />
        </Pressable>
        <Text style={styles.topTitle} numberOfLines={1}>
          {lessonTitle ?? 'Exercices'}
        </Text>
        <View style={styles.backCircle} />
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

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredExercises.length === 0 ? (
          <EmptyState
            icon={PenTool}
            title="Aucun exercice"
            message={
              activeTab === 'pending'
                ? 'Tous les exercices sont terminés !'
                : activeTab === 'completed'
                  ? 'Aucun exercice terminé pour le moment.'
                  : 'Aucun exercice disponible.'
            }
          />
        ) : (
          filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onPress={() => handleExercisePress(exercise)}
            />
          ))
        )}
      </ScrollView>
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
    paddingBottom: spacing.md,
  },
  backCircle: {
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
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? spacing.xxxl : spacing.xxl,
  },
});
