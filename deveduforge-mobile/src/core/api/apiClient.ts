import axios, { AxiosInstance } from 'axios';
import { env } from '../config/env.config';
import { setupAuthInterceptor } from './interceptors/authInterceptor';
import { setupErrorInterceptor } from './interceptors/errorInterceptor';
import { setupLoggingInterceptor } from './interceptors/loggingInterceptor';

const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: env.apiUrl,
    timeout: env.apiTimeout,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  setupAuthInterceptor(client);
  setupErrorInterceptor(client);
  setupLoggingInterceptor(client);

  return client;
};

export const apiClient = createApiClient();
