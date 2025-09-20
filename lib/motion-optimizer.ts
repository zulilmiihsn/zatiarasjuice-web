'use client';

import { motion } from 'framer-motion';

// ULTRA PERFORMANCE MOTION CONFIGURATIONS
export const ULTRA_PERFORMANCE_MOTION = {
  // 60FPS Animation Config
  fps60: {
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.3,
    },
    style: {
      willChange: 'transform, opacity',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      perspective: '1000px',
    },
  },

  // Silky Smooth Hover
  silkyHover: {
    whileHover: {
      scale: 1.02,
      y: -2,
      transition: {
        type: 'tween',
        ease: 'easeOut',
        duration: 0.2,
      },
    },
    whileTap: {
      scale: 0.98,
      transition: {
        type: 'tween',
        ease: 'easeOut',
        duration: 0.1,
      },
    },
  },

  // Ultra Fast Page Transitions
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.3,
    },
  },

  // Optimized Scroll Animations
  scrollAnimation: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.4,
    },
  },

  // GPU Accelerated Transform
  gpuTransform: {
    style: {
      willChange: 'transform',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
    },
  },

  // Container Performance
  containerPerformance: {
    style: {
      contain: 'layout style paint',
      contentVisibility: 'auto',
    },
  },
};

// Optimized Motion Components
export const OptimizedMotionDiv = motion.div;
export const OptimizedMotionButton = motion.button;
export const OptimizedMotionImage = motion.div;

// High Performance Animation Hook
export function useHighPerformanceAnimation() {
  const getOptimizedProps = (type: 'hover' | 'scroll' | 'page' | 'container') => {
    switch (type) {
      case 'hover':
        return {
          ...ULTRA_PERFORMANCE_MOTION.silkyHover,
          ...ULTRA_PERFORMANCE_MOTION.fps60,
        };
      case 'scroll':
        return ULTRA_PERFORMANCE_MOTION.scrollAnimation;
      case 'page':
        return ULTRA_PERFORMANCE_MOTION.pageTransition;
      case 'container':
        return {
          ...ULTRA_PERFORMANCE_MOTION.containerPerformance,
          ...ULTRA_PERFORMANCE_MOTION.gpuTransform,
        };
      default:
        return ULTRA_PERFORMANCE_MOTION.fps60;
    }
  };

  return { getOptimizedProps };
}

// Throttled Animation Hook
export function useThrottledAnimation(callback: () => void, delay: number = 16) {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;

  const throttledCallback = () => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime >= delay) {
      callback();
      lastExecTime = currentTime;
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        callback();
        lastExecTime = Date.now();
        timeoutId = null;
      }, delay - (currentTime - lastExecTime));
    }
  };

  return throttledCallback;
}

// Performance Monitor Hook
export function usePerformanceMonitor() {
  const measurePerformance = (name: string, fn: () => void) => {
    const start = performance.now();
    fn();
    const end = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name} took ${end - start} milliseconds`);
    }
  };

  return { measurePerformance };
}
