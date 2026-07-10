'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AppState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  currentUser: User | null;
  selectedRegion: string[];
}

interface AppContextType {
  state: AppState;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setCurrentUser: (user: User | null) => void;
  logout: () => void;
  setSelectedRegion: (region: string[]) => void;
  clearSelectedRegion: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    sidebarOpen: true,
    theme: 'light',
    currentUser: null,
    selectedRegion: [],
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

  const setSelectedRegion = useCallback((region: string[]) => {
    setState((prev) => ({ ...prev, selectedRegion: region }));
  }, []);

  const clearSelectedRegion = useCallback(() => {
    setState((prev) => ({ ...prev, selectedRegion: [] }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        toggleSidebar,
        setTheme,
        setCurrentUser,
        logout,
        setSelectedRegion,
        clearSelectedRegion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};

export type { User, AppState };