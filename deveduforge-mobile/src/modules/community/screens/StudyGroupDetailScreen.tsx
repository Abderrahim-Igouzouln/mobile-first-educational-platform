import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { ArrowLeft, Users, Calendar } from 'lucide-react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Button } from '../../../shared/components/ui/Button';
import { Card } from '../../../shared/components/ui/Card';
import { LoadingSpinner } from '../../../shared/components/ui/LoadingSpinner';
import { useStudyGroups, useToggleJoinGroup } from '../services/communityService';
import type { CommunityStackParamList } from '../../../core/navigation/navigation.types';

type NavProp = NativeStackNavigationProp<CommunityStackParamList, 'StudyGroupDetailScreen'>;
type ScreenRoute = RouteProp<CommunityStackParamList, 'StudyGroupDetailScreen'>;

export default function StudyGroupDetailScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();
  const { groupId } = route.params;

  const { data: groups = [], isLoading } = useStudyGroups();
  const toggleJoinMutation = useToggleJoinGroup();

  const group = groups.find((g) => g.id === groupId);

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!group) {
    return (
      <ScreenWrapper>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Groupe introuvable.</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.topBar}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} role="button" accessibilityLabel="Retour">
          <ArrowLeft size={20} color={colors.neutral.text} />
        </Pressable>
        <Text style={styles.topTitle} numberOfLines={1}>{group.name}</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.infoCard}>
          <Users size={32} color={colors.brand.orange} />
          <Text style={styles.groupName}>{group.name}</Text>
          <Text style={styles.description}>{group.description}</Text>
          <View style={styles.metaRow}>
            <Calendar size={16} color={colors.neutral.textMuted} />
            <Text style={styles.metaText}>{group.memberCount} membres · {group.activeUsers} actifs</Text>
          </View>
        </Card>

        <Button
          variant={group.isJoined ? 'secondary' : 'primary'}
          fullWidth
          onPress={() => toggleJoinMutation.mutate(groupId)}
        >
          {group.isJoined ? 'Quitter le groupe' : 'Rejoindre le groupe'}
        </Button>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  backButton: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.neutral.surfaceAlt,
    justifyContent: 'center', alignItems: 'center',
  },
  topTitle: { ...typography.h3, color: colors.neutral.text, flex: 1, textAlign: 'center' },
  content: { padding: spacing.xl, gap: spacing.xl },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { ...typography.body, color: colors.semantic.error },
  infoCard: { alignItems: 'center', padding: spacing.xxl, gap: spacing.md },
  groupName: { ...typography.h2, color: colors.neutral.text, textAlign: 'center' },
  description: { ...typography.body, color: colors.neutral.textLight, textAlign: 'center' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  metaText: { ...typography.bodySmall, color: colors.neutral.textMuted },
});
