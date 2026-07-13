import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, RotateCcw } from 'lucide-react-native';
import type { ExerciseStackParamList } from '../../../core/navigation/navigation.types';
import type { QuizAttempt } from '../exercises.types';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { EmptyState } from '../../../shared/components/ui/display/EmptyState';

type NavProp = NativeStackNavigationProp<ExerciseStackParamList, 'ExerciseHistoryScreen'>;
type ScreenRoute = RouteProp<ExerciseStackParamList, 'ExerciseHistoryScreen'>;

const ATTEMPTS: QuizAttempt[] = [];

export const ExerciseHistoryScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();
  const { lessonId = '', lessonTitle } = route.params ?? {};

  return (
    <ScreenWrapper>
      <View style={styles.topBar}>
        <Pressable style={styles.backCircle} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color={colors.neutral.text} />
        </Pressable>
        <Text style={styles.topTitle} numberOfLines={1}>
          {lessonTitle ?? 'Historique'}
        </Text>
        <View style={styles.backCircle} />
      </View>

      <Text style={styles.sectionTitle}>Tentatives précédentes</Text>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {ATTEMPTS.length === 0 ? (
          <EmptyState
            icon={RotateCcw}
            title="Aucune tentative"
            message="Vous n'avez pas encore fait cet exercice."
          />
        ) : (
          ATTEMPTS.map((attempt) => (
            <View key={attempt.id} style={styles.attemptCard}>
              <View style={styles.attemptHeader}>
                <View style={styles.attemptDateRow}>
                  <Text style={styles.attemptDate}>{attempt.startedAt}</Text>
                </View>
              </View>
            </View>
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
  sectionTitle: {
    ...typography.h2,
    color: colors.neutral.text,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? spacing.xxxl : spacing.xxl,
  },
  attemptCard: {
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  attemptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  attemptDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  attemptDate: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
  },
});
