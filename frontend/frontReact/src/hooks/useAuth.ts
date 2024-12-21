import { useState, useCallback } from 'react';
import { authService } from '../services/auth.service';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('token');
  });

  const login = useCallback(async (credentials: { username: string; password: string }) => {
    const response = await authService.login(credentials);
    localStorage.setItem('token', response.access_token);
    setIsAuthenticated(true);
    return response;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    login,
    logout
  };
};