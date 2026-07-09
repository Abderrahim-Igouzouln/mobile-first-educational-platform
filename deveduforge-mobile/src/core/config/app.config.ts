import { Platform } from 'react-native';
import { env } from './env.config';

export const appConfig = {
  appName: 'DevEduForge',
  apiUrl: env.apiUrl,
  apiTimeout: env.apiTimeout,
  appEnv: env.appEnv,
  version: env.version,
  buildNumber: env.buildNumber,
  isDev: __DEV__,
  isAndroid: Platform.OS === 'android',
  isIOS: Platform.OS === 'ios',
  defaultLanguage: 'fr',
  supportedLanguages: ['fr', 'en'] as const,
  companyEmail: 'contact@deveduforge.com',
  privacyPolicyUrl: 'https://deveduforge.com/privacy',
  termsUrl: 'https://deveduforge.com/terms',
} as const;

export type AppConfig = typeof appConfig;
