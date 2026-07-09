import { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { appConfig } from '../../config/app.config';

const sanitizeHeaders = (headers: Record<string, unknown>): Record<string, unknown> => {
  const sanitized = { ...headers };
  const sensitiveKeys = ['authorization', 'cookie', 'x-api-key', 'token'];
  for (const key of sensitiveKeys) {
    if (sanitized[key]) {
      sanitized[key] = '[REDACTED]';
    }
  }
  return sanitized;
};

const logRequest = (config: InternalAxiosRequestConfig): void => {
  if (!appConfig.isDev) return;

  const { method, url, params, data } = config;

  console.log(
    `[API →] ${method?.toUpperCase()} ${url}`,
    params ? { params } : '',
    data ? { body: typeof data === 'string' ? data : '[Object]' } : ''
  );
};

const logResponse = (response: AxiosResponse): void => {
  if (!appConfig.isDev) return;

  const { config, status, data } = response;

  console.log(
    `[API ←] ${config.method?.toUpperCase()} ${config.url} → ${status}`,
    appConfig.isDev ? { data } : ''
  );
};

const logError = (error: AxiosError): void => {
  if (!appConfig.isDev) return;

  const { config, response, message } = error;

  console.warn(
    `[API ✗] ${config?.method?.toUpperCase()} ${config?.url} → ${response?.status ?? 'NO_RESPONSE'}`,
    { message }
  );

  if (response?.headers) {
    console.warn('[API ✗] Response Headers:', sanitizeHeaders(response.headers as Record<string, unknown>));
  }
};

export const setupLoggingInterceptor = (apiClient: AxiosInstance): void => {
  apiClient.interceptors.request.use((config) => {
    logRequest(config);
    return config;
  });

  apiClient.interceptors.response.use(
    (response) => {
      logResponse(response);
      return response;
    },
    (error: AxiosError) => {
      logError(error);
      return Promise.reject(error);
    }
  );
};
