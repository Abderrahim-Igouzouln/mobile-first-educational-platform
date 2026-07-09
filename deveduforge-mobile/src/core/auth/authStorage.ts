import { STORAGE_KEYS } from '../config/constants';
import * as secureStorage from '../storage/secureStorage';
import { AuthTokens } from './auth.types';

export const getTokens = async (): Promise<AuthTokens | null> => {
  return secureStorage.getItem<AuthTokens>(STORAGE_KEYS.AUTH_TOKENS);
};

export const setTokens = async (tokens: AuthTokens): Promise<void> => {
  await secureStorage.setItem(STORAGE_KEYS.AUTH_TOKENS, tokens);
};

export const clearTokens = async (): Promise<void> => {
  await secureStorage.removeItem(STORAGE_KEYS.AUTH_TOKENS);
};
