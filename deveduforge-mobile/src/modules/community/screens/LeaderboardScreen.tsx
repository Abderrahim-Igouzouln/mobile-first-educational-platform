import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Award } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Card } from '../../../shared/components/ui/display/Card';
import { LoadingSpinner } from '../../../shared/components/ui/feedback/LoadingSpinner';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import * as communityEndpoints from '../../../core/api/endpoints/community.endpoints';

export default function LeaderboardScreen() {
  const navigation = useNavigation();
  const { data: entries, isLoading } = useQuery({
    queryKey: queryKeys.community.leaderboard('weekly'),
    queryFn: () => communityEndpoints.getLeaderboard('weekly'),
  });

  const renderRankIcon = (rank: number) => {
    if (rank === 1) return <Award size={20} color="#FFD700" />;
    if (rank === 2) return <Award size={20} color="#C0C0C0" />;
    if (rank === 3) return <Award size={20} color="#CD7F32" />;
    return <Text style={styles.rankNum}>{rank}</Text>;
  };

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite} statusBarStyle="dark">
      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color={colors.neutral.text} />
        </Pressable>
        <Text style={styles.topBarTitle}>Classement</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.podiumCard}>
        <Award size={24} color={colors.semantic.warning} />
        <Text style={styles.podiumTitle}>Top apprenants de la semaine</Text>
        <Text style={styles.podiumSubtitle}>Basé sur les points XP cumulés</Text>
      </View>

      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <LoadingSpinner size="large" />
        </View>
      ) : (
        <FlatList
          data={entries ?? []}
          keyExtractor={(item) => `${item.rank}`}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Card style={[styles.row, item.rank <= 3 ? styles.rowHighlight : undefined]}>
              <View style={styles.rankCol}>{renderRankIcon(item.rank)}</View>
              <View style={styles.nameCol}>
                <Text style={styles.name}>{item.firstName}</Text>
              </View>
              <Text style={styles.xpCol}>{item.score.toLocaleString()} XP</Text>
              <Award size={16} color={item.rank <= 3 ? (item.rank === 1 ? '#FFD700' : item.rank === 2 ? '#C0C0C0' : '#CD7F32') : colors.neutral.textMuted} />
            </Card>
          )}
        />
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.neutral.surface, justifyContent: 'center', alignItems: 'center', ...shadows.sm },
  topBarTitle: { ...typography.h3, color: colors.neutral.text },
  podiumCard: { alignItems: 'center', paddingVertical: spacing.xxl, gap: spacing.sm },
  podiumTitle: { ...typography.h2, color: colors.neutral.text, textAlign: 'center' },
  podiumSubtitle: { ...typography.bodySmall, color: colors.neutral.textMuted },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.huge },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  rowHighlight: { backgroundColor: colors.neutral.surface, borderWidth: 1, borderColor: colors.semantic.warning + '40' },
  rankCol: { width: 36, alignItems: 'center' },
  rankNum: { ...typography.body, color: colors.neutral.textMuted, fontWeight: '700' },
  nameCol: { flex: 1, marginLeft: spacing.md },
  name: { ...typography.body, color: colors.neutral.text, fontWeight: '600' },
  xpCol: { ...typography.body, color: colors.neutral.text, fontWeight: '700', marginRight: spacing.sm },
});
