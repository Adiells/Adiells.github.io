import { useCallback, useEffect } from 'react';

/**
 * Hook for smooth section scrolling, legacy hash redirection, and project highlighting
 */
export function useSectionNav() {
  const scrollTo = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  }, []);

  const highlight = useCallback((slug) => {
    const el = document.getElementById(`project-${slug}`);
    if (el) {
      el.classList.add('terminal-highlight');
      setTimeout(() => {
        el.classList.remove('terminal-highlight');
      }, 2000);
    }
  }, []);

  // Handle legacy URLs like #/projects or #projects
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      if (hash) {
        setTimeout(() => {
          scrollTo(hash);
        }, 100);
      }
    };

    handleHash();
  }, [scrollTo]);

  return { scrollTo, highlight };
}
