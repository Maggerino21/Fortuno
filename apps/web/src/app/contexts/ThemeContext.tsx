// apps/web/src/app/contexts/ThemeContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createFortunoTheme, type ThemeVariant } from '../theme';

type ThemeContextType = {
  theme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const FortunoThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeVariant>('light');
  const [mounted, setMounted] = useState(false);

  // Only run on client side after mount
  useEffect(() => {
    setMounted(true);
    
    // Load theme from localStorage
    try {
      const savedTheme = localStorage.getItem('fortuno-theme') as ThemeVariant;
      if (savedTheme && ['light', 'dark', 'fortune'].includes(savedTheme)) {
        setThemeState(savedTheme);
      } else {
        // Auto-detect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setThemeState(prefersDark ? 'dark' : 'light');
      }
    } catch (error) {
      console.log('Error loading theme:', error);
      setThemeState('light');
    }
  }, []);

  // Save theme to localStorage when it changes
  const setTheme = (newTheme: ThemeVariant) => {
    setThemeState(newTheme);
    
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('fortuno-theme', newTheme);
        updateCSSVariables(newTheme);
      } catch (error) {
        console.log('Error saving theme:', error);
      }
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'fortune' : 'light';
    setTheme(nextTheme);
  };

  // Update CSS custom properties
  const updateCSSVariables = (themeVariant: ThemeVariant) => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    
    switch (themeVariant) {
      case 'dark':
        root.style.setProperty('--primary-color', '#38bdf8');
        root.style.setProperty('--background-color', '#171717');
        root.style.setProperty('--card-color', '#262626');
        root.style.setProperty('--text-color', '#f5f5f5');
        root.style.setProperty('--text-secondary', '#a3a3a3');
        root.style.setProperty('--text-tertiary', '#737373');
        root.style.setProperty('--border-color', '#404040');
        break;
      case 'fortune':
        root.style.setProperty('--primary-color', '#475569');
        root.style.setProperty('--background-color', '#f8fafc');
        root.style.setProperty('--card-color', '#ffffff');
        root.style.setProperty('--text-color', '#334155');
        root.style.setProperty('--text-secondary', '#64748b');
        root.style.setProperty('--text-tertiary', '#475569');
        root.style.setProperty('--border-color', '#e2e8f0');
        break;
      default: // light
        root.style.setProperty('--primary-color', '#0ea5e9');
        root.style.setProperty('--background-color', '#fafafa');
        root.style.setProperty('--card-color', '#ffffff');
        root.style.setProperty('--text-color', '#262626');
        root.style.setProperty('--text-secondary', '#737373');
        root.style.setProperty('--text-tertiary', '#0ea5e9');
        root.style.setProperty('--border-color', '#e5e5e5');
    }
  };

  // Update CSS variables when theme changes
  useEffect(() => {
    if (mounted) {
      updateCSSVariables(theme);
    }
  }, [theme, mounted]);

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted) {
    return (
      <ThemeProvider theme={createFortunoTheme('light')}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    );
  }

  const muiTheme = createFortunoTheme(theme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a FortunoThemeProvider');
  }
  return context;
};