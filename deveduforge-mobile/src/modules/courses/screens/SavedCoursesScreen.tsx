import React, { useCallback } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, BookOpen, ChevronRight, Award } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Card } from '../../../shared/components/ui/display/Card';
import { EmptyState } from '../../../shared/components/ui/display/EmptyState';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { getBookmarks } from '../../../core/api/endpoints/course.endpoints';
import type { Bookmark as BookmarkDTO } from '../../../core/api/endpoints/course.endpoints';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import type { ProfileStackParamList } from '../../../core/navigation/navigation.types';

type NavProp = NativeStackNavigationProp<ProfileStackParamList>;

export default function SavedCoursesScreen() {
  const navigation = useNavigation<NavProp>();
  const { data: bookmarks = [] } = useQuery({
    queryKey: [...queryKeys.courses.all, 'saved'],
    queryFn: getBookmarks,
  });

  const handlePress = useCallback((lessonId: string, courseId: string) => {
    navigation.navigate('SubscriptionScreen' as never);
  }, [navigation]);

  return (
    <ScreenWrapper backgroundColor={colors.neutral.surfaceAlt}>
      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color={colors.neutral.text} />
        </Pressable>
        <Text style={styles.topBarTitle}>Cours sauvegardés</Text>
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState
            icon={Award}
            title="Aucun cours sauvegardé"
            message="Utilisez le signet sur un cours pour le retrouver ici."
          />
        }
        renderItem={({ item }) => {
          const bm = item as BookmarkDTO & { lesson: { course?: { title?: string } } };
          return (
            <Pressable onPress={() => handlePress(bm.lessonId, '')}>
              <Card style={styles.row}>
                <View style={styles.iconWrap}>
                  <BookOpen size={22} color={colors.neutral.text} />
                </View>
                <View style={styles.info}>
                  <Text style={styles.title}>{bm.lesson.title}</Text>
                  <Text style={styles.courseTitle}>{bm.lesson.course?.title || ''}</Text>
                </View>
                <ChevronRight size={18} color={colors.neutral.textMuted} />
              </Card>
            </Pressable>
          );
        }}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.neutral.surface, justifyContent: 'center', alignItems: 'center', ...shadows.sm },
  topBarTitle: { ...typography.h3, color: colors.neutral.text },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.huge, flexGrow: 1 },
  row: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, marginBottom: spacing.sm },
  iconWrap: { width: 44, height: 44, borderRadius: radius.md, backgroundColor: colors.neutral.surfaceAlt, justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  info: { flex: 1 },
  title: { ...typography.body, color: colors.neutral.text, fontWeight: '600' },
  courseTitle: { ...typography.bodySmall, color: colors.neutral.textLight, marginTop: 2 },
});
