'use client';

import React from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

export const ThemeSwitcher = () => {
  const { effectiveTheme, setTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const titleText = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      title={titleText}
      aria-label={titleText}
      className="group relative grid h-8 w-8 place-items-center rounded-[3px] text-muted transition-colors hover:bg-surface-hover hover:text-fg"
    >
      <span className="transition-transform duration-500 group-hover:rotate-45">
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
};
