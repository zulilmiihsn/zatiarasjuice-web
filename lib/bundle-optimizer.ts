// Bundle optimization utilities for Zatiaras Juice
export class BundleOptimizer {
  private static instance: BundleOptimizer;
  private loadedChunks: Set<string> = new Set();
  private chunkCache: Map<string, any> = new Map();

  private constructor() {
    this.initializeBundleOptimization();
  }

  public static getInstance(): BundleOptimizer {
    if (!BundleOptimizer.instance) {
      BundleOptimizer.instance = new BundleOptimizer();
    }
    return BundleOptimizer.instance;
  }

  private initializeBundleOptimization() {
    if (typeof window === 'undefined') return;

    // Monitor bundle loading
    this.monitorBundleLoading();
    
    // Setup chunk preloading
    this.setupChunkPreloading();
  }

  private monitorBundleLoading() {
    if (typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming;
          if (resource.name.includes('_next/static/chunks/')) {
            this.loadedChunks.add(resource.name);
          }
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  private setupChunkPreloading() {
    if (typeof window === 'undefined') return;

    // Preload critical chunks
    const criticalChunks = [
      'pages/_app.js',
      'pages/index.js',
      'pages/_document.js',
    ];

    criticalChunks.forEach(chunk => {
      this.preloadChunk(chunk);
    });
  }

  private preloadChunk(chunkName: string) {
    if (typeof window === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = `/_next/static/chunks/${chunkName}`;
    document.head.appendChild(link);
  }

  // Get bundle size information
  public getBundleInfo(): {
    totalChunks: number;
    loadedChunks: number;
    estimatedSize: number;
  } {
    const scripts = document.querySelectorAll('script[src]');
    const nextScripts = Array.from(scripts).filter(script => 
      script.getAttribute('src')?.includes('_next/static')
    );

    return {
      totalChunks: nextScripts.length,
      loadedChunks: this.loadedChunks.size,
      estimatedSize: nextScripts.length * 50, // 50KB per chunk estimate
    };
  }

  // Check if bundle is optimized
  public isBundleOptimized(): boolean {
    const { totalChunks, loadedChunks } = this.getBundleInfo();
    
    // Bundle is optimized if we're loading chunks efficiently
    return loadedChunks >= totalChunks * 0.8;
  }

  // Get loading performance metrics
  public getLoadingMetrics(): {
    fcp: number;
    lcp: number;
    fid: number;
    cls: number;
  } {
    if (typeof window === 'undefined') {
      return { fcp: 0, lcp: 0, fid: 0, cls: 0 };
    }

    const paintEntries = performance.getEntriesByType('paint');
    const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;

    const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
    const lcp = lcpEntries[lcpEntries.length - 1]?.startTime || 0;

    const fidEntries = performance.getEntriesByType('first-input');
    const fid = fidEntries[0] ? (fidEntries[0] as any).processingStart - fidEntries[0].startTime : 0;

    const clsEntries = performance.getEntriesByType('layout-shift');
    const cls = clsEntries.reduce((sum, entry) => {
      return sum + ((entry as any).hadRecentInput ? 0 : (entry as any).value);
    }, 0);

    return { fcp, lcp, fid, cls };
  }

  // Check if performance is good
  public isPerformanceGood(): boolean {
    const { fcp, lcp, fid, cls } = this.getLoadingMetrics();
    
    return (
      fcp < 1800 && // First Contentful Paint < 1.8s
      lcp < 2500 && // Largest Contentful Paint < 2.5s
      fid < 100 &&  // First Input Delay < 100ms
      cls < 0.1     // Cumulative Layout Shift < 0.1
    );
  }

  // Get optimization recommendations
  public getOptimizationRecommendations(): string[] {
    const recommendations: string[] = [];
    const { fcp, lcp, fid, cls } = this.getLoadingMetrics();
    const { totalChunks, loadedChunks } = this.getBundleInfo();

    if (fcp > 1800) {
      recommendations.push('Optimize First Contentful Paint - consider code splitting');
    }

    if (lcp > 2500) {
      recommendations.push('Optimize Largest Contentful Paint - optimize images and fonts');
    }

    if (fid > 100) {
      recommendations.push('Optimize First Input Delay - reduce JavaScript execution time');
    }

    if (cls > 0.1) {
      recommendations.push('Optimize Cumulative Layout Shift - reserve space for images');
    }

    if (totalChunks > 20) {
      recommendations.push('Consider reducing bundle chunks - merge small chunks');
    }

    if (loadedChunks < totalChunks * 0.8) {
      recommendations.push('Improve chunk loading - preload critical chunks');
    }

    return recommendations;
  }

  // Optimize bundle loading
  public optimizeBundleLoading() {
    if (typeof window === 'undefined') return;

    // Preload critical resources
    this.preloadCriticalResources();
    
    // Optimize image loading
    this.optimizeImageLoading();
    
    // Optimize font loading
    this.optimizeFontLoading();
  }

  private preloadCriticalResources() {
    const criticalResources = [
      '/images/hero-avocado.jpg',
      '/images/hero-fruits.jpg',
      '/images/juice-placeholder.svg',
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = 'image';
      document.head.appendChild(link);
    });
  }

  private optimizeImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.loading) {
        img.loading = 'lazy';
      }
    });
  }

  private optimizeFontLoading() {
    const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
    fontLinks.forEach(link => {
      link.setAttribute('rel', 'preload');
      link.setAttribute('as', 'style');
      link.setAttribute('onload', "this.onload=null;this.rel='stylesheet'");
    });
  }

  // Monitor bundle performance
  public monitorBundlePerformance(callback: (metrics: any) => void) {
    if (typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          callback({
            dns: navEntry.domainLookupEnd - navEntry.domainLookupStart,
            tcp: navEntry.connectEnd - navEntry.connectStart,
            request: navEntry.responseEnd - navEntry.requestStart,
            response: navEntry.responseEnd - navEntry.responseStart,
            dom: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
            load: navEntry.loadEventEnd - navEntry.loadEventStart,
            total: navEntry.loadEventEnd - navEntry.navigationStart,
          });
        }
      }
    });

    observer.observe({ entryTypes: ['navigation'] });
    return observer;
  }

  // Cleanup bundle optimizer
  public cleanup() {
    this.loadedChunks.clear();
    this.chunkCache.clear();
  }
}

// Hook for React components
export const useBundleOptimizer = () => {
  const optimizer = BundleOptimizer.getInstance();
  
  return {
    getBundleInfo: optimizer.getBundleInfo.bind(optimizer),
    isBundleOptimized: optimizer.isBundleOptimized.bind(optimizer),
    getLoadingMetrics: optimizer.getLoadingMetrics.bind(optimizer),
    isPerformanceGood: optimizer.isPerformanceGood.bind(optimizer),
    getOptimizationRecommendations: optimizer.getOptimizationRecommendations.bind(optimizer),
    optimizeBundleLoading: optimizer.optimizeBundleLoading.bind(optimizer),
    monitorBundlePerformance: optimizer.monitorBundlePerformance.bind(optimizer),
    cleanup: optimizer.cleanup.bind(optimizer),
  };
};
