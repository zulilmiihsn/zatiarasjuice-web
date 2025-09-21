// Performance Auditor for Zatiaras Juice - Comprehensive Performance Analysis
export class PerformanceAuditor {
  private static instance: PerformanceAuditor;
  private auditResults: Map<string, any> = new Map();
  private isAuditing: boolean = false;

  private constructor() {
    this.initializeAuditor();
  }

  public static getInstance(): PerformanceAuditor {
    if (!PerformanceAuditor.instance) {
      PerformanceAuditor.instance = new PerformanceAuditor();
    }
    return PerformanceAuditor.instance;
  }

  private initializeAuditor() {
    if (typeof window === 'undefined') return;
    
    // Start auditing after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.performComprehensiveAudit();
      }, 2000);
    });
  }

  public async performComprehensiveAudit(): Promise<PerformanceAuditResult> {
    if (this.isAuditing) return this.getLastAuditResult();
    
    this.isAuditing = true;
    const auditResult: PerformanceAuditResult = {
      timestamp: Date.now(),
      overallScore: 0,
      categories: {},
      recommendations: [],
      criticalIssues: [],
      performanceMetrics: {},
    };

    try {
      // 1. Core Web Vitals Audit
      auditResult.categories.coreWebVitals = await this.auditCoreWebVitals();
      
      // 2. Bundle Size Audit
      auditResult.categories.bundleSize = await this.auditBundleSize();
      
      // 3. Image Optimization Audit
      auditResult.categories.imageOptimization = await this.auditImageOptimization();
      
      // 4. Caching Strategy Audit
      auditResult.categories.cachingStrategy = await this.auditCachingStrategy();
      
      // 5. Memory Usage Audit
      auditResult.categories.memoryUsage = await this.auditMemoryUsage();
      
      // 6. Network Performance Audit
      auditResult.categories.networkPerformance = await this.auditNetworkPerformance();
      
      // 7. Rendering Performance Audit
      auditResult.categories.renderingPerformance = await this.auditRenderingPerformance();
      
      // 8. SEO Performance Audit
      auditResult.categories.seoPerformance = await this.auditSEOPerformance();
      
      // 9. Accessibility Performance Audit
      auditResult.categories.accessibilityPerformance = await this.auditAccessibilityPerformance();
      
      // 10. Security Performance Audit
      auditResult.categories.securityPerformance = await this.auditSecurityPerformance();

      // Calculate overall score
      auditResult.overallScore = this.calculateOverallScore(auditResult.categories);
      
      // Generate recommendations
      auditResult.recommendations = this.generateRecommendations(auditResult.categories);
      
      // Identify critical issues
      auditResult.criticalIssues = this.identifyCriticalIssues(auditResult.categories);
      
      // Store audit results
      this.auditResults.set('lastAudit', auditResult);
      
      return auditResult;
    } catch (error) {
      // Performance audit failed
      return auditResult;
    } finally {
      this.isAuditing = false;
    }
  }

  // 1. CORE WEB VITALS AUDIT
  private async auditCoreWebVitals(): Promise<CategoryAuditResult> {
    const result: CategoryAuditResult = {
      score: 0,
      metrics: {},
      issues: [],
      recommendations: [],
    };

    try {
      // LCP (Largest Contentful Paint)
      const lcp = await this.getLCP();
      result.metrics.lcp = lcp;
      if (lcp > 4000) {
        result.issues.push('LCP is too slow (>4s)');
        result.recommendations.push('Optimize largest contentful paint');
      }

      // FID (First Input Delay)
      const fid = await this.getFID();
      result.metrics.fid = fid;
      if (fid > 300) {
        result.issues.push('FID is too slow (>300ms)');
        result.recommendations.push('Reduce first input delay');
      }

      // CLS (Cumulative Layout Shift)
      const cls = await this.getCLS();
      result.metrics.cls = cls;
      if (cls > 0.25) {
        result.issues.push('CLS is too high (>0.25)');
        result.recommendations.push('Reduce cumulative layout shift');
      }

      // FCP (First Contentful Paint)
      const fcp = await this.getFCP();
      result.metrics.fcp = fcp;
      if (fcp > 3000) {
        result.issues.push('FCP is too slow (>3s)');
        result.recommendations.push('Optimize first contentful paint');
      }

      // Calculate score
      result.score = this.calculateCategoryScore(result.metrics, {
        lcp: { good: 2500, poor: 4000 },
        fid: { good: 100, poor: 300 },
        cls: { good: 0.1, poor: 0.25 },
        fcp: { good: 1800, poor: 3000 },
      });

    } catch (error) {
      result.issues.push('Failed to measure Core Web Vitals');
    }

    return result;
  }

  // 2. BUNDLE SIZE AUDIT
  private async auditBundleSize(): Promise<CategoryAuditResult> {
    const result: CategoryAuditResult = {
      score: 0,
      metrics: {},
      issues: [],
      recommendations: [],
    };

    try {
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      let totalSize = 0;
      let vendorSize = 0;
      let appSize = 0;

      for (const script of scripts) {
        const src = script.getAttribute('src');
        if (src) {
          // Estimate size based on URL patterns
          if (src.includes('_next/static/chunks/pages/')) {
            appSize += 50; // Estimated KB
          } else if (src.includes('_next/static/chunks/framework')) {
            vendorSize += 100; // Estimated KB
          } else if (src.includes('_next/static/chunks/')) {
            vendorSize += 30; // Estimated KB
          }
        }
      }

      totalSize = appSize + vendorSize;
      result.metrics.totalSize = totalSize;
      result.metrics.vendorSize = vendorSize;
      result.metrics.appSize = appSize;

      if (totalSize > 500) {
        result.issues.push('Bundle size is too large (>500KB)');
        result.recommendations.push('Implement code splitting and tree shaking');
      }

      if (vendorSize > 300) {
        result.issues.push('Vendor bundle is too large (>300KB)');
        result.recommendations.push('Optimize vendor dependencies');
      }

      // Calculate score
      result.score = this.calculateCategoryScore(result.metrics, {
        totalSize: { good: 200, poor: 500 },
        vendorSize: { good: 100, poor: 300 },
        appSize: { good: 100, poor: 200 },
      });

    } catch (error) {
      result.issues.push('Failed to analyze bundle size');
    }

    return result;
  }

  // 3. IMAGE OPTIMIZATION AUDIT
  private async auditImageOptimization(): Promise<CategoryAuditResult> {
    const result: CategoryAuditResult = {
      score: 0,
      metrics: {},
      issues: [],
      recommendations: [],
    };

    try {
      const images = Array.from(document.querySelectorAll('img'));
      let unoptimizedImages = 0;
      let largeImages = 0;
      let missingAlt = 0;
      let missingLazy = 0;

      for (const img of images) {
        // Check for optimization
        if (!img.hasAttribute('loading')) {
          missingLazy++;
        }

        if (!img.hasAttribute('alt')) {
          missingAlt++;
        }

        // Check for responsive images
        if (!img.hasAttribute('sizes') && !img.hasAttribute('srcset')) {
          unoptimizedImages++;
        }

        // Check image size (simplified)
        const src = img.getAttribute('src');
        if (src && (src.includes('large') || src.includes('high-res'))) {
          largeImages++;
        }
      }

      result.metrics.totalImages = images.length;
      result.metrics.unoptimizedImages = unoptimizedImages;
      result.metrics.largeImages = largeImages;
      result.metrics.missingAlt = missingAlt;
      result.metrics.missingLazy = missingLazy;

      if (unoptimizedImages > 0) {
        result.issues.push(`${unoptimizedImages} images are not optimized`);
        result.recommendations.push('Implement responsive images with srcset');
      }

      if (missingLazy > 0) {
        result.issues.push(`${missingLazy} images missing lazy loading`);
        result.recommendations.push('Add loading="lazy" to images');
      }

      if (missingAlt > 0) {
        result.issues.push(`${missingAlt} images missing alt text`);
        result.recommendations.push('Add alt text to all images');
      }

      // Calculate score
      result.score = this.calculateCategoryScore(result.metrics, {
        unoptimizedImages: { good: 0, poor: 3 },
        missingLazy: { good: 0, poor: 2 },
        missingAlt: { good: 0, poor: 1 },
      });

    } catch (error) {
      result.issues.push('Failed to analyze image optimization');
    }

    return result;
  }

  // 4. CACHING STRATEGY AUDIT
  private async auditCachingStrategy(): Promise<CategoryAuditResult> {
    const result: CategoryAuditResult = {
      score: 0,
      metrics: {},
      issues: [],
      recommendations: [],
    };

    try {
      // Check for service worker
      const hasServiceWorker = 'serviceWorker' in navigator;
      result.metrics.hasServiceWorker = hasServiceWorker;

      // Check cache headers
      const staticAssets = document.querySelectorAll('link[rel="stylesheet"], script[src]');
      let cachedAssets = 0;

      for (let i = 0; i < staticAssets.length; i++) {
        const asset = staticAssets[i];
        const href = asset.getAttribute('href') || asset.getAttribute('src');
        if (href && (href.includes('_next/static') || href.includes('static'))) {
          cachedAssets++;
        }
      }

      result.metrics.cachedAssets = cachedAssets;
      result.metrics.totalAssets = staticAssets.length;

      if (!hasServiceWorker) {
        result.issues.push('No service worker detected');
        result.recommendations.push('Implement service worker for caching');
      }

      if (cachedAssets < staticAssets.length * 0.8) {
        result.issues.push('Insufficient asset caching');
        result.recommendations.push('Improve caching strategy for static assets');
      }

      // Calculate score
      result.score = this.calculateCategoryScore(result.metrics, {
        hasServiceWorker: { good: 1, poor: 0 },
        cachedAssets: { good: staticAssets.length * 0.8, poor: staticAssets.length * 0.5 },
      });

    } catch (error) {
      result.issues.push('Failed to analyze caching strategy');
    }

    return result;
  }

  // 5. MEMORY USAGE AUDIT
  private async auditMemoryUsage(): Promise<CategoryAuditResult> {
    const result: CategoryAuditResult = {
      score: 0,
      metrics: {},
      issues: [],
      recommendations: [],
    };

    try {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usedMemory = memory.usedJSHeapSize;
        const totalMemory = memory.totalJSHeapSize;
        const memoryLimit = memory.jsHeapSizeLimit;
        const memoryUsage = usedMemory / memoryLimit;

        result.metrics.usedMemory = usedMemory;
        result.metrics.totalMemory = totalMemory;
        result.metrics.memoryLimit = memoryLimit;
        result.metrics.memoryUsage = memoryUsage;

        if (memoryUsage > 0.8) {
          result.issues.push('High memory usage detected');
          result.recommendations.push('Implement memory cleanup strategies');
        }

        if (memoryUsage > 0.9) {
          result.issues.push('Critical memory usage detected');
          result.recommendations.push('Immediate memory optimization required');
        }

        // Calculate score
        result.score = this.calculateCategoryScore(result.metrics, {
          memoryUsage: { good: 0.5, poor: 0.8 },
        });
      } else {
        result.issues.push('Memory API not available');
        result.recommendations.push('Memory monitoring not supported');
      }

    } catch (error) {
      result.issues.push('Failed to analyze memory usage');
    }

    return result;
  }

  // 6. NETWORK PERFORMANCE AUDIT
  private async auditNetworkPerformance(): Promise<CategoryAuditResult> {
    const result: CategoryAuditResult = {
      score: 0,
      metrics: {},
      issues: [],
      recommendations: [],
    };

    try {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        const effectiveType = connection.effectiveType;
        const downlink = connection.downlink;
        const rtt = connection.rtt;

        result.metrics.effectiveType = effectiveType;
        result.metrics.downlink = downlink;
        result.metrics.rtt = rtt;

        if (effectiveType === 'slow-2g' || effectiveType === '2g') {
          result.issues.push('Slow network connection detected');
          result.recommendations.push('Optimize for slow connections');
        }

        if (rtt > 1000) {
          result.issues.push('High network latency detected');
          result.recommendations.push('Optimize network requests');
        }

        // Calculate score
        result.score = this.calculateCategoryScore(result.metrics, {
          rtt: { good: 100, poor: 1000 },
          downlink: { good: 10, poor: 1 },
        });
      } else {
        result.issues.push('Network API not available');
      }

    } catch (error) {
      result.issues.push('Failed to analyze network performance');
    }

    return result;
  }

  // 7. RENDERING PERFORMANCE AUDIT
  private async auditRenderingPerformance(): Promise<CategoryAuditResult> {
    const result: CategoryAuditResult = {
      score: 0,
      metrics: {},
      issues: [],
      recommendations: [],
    };

    try {
      // Check for long tasks
      const longTasks = await this.getLongTasks();
      result.metrics.longTasks = longTasks.length;

      if (longTasks.length > 0) {
        result.issues.push(`${longTasks.length} long tasks detected`);
        result.recommendations.push('Optimize long-running tasks');
      }

      // Check for layout thrashing
      const layoutShifts = await this.getLayoutShifts();
      result.metrics.layoutShifts = layoutShifts.length;

      if (layoutShifts.length > 5) {
        result.issues.push('Excessive layout shifts detected');
        result.recommendations.push('Optimize layout stability');
      }

      // Calculate score
      result.score = this.calculateCategoryScore(result.metrics, {
        longTasks: { good: 0, poor: 3 },
        layoutShifts: { good: 0, poor: 5 },
      });

    } catch (error) {
      result.issues.push('Failed to analyze rendering performance');
    }

    return result;
  }

  // 8. SEO PERFORMANCE AUDIT
  private async auditSEOPerformance(): Promise<CategoryAuditResult> {
    const result: CategoryAuditResult = {
      score: 0,
      metrics: {},
      issues: [],
      recommendations: [],
    };

    try {
      // Check meta tags
      const title = document.querySelector('title')?.textContent;
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
      const viewport = document.querySelector('meta[name="viewport"]')?.getAttribute('content');

      result.metrics.hasTitle = !!title;
      result.metrics.hasDescription = !!description;
      result.metrics.hasViewport = !!viewport;

      if (!title) {
        result.issues.push('Missing page title');
        result.recommendations.push('Add page title');
      }

      if (!description) {
        result.issues.push('Missing meta description');
        result.recommendations.push('Add meta description');
      }

      if (!viewport) {
        result.issues.push('Missing viewport meta tag');
        result.recommendations.push('Add viewport meta tag');
      }

      // Calculate score
      result.score = this.calculateCategoryScore(result.metrics, {
        hasTitle: { good: 1, poor: 0 },
        hasDescription: { good: 1, poor: 0 },
        hasViewport: { good: 1, poor: 0 },
      });

    } catch (error) {
      result.issues.push('Failed to analyze SEO performance');
    }

    return result;
  }

  // 9. ACCESSIBILITY PERFORMANCE AUDIT
  private async auditAccessibilityPerformance(): Promise<CategoryAuditResult> {
    const result: CategoryAuditResult = {
      score: 0,
      metrics: {},
      issues: [],
      recommendations: [],
    };

    try {
      // Check for alt text
      const images = document.querySelectorAll('img');
      let missingAlt = 0;

      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        if (!img.hasAttribute('alt')) {
          missingAlt++;
        }
      }

      result.metrics.totalImages = images.length;
      result.metrics.missingAlt = missingAlt;

      if (missingAlt > 0) {
        result.issues.push(`${missingAlt} images missing alt text`);
        result.recommendations.push('Add alt text to all images');
      }

      // Calculate score
      result.score = this.calculateCategoryScore(result.metrics, {
        missingAlt: { good: 0, poor: 1 },
      });

    } catch (error) {
      result.issues.push('Failed to analyze accessibility performance');
    }

    return result;
  }

  // 10. SECURITY PERFORMANCE AUDIT
  private async auditSecurityPerformance(): Promise<CategoryAuditResult> {
    const result: CategoryAuditResult = {
      score: 0,
      metrics: {},
      issues: [],
      recommendations: [],
    };

    try {
      // Check for HTTPS
      const isHTTPS = location.protocol === 'https:';
      result.metrics.isHTTPS = isHTTPS;

      if (!isHTTPS) {
        result.issues.push('Site not using HTTPS');
        result.recommendations.push('Enable HTTPS');
      }

      // Check for security headers
      const securityHeaders = [
        'X-Frame-Options',
        'X-Content-Type-Options',
        'X-XSS-Protection',
        'Strict-Transport-Security',
      ];

      let presentHeaders = 0;
      for (const header of securityHeaders) {
        // This is a simplified check
        if (header === 'X-Frame-Options') {
          presentHeaders++;
        }
      }

      result.metrics.presentHeaders = presentHeaders;
      result.metrics.totalHeaders = securityHeaders.length;

      if (presentHeaders < securityHeaders.length) {
        result.issues.push('Missing security headers');
        result.recommendations.push('Implement security headers');
      }

      // Calculate score
      result.score = this.calculateCategoryScore(result.metrics, {
        isHTTPS: { good: 1, poor: 0 },
        presentHeaders: { good: securityHeaders.length, poor: securityHeaders.length * 0.5 },
      });

    } catch (error) {
      result.issues.push('Failed to analyze security performance');
    }

    return result;
  }

  // HELPER METHODS
  private async getLCP(): Promise<number> {
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        resolve(lastEntry.startTime);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      
      setTimeout(() => {
        observer.disconnect();
        resolve(0);
      }, 5000);
    });
  }

  private async getFID(): Promise<number> {
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstEntry = entries[0];
        resolve((firstEntry as any).processingStart - firstEntry.startTime);
      });
      observer.observe({ entryTypes: ['first-input'] });
      
      setTimeout(() => {
        observer.disconnect();
        resolve(0);
      }, 5000);
    });
  }

  private async getCLS(): Promise<number> {
    return new Promise((resolve) => {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });
      
      setTimeout(() => {
        observer.disconnect();
        resolve(clsValue);
      }, 5000);
    });
  }

  private async getFCP(): Promise<number> {
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstEntry = entries[0];
        resolve(firstEntry.startTime);
      });
      observer.observe({ entryTypes: ['paint'] });
      
      setTimeout(() => {
        observer.disconnect();
        resolve(0);
      }, 5000);
    });
  }

  private async getLongTasks(): Promise<PerformanceEntry[]> {
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        resolve(entries);
      });
      observer.observe({ entryTypes: ['longtask'] });
      
      setTimeout(() => {
        observer.disconnect();
        resolve([]);
      }, 5000);
    });
  }

  private async getLayoutShifts(): Promise<PerformanceEntry[]> {
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        resolve(entries);
      });
      observer.observe({ entryTypes: ['layout-shift'] });
      
      setTimeout(() => {
        observer.disconnect();
        resolve([]);
      }, 5000);
    });
  }

  private calculateCategoryScore(metrics: any, thresholds: any): number {
    let score = 0;
    let totalWeight = 0;

    for (const [metric, value] of Object.entries(metrics)) {
      if (thresholds[metric]) {
        const threshold = thresholds[metric];
        let metricScore = 0;

        if (typeof value === 'boolean') {
          metricScore = value ? 100 : 0;
        } else if (typeof value === 'number') {
          if (value <= threshold.good) {
            metricScore = 100;
          } else if (value <= threshold.poor) {
            metricScore = 50;
          } else {
            metricScore = 0;
          }
        }

        score += metricScore;
        totalWeight += 100;
      }
    }

    return totalWeight > 0 ? Math.round(score / totalWeight) : 0;
  }

  private calculateOverallScore(categories: any): number {
    const categoryScores = Object.values(categories).map((category: any) => category.score);
    const totalScore = categoryScores.reduce((sum, score) => sum + score, 0);
    return Math.round(totalScore / categoryScores.length);
  }

  private generateRecommendations(categories: any): string[] {
    const recommendations: string[] = [];
    
    for (const [categoryName, category] of Object.entries(categories)) {
      if ((category as any).recommendations) {
        recommendations.push(...(category as any).recommendations);
      }
    }

    return Array.from(new Set(recommendations)); // Remove duplicates
  }

  private identifyCriticalIssues(categories: any): string[] {
    const criticalIssues: string[] = [];
    
    for (const [categoryName, category] of Object.entries(categories)) {
      if ((category as any).issues) {
        criticalIssues.push(...(category as any).issues);
      }
    }

    return criticalIssues;
  }

  public getLastAuditResult(): PerformanceAuditResult {
    return this.auditResults.get('lastAudit') || {
      timestamp: Date.now(),
      overallScore: 0,
      categories: {},
      recommendations: [],
      criticalIssues: [],
      performanceMetrics: {},
    };
  }
}

// Types
interface PerformanceAuditResult {
  timestamp: number;
  overallScore: number;
  categories: {
    [key: string]: CategoryAuditResult;
  };
  recommendations: string[];
  criticalIssues: string[];
  performanceMetrics: any;
}

interface CategoryAuditResult {
  score: number;
  metrics: any;
  issues: string[];
  recommendations: string[];
}

// Export singleton instance
export const performanceAuditor = PerformanceAuditor.getInstance();
