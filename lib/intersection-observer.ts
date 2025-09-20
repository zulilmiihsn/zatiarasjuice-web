'use client';

import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<HTMLElement>, boolean] {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    freezeOnceVisible = true,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip if already intersected and freezeOnceVisible is true
    if (hasIntersected && freezeOnceVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);
        
        if (isElementIntersecting && freezeOnceVisible) {
          setHasIntersected(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, hasIntersected, freezeOnceVisible]);

  return [ref, isIntersecting];
}

// Hook untuk lazy loading dengan performance tinggi
export function useLazyLoad(options: UseIntersectionObserverOptions = {}) {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    freezeOnceVisible: true,
    ...options,
  });

  return [ref, isIntersecting];
}

// Hook untuk animasi on-scroll dengan performance tinggi
export function useScrollAnimation(options: UseIntersectionObserverOptions = {}) {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '0px',
    freezeOnceVisible: false,
    ...options,
  });

  return [ref, isIntersecting];
}
