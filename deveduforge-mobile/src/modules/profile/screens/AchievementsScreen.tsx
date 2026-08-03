import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Award } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Card } from '../../../shared/components/ui/display/Card';
import { Badge } from '../../../shared/components/ui/display/Badge';
import { LoadingSpinner } from '../../../shared/components/ui/feedback/LoadingSpinner';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import * as progressEndpoints from '../../../core/api/endpoints/progress.endpoints';

const ACHIEVEMENT_COLORS = [
  colors.semantic.success,
  colors.brand.navy,
  colors.semantic.info,
  colors.semantic.warning,
  '#8B5CF6',
  '#EC4899',
  '#F59E0B',
];

export default function AchievementsScreen() {
  const navigation = useNavigation();
  const { data: achievements, isLoading } = useQuery({
    queryKey: queryKeys.progress.achievements(),
    queryFn: () => progressEndpoints.getAchievements(),
  });

  const list = achievements ?? [];
  const earnedCount = list.length;

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite} statusBarStyle="dark">
      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color={colors.neutral.text} />
        </Pressable>
        <Text style={styles.topBarTitle}>Succès</Text>
        <Badge label={`${earnedCount}`} variant="info" />
      </View>

      <View style={styles.summaryCard}>
        <Award size={40} color={colors.semantic.warning} />
        <Text style={styles.summaryTitle}>{earnedCount} succès débloqués</Text>
        <Text style={styles.summarySub}>Continuez à apprendre pour en gagner plus !</Text>
      </View>

      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <LoadingSpinner size="large" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {list.map((a, i) => (
            <Card key={a.code} style={[styles.row, undefined]}>
              <View style={[styles.iconWrap, { backgroundColor: ACHIEVEMENT_COLORS[i % ACHIEVEMENT_COLORS.length] + '20' }]}>
                <Award size={22} color={ACHIEVEMENT_COLORS[i % ACHIEVEMENT_COLORS.length]} />
              </View>
              <View style={styles.info}>
                <Text style={styles.label}>{a.title}</Text>
                {a.description ? <Text style={styles.desc}>{a.description}</Text> : null}
              </View>
              <Award size={16} color={colors.semantic.success} />
            </Card>
          ))}
          <View style={{ height: spacing.huge }} />
        </ScrollView>
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.neutral.surface, justifyContent: 'center', alignItems: 'center', ...shadows.sm },
  topBarTitle: { ...typography.h3, color: colors.neutral.text, flex: 1, marginLeft: spacing.md },
  summaryCard: { alignItems: 'center', paddingVertical: spacing.xxl, gap: spacing.sm },
  summaryTitle: { ...typography.h2, color: colors.neutral.text },
  summarySub: { ...typography.bodySmall, color: colors.neutral.textMuted },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.huge },
  row: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, marginBottom: spacing.sm },
  rowLocked: { opacity: 0.6 },
  iconWrap: { width: 44, height: 44, borderRadius: radius.md, justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  info: { flex: 1 },
  label: { ...typography.body, color: colors.neutral.text, fontWeight: '600' },
  labelLocked: { color: colors.neutral.textMuted },
  desc: { ...typography.bodySmall, color: colors.neutral.textLight, marginTop: 2 },
});
