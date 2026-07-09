import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_PREFIX = '@deveduforge/';
const DEFAULT_MAX_AGE = 30 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export const getCachedData = async <T>(
  key: string,
  maxAge: number = DEFAULT_MAX_AGE,
): Promise<T | null> => {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;

    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() - entry.timestamp > maxAge) {
      await AsyncStorage.removeItem(key);
      return null;
    }

    return entry.data;
  } catch {
    return null;
  }
};

export const setCachedData = async <T>(key: string, data: T): Promise<void> => {
  const entry: CacheEntry<T> = { data, timestamp: Date.now() };
  await AsyncStorage.setItem(key, JSON.stringify(entry));
};

export const removeCachedData = async (key: string): Promise<void> => {
  await AsyncStorage.removeItem(key);
};

export const clearOldCache = async (maxAge: number = DEFAULT_MAX_AGE): Promise<void> => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const cacheKeys = allKeys.filter((k) => k.startsWith(CACHE_PREFIX));

    for (const key of cacheKeys) {
      try {
        const raw = await AsyncStorage.getItem(key);
        if (!raw) continue;

        const entry = JSON.parse(raw);
        if (entry?.timestamp && Date.now() - entry.timestamp > maxAge) {
          await AsyncStorage.removeItem(key);
        }
      } catch {
        continue;
      }
    }
  } catch {
    // silently fail
  }
};
