import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const getItem = async <T = string>(key: string): Promise<T | null> => {
  try {
    if (isWeb) {
      const value = await AsyncStorage.getItem(key);
      if (value === null) return null;
      return JSON.parse(value) as T;
    }
    const value = await SecureStore.getItemAsync(key);
    if (value === null) return null;
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

export const setItem = async <T>(key: string, value: T): Promise<void> => {
  const json = JSON.stringify(value);
  if (isWeb) {
    await AsyncStorage.setItem(key, json);
  } else {
    await SecureStore.setItemAsync(key, json);
  }
};

export const removeItem = async (key: string): Promise<void> => {
  if (isWeb) {
    await AsyncStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
};
