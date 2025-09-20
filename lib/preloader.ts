'use client';

// ULTRA PERFORMANCE PRELOADER
export class PerformancePreloader {
  private static instance: PerformancePreloader;
  private preloadedResources = new Set<string>();
  private criticalImages = new Set<string>();

  static getInstance(): PerformancePreloader {
    if (!PerformancePreloader.instance) {
      PerformancePreloader.instance = new PerformancePreloader();
    }
    return PerformancePreloader.instance;
  }

  // Preload critical images
  preloadImage(src: string, priority: 'high' | 'low' = 'high'): Promise<void> {
    if (this.preloadedResources.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.preloadedResources.add(src);
        this.criticalImages.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  // Preload critical CSS
  preloadCSS(href: string): Promise<void> {
    if (this.preloadedResources.has(href)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.onload = () => {
        this.preloadedResources.add(href);
        resolve();
      };
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  // Preload critical JavaScript
  preloadJS(src: string): Promise<void> {
    if (this.preloadedResources.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = src;
      link.onload = () => {
        this.preloadedResources.add(src);
        resolve();
      };
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  // Preload critical fonts
  preloadFont(href: string, type: string = 'font/woff2'): Promise<void> {
    if (this.preloadedResources.has(href)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = type;
      link.crossOrigin = 'anonymous';
      link.href = href;
      link.onload = () => {
        this.preloadedResources.add(href);
        resolve();
      };
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  // Preload critical routes
  preloadRoute(href: string): Promise<void> {
    if (this.preloadedResources.has(href)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      link.onload = () => {
        this.preloadedResources.add(href);
        resolve();
      };
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  // Batch preload multiple resources
  async preloadBatch(resources: Array<{
    type: 'image' | 'css' | 'js' | 'font' | 'route';
    src: string;
    priority?: 'high' | 'low';
    fontType?: string;
  }>): Promise<void> {
    const promises = resources.map(resource => {
      switch (resource.type) {
        case 'image':
          return this.preloadImage(resource.src, resource.priority);
        case 'css':
          return this.preloadCSS(resource.src);
        case 'js':
          return this.preloadJS(resource.src);
        case 'font':
          return this.preloadFont(resource.src, resource.fontType);
        case 'route':
          return this.preloadRoute(resource.src);
        default:
          return Promise.resolve();
      }
    });

    await Promise.allSettled(promises);
  }

  // Get preloaded resources
  getPreloadedResources(): string[] {
    return Array.from(this.preloadedResources);
  }

  // Check if resource is preloaded
  isPreloaded(src: string): boolean {
    return this.preloadedResources.has(src);
  }
}

// Hook untuk menggunakan preloader
export function usePreloader() {
  const preloader = PerformancePreloader.getInstance();

  const preloadCriticalResources = async () => {
    await preloader.preloadBatch([
      { type: 'image', src: '/images/hero-avocado.jpg', priority: 'high' },
      { type: 'image', src: '/images/hero-fruits.jpg', priority: 'high' },
      { type: 'image', src: '/images/hero-seasonal.jpg', priority: 'high' },
      { type: 'image', src: '/images/juice-placeholder.svg', priority: 'high' },
      { type: 'route', src: '/berau' },
      { type: 'route', src: '/samarinda' },
      { type: 'route', src: '/berau/menu' },
      { type: 'route', src: '/samarinda/menu' },
    ]);
  };

  return {
    preloader,
    preloadCriticalResources,
  };
}
