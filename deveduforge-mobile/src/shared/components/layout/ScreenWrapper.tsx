import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

interface ScreenWrapperProps {
  children: React.ReactNode;
  safeArea?: boolean;
  backgroundColor?: string;
  statusBarStyle?: 'light' | 'dark' | 'auto';
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  safeArea = true,
  backgroundColor = '#FFFFFF',
  statusBarStyle = 'dark',
}) => {
  const Container = safeArea ? SafeAreaView : View;

  return (
    <Container style={[styles.container, { backgroundColor } as ViewStyle]}>
      <StatusBar style={statusBarStyle} />
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
