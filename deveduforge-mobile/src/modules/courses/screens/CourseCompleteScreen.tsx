import React, { useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, Share } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Award, Share2 } from 'lucide-react-native';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Button } from '../../../shared/components/ui/input/Button';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import type { CourseStackParamList, MainTabParamList } from '../../../core/navigation/navigation.types';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ScreenRoute = RouteProp<CourseStackParamList, 'CourseCompleteScreen'>;

export const CourseCompleteScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<CourseStackParamList>>();
  const route = useRoute<ScreenRoute>();
  const { courseId, technologySlug } = route.params;

  return (
    <ScreenWrapper backgroundColor={colors.brand.navy} statusBarStyle="light">
      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color={colors.neutral.surface} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <LinearGradient
          colors={['#FFD700', '#FFA500']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconCircle}
        >
          <Award size={48} color={colors.neutral.surface} />
        </LinearGradient>

        <Text style={styles.title}>Félicitations !</Text>
        <Text style={styles.subtitle}>Vous avez terminé le cours avec succès.</Text>

        <View style={styles.statsCard}>
          <Award size={24} color={colors.semantic.warning} />
          <Text style={styles.statsText}>Votre certificat est débloqué !</Text>
          <Text style={styles.statsDesc}>
            Rendez-vous dans l'onglet Certifications pour le consulter et le télécharger.
          </Text>
        </View>

        <Button
          variant="primary"
          fullWidth
          onPress={() => {
            navigation.getParent()?.navigate('CertificationsTab', {
              screen: 'CertificationsListScreen',
            });
          }}
        >
          Voir mon certificat
        </Button>

        <View style={{ height: spacing.md }} />

        <Button
          variant="secondary"
          icon={Share2}
          fullWidth
          onPress={() => {
            Share.share({ message: 'Je viens de terminer un cours sur DevEduForge ! 🎉' });
          }}
        >
          Partager ma réussite
        </Button>

        <View style={{ height: spacing.md }} />

        <Pressable
          onPress={() => {
            if (technologySlug) {
              navigation.navigate('CourseScreen', { technologySlug });
            } else {
              navigation.goBack();
            }
          }}
        >
          <Text style={styles.backLink}>Retour au cours</Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  topBar: { paddingHorizontal: spacing.lg, paddingTop: spacing.xxl },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.xxl, paddingBottom: spacing.huge },
  iconCircle: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.xxl, ...shadows.lg },
  title: { ...typography.display, color: colors.neutral.surface, marginBottom: spacing.sm, textAlign: 'center' },
  subtitle: { ...typography.bodyLarge, color: colors.neutral.surface, opacity: 0.8, textAlign: 'center', marginBottom: spacing.xxl },
  statsCard: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: radius.xl, padding: spacing.xxl, alignItems: 'center', gap: spacing.md, width: '100%', marginBottom: spacing.xxl },
  statsText: { ...typography.h3, color: colors.semantic.warning, textAlign: 'center' },
  statsDesc: { ...typography.body, color: colors.neutral.surface, opacity: 0.7, textAlign: 'center' },
  backLink: { ...typography.body, color: colors.neutral.surface, opacity: 0.6, textDecorationLine: 'underline' },
});
