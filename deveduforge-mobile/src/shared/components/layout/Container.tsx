import React from 'react';
import { View, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { spacing } from '../../constants/spacing';

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  scroll?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ children, style, scroll = false }) => {
  if (scroll) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.scrollContent, style]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
