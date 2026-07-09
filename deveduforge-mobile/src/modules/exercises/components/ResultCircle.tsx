import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, TextStyle, StyleProp } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';

interface ResultCircleProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export const ResultCircle: React.FC<ResultCircleProps> = ({
  percentage,
  size = 160,
  strokeWidth = 12,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const half = size / 2;
  const radius = half - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, [percentage, animatedValue]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
    extrapolate: 'clamp',
  });

  const getColor = () => {
    if (percentage >= 80) return colors.semantic.success;
    if (percentage >= 50) return colors.semantic.warning;
    return colors.semantic.error;
  };

  const progressColor = getColor();

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle
          cx={half}
          cy={half}
          r={radius}
          stroke={colors.neutral.border}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={half}
          cy={half}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${half} ${half})`}
        />
      </Svg>
      <View style={[styles.center, { width: size - strokeWidth * 2 - 8, height: size - strokeWidth * 2 - 8, borderRadius: (size - strokeWidth * 2 - 8) / 2 }]}>
        <AnimatedText
          style={[styles.percentage, { color: progressColor }]}
        >
          {Math.round(percentage)}%
        </AnimatedText>
        <Text style={styles.label}>Score</Text>
      </View>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText: React.FC<{ style: StyleProp<TextStyle>; children: React.ReactNode }> = ({
  style,
  children,
}) => {
  return <Animated.Text style={style}>{children}</Animated.Text>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    position: 'absolute',
    backgroundColor: colors.neutral.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentage: {
    ...typography.display,
    fontSize: 36,
    fontWeight: '800',
  },
  label: {
    ...typography.bodySmall,
    color: colors.neutral.textMuted,
    marginTop: -2,
  },
});
