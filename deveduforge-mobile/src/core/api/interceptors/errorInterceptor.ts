import { AxiosError } from 'axios';
import { ApiError } from '../api.types';
import { appConfig } from '../../config/app.config';

const getErrorMessage = (error: AxiosError<{ message?: string }>): string => {
  if (error.response) {
    const { status, data } = error.response;
    if (data?.message) return data.message;
    switch (status) {
      case 400:
        return 'Requête invalide';
      case 401:
        return 'Session expirée, veuillez vous reconnecter';
      case 403:
        return 'Accès refusé';
      case 404:
        return 'Ressource introuvable';
      case 409:
        return 'Conflit avec les données existantes';
      case 422:
        return 'Données invalides';
      case 429:
        return 'Trop de requêtes, veuillez réessayer plus tard';
      case 500:
      case 502:
      case 503:
        return 'Erreur serveur, veuillez réessayer plus tard';
      default:
        return 'Une erreur est survenue';
    }
  }

  if (error.request) {
    return 'Impossible de contacter le serveur. Vérifiez votre connexion réseau.';
  }

  return 'Une erreur inattendue est survenue';
};

export const handleGlobalError = (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>): never => {
  const apiError: ApiError = {
    message: getErrorMessage(error),
    statusCode: error.response?.status ?? 0,
    errors: error.response?.data?.errors,
  };

  if (appConfig.isDev) {
    console.warn('[API Error]', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: apiError.message,
    });
  }

  throw apiError;
};

export const setupErrorInterceptor = (apiClient: import('axios').AxiosInstance): void => {
  apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
      return Promise.reject(handleGlobalError(error));
    }
  );
};
