// Performance Integration for Zatiaras Juice - Centralized Performance Management
import { BundleAnalyzer } from './bundle-analyzer';
import { AdvancedImageOptimizer } from './advanced-image-optimizer';
import { AdvancedCacheManager } from './advanced-cache-manager';
import { AdvancedPerformanceMonitor } from './advanced-performance-monitor';
import { AnimationOptimizer } from './animation-optimizer';
import { ScrollOptimizer } from './scroll-optimizer';
import { MemoryManager } from './memory-manager';
import { NetworkOptimizer } from './network-optimizer';

export class PerformanceIntegration {
  private static instance: PerformanceIntegration;
  private isInitialized: boolean = false;

  private constructor() {
    this.initializePerformanceIntegration();
  }

  public static getInstance(): PerformanceIntegration {
    if (!PerformanceIntegration.instance) {
      PerformanceIntegration.instance = new PerformanceIntegration();
    }
    return PerformanceIntegration.instance;
  }

  private initializePerformanceIntegration() {
    if (typeof window === 'undefined') return;

    // Initialize all performance modules
    this.initializeModules();
    
    // Setup performance monitoring
    this.setupPerformanceMonitoring();
    
    // Setup automatic optimizations
    this.setupAutomaticOptimizations();
    
    this.isInitialized = true;
  }

  private initializeModules() {
    // Initialize all performance modules
    BundleAnalyzer.getInstance();
    AdvancedImageOptimizer.getInstance();
    AdvancedCacheManager.getInstance();
    AdvancedPerformanceMonitor.getInstance();
    AnimationOptimizer.getInstance();
    ScrollOptimizer.getInstance();
    MemoryManager.getInstance();
    NetworkOptimizer.getInstance();
  }

  private setupPerformanceMonitoring() {
    // Start performance monitoring
    const monitor = AdvancedPerformanceMonitor.getInstance();
    monitor.startMonitoring();

    // Monitor performance every 30 seconds
    setInterval(() => {
      this.checkPerformanceHealth();
    }, 30000);
  }

  private setupAutomaticOptimizations() {
    // Setup automatic image optimization
    this.setupImageOptimization();
    
    // Setup automatic caching
    this.setupCachingOptimization();
    
    // Setup automatic memory management
    this.setupMemoryOptimization();
    
    // Setup automatic network optimization
    this.setupNetworkOptimization();
  }

  private setupImageOptimization() {
    // Optimize all images on page load
    window.addEventListener('load', () => {
      const images = document.querySelectorAll('img');
      images.forEach(() => {
        // Image optimization will be handled by Next.js Image component
      });
    });
  }

  private setupCachingOptimization() {
    const cacheManager = AdvancedCacheManager.getInstance();
    
    // Setup smart caching for different data types
    this.setupSmartCaching(cacheManager);
  }

  private setupSmartCaching(cacheManager: AdvancedCacheManager) {
    // Cache static data
    const staticData = {
      categories: ['Jus Buah & Sayur', 'Rekomendasi Mix Jus', 'Kocok', 'Baby', 'Non-Jus', 'Teh', 'Cemilan'],
      branches: ['berau', 'samarinda'],
      features: ['100% Alami', 'Tanpa Pengawet', 'Rating 4.9/5', 'Garansi Uang Kembali'],
    };
    
    cacheManager.setSmart('static-data', staticData, 'static');
    
    // Cache dynamic data with shorter TTL
    const dynamicData = {
      lastUpdated: Date.now(),
      version: '2.0.0',
    };
    
    cacheManager.setSmart('dynamic-data', dynamicData, 'dynamic');
  }

  private setupMemoryOptimization() {
    const memoryManager = MemoryManager.getInstance();
    
    // Setup automatic memory cleanup
    setInterval(() => {
      if (memoryManager.isMemoryUsageHigh()) {
        memoryManager.forceCleanup();
      }
    }, 60000); // Every minute
  }

  private setupNetworkOptimization() {
    const networkOptimizer = NetworkOptimizer.getInstance();
    
    // Setup network-aware optimizations
    if (networkOptimizer.isSlowConnection()) {
      this.enableSlowConnectionMode();
    }
    
    if (networkOptimizer.isDataSaverEnabled()) {
      this.enableDataSaverMode();
    }
  }

  private enableSlowConnectionMode() {
    // Reduce animation complexity
    document.body.classList.add('slow-connection');
    
    // Reduce image quality
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.style.filter = 'blur(1px)';
    });
  }

  private enableDataSaverMode() {
    // Disable non-critical animations
    document.body.classList.add('data-saver');
    
    // Reduce image quality further
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.style.filter = 'blur(2px)';
    });
  }

  private checkPerformanceHealth() {
    const monitor = AdvancedPerformanceMonitor.getInstance();
    const score = monitor.getPerformanceScore();
    
    if (score < 70) {
      // Performance score is low
      this.triggerPerformanceOptimizations();
    }
  }

  private triggerPerformanceOptimizations() {
    // Trigger memory cleanup
    const memoryManager = MemoryManager.getInstance();
    memoryManager.forceCleanup();
    
    // Trigger image optimization
    const imageOptimizer = AdvancedImageOptimizer.getInstance();
    imageOptimizer.clearCache();
    
    // Trigger bundle optimization
    const bundleAnalyzer = BundleAnalyzer.getInstance();
    const recommendations = bundleAnalyzer.getOptimizationRecommendations();
    // Bundle optimization recommendations generated
  }

  // Public API for components
  public getPerformanceScore(): number {
    const monitor = AdvancedPerformanceMonitor.getInstance();
    return monitor.getPerformanceScore();
  }

  public getOptimizationRecommendations(): string[] {
    const monitor = AdvancedPerformanceMonitor.getInstance();
    return monitor.getOptimizationRecommendations();
  }

  public isPerformanceGood(): boolean {
    const monitor = AdvancedPerformanceMonitor.getInstance();
    return monitor.isPerformanceGood();
  }

  public getCacheStats() {
    const cacheManager = AdvancedCacheManager.getInstance();
    return cacheManager.getStats();
  }

  public getMemoryStats() {
    const memoryManager = MemoryManager.getInstance();
    return memoryManager.getMemoryUsage();
  }

  public getNetworkStats() {
    const networkOptimizer = NetworkOptimizer.getInstance();
    return networkOptimizer.getConnectionInfo();
  }

  public getImageStats() {
    const imageOptimizer = AdvancedImageOptimizer.getInstance();
    return {
      loadingProgress: imageOptimizer.getLoadingProgress(),
      optimalFormat: imageOptimizer.getOptimalFormat(),
    };
  }

  public getBundleStats() {
    const bundleAnalyzer = BundleAnalyzer.getInstance();
    return bundleAnalyzer.getBundleMetrics();
  }

  // Force performance optimizations
  public forceOptimization() {
    this.triggerPerformanceOptimizations();
  }

  // Get comprehensive performance report
  public getPerformanceReport() {
    return {
      score: this.getPerformanceScore(),
      isGood: this.isPerformanceGood(),
      recommendations: this.getOptimizationRecommendations(),
      cache: this.getCacheStats(),
      memory: this.getMemoryStats(),
      network: this.getNetworkStats(),
      images: this.getImageStats(),
      bundle: this.getBundleStats(),
      timestamp: Date.now(),
    };
  }

  // Cleanup
  public cleanup() {
    if (!this.isInitialized) return;

    // Cleanup all modules
    BundleAnalyzer.getInstance().cleanup();
    AdvancedImageOptimizer.getInstance().cleanup();
    AdvancedCacheManager.getInstance().cleanup();
    AdvancedPerformanceMonitor.getInstance().cleanup();
    ScrollOptimizer.getInstance().cleanup();
    MemoryManager.getInstance().cleanup();
    NetworkOptimizer.getInstance().cleanup();

    this.isInitialized = false;
  }
}

// Hook for React components
export const usePerformanceIntegration = () => {
  const integration = PerformanceIntegration.getInstance();
  
  return {
    getPerformanceScore: integration.getPerformanceScore.bind(integration),
    getOptimizationRecommendations: integration.getOptimizationRecommendations.bind(integration),
    isPerformanceGood: integration.isPerformanceGood.bind(integration),
    getCacheStats: integration.getCacheStats.bind(integration),
    getMemoryStats: integration.getMemoryStats.bind(integration),
    getNetworkStats: integration.getNetworkStats.bind(integration),
    getImageStats: integration.getImageStats.bind(integration),
    getBundleStats: integration.getBundleStats.bind(integration),
    forceOptimization: integration.forceOptimization.bind(integration),
    getPerformanceReport: integration.getPerformanceReport.bind(integration),
    cleanup: integration.cleanup.bind(integration),
  };
};
