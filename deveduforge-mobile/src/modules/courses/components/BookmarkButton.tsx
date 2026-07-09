import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Bookmark } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onToggle: () => void;
  size?: number;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  isBookmarked,
  onToggle,
  size = 20,
}) => {
  return (
    <Pressable
      style={styles.button}
      onPress={onToggle}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      role="button"
      accessibilityLabel={isBookmarked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      accessibilityState={{ selected: isBookmarked }}
    >
      <Bookmark
        size={size}
        color={isBookmarked ? colors.brand.orange : colors.neutral.textLight}
        fill={isBookmarked ? colors.brand.orange : 'transparent'}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
