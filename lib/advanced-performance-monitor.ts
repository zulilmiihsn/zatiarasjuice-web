// Advanced Performance Monitoring for Zatiaras Juice
export class AdvancedPerformanceMonitor {
  private static instance: AdvancedPerformanceMonitor;
  private metrics: Map<string, any> = new Map();
  private observers: PerformanceObserver[] = [];
  private isMonitoring: boolean = false;

  private constructor() {
    this.initializeAdvancedMonitoring();
  }

  public static getInstance(): AdvancedPerformanceMonitor {
    if (!AdvancedPerformanceMonitor.instance) {
      AdvancedPerformanceMonitor.instance = new AdvancedPerformanceMonitor();
    }
    return AdvancedPerformanceMonitor.instance;
  }

  private initializeAdvancedMonitoring() {
    if (typeof window === 'undefined') return;

    this.setupCoreWebVitalsMonitoring();
    this.setupResourceMonitoring();
    this.setupNavigationMonitoring();
    this.setupLongTaskMonitoring();
    this.setupMemoryMonitoring();
    this.setupCustomMetrics();
  }

  private setupCoreWebVitalsMonitoring() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          switch (entry.entryType) {
            case 'largest-contentful-paint':
              this.metrics.set('LCP', {
                value: entry.startTime,
                rating: this.getLCPRating(entry.startTime),
                timestamp: Date.now(),
              });
              break;
            case 'first-input':
              const fid = (entry as any).processingStart - entry.startTime;
              this.metrics.set('FID', {
                value: fid,
                rating: this.getFIDRating(fid),
                timestamp: Date.now(),
              });
              break;
            case 'layout-shift':
              if (!(entry as any).hadRecentInput) {
                const currentCLS = this.metrics.get('CLS')?.value || 0;
                this.metrics.set('CLS', {
                  value: currentCLS + (entry as any).value,
                  rating: this.getCLSRating(currentCLS + (entry as any).value),
                  timestamp: Date.now(),
                });
              }
              break;
          }
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('Core Web Vitals monitoring not supported:', error);
    }
  }

  private setupResourceMonitoring() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resource = entry as PerformanceResourceTiming;
          this.analyzeResource(resource);
        }
      });

      observer.observe({ entryTypes: ['resource'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('Resource monitoring not supported:', error);
    }
  }

  private setupNavigationMonitoring() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const nav = entry as PerformanceNavigationTiming;
          this.analyzeNavigation(nav);
        }
      });

      observer.observe({ entryTypes: ['navigation'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('Navigation monitoring not supported:', error);
    }
  }

  private setupLongTaskMonitoring() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.analyzeLongTask(entry);
        }
      });

      observer.observe({ entryTypes: ['longtask'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('Long task monitoring not supported:', error);
    }
  }

  private setupMemoryMonitoring() {
    if (typeof window === 'undefined') return;

    setInterval(() => {
      const memory = (performance as any).memory;
      if (memory) {
        this.metrics.set('memory', {
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit,
          usage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
          timestamp: Date.now(),
        });
      }
    }, 5000);
  }

  private setupCustomMetrics() {
    // Monitor scroll performance
    this.monitorScrollPerformance();
    
    // Monitor animation performance
    this.monitorAnimationPerformance();
    
    // Monitor interaction performance
    this.monitorInteractionPerformance();
  }

  private monitorScrollPerformance() {
    let scrollStartTime = 0;
    let scrollEndTime = 0;
    let scrollFrames = 0;

    const measureScroll = () => {
      scrollStartTime = performance.now();
      scrollFrames = 0;
    };

    const countFrames = () => {
      scrollFrames++;
      if (performance.now() - scrollStartTime < 100) {
        requestAnimationFrame(countFrames);
      } else {
        scrollEndTime = performance.now();
        this.metrics.set('scrollPerformance', {
          duration: scrollEndTime - scrollStartTime,
          frames: scrollFrames,
          fps: (scrollFrames / (scrollEndTime - scrollStartTime)) * 1000,
          timestamp: Date.now(),
        });
      }
    };

    window.addEventListener('scroll', measureScroll, { passive: true });
  }

  private monitorAnimationPerformance() {
    let animationFrames = 0;
    let animationStartTime = 0;

    const measureAnimation = () => {
      animationStartTime = performance.now();
      animationFrames = 0;
      
      const countFrames = () => {
        animationFrames++;
        if (performance.now() - animationStartTime < 1000) {
          requestAnimationFrame(countFrames);
        } else {
          this.metrics.set('animationPerformance', {
            duration: performance.now() - animationStartTime,
            frames: animationFrames,
            fps: animationFrames,
            timestamp: Date.now(),
          });
        }
      };
      
      requestAnimationFrame(countFrames);
    };

    // Measure animation performance periodically
    setInterval(measureAnimation, 10000);
  }

  private monitorInteractionPerformance() {
    const interactionTypes = ['click', 'keydown', 'touchstart'];
    
    interactionTypes.forEach(type => {
      window.addEventListener(type, (event) => {
        const startTime = performance.now();
        
        requestAnimationFrame(() => {
          const endTime = performance.now();
          const responseTime = endTime - startTime;
          
          this.metrics.set('interactionPerformance', {
            type,
            responseTime,
            rating: this.getInteractionRating(responseTime),
            timestamp: Date.now(),
          });
        });
      }, { passive: true });
    });
  }

  private analyzeResource(resource: PerformanceResourceTiming) {
    const duration = resource.responseEnd - resource.startTime;
    const size = resource.transferSize || 0;
    
    // Categorize resources
    let category = 'other';
    if (resource.name.includes('_next/static/chunks/')) {
      category = 'javascript';
    } else if (resource.name.includes('.css')) {
      category = 'css';
    } else if (resource.name.match(/\.(jpg|jpeg|png|gif|webp|avif)$/)) {
      category = 'image';
    } else if (resource.name.match(/\.(woff|woff2|ttf|otf)$/)) {
      category = 'font';
    }

    // Track slow resources
    if (duration > 1000) { // > 1 second
      this.metrics.set('slowResources', {
        url: resource.name,
        duration,
        size,
        category,
        timestamp: Date.now(),
      });
    }

    // Track large resources
    if (size > 100 * 1024) { // > 100KB
      this.metrics.set('largeResources', {
        url: resource.name,
        duration,
        size,
        category,
        timestamp: Date.now(),
      });
    }
  }

  private analyzeNavigation(nav: PerformanceNavigationTiming) {
    this.metrics.set('navigation', {
      dns: nav.domainLookupEnd - nav.domainLookupStart,
      tcp: nav.connectEnd - nav.connectStart,
      request: nav.responseEnd - nav.requestStart,
      response: nav.responseEnd - nav.responseStart,
      dom: nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart,
      load: nav.loadEventEnd - nav.loadEventStart,
      total: nav.loadEventEnd - nav.fetchStart,
      timestamp: Date.now(),
    });
  }

  private analyzeLongTask(entry: PerformanceEntry) {
    this.metrics.set('longTasks', {
      duration: entry.duration,
      startTime: entry.startTime,
      timestamp: Date.now(),
    });
  }

  // Rating functions
  private getLCPRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 2500) return 'good';
    if (value <= 4000) return 'needs-improvement';
    return 'poor';
  }

  private getFIDRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 100) return 'good';
    if (value <= 300) return 'needs-improvement';
    return 'poor';
  }

  private getCLSRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 0.1) return 'good';
    if (value <= 0.25) return 'needs-improvement';
    return 'poor';
  }

  private getInteractionRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 100) return 'good';
    if (value <= 300) return 'needs-improvement';
    return 'poor';
  }

  // Get performance score
  public getPerformanceScore(): number {
    const lcp = this.metrics.get('LCP');
    const fid = this.metrics.get('FID');
    const cls = this.metrics.get('CLS');
    const memory = this.metrics.get('memory');

    let score = 100;

    // Deduct points for poor metrics
    if (lcp?.rating === 'poor') score -= 30;
    else if (lcp?.rating === 'needs-improvement') score -= 15;

    if (fid?.rating === 'poor') score -= 25;
    else if (fid?.rating === 'needs-improvement') score -= 10;

    if (cls?.rating === 'poor') score -= 25;
    else if (cls?.rating === 'needs-improvement') score -= 10;

    if (memory?.usage > 80) score -= 20;
    else if (memory?.usage > 60) score -= 10;

    return Math.max(0, score);
  }

  // Get optimization recommendations
  public getOptimizationRecommendations(): string[] {
    const recommendations: string[] = [];
    const lcp = this.metrics.get('LCP');
    const fid = this.metrics.get('FID');
    const cls = this.metrics.get('CLS');
    const memory = this.metrics.get('memory');
    const slowResources = this.metrics.get('slowResources');
    const largeResources = this.metrics.get('largeResources');

    if (lcp?.rating === 'poor' || lcp?.rating === 'needs-improvement') {
      recommendations.push('Optimize Largest Contentful Paint - consider image optimization and critical CSS');
    }

    if (fid?.rating === 'poor' || fid?.rating === 'needs-improvement') {
      recommendations.push('Optimize First Input Delay - reduce JavaScript execution time');
    }

    if (cls?.rating === 'poor' || cls?.rating === 'needs-improvement') {
      recommendations.push('Optimize Cumulative Layout Shift - reserve space for images and fonts');
    }

    if (memory?.usage > 80) {
      recommendations.push('Optimize memory usage - consider implementing memory cleanup');
    }

    if (slowResources) {
      recommendations.push('Optimize slow resources - consider compression and CDN');
    }

    if (largeResources) {
      recommendations.push('Optimize large resources - consider code splitting and lazy loading');
    }

    return recommendations;
  }

  // Get all metrics
  public getAllMetrics(): Record<string, any> {
    return Object.fromEntries(this.metrics);
  }

  // Get Core Web Vitals
  public getCoreWebVitals(): {
    LCP?: any;
    FID?: any;
    CLS?: any;
  } {
    return {
      LCP: this.metrics.get('LCP'),
      FID: this.metrics.get('FID'),
      CLS: this.metrics.get('CLS'),
    };
  }

  // Check if performance is good
  public isPerformanceGood(): boolean {
    return this.getPerformanceScore() >= 80;
  }

  // Start monitoring
  public startMonitoring(): void {
    this.isMonitoring = true;
  }

  // Stop monitoring
  public stopMonitoring(): void {
    this.isMonitoring = false;
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }

  // Cleanup
  public cleanup(): void {
    this.stopMonitoring();
    this.metrics.clear();
  }
}

// Hook for React components
export const useAdvancedPerformanceMonitor = () => {
  const monitor = AdvancedPerformanceMonitor.getInstance();
  
  return {
    getPerformanceScore: monitor.getPerformanceScore.bind(monitor),
    getOptimizationRecommendations: monitor.getOptimizationRecommendations.bind(monitor),
    getAllMetrics: monitor.getAllMetrics.bind(monitor),
    getCoreWebVitals: monitor.getCoreWebVitals.bind(monitor),
    isPerformanceGood: monitor.isPerformanceGood.bind(monitor),
    startMonitoring: monitor.startMonitoring.bind(monitor),
    stopMonitoring: monitor.stopMonitoring.bind(monitor),
    cleanup: monitor.cleanup.bind(monitor),
  };
};
