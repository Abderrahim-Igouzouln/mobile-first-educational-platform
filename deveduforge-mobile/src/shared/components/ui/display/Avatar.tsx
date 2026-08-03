import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';
import { typography } from '../../../constants/typography';

interface AvatarProps {
  name: string;
  size?: number;
  uri?: string;
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
};

const COLOR_PALETTE = [
  colors.brand.orange,
  colors.brand.navy,
  colors.semantic.info,
  colors.semantic.success,
  colors.semantic.warning,
];

const getColorFromName = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLOR_PALETTE[Math.abs(hash) % COLOR_PALETTE.length];
};

export const Avatar: React.FC<AvatarProps> = ({ name, size = 40, uri }) => {
  const initials = getInitials(name);
  const bgColor = getColorFromName(name);
  const fontSize = size * 0.4;

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        role="img"
        accessibilityLabel={name}
      />
    );
  }

  return (
    <View
      style={[
        styles.fallback,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bgColor,
        },
      ]}
      role="img"
      accessibilityLabel={name}
    >
      <Text style={[styles.initials, { fontSize }]}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
  fallback: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    ...typography.h3,
    color: colors.neutral.surface,
    fontWeight: '700',
  },
});
