import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Award,
  Download,
  Share2,
  RefreshCw,
  XCircle,
  Star,
  Sparkles,
  Trophy,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import { shadows } from '../../../shared/constants/shadows';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { Button } from '../../../shared/components/ui/input/Button';
import type { CertificationStackParamList } from '../../../core/navigation/navigation.types';

type NavProp = NativeStackNavigationProp<CertificationStackParamList, 'CertificationResultScreen'>;
type ScreenRoute = RouteProp<CertificationStackParamList, 'CertificationResultScreen'>;

const CONFETTI_COLORS = [
  colors.brand.orange,
  colors.brand.navy,
  colors.semantic.success,
  colors.semantic.info,
  colors.semantic.warning,
  '#7b2d8b',
];

export default function CertificationResultScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<ScreenRoute>();
  const { passed, score, totalQuestions, sectionScores } = route.params;

  const percentage = Math.round((score / totalQuestions) * 100);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const confettiAnims = useRef(
    Array.from({ length: 8 }).map(() => ({
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      rotate: new Animated.Value(0),
      opacity: new Animated.Value(0),
    })),
  ).current;

  useEffect(() => {
    if (!passed) return;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    confettiAnims.forEach((anim, i) => {
      const delay = i * 120;
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(anim.opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(anim.y, {
            toValue: -80 - Math.random() * 120,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(anim.x, {
            toValue: (Math.random() - 0.5) * 120,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(anim.rotate, {
            toValue: Math.random() * 4 - 2,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    });
  }, [passed]);

  const handleRetry = () => {
    navigation.goBack();
  };

  const handleDownload = () => {
  };

  const handleShare = () => {
  };

  return (
    <ScreenWrapper backgroundColor={passed ? colors.brand.offWhite : colors.neutral.surfaceAlt}>
      {passed && (
        <LinearGradient
          colors={['#FFF8E1', '#FFF3E0', '#F5F5F5']}
          style={StyleSheet.absoluteFill}
        />
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {passed ? (
          <View style={styles.passContainer}>
            <View style={styles.confettiLayer}>
              {confettiAnims.map((anim, i) => (
                <Animated.View
                  key={i}
                  style={[
                    styles.confettiPiece,
                    {
                      backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                      opacity: anim.opacity,
                      transform: [
                        { translateX: anim.x },
                        { translateY: anim.y },
                        { rotate: anim.rotate.interpolate({
                          inputRange: [-2, 2],
                          outputRange: ['-30deg', '30deg'],
                        })},
                      ],
                    },
                  ]}
                />
              ))}
            </View>

            <Animated.View
              style={[
                styles.trophyWrap,
                { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
              ]}
            >
              <Trophy size={56} color={colors.semantic.warning} />
            </Animated.View>

            <Text style={styles.passTitle}>Félicitations !</Text>
            <Text style={styles.passSubtitle}>Vous avez réussi la certification</Text>

            <LinearGradient
              colors={[colors.semantic.successBg, '#FFFFFF']}
              style={styles.scoreCircle}
            >
              <Text style={styles.scoreValue}>{percentage}%</Text>
              <Text style={styles.scoreLabel}>
                {score}/{totalQuestions}
              </Text>
            </LinearGradient>

            <View style={styles.badgesRow}>
              <View style={styles.badgeItem}>
                <Star size={20} color={colors.semantic.warning} />
                <Text style={styles.badgeText}>Excellent</Text>
              </View>
              <View style={styles.badgeItem}>
                <Sparkles size={20} color={colors.brand.navy} />
                <Text style={styles.badgeText}>Certifié</Text>
              </View>
              <View style={styles.badgeItem}>
                <Award size={20} color={colors.brand.orange} />
                <Text style={styles.badgeText}>Nouveau</Text>
              </View>
            </View>

            <View style={styles.passActions}>
              <Button variant="primary" icon={Download} fullWidth onPress={handleDownload}>
                Télécharger le certificat
              </Button>
              <View style={{ height: spacing.md }} />
              <Button variant="secondary" icon={Share2} fullWidth onPress={handleShare}>
                Partager
              </Button>
            </View>
          </View>
        ) : (
          <View style={styles.failContainer}>
            <View style={styles.failIconWrap}>
              <XCircle size={56} color={colors.semantic.error} />
            </View>

            <Text style={styles.failTitle}>Pas de panique !</Text>
            <Text style={styles.failSubtitle}>
              Vous n'avez pas atteint le score minimum de 70%
            </Text>

            <View style={styles.scoreBreakdown}>
              <Text style={styles.breakdownTitle}>Votre score</Text>
              <Text style={styles.breakdownScore}>{percentage}%</Text>
              <Text style={styles.breakdownDetail}>
                {score} bonnes réponses sur {totalQuestions}
              </Text>

              {sectionScores && sectionScores.length > 0 && (
                <View style={styles.sectionScores}>
                  {sectionScores.map((sec, i) => {
                    const secPercent = Math.round((sec.score / sec.total) * 100);
                    return (
                      <View key={i} style={styles.sectionScoreRow}>
                        <Text style={styles.sectionScoreLabel}>{sec.sectionTitle}</Text>
                        <View style={styles.sectionScoreBar}>
                          <View
                            style={[
                              styles.sectionScoreFill,
                              {
                                width: `${secPercent}%`,
                                backgroundColor: secPercent >= 70
                                  ? colors.semantic.success
                                  : colors.semantic.error,
                              },
                            ]}
                          />
                        </View>
                        <Text style={styles.sectionScoreValue}>
                          {sec.score}/{sec.total}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>

            <View style={styles.failActions}>
              <Button variant="primary" fullWidth onPress={handleRetry}>
                Réessayer
              </Button>
              <Text style={styles.cooldownNote}>
                Vous pourrez repasser l'examen dans 7 jours
              </Text>
            </View>
          </View>
        )}

        <View style={{ height: spacing.huge }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
  },
  passContainer: {
    alignItems: 'center',
    paddingTop: spacing.huge,
  },
  confettiLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    height: 200,
  },
  confettiPiece: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 2,
    top: 100,
  },
  trophyWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.semantic.warningBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  passTitle: {
    ...typography.display,
    color: colors.neutral.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  passSubtitle: {
    ...typography.body,
    color: colors.neutral.textLight,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
    ...shadows.sm,
  },
  scoreValue: {
    ...typography.display,
    color: colors.semantic.success,
    fontSize: 34,
  },
  scoreLabel: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    marginTop: spacing.xxs,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  badgeItem: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  badgeText: {
    ...typography.label,
    color: colors.neutral.textLight,
    fontSize: 10,
  },
  passActions: {
    width: '100%',
  },
  failContainer: {
    alignItems: 'center',
    paddingTop: spacing.huge,
  },
  failIconWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.semantic.errorBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  failTitle: {
    ...typography.display,
    color: colors.neutral.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  failSubtitle: {
    ...typography.body,
    color: colors.neutral.textLight,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  scoreBreakdown: {
    width: '100%',
    backgroundColor: colors.neutral.surface,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    alignItems: 'center',
    marginBottom: spacing.xxl,
    ...shadows.sm,
  },
  breakdownTitle: {
    ...typography.label,
    color: colors.neutral.textMuted,
    marginBottom: spacing.sm,
  },
  breakdownScore: {
    ...typography.display,
    color: colors.semantic.error,
    fontSize: 40,
    marginBottom: spacing.xs,
  },
  breakdownDetail: {
    ...typography.body,
    color: colors.neutral.textLight,
    marginBottom: spacing.xl,
  },
  sectionScores: {
    width: '100%',
    gap: spacing.md,
  },
  sectionScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionScoreLabel: {
    ...typography.bodySmall,
    color: colors.neutral.text,
    width: 80,
  },
  sectionScoreBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.neutral.surfaceAlt,
    borderRadius: 4,
    overflow: 'hidden',
  },
  sectionScoreFill: {
    height: '100%',
    borderRadius: 4,
  },
  sectionScoreValue: {
    ...typography.bodySmall,
    color: colors.neutral.textLight,
    width: 40,
    textAlign: 'right',
  },
  failActions: {
    width: '100%',
    alignItems: 'center',
  },
  cooldownNote: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});
