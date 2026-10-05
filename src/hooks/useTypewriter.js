import { useEffect, useRef, useState } from 'react';

/**
 * Typewriter effect that types once when an element enters the viewport
 */
export function useTypewriter(fullText, speedMs = 35) {
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [displayedText, setDisplayedText] = useState(() => (isReducedMotion ? fullText : ''));
  const [isTyping, setIsTyping] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    if (isReducedMotion) return;

    let hasTriggered = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          hasTriggered = true;
          setIsTyping(true);
          let currentIdx = 0;

          const interval = setInterval(() => {
            currentIdx += 1;
            setDisplayedText(fullText.slice(0, currentIdx));
            if (currentIdx >= fullText.length) {
              clearInterval(interval);
              setIsTyping(false);
            }
          }, speedMs);
        }
      },
      { threshold: 0.2 }
    );

    const el = elementRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [fullText, speedMs, isReducedMotion]);

  return { displayedText, isTyping, elementRef };
}
