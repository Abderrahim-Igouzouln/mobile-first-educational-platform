import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, {
  useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming,
} from 'react-native-reanimated';
import { ScreenWrapper } from '../../../shared/components/layout/ScreenWrapper';
import { useTheme } from '../../../shared/hooks/useTheme';
import { spacing } from '../../../shared/constants/spacing';
import type { HomeStackParamList } from '../../../core/navigation/navigation.types';

type NavProp = NativeStackNavigationProp<HomeStackParamList>;

interface RoadmapNodeData {
  id: string;
  title: string;
  subtitle?: string;
  status: 'completed' | 'active' | 'locked';
  position: 'left' | 'right';
  onPress?: () => void;
}

function RoadmapNode({ title, subtitle, status, position, onPress }: RoadmapNodeData) {
  const { colors, typography } = useTheme();
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    if (status === 'active') {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.15, { duration: 800 }),
          withTiming(1.0, { duration: 800 }),
        ),
        -1,
        true,
      );
    }
  }, [status, pulseScale]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const nodeColor =
    status === 'completed' ? colors.semantic.success :
    status === 'active' ? colors.brand.orange :
    colors.neutral.border;

  return (
    <Pressable
      onPress={status !== 'locked' ? onPress : undefined}
      style={[
        styles.nodeRow,
        { justifyContent: position === 'left' ? 'flex-start' : 'flex-end' },
      ]}
      role="button"
      accessibilityLabel={`${title} — ${status === 'completed' ? 'terminé' : status === 'active' ? 'en cours' : 'verrouillé'}`}
    >
      {position === 'right' && (
        <View style={[styles.nodeTextContainer, { alignItems: 'flex-end', marginRight: spacing.md }]}>
          <Text style={[typography.body, { color: colors.neutral.text, textAlign: 'right' }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[typography.bodySmall, { color: colors.neutral.textLight, textAlign: 'right' }]}>
              {subtitle}
            </Text>
          )}
        </View>
      )}
      <Animated.View
        style={[
          styles.nodeDot,
          {
            backgroundColor: nodeColor,
            borderColor: nodeColor,
          },
          status === 'active' && pulseStyle,
        ]}
      >
        {status === 'completed' && <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700' }}>✓</Text>}
      </Animated.View>
      {position === 'left' && (
        <View style={[styles.nodeTextContainer, { marginLeft: spacing.md }]}>
          <Text style={[typography.body, { color: colors.neutral.text }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[typography.bodySmall, { color: colors.neutral.textLight }]}>
              {subtitle}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}

const MOCK_NODES: RoadmapNodeData[] = [
  { id: '1', title: 'Introduction', subtitle: 'Bienvenue', status: 'completed', position: 'left' },
  { id: '2', title: 'Les Fondamentaux', subtitle: 'HTML & CSS', status: 'completed', position: 'right' },
  { id: '3', title: 'JavaScript', subtitle: 'Langage', status: 'active', position: 'left' },
  { id: '4', title: 'React', subtitle: 'Framework', status: 'locked', position: 'right' },
  { id: '5', title: 'Node.js', subtitle: 'Backend', status: 'locked', position: 'left' },
  { id: '6', title: 'Projet Final', subtitle: 'Full Stack', status: 'locked', position: 'right' },
];

export function RoadmapScreen() {
  const { colors, typography } = useTheme();
  const navigation = useNavigation<NavProp>();

  return (
    <ScreenWrapper backgroundColor={colors.neutral.surface}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: spacing.lg }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[typography.h1, { color: colors.neutral.text, marginBottom: spacing.xs }]}>
          Votre parcours
        </Text>
        <Text style={[typography.body, { color: colors.neutral.textLight, marginBottom: spacing.xxl }]}>
          Développeur Full-Stack
        </Text>

        <View style={styles.timeline}>
          <View style={[styles.connectingLine, { backgroundColor: colors.neutral.border }]} />

          {MOCK_NODES.map((node) => (
            <RoadmapNode key={node.id} {...node} />
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: spacing.xxl,
    paddingBottom: spacing.huge,
  },
  timeline: {
    position: 'relative',
    gap: spacing.xl,
  },
  connectingLine: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 2,
    marginLeft: -1,
  },
  nodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nodeDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  nodeTextContainer: {
    flex: 1,
    maxWidth: '40%',
  },
});
