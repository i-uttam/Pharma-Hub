import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemePreference = 'light' | 'dark' | 'system';

type ThemeContextType = {
  preference: ThemePreference;
  setPreference: (p: ThemePreference) => void;
  isDark: boolean;
};

const THEME_KEY = '@pharma_theme';
const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>('system');

  const systemScheme = Appearance.getColorScheme();
  const isDark =
    preference === 'dark' || (preference === 'system' && systemScheme === 'dark');

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY)
      .then((s) => {
        if (s === 'light' || s === 'dark' || s === 'system') {
          setPreferenceState(s);
          Appearance.setColorScheme(s === 'system' ? null : s);
        }
      })
      .catch(() => {});
  }, []);

  const setPreference = useCallback((p: ThemePreference) => {
    setPreferenceState(p);
    Appearance.setColorScheme(p === 'system' ? null : p);
    AsyncStorage.setItem(THEME_KEY, p).catch(() => {});
  }, []);

  return (
    <ThemeContext.Provider value={{ preference, setPreference, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
