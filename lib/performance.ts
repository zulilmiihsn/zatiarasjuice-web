// Performance monitoring and optimization utilities

export const performanceConfig = {
  // Animation performance settings
  animation: {
    // Reduce motion for users who prefer it
    respectReducedMotion: true,
    // Use transform3d for GPU acceleration
    useGPUAcceleration: true,
    // Throttle animations to 60fps
    targetFPS: 60,
  },
  
  // Image optimization
  images: {
    // Lazy load images below the fold
    lazyLoadThreshold: 100,
    // Use WebP format when available
    preferWebP: true,
    // Quality settings
    quality: 85,
  },
  
  // Bundle optimization
  bundle: {
    // Code splitting threshold
    chunkSizeLimit: 250000, // 250KB
    // Preload critical resources
    preloadCritical: true,
  }
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
  } else {
    fn();
  }
};

// Throttle function for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Debounce function for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    return new IntersectionObserver(callback, {
      rootMargin: '50px',
      threshold: 0.1,
      ...options,
    });
  }
  return null;
};
