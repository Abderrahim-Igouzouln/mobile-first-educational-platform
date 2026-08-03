import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Star, Send } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Card } from '../../../shared/components/ui/display/Card';
import { Button } from '../../../shared/components/ui/input/Button';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { apiClient } from '../../../core/api/apiClient';
import type { ApiResponse } from '../../../core/api/api.types';
import type { CourseStackParamList } from '../../../core/navigation/navigation.types';

type ScreenRoute = RouteProp<CourseStackParamList, 'CourseReviewsScreen'>;

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsResponse {
  reviews: Review[];
  average: number;
  count: number;
}

export const CourseReviewsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ScreenRoute>();
  const { courseId } = route.params;
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const { data: reviewsData } = useQuery<ReviewsResponse>({
    queryKey: ['courses', courseId, 'reviews'],
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<ReviewsResponse>>(`/courses/${courseId}/reviews`);
      return res.data.data;
    },
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      await apiClient.post(`/courses/${courseId}/reviews`, { rating, comment });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses', courseId, 'reviews'] });
      setRating(0);
      setComment('');
    },
  });

  const reviews = reviewsData?.reviews ?? [];
  const avgRating = reviewsData?.average ?? 0;
  const count = reviewsData?.count ?? 0;

  const handleSubmit = () => {
    if (rating === 0) return;
    if (!comment.trim()) return;
    submitMutation.mutate();
  };

  return (
    <ScreenWrapper backgroundColor={colors.neutral.surfaceAlt}>
      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color={colors.neutral.text} />
        </Pressable>
        <Text style={styles.topBarTitle}>Avis</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Card style={styles.summaryCard}>
          <View style={styles.avgRow}>
            <Text style={styles.avgScore}>{avgRating.toFixed(1)}</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} color={s <= Math.round(avgRating) ? colors.semantic.warning : colors.neutral.border} fill={s <= Math.round(avgRating) ? colors.semantic.warning : 'transparent'} />
              ))}
              <Text style={styles.countBadge}>{count} avis</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.formCard}>
          <Text style={styles.formTitle}>Donnez votre avis</Text>
          <View style={styles.starInput}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Pressable key={s} onPress={() => setRating(s)} onPressIn={() => setHoveredStar(s)} onPressOut={() => setHoveredStar(0)}>
                <Star size={28} color={s <= (hoveredStar || rating) ? colors.semantic.warning : colors.neutral.border} fill={s <= (hoveredStar || rating) ? colors.semantic.warning : 'transparent'} />
              </Pressable>
            ))}
          </View>
          <TextInput
            style={styles.commentInput}
            value={comment}
            onChangeText={setComment}
            placeholder="Partagez votre expérience..."
            placeholderTextColor={colors.neutral.textMuted}
            multiline
          />
          <Button variant="primary" icon={Send} onPress={handleSubmit}>Envoyer</Button>
        </Card>

        <Text style={styles.sectionTitle}>Avis récents</Text>
        {reviews.map((review) => (
          <Card key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewAuthor}>{review.author}</Text>
              <View style={styles.reviewStars}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={12} color={s <= review.rating ? colors.semantic.warning : colors.neutral.border} fill={s <= review.rating ? colors.semantic.warning : 'transparent'} />
                ))}
              </View>
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
            <Text style={styles.reviewDate}>{new Date(review.date).toLocaleDateString('fr-FR')}</Text>
          </Card>
        ))}

        <View style={{ height: spacing.huge }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.neutral.surface, justifyContent: 'center', alignItems: 'center', ...shadows.sm },
  topBarTitle: { ...typography.h3, color: colors.neutral.text },
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: spacing.huge },
  summaryCard: { padding: spacing.lg, marginBottom: spacing.lg },
  avgRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  avgScore: { ...typography.display, color: colors.neutral.text },
  starsRow: { flexDirection: 'row', alignItems: 'center', gap: 4, flex: 1 },
  countBadge: { ...typography.bodySmall, color: colors.neutral.textMuted, marginLeft: spacing.sm },
  formCard: { padding: spacing.lg, marginBottom: spacing.xl },
  formTitle: { ...typography.h3, color: colors.neutral.text, marginBottom: spacing.md },
  starInput: { flexDirection: 'row', gap: spacing.xs, marginBottom: spacing.md },
  commentInput: { ...typography.body, color: colors.neutral.text, backgroundColor: colors.neutral.surfaceAlt, borderRadius: radius.md, padding: spacing.md, height: 100, textAlignVertical: 'top', marginBottom: spacing.md },
  sectionTitle: { ...typography.h3, color: colors.neutral.text, marginBottom: spacing.md },
  reviewCard: { padding: spacing.lg, marginBottom: spacing.sm },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  reviewAuthor: { ...typography.body, color: colors.neutral.text, fontWeight: '600' },
  reviewStars: { flexDirection: 'row', gap: 2 },
  reviewComment: { ...typography.body, color: colors.neutral.textLight, marginBottom: spacing.xs },
  reviewDate: { ...typography.bodySmall, color: colors.neutral.textMuted },
});
