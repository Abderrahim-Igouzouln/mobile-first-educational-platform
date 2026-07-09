import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Camera } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';

interface ProfileAvatarProps {
  initials: string;
  imageUrl?: string;
  onEdit?: () => void;
  size?: number;
}

const getColorFromInitials = (initials: string): string => {
  const palette = [colors.brand.orange, colors.brand.navy, colors.semantic.info, colors.semantic.success];
  let hash = 0;
  for (let i = 0; i < initials.length; i++) {
    hash = initials.charCodeAt(i) + ((hash << 5) - hash);
  }
  return palette[Math.abs(hash) % palette.length];
};

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  initials,
  imageUrl,
  onEdit,
  size = 96,
}) => {
  const bgColor = getColorFromInitials(initials);
  const fontSize = size * 0.38;

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            { width: size, height: size, borderRadius: size / 2, backgroundColor: bgColor },
          ]}
        >
          <Text style={[styles.initials, { fontSize }]}>{initials}</Text>
        </View>
      )}
      {onEdit && (
        <Pressable
          style={styles.editOverlay}
          onPress={onEdit}
          role="button"
          accessibilityLabel="Modifier la photo de profil"
        >
          <Camera size={20} color={colors.neutral.surface} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'relative',
  },
  image: {
    resizeMode: 'cover',
  },
  fallback: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    ...typography.h1,
    color: colors.neutral.surface,
    fontWeight: '700',
  },
  editOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.brand.orange,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.neutral.surface,
  },
});
