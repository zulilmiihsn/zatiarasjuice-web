// Animation optimization utilities for 60fps performance
export class AnimationOptimizer {
  private static instance: AnimationOptimizer;
  private isReducedMotion: boolean = false;
  private isLowEndDevice: boolean = false;

  private constructor() {
    this.detectDeviceCapabilities();
  }

  public static getInstance(): AnimationOptimizer {
    if (!AnimationOptimizer.instance) {
      AnimationOptimizer.instance = new AnimationOptimizer();
    }
    return AnimationOptimizer.instance;
  }

  private detectDeviceCapabilities() {
    if (typeof window === 'undefined') return;

    // Check for reduced motion preference
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect low-end device
    const connection = (navigator as any).connection;
    if (connection) {
      this.isLowEndDevice = connection.effectiveType === 'slow-2g' || 
                           connection.effectiveType === '2g' ||
                           connection.saveData;
    }

    // Check device memory
    const deviceMemory = (navigator as any).deviceMemory;
    if (deviceMemory && deviceMemory < 4) {
      this.isLowEndDevice = true;
    }

    // Check CPU cores
    const cores = navigator.hardwareConcurrency;
    if (cores && cores < 4) {
      this.isLowEndDevice = true;
    }
  }

  // Get optimized animation settings
  public getOptimizedSettings() {
    if (this.isReducedMotion) {
      return {
        duration: 0.1,
        ease: 'linear',
        repeat: 0,
        yoyo: false,
        stagger: 0,
      };
    }

    if (this.isLowEndDevice) {
      return {
        duration: 0.3,
        ease: 'easeOut',
        repeat: 0,
        yoyo: false,
        stagger: 0.05,
      };
    }

    return {
      duration: 0.6,
      ease: 'easeInOut',
      repeat: Infinity,
      yoyo: true,
      stagger: 0.1,
    };
  }

  // Get optimized transition settings
  public getOptimizedTransition() {
    const settings = this.getOptimizedSettings();
    
    return {
      duration: settings.duration,
      ease: settings.ease,
      repeat: settings.repeat,
      yoyo: settings.yoyo,
    };
  }

  // Get optimized stagger delay
  public getStaggerDelay(index: number) {
    const settings = this.getOptimizedSettings();
    return index * settings.stagger;
  }

  // Check if animation should be disabled
  public shouldDisableAnimation() {
    return this.isReducedMotion;
  }

  // Get optimized animation variants
  public getOptimizedVariants() {
    if (this.shouldDisableAnimation()) {
      return {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      };
    }

    if (this.isLowEndDevice) {
      return {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      };
    }

    return {
      hidden: { opacity: 0, y: 20, scale: 0.95 },
      visible: { opacity: 1, y: 0, scale: 1 },
    };
  }

  // Get optimized hover effects
  public getOptimizedHover() {
    if (this.shouldDisableAnimation()) {
      return {};
    }

    if (this.isLowEndDevice) {
      return {
        scale: 1.02,
        transition: { duration: 0.2 },
      };
    }

    return {
      scale: 1.05,
      y: -2,
      transition: { duration: 0.3, ease: 'easeOut' },
    };
  }

  // Get optimized tap effects
  public getOptimizedTap() {
    if (this.shouldDisableAnimation()) {
      return {};
    }

    return {
      scale: 0.95,
      transition: { duration: 0.1 },
    };
  }

  // Get optimized loading animation
  public getOptimizedLoading() {
    if (this.shouldDisableAnimation()) {
      return {
        animate: { opacity: 1 },
        transition: { duration: 0.1 },
      };
    }

    if (this.isLowEndDevice) {
      return {
        animate: { 
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.05, 1],
        },
        transition: { 
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      };
    }

    return {
      animate: { 
        opacity: [0.3, 1, 0.3],
        scale: [0.9, 1.1, 0.9],
        rotate: [0, 180, 360],
      },
      transition: { 
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    };
  }

  // Get optimized parallax settings
  public getOptimizedParallax() {
    if (this.shouldDisableAnimation()) {
      return {
        y: 0,
        rotate: 0,
        scale: 1,
      };
    }

    if (this.isLowEndDevice) {
      return {
        y: 10,
        rotate: 1,
        scale: 1.02,
      };
    }

    return {
      y: 20,
      rotate: 3,
      scale: 1.05,
    };
  }

  // Get optimized floating animation
  public getOptimizedFloating() {
    if (this.shouldDisableAnimation()) {
      return {
        animate: { y: 0, rotate: 0, scale: 1 },
        transition: { duration: 0.1 },
      };
    }

    if (this.isLowEndDevice) {
      return {
        animate: { 
          y: [0, -10, 0],
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.05, 1],
        },
        transition: { 
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        },
      };
    }

    return {
      animate: { 
        y: [0, -20, 0],
        rotate: [0, 180, 360],
        scale: [0.8, 1.2, 0.8],
        opacity: [0.1, 0.3, 0.1],
      },
      transition: { 
        duration: 12,
        repeat: Infinity,
        ease: 'linear',
      },
    };
  }
}

// Hook for React components
export const useAnimationOptimizer = () => {
  const optimizer = AnimationOptimizer.getInstance();
  
  return {
    getOptimizedSettings: optimizer.getOptimizedSettings.bind(optimizer),
    getOptimizedTransition: optimizer.getOptimizedTransition.bind(optimizer),
    getStaggerDelay: optimizer.getStaggerDelay.bind(optimizer),
    shouldDisableAnimation: optimizer.shouldDisableAnimation.bind(optimizer),
    getOptimizedVariants: optimizer.getOptimizedVariants.bind(optimizer),
    getOptimizedHover: optimizer.getOptimizedHover.bind(optimizer),
    getOptimizedTap: optimizer.getOptimizedTap.bind(optimizer),
    getOptimizedLoading: optimizer.getOptimizedLoading.bind(optimizer),
    getOptimizedParallax: optimizer.getOptimizedParallax.bind(optimizer),
    getOptimizedFloating: optimizer.getOptimizedFloating.bind(optimizer),
  };
};
