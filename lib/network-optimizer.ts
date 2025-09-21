// Network optimization utilities for Zatiaras Juice
export class NetworkOptimizer {
  private static instance: NetworkOptimizer;
  private connection: any = null;
  private isOnline: boolean = true;
  private retryQueue: Array<() => Promise<any>> = [];

  private constructor() {
    this.initializeNetworkMonitoring();
  }

  public static getInstance(): NetworkOptimizer {
    if (!NetworkOptimizer.instance) {
      NetworkOptimizer.instance = new NetworkOptimizer();
    }
    return NetworkOptimizer.instance;
  }

  private initializeNetworkMonitoring() {
    if (typeof window === 'undefined') return;

    // Monitor online/offline status
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.processRetryQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    // Monitor connection quality
    this.connection = (navigator as any).connection;
    if (this.connection) {
      this.connection.addEventListener('change', () => {
        this.optimizeForConnection();
      });
    }
  }

  private processRetryQueue() {
    if (this.retryQueue.length === 0) return;

    const retryPromises = this.retryQueue.map(retry => retry());
    this.retryQueue = [];

    Promise.allSettled(retryPromises).then(results => {
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.warn(`Retry ${index} failed:`, result.reason);
        }
      });
    });
  }

  private optimizeForConnection() {
    if (!this.connection) return;

    const effectiveType = this.connection.effectiveType;
    const saveData = this.connection.saveData;

    // Adjust image quality based on connection
    this.adjustImageQuality(effectiveType, saveData);
    
    // Adjust animation performance based on connection
    this.adjustAnimationPerformance(effectiveType, saveData);
  }

  private adjustImageQuality(effectiveType: string, saveData: boolean) {
    const quality = this.getOptimalImageQuality(effectiveType, saveData);
    
    // Update all images with new quality
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.dataset.quality) {
        img.dataset.quality = quality.toString();
      }
    });
  }

  private adjustAnimationPerformance(effectiveType: string, saveData: boolean) {
    const shouldReduceAnimations = this.shouldReduceAnimations(effectiveType, saveData);
    
    if (shouldReduceAnimations) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
  }

  private getOptimalImageQuality(effectiveType: string, saveData: boolean): number {
    if (saveData) return 50;
    
    switch (effectiveType) {
      case 'slow-2g':
      case '2g':
        return 60;
      case '3g':
        return 75;
      case '4g':
      default:
        return 85;
    }
  }

  private shouldReduceAnimations(effectiveType: string, saveData: boolean): boolean {
    if (saveData) return true;
    
    return effectiveType === 'slow-2g' || effectiveType === '2g';
  }

  // Get connection information
  public getConnectionInfo(): {
    effectiveType: string;
    downlink: number;
    rtt: number;
    saveData: boolean;
    isOnline: boolean;
  } {
    return {
      effectiveType: this.connection?.effectiveType || '4g',
      downlink: this.connection?.downlink || 10,
      rtt: this.connection?.rtt || 100,
      saveData: this.connection?.saveData || false,
      isOnline: this.isOnline,
    };
  }

  // Check if connection is slow
  public isSlowConnection(): boolean {
    const { effectiveType, downlink, rtt } = this.getConnectionInfo();
    
    return (
      effectiveType === 'slow-2g' ||
      effectiveType === '2g' ||
      downlink < 1 ||
      rtt > 1000
    );
  }

  // Check if data saver is enabled
  public isDataSaverEnabled(): boolean {
    return this.connection?.saveData || false;
  }

  // Get optimal chunk size for data loading
  public getOptimalChunkSize(): number {
    const { effectiveType, downlink } = this.getConnectionInfo();
    
    if (effectiveType === 'slow-2g' || effectiveType === '2g') {
      return 10; // Load 10 items at a time
    } else if (effectiveType === '3g') {
      return 20; // Load 20 items at a time
    } else {
      return 50; // Load 50 items at a time
    }
  }

  // Get optimal timeout for requests
  public getOptimalTimeout(): number {
    const { effectiveType, rtt } = this.getConnectionInfo();
    
    if (effectiveType === 'slow-2g' || effectiveType === '2g') {
      return 30000; // 30 seconds
    } else if (effectiveType === '3g') {
      return 15000; // 15 seconds
    } else {
      return 10000; // 10 seconds
    }
  }

  // Retry failed requests when connection is restored
  public retryWhenOnline<T>(request: () => Promise<T>): Promise<T> {
    if (this.isOnline) {
      return request();
    } else {
      return new Promise((resolve, reject) => {
        this.retryQueue.push(async () => {
          try {
            const result = await request();
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      });
    }
  }

  // Prefetch resources based on connection quality
  public prefetchResources(resources: string[]): Promise<void> {
    if (this.isSlowConnection()) {
      // Only prefetch critical resources on slow connections
      const criticalResources = resources.slice(0, 2);
      return this.prefetchCriticalResources(criticalResources);
    } else {
      // Prefetch all resources on fast connections
      return this.prefetchAllResources(resources);
    }
  }

  private async prefetchCriticalResources(resources: string[]): Promise<void> {
    const promises = resources.map(resource => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;
      document.head.appendChild(link);
      
      return new Promise<void>((resolve) => {
        link.onload = () => resolve();
        link.onerror = () => resolve();
      });
    });

    await Promise.all(promises);
  }

  private async prefetchAllResources(resources: string[]): Promise<void> {
    const promises = resources.map(resource => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;
      document.head.appendChild(link);
      
      return new Promise<void>((resolve) => {
        link.onload = () => resolve();
        link.onerror = () => resolve();
      });
    });

    await Promise.all(promises);
  }

  // Get optimal loading strategy
  public getLoadingStrategy(): 'eager' | 'lazy' | 'critical' {
    const { effectiveType, saveData } = this.getConnectionInfo();
    
    if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
      return 'critical'; // Only load critical resources
    } else if (effectiveType === '3g') {
      return 'lazy'; // Lazy load non-critical resources
    } else {
      return 'eager'; // Load everything eagerly
    }
  }

  // Monitor network performance
  public monitorNetworkPerformance(callback: (metrics: any) => void) {
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
          });
        }
      }
    });

    observer.observe({ entryTypes: ['navigation'] });
    return observer;
  }

  // Cleanup network optimizer
  public cleanup() {
    this.retryQueue = [];
  }
}

// Hook for React components
export const useNetworkOptimizer = () => {
  const optimizer = NetworkOptimizer.getInstance();
  
  return {
    getConnectionInfo: optimizer.getConnectionInfo.bind(optimizer),
    isSlowConnection: optimizer.isSlowConnection.bind(optimizer),
    isDataSaverEnabled: optimizer.isDataSaverEnabled.bind(optimizer),
    getOptimalChunkSize: optimizer.getOptimalChunkSize.bind(optimizer),
    getOptimalTimeout: optimizer.getOptimalTimeout.bind(optimizer),
    retryWhenOnline: optimizer.retryWhenOnline.bind(optimizer),
    prefetchResources: optimizer.prefetchResources.bind(optimizer),
    getLoadingStrategy: optimizer.getLoadingStrategy.bind(optimizer),
    monitorNetworkPerformance: optimizer.monitorNetworkPerformance.bind(optimizer),
    cleanup: optimizer.cleanup.bind(optimizer),
  };
};
