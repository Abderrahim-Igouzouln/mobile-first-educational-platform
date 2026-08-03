import React from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { LoadingSpinner } from '../../../shared/components/ui/feedback/LoadingSpinner';
import { TechnologyCard } from '../components/TechnologyCard';
import { useTechnologies } from '../services/courseService';
import type { Technology } from '../courses.types';
import type { CourseStackParamList } from '../../../core/navigation/navigation.types';

type NavProp = NativeStackNavigationProp<CourseStackParamList, 'TechnologiesScreen'>;
type ScreenRoute = RouteProp<CourseStackParamList, 'TechnologiesScreen'>;

export const TechnologiesScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();
  const { domainId } = route.params;

  const { data: technologies, isLoading, isError } = useTechnologies(domainId ?? '');

  const handleTechnologyPress = (technology: Technology) => {
    if (technology.isLocked) {
      Alert.alert(
        'Technologie verrouillée',
        'Cette technologie est réservée aux abonnés. Souscrivez à un abonnement pour y accéder.',
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Voir les abonnements', onPress: () => {} },
        ],
      );
      return;
    }
    navigation.navigate('CourseScreen', { technologySlug: technology.slug });
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <ScreenWrapper>
      <LinearGradient
        colors={[colors.brand.navy, colors.brand.navyLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>Technologies</Text>
        <Text style={styles.headerSubtitle}>
          {technologies?.length ?? 0} technologie{(technologies?.length ?? 0) > 1 ? 's' : ''} disponible
          {(technologies?.length ?? 0) > 1 ? 's' : ''}
        </Text>
      </LinearGradient>

      {isError ? (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Impossible de charger les technologies.</Text>
        </View>
      ) : (
        <FlatList
          data={technologies}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <TechnologyCard
                technology={item}
                onPress={() => handleTechnologyPress(item)}
              />
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.centerContent}>
              <Text style={styles.emptyText}>Aucune technologie trouvée.</Text>
            </View>
          }
        />
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  headerGradient: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  headerTitle: {
    ...typography.h1,
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    ...typography.body,
    color: 'rgba(255,255,255,0.7)',
  },
  list: {
    padding: spacing.xl,
    paddingBottom: spacing.huge,
  },
  cardWrapper: {
    marginBottom: spacing.lg,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  errorText: {
    ...typography.body,
    color: colors.semantic.error,
    textAlign: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.neutral.textMuted,
    textAlign: 'center',
  },
});
