import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Dimensions,
  GestureResponderEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ListRenderItem,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { WifiOff, CreditCard, Award } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Button } from '../../../shared/components/ui/input/Button';
import { setItem } from '../../../core/storage/asyncStorage';
import { STORAGE_KEYS } from '../../../core/config/constants';
import type { AuthStackParamList } from '../../../core/navigation/navigation.types';

const { width } = Dimensions.get('window');

interface OnboardingPage {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PAGES: OnboardingPage[] = [
  {
    icon: <WifiOff size={64} color={colors.brand.orange} />,
    title: 'Apprenez hors-ligne',
    description: 'Téléchargez vos cours et accédez-y même sans connexion internet. Idéal pour les zones à connectivité limitée.',
  },
  {
    icon: <CreditCard size={64} color={colors.brand.orange} />,
    title: 'Prix locaux',
    description: 'Des tarifs adaptés à votre pouvoir d\'achat local. Apprenez sans vous ruiner avec nos prix équitables.',
  },
  {
    icon: <Award size={64} color={colors.brand.orange} />,
    title: 'Certification reconnue',
    description: 'Obtenez des certificats valorisés par les entreprises africaines et internationales.',
  },
];

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function OnboardingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    if (currentIndex < PAGES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  }, [currentIndex]);

  const handleComplete = useCallback(async () => {
    await setItem(STORAGE_KEYS.ONBOARDING, true);
    navigation.replace('Login');
  }, [navigation]);

  const onMomentumEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  }, []);

  const isLastPage = currentIndex === PAGES.length - 1;

  const renderItem: ListRenderItem<OnboardingPage> = ({ item }) => (
    <View style={styles.page}>
      <View style={styles.iconContainer}>{item.icon}</View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <ScreenWrapper backgroundColor={colors.neutral.surface}>
      <Pressable style={styles.skipButton} onPress={handleComplete}>
        <Text style={styles.skipText}>Passer</Text>
      </Pressable>

      <FlatList
        ref={flatListRef}
        data={PAGES}
        renderItem={renderItem}
        keyExtractor={(_, i) => String(i)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumEnd}
        bounces={false}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {PAGES.map((_, i) => (
            <View key={i} style={[styles.dot, i === currentIndex && styles.dotActive]} />
          ))}
        </View>

        {isLastPage ? (
          <Button onPress={handleComplete} fullWidth>
            Commencer
          </Button>
        ) : (
          <Button onPress={handleNext} fullWidth>
            Suivant
          </Button>
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  skipButton: {
    position: 'absolute',
    top: spacing.xxl,
    right: spacing.xl,
    zIndex: 10,
    padding: spacing.sm,
  },
  skipText: {
    ...typography.body,
    color: colors.neutral.textLight,
  },
  page: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxxl,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.brand.offWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxxl,
  },
  title: {
    ...typography.h1,
    color: colors.brand.navy,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    ...typography.bodyLarge,
    color: colors.neutral.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.huge,
    gap: spacing.xl,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.neutral.border,
  },
  dotActive: {
    backgroundColor: colors.brand.orange,
    width: 24,
  },
});
