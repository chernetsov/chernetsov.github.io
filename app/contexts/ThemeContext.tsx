'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  effectiveTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('system');
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');
  
  // Force application of theme on first render to avoid flash
  useEffect(() => {
    // On first mount, check if we should restore from localStorage or default to system
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setThemeState(storedTheme);
    } else {
      setThemeState('system');
    }

    // Immediate application of theme on mount to avoid flash
    const localTheme = storedTheme || 'system';
    let initialEffectiveTheme: 'light' | 'dark';
    
    if (localTheme === 'system') {
      initialEffectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      initialEffectiveTheme = localTheme as 'light' | 'dark';
    }
    
    setEffectiveTheme(initialEffectiveTheme);
    
    // Force all dark mode classes off first
    document.documentElement.classList.remove('dark');
    
    // Then apply dark class if needed
    if (initialEffectiveTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Theme change effect
  useEffect(() => {
    const applyTheme = () => {
      let newEffectiveTheme: 'light' | 'dark';
      
      if (theme === 'system') {
        newEffectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        newEffectiveTheme = theme as 'light' | 'dark';
      }
      
      setEffectiveTheme(newEffectiveTheme);
      
      // Always remove the class first to ensure a clean state
      document.documentElement.classList.remove('dark');
      
      if (newEffectiveTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
      
      localStorage.setItem('theme', theme);
    };

    applyTheme();

    // Add listener for system theme changes if using 'system' setting
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme();
      
      // Use event listener with fallback for older browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      } else {
        // For older browsers
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, effectiveTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 