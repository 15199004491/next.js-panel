import { useState, useCallback } from 'react';

interface AppState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  currentUser: User | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const useAppStore = () => {
  const [state, setState] = useState<AppState>({
    sidebarOpen: true,
    theme: 'light',
    currentUser: null,
  });

  const toggleSidebar = useCallback(() => {
    setState((prev) => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  }, []);

  const setTheme = useCallback((theme: 'light' | 'dark') => {
    setState((prev) => ({ ...prev, theme }));
  }, []);

  const setCurrentUser = useCallback((user: User | null) => {
    setState((prev) => ({ ...prev, currentUser: user }));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setState((prev) => ({ ...prev, currentUser: null }));
  }, []);

  return {
    state,
    toggleSidebar,
    setTheme,
    setCurrentUser,
    logout,
  };
};