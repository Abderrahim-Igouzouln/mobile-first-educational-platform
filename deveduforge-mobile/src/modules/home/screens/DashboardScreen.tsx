import React, { useState, useCallback } from 'react';
import { ScrollView, RefreshControl, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { BarChart3, TrendingUp, Award, Flame, BookOpen } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Card } from '../../../shared/components/ui/Card';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { useAuth } from '../../../core/auth/useAuth';
import { useUserStats } from '../services/homeService';

interface StatCardData {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
}

const STAT_ICONS: Record<string, { icon: React.ElementType; color: string }> = {
  courses: { icon: BookOpen, color: '#1565C0' },
  streak: { icon: Flame, color: colors.brand.orange },
  score: { icon: TrendingUp, color: colors.semantic.success },
  certifications: { icon: Award, color: '#7b2d8b' },
};

function mapStatToCard(stat: { id: string; label: string; value: string; suffix?: string; isHighlighted?: boolean }): StatCardData {
  const iconConfig = STAT_ICONS[stat.id] || { icon: BarChart3, color: colors.brand.navy };
  const suffix = stat.suffix ? ` ${stat.suffix}` : '';
  return {
    id: stat.id,
    title: stat.label,
    value: `${stat.value}${suffix}`,
    subtitle: stat.isHighlighted ? 'basé sur vos résultats' : 'depuis le début',
    icon: iconConfig.icon,
    color: iconConfig.color,
  };
}

export default function DashboardScreen() {
  const { user } = useAuth();
  const { data: statsData, isLoading, refetch } = useUserStats();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const stats: StatCardData[] = statsData ? statsData.map(mapStatToCard) : [];

  return (
    <ScreenWrapper backgroundColor={colors.brand.offWhite} statusBarStyle="dark">
      <View style={styles.header}>
        <Text style={styles.title}>Tableau de bord</Text>
        <Text style={styles.subtitle}>
          {user ? `Bon retour, ${user.firstName}` : "Vue d'ensemble de votre progression"}
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.brand.navy} />
        }
      >
        {isLoading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color={colors.brand.navy} />
          </View>
        ) : (
          <View style={styles.grid}>
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.id} style={styles.statCard}>
                  <View style={[styles.iconWrap, { backgroundColor: `${stat.color}15` }]}>
                    <Icon size={22} color={stat.color} />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statTitle}>{stat.title}</Text>
                  <Text style={styles.statSubtitle}>{stat.subtitle}</Text>
                </Card>
              );
            })}
          </View>
        )}
        <View style={{ height: spacing.huge }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
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
  loadingWrap: {
    paddingVertical: spacing.huge,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  statCard: {
    width: '47%',
    flexGrow: 1,
    minWidth: 140,
    padding: spacing.lg,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statValue: {
    ...typography.h1,
    color: colors.neutral.text,
    marginBottom: spacing.xxs,
  },
  statTitle: {
    ...typography.body,
    color: colors.neutral.text,
    fontWeight: '600',
  },
  statSubtitle: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    marginTop: 2,
  },
});
