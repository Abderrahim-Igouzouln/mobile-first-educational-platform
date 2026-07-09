const getEnvVar = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const env = {
  apiUrl: getEnvVar('EXPO_PUBLIC_API_URL', 'http://localhost:3000'),
  apiTimeout: Number(getEnvVar('EXPO_PUBLIC_API_TIMEOUT', '15000')),
  appEnv: getEnvVar('EXPO_PUBLIC_APP_ENV', 'development'),
  sentryDsn: getEnvVar('EXPO_PUBLIC_SENTRY_DSN', ''),
  enableAnalytics: getEnvVar('EXPO_PUBLIC_ENABLE_ANALYTICS', 'false') === 'true',
  version: getEnvVar('EXPO_PUBLIC_APP_VERSION', '1.0.0'),
  buildNumber: getEnvVar('EXPO_PUBLIC_BUILD_NUMBER', '1'),
} as const;
