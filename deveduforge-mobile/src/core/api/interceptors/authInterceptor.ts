import { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { getTokens, setTokens, clearTokens } from '../../auth/authStorage';

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token!);
    }
  });
  failedQueue = [];
};

export const attachTokenToRequest = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const tokens = await getTokens();

  if (tokens?.accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }

  return config;
};

export const handleResponseError = async (
  error: AxiosError,
  apiClient: AxiosInstance
): Promise<unknown> => {
  const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

  if (error.response?.status !== 401 || originalRequest._retry) {
    return Promise.reject(error);
  }

  if (originalRequest.url?.includes('/auth/refresh')) {
    return Promise.reject(error);
  }

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    }).then(async (token) => {
      const tokens = await getTokens();
      if (!tokens) {
        return Promise.reject(new Error('Session terminated during refresh'));
      }
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
      }
      return apiClient(originalRequest);
    });
  }

  originalRequest._retry = true;
  isRefreshing = true;

  try {
    const tokens = await getTokens();
    if (!tokens?.refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post('/auth/refresh', { refreshToken: tokens.refreshToken });
    const newTokens = response.data.data;

    await setTokens(newTokens);
    processQueue(null, newTokens.accessToken);

    if (originalRequest.headers) {
      originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
    }

    return apiClient(originalRequest);
  } catch (refreshError) {
    processQueue(refreshError, null);
    await clearTokens();
    return Promise.reject(refreshError);
  } finally {
    isRefreshing = false;
  }
};

export const setupAuthInterceptor = (apiClient: AxiosInstance): void => {
  apiClient.interceptors.request.use(attachTokenToRequest);

  apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => handleResponseError(error, apiClient)
  );
};
