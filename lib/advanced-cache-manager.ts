// Advanced Caching Strategy for Zatiaras Juice
export class AdvancedCacheManager {
  private static instance: AdvancedCacheManager;
  private cache: Map<string, any> = new Map();
  private cacheTimestamps: Map<string, number> = new Map();
  private cacheTTL: Map<string, number> = new Map();
  private maxCacheSize: number = 50 * 1024 * 1024; // 50MB
  private currentCacheSize: number = 0;

  private constructor() {
    this.initializeCacheManager();
  }

  public static getInstance(): AdvancedCacheManager {
    if (!AdvancedCacheManager.instance) {
      AdvancedCacheManager.instance = new AdvancedCacheManager();
    }
    return AdvancedCacheManager.instance;
  }

  private initializeCacheManager() {
    if (typeof window === 'undefined') return;

    // Setup cache cleanup
    this.setupCacheCleanup();
    
    // Setup memory monitoring
    this.setupMemoryMonitoring();
    
    // Setup cache persistence
    this.setupCachePersistence();
  }

  private setupCacheCleanup() {
    // Clean expired cache every 5 minutes
    setInterval(() => {
      this.cleanExpiredCache();
    }, 5 * 60 * 1000);

    // Clean cache on page unload
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });
  }

  private setupMemoryMonitoring() {
    // Monitor memory usage
    setInterval(() => {
      this.checkMemoryUsage();
    }, 30 * 1000);
  }

  private setupCachePersistence() {
    // Load cache from localStorage on init
    this.loadCacheFromStorage();
    
    // Save cache to localStorage periodically
    setInterval(() => {
      this.saveCacheToStorage();
    }, 2 * 60 * 1000); // Every 2 minutes
  }

  // Set cache with TTL
  public set(key: string, value: any, ttl: number = 300000): void { // 5 minutes default
    const serializedValue = JSON.stringify(value);
    const size = new Blob([serializedValue]).size;
    
    // Check if adding this item would exceed max cache size
    if (this.currentCacheSize + size > this.maxCacheSize) {
      this.evictOldestItems(size);
    }

    this.cache.set(key, value);
    this.cacheTimestamps.set(key, Date.now());
    this.cacheTTL.set(key, ttl);
    this.currentCacheSize += size;
  }

  // Get cache with TTL check
  public get(key: string): any | null {
    const value = this.cache.get(key);
    if (!value) return null;

    const timestamp = this.cacheTimestamps.get(key);
    const ttl = this.cacheTTL.get(key);
    
    if (timestamp && ttl && Date.now() - timestamp > ttl) {
      this.delete(key);
      return null;
    }

    return value;
  }

  // Delete cache item
  public delete(key: string): void {
    const value = this.cache.get(key);
    if (value) {
      const serializedValue = JSON.stringify(value);
      const size = new Blob([serializedValue]).size;
      this.currentCacheSize -= size;
    }

    this.cache.delete(key);
    this.cacheTimestamps.delete(key);
    this.cacheTTL.delete(key);
  }

  // Check if cache exists and is valid
  public has(key: string): boolean {
    return this.get(key) !== null;
  }

  // Clear all cache
  public clear(): void {
    this.cache.clear();
    this.cacheTimestamps.clear();
    this.cacheTTL.clear();
    this.currentCacheSize = 0;
  }

  // Get cache statistics
  public getStats(): {
    size: number;
    count: number;
    maxSize: number;
    usage: number;
  } {
    return {
      size: this.currentCacheSize,
      count: this.cache.size,
      maxSize: this.maxCacheSize,
      usage: (this.currentCacheSize / this.maxCacheSize) * 100,
    };
  }

  // Clean expired cache
  private cleanExpiredCache(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.cacheTimestamps.forEach((timestamp, key) => {
      const ttl = this.cacheTTL.get(key);
      if (ttl && now - timestamp > ttl) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.delete(key));
  }

  // Evict oldest items when cache is full
  private evictOldestItems(requiredSize: number): void {
    const sortedEntries = Array.from(this.cacheTimestamps.entries())
      .sort(([, a], [, b]) => a - b);

    let freedSize = 0;
    for (const [key] of sortedEntries) {
      const value = this.cache.get(key);
      if (value) {
        const serializedValue = JSON.stringify(value);
        const size = new Blob([serializedValue]).size;
        freedSize += size;
        this.delete(key);
        
        if (freedSize >= requiredSize) {
          break;
        }
      }
    }
  }

  // Check memory usage
  private checkMemoryUsage(): void {
    const memory = (performance as any).memory;
    if (memory) {
      const usage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
      if (usage > 0.8) { // 80% memory usage
        this.clear();
      }
    }
  }

  // Load cache from localStorage
  private loadCacheFromStorage(): void {
    try {
      const stored = localStorage.getItem('zatiaras-cache');
      if (stored) {
        const data = JSON.parse(stored);
        const now = Date.now();
        
        Object.entries(data).forEach(([key, value]: [string, any]) => {
          if (value.timestamp && value.ttl && now - value.timestamp < value.ttl) {
            this.cache.set(key, value.data);
            this.cacheTimestamps.set(key, value.timestamp);
            this.cacheTTL.set(key, value.ttl);
          }
        });
      }
    } catch (error) {
      console.warn('Failed to load cache from storage:', error);
    }
  }

  // Save cache to localStorage
  private saveCacheToStorage(): void {
    try {
      const data: Record<string, any> = {};
      const now = Date.now();
      
      this.cache.forEach((value, key) => {
        const timestamp = this.cacheTimestamps.get(key);
        const ttl = this.cacheTTL.get(key);
        
        if (timestamp && ttl && now - timestamp < ttl) {
          data[key] = {
            data: value,
            timestamp,
            ttl,
          };
        }
      });
      
      localStorage.setItem('zatiaras-cache', JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save cache to storage:', error);
    }
  }

  // Cache with automatic TTL based on data type
  public setSmart(key: string, value: any, dataType: 'static' | 'dynamic' | 'api' = 'dynamic'): void {
    let ttl: number;
    
    switch (dataType) {
      case 'static':
        ttl = 24 * 60 * 60 * 1000; // 24 hours
        break;
      case 'api':
        ttl = 5 * 60 * 1000; // 5 minutes
        break;
      case 'dynamic':
      default:
        ttl = 15 * 60 * 1000; // 15 minutes
        break;
    }
    
    this.set(key, value, ttl);
  }

  // Get or set pattern
  public async getOrSet<T>(
    key: string, 
    fetcher: () => Promise<T>, 
    dataType: 'static' | 'dynamic' | 'api' = 'dynamic'
  ): Promise<T> {
    const cached = this.get(key);
    if (cached) {
      return cached;
    }

    const value = await fetcher();
    this.setSmart(key, value, dataType);
    return value;
  }

  // Cleanup
  public cleanup(): void {
    this.saveCacheToStorage();
    this.clear();
  }
}

// Hook for React components
export const useAdvancedCacheManager = () => {
  const manager = AdvancedCacheManager.getInstance();
  
  return {
    set: manager.set.bind(manager),
    get: manager.get.bind(manager),
    delete: manager.delete.bind(manager),
    has: manager.has.bind(manager),
    clear: manager.clear.bind(manager),
    getStats: manager.getStats.bind(manager),
    setSmart: manager.setSmart.bind(manager),
    getOrSet: manager.getOrSet.bind(manager),
    cleanup: manager.cleanup.bind(manager),
  };
};
