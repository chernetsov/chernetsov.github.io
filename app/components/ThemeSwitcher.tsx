'use client';

import React, { useEffect } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';

// Simple icons for demonstration
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="12" r="4"></circle>
    <line x1="12" y1="2" x2="12" y2="6"></line>
    <line x1="12" y1="18" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
    <line x1="2" y1="12" x2="6" y2="12"></line>
    <line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

export const ThemeSwitcher = () => {
  const { effectiveTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    // Force a clean state by first removing the class
    document.documentElement.classList.remove('dark');
    
    // Then toggle to the opposite theme
    const newTheme = effectiveTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Force immediate application for quicker visual feedback
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  };

  const Icon = effectiveTheme === 'dark' ? MoonIcon : SunIcon;
  const titleText = effectiveTheme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode";

  return (
    <button
      onClick={toggleTheme}
      title={titleText}
      className={`fixed bottom-4 right-4 p-2 rounded-full transition-colors duration-200 z-50 shadow-lg ${
        effectiveTheme === 'dark' 
          ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
          : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
      }`}
      aria-label={titleText}
    >
      <Icon />
      <span className="sr-only">{titleText}</span>
    </button>
  );
}; 