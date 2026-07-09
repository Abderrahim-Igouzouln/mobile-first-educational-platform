import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { View, StyleSheet, I18nManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/lib/react-navigation/navigationRef';
import { linking } from './src/lib/react-navigation/deepLinking';
import Toast from 'react-native-toast-message';
import { store } from './src/lib/redux/store';
import { queryClient } from './src/lib/react-query/queryClient';
import { AuthProvider } from './src/core/auth/AuthProvider';
import RootNavigator from './src/core/navigation/RootNavigator';
import { useFonts } from 'expo-font';
import initI18n, { getCurrentLanguage } from './src/lib/i18n/i18n.config';

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const [fontsLoaded] = useFonts({});
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    initI18n().then(() => {
      const lang = getCurrentLanguage();
      if (lang === 'ar') {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
      }
      setI18nReady(true);
    });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && i18nReady) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, i18nReady]);

  useEffect(() => {
    if (fontsLoaded && i18nReady) {
      onLayoutRootView();
    }
  }, [fontsLoaded, i18nReady, onLayoutRootView]);

  if (!fontsLoaded || !i18nReady) {
    return null;
  }

  return (
    <View style={styles.root} onLayout={onLayoutRootView}>
      <StatusBar style="dark" />
      <NavigationContainer ref={navigationRef} linking={linking}>
        <RootNavigator />
      </NavigationContainer>
      <Toast />
    </View>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.gestureRoot}>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <AuthProvider>
              <AppContent />
            </AuthProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureRoot: {
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
});
