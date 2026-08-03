import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';

interface ResultCircleProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const ResultCircle: React.FC<ResultCircleProps> = ({
  percentage,
  size = 160,
  strokeWidth = 12,
}) => {
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const half = size / 2;
  const radius = half - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1200;
    let frameId: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setAnimatedPercent(easeOutCubic(progress) * percentage);
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [percentage]);

  const getColor = () => {
    if (percentage >= 80) return colors.semantic.success;
    if (percentage >= 50) return colors.semantic.warning;
    return colors.semantic.error;
  };

  const progressColor = getColor();
  const strokeDashoffset = circumference - (animatedPercent / 100) * circumference;

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
        <Circle
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
        <Text style={[styles.percentage, { color: progressColor }]}>
          {Math.round(animatedPercent)}%
        </Text>
        <Text style={styles.label}>Score</Text>
      </View>
    </View>
  );
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
