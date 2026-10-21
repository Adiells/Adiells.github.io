import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'adiel-portfolio-theme';
const DEFAULT_THEME = 'dark';

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME;
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
  } catch {
    // Ignore storage access errors in restricted environments
  }
  if (typeof document !== 'undefined') {
    const currentAttr = document.documentElement.getAttribute('data-theme');
    if (currentAttr === 'dark' || currentAttr === 'light') {
      return currentAttr;
    }
  }
  return DEFAULT_THEME;
}

export function useTheme() {
  const [theme, setThemeState] = useState(getInitialTheme);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        // Ignore storage write errors
      }
    }
  }, [theme]);

  const setTheme = useCallback((nextTheme) => {
    setThemeState((prev) => {
      const resolved = typeof nextTheme === 'function' ? nextTheme(prev) : nextTheme;
      return resolved === 'light' ? 'light' : 'dark';
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme, setTheme };
}

export default useTheme;
