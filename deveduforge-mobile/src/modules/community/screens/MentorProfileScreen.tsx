import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { ArrowLeft, Star, GraduationCap } from 'lucide-react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Button } from '../../../shared/components/ui/Button';
import { Card } from '../../../shared/components/ui/Card';
import { Chip } from '../../../shared/components/ui/Chip';
import { LoadingSpinner } from '../../../shared/components/ui/LoadingSpinner';
import { useMentors, useRequestMentorship } from '../services/communityService';
import type { CommunityStackParamList } from '../../../core/navigation/navigation.types';

type NavProp = NativeStackNavigationProp<CommunityStackParamList, 'MentorProfileScreen'>;
type ScreenRoute = RouteProp<CommunityStackParamList, 'MentorProfileScreen'>;

export default function MentorProfileScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();
  const { mentorId } = route.params;

  const { data: mentors = [], isLoading } = useMentors();
  const mentor = mentors.find((m) => m.id === mentorId);
  const { mutate: requestMentorship } = useRequestMentorship();

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!mentor) {
    return (
      <ScreenWrapper>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Mentor introuvable.</Text>
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
        <Text style={styles.topTitle} numberOfLines={1}>{mentor.name}</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <GraduationCap size={32} color={colors.brand.orange} />
          </View>
          <Text style={styles.name}>{mentor.name}</Text>
          <Text style={styles.title}>{mentor.title}</Text>
          <View style={styles.ratingRow}>
            <Star size={16} color={colors.semantic.warning} />
            <Text style={styles.rating}>{mentor.rating}</Text>
            <Text style={styles.sessions}>({mentor.sessionCount} sessions)</Text>
          </View>
          <Text style={styles.price}>{mentor.pricePerSession}€ / session</Text>
        </Card>

        {mentor.bio && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Bio</Text>
            <Text style={styles.bioText}>{mentor.bio}</Text>
          </Card>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expertise</Text>
          <View style={styles.tagsRow}>
            {mentor.expertise.map((exp) => (
              <Chip key={exp} label={exp} selected />
            ))}
          </View>
        </View>

        <Button variant="primary" fullWidth onPress={() => requestMentorship(mentorId)}>
          Demander une session de mentorat
        </Button>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: spacing.md,
  },
  backButton: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.neutral.surfaceAlt,
    justifyContent: 'center', alignItems: 'center',
  },
  topTitle: { ...typography.h3, color: colors.neutral.text, flex: 1, textAlign: 'center' },
  content: { padding: spacing.xl, gap: spacing.xl, paddingBottom: spacing.huge },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { ...typography.body, color: colors.semantic.error },
  profileCard: { alignItems: 'center', padding: spacing.xxl, gap: spacing.sm },
  avatarCircle: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: colors.brand.offWhite,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: spacing.sm,
  },
  name: { ...typography.h2, color: colors.neutral.text },
  title: { ...typography.body, color: colors.neutral.textLight },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  rating: { ...typography.body, fontWeight: '600', color: colors.neutral.text },
  sessions: { ...typography.bodySmall, color: colors.neutral.textMuted },
  price: { ...typography.h3, color: colors.brand.orange, marginTop: spacing.sm },
  section: { gap: spacing.md },
  sectionTitle: { ...typography.h3, color: colors.neutral.text, marginBottom: spacing.sm },
  bioText: { ...typography.body, color: colors.neutral.textLight, lineHeight: 22 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
