import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { User, AuthTokens, LoginCredentials, RegisterData } from './auth.types';
import { getTokens, setTokens, clearTokens } from './authStorage';
import { apiClient } from '../api/apiClient';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokensState] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!tokens;

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedTokens = await getTokens();
        if (storedTokens) {
          setTokensState(storedTokens);

          const response = await apiClient.get('/auth/me');

          if (response.status === 200) {
            setUser(response.data.data);
          } else {
            await clearTokens();
          }
        }
      } catch {
        await clearTokens();
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const response = await apiClient.post('/auth/login', credentials);

    const authTokens: AuthTokens = response.data.data.tokens;
    const userData: User = response.data.data.user;

    await setTokens(authTokens);
    setTokensState(authTokens);
    setUser(userData);
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    await apiClient.post('/auth/register', data);
  }, []);

  const logout = useCallback(async () => {
    await clearTokens();
    setTokensState(null);
    setUser(null);
  }, []);

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
