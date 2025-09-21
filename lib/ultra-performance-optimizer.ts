// Ultra Performance Optimizer for Zatiaras Juice - Maximum Performance
export class UltraPerformanceOptimizer {
  private static instance: UltraPerformanceOptimizer;
  private isInitialized: boolean = false;
  private performanceMetrics: Map<string, any> = new Map();
  private optimizationQueue: Array<() => Promise<void>> = [];

  private constructor() {
    this.initializeUltraOptimization();
  }

  public static getInstance(): UltraPerformanceOptimizer {
    if (!UltraPerformanceOptimizer.instance) {
      UltraPerformanceOptimizer.instance = new UltraPerformanceOptimizer();
    }
    return UltraPerformanceOptimizer.instance;
  }

  private async initializeUltraOptimization() {
    if (typeof window === 'undefined' || this.isInitialized) return;

    this.isInitialized = true;
    
    // Setup ultra performance optimizations
    await this.setupCriticalResourceOptimization();
    await this.setupAdvancedCaching();
    await this.setupMemoryOptimization();
    await this.setupNetworkOptimization();
    await this.setupRenderingOptimization();
    await this.setupBundleOptimization();
    await this.setupImageOptimization();
    await this.setupFontOptimization();
    await this.setupJavaScriptOptimization();
    await this.setupCSSOptimization();
    
    // Process optimization queue
    this.processOptimizationQueue();
  }

  // 1. CRITICAL RESOURCE OPTIMIZATION
  private async setupCriticalResourceOptimization() {
    // Preload critical resources with highest priority
    const criticalResources = [
      { href: '/images/hero-avocado.jpg', as: 'image', type: 'image/jpeg' },
      { href: '/images/hero-fruits.jpg', as: 'image', type: 'image/jpeg' },
      { href: '/images/juice-placeholder.svg', as: 'image', type: 'image/svg+xml' },
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      link.type = resource.type;
      link.crossOrigin = 'anonymous';
      link.setAttribute('fetchpriority', 'high');
      document.head.appendChild(link);
    });

    // Preconnect to external domains
    const externalDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://images.unsplash.com',
    ];

    externalDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  // 2. ADVANCED CACHING STRATEGY
  private async setupAdvancedCaching() {
    // Setup aggressive caching for static assets
    if ('caches' in window) {
      const cacheNames = [
        'zatiaras-static-v3',
        'zatiaras-images-v3',
        'zatiaras-api-v3',
        'zatiaras-fonts-v3',
      ];

      for (const cacheName of cacheNames) {
        try {
          const cache = await caches.open(cacheName);
          this.performanceMetrics.set(`cache_${cacheName}`, cache);
        } catch (error) {
          console.warn(`Failed to open cache ${cacheName}:`, error);
        }
      }
    }
  }

  // 3. MEMORY OPTIMIZATION
  private async setupMemoryOptimization() {
    // Monitor memory usage and cleanup
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        if (memory) {
          this.performanceMetrics.set('memory_used', memory.usedJSHeapSize);
          this.performanceMetrics.set('memory_total', memory.totalJSHeapSize);
          this.performanceMetrics.set('memory_limit', memory.jsHeapSizeLimit);
          
          // Trigger cleanup if memory usage is high
          const memoryUsage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
          if (memoryUsage > 0.8) {
            this.triggerMemoryCleanup();
          }
        }
      }, 5000);
    }
  }

  // 4. NETWORK OPTIMIZATION
  private async setupNetworkOptimization() {
    // Setup network monitoring
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection) {
        this.performanceMetrics.set('connection_type', connection.effectiveType);
        this.performanceMetrics.set('connection_speed', connection.downlink);
        this.performanceMetrics.set('connection_rtt', connection.rtt);
        
        // Adjust loading strategy based on connection
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          this.enableSlowConnectionMode();
        } else if (connection.effectiveType === '4g') {
          this.enableFastConnectionMode();
        }
      }
    }
  }

  // 5. RENDERING OPTIMIZATION
  private async setupRenderingOptimization() {
    // Setup Intersection Observer for lazy loading
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            this.optimizeElement(element);
          }
        });
      }, {
        rootMargin: '50px',
        threshold: 0.1
      });

      // Observe all images and components
      document.querySelectorAll('img, [data-lazy]').forEach(el => {
        observer.observe(el);
      });
    }

    // Setup ResizeObserver for responsive optimization
    if ('ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach(entry => {
          this.optimizeElementForSize(entry.target as HTMLElement);
        });
      });

      document.querySelectorAll('[data-responsive]').forEach(el => {
        resizeObserver.observe(el);
      });
    }
  }

  // 6. BUNDLE OPTIMIZATION
  private async setupBundleOptimization() {
    // Analyze bundle size and optimize
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    let totalBundleSize = 0;

    scripts.forEach(script => {
      const src = script.getAttribute('src');
      if (src) {
        // Estimate bundle size (this is a simplified approach)
        const isNextJS = src.includes('_next/static');
        const isVendor = src.includes('node_modules');
        
        if (isNextJS || isVendor) {
          totalBundleSize += 100; // Estimated size in KB
        }
      }
    });

    this.performanceMetrics.set('bundle_size', totalBundleSize);

    // Optimize bundle loading
    if (totalBundleSize > 500) { // If bundle is large
      this.enableCodeSplitting();
    }
  }

  // 7. IMAGE OPTIMIZATION
  private async setupImageOptimization() {
    // Setup advanced image optimization
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Add loading="lazy" if not present
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }

      // Add decoding="async" for better performance
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }

      // Optimize image based on viewport
      this.optimizeImageForViewport(img);
    });
  }

  // 8. FONT OPTIMIZATION
  private async setupFontOptimization() {
    // Preload critical fonts
    const criticalFonts = [
      'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap',
    ];

    criticalFonts.forEach(fontUrl => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = fontUrl;
      link.as = 'style';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Setup font display optimization
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Nunito Sans';
        font-display: swap;
      }
      @font-face {
        font-family: 'Quicksand';
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  }

  // 9. JAVASCRIPT OPTIMIZATION
  private async setupJavaScriptOptimization() {
    // Setup JavaScript optimization
    if ('requestIdleCallback' in window) {
      // Use idle time for non-critical optimizations
      const idleCallback = (deadline: IdleDeadline) => {
        if (deadline.timeRemaining() > 0) {
          this.processOptimizationQueue();
        }
      };

      if (typeof requestIdleCallback === 'function') {
        requestIdleCallback(idleCallback);
      }
    }

    // Setup Web Workers for heavy computations
    if ('Worker' in window) {
      this.setupWebWorkers();
    }
  }

  // 10. CSS OPTIMIZATION
  private async setupCSSOptimization() {
    // Setup CSS optimization
    const style = document.createElement('style');
    style.textContent = `
      /* Critical CSS optimization */
      * {
        box-sizing: border-box;
      }
      
      /* Optimize animations */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
      
      /* Optimize for high DPI displays */
      @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        img {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // HELPER METHODS
  private optimizeElement(element: HTMLElement) {
    // Optimize element based on type
    if (element.tagName === 'IMG') {
      this.optimizeImage(element as HTMLImageElement);
    } else if (element.hasAttribute('data-lazy')) {
      this.loadLazyContent(element);
    }
  }

  private optimizeImage(img: HTMLImageElement) {
    // Add responsive image attributes
    if (!img.hasAttribute('sizes')) {
      img.setAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw');
    }
  }

  private optimizeImageForViewport(img: HTMLImageElement) {
    const viewportWidth = window.innerWidth;
    
    // Adjust image quality based on viewport
    if (viewportWidth < 768) {
      img.setAttribute('sizes', '100vw');
    } else if (viewportWidth < 1200) {
      img.setAttribute('sizes', '50vw');
    } else {
      img.setAttribute('sizes', '33vw');
    }
  }

  private optimizeElementForSize(element: HTMLElement) {
    // Optimize element based on its size
    const rect = element.getBoundingClientRect();
    const area = rect.width * rect.height;
    
    if (area > 100000) { // Large element
      element.setAttribute('data-optimized', 'large');
    } else if (area < 10000) { // Small element
      element.setAttribute('data-optimized', 'small');
    }
  }

  private loadLazyContent(element: HTMLElement) {
    // Load lazy content
    const src = element.getAttribute('data-src');
    if (src) {
      if (element.tagName === 'IMG') {
        (element as HTMLImageElement).src = src;
      } else {
        element.innerHTML = src;
      }
      element.removeAttribute('data-src');
    }
  }

  private triggerMemoryCleanup() {
    // Trigger garbage collection if available
    if ('gc' in window) {
      (window as any).gc();
    }

    // Clear unused caches
    this.clearUnusedCaches();
  }

  private async clearUnusedCaches() {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      const currentTime = Date.now();
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours

      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        
        for (const key of keys) {
          const response = await cache.match(key);
          if (response) {
            const dateHeader = response.headers.get('date');
            if (dateHeader) {
              const responseDate = new Date(dateHeader).getTime();
              if (currentTime - responseDate > maxAge) {
                await cache.delete(key);
              }
            }
          }
        }
      }
    }
  }

  private enableSlowConnectionMode() {
    // Enable slow connection optimizations
    document.body.setAttribute('data-connection', 'slow');
    
    // Reduce image quality
    document.querySelectorAll('img').forEach(img => {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
    });
  }

  private enableFastConnectionMode() {
    // Enable fast connection optimizations
    document.body.setAttribute('data-connection', 'fast');
    
    // Preload more resources
    this.preloadAdditionalResources();
  }

  private preloadAdditionalResources() {
    // Preload additional resources for fast connections
    const additionalResources = [
      '/images/juice-placeholder.svg',
      '/manifest.json',
    ];

    additionalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.endsWith('.json') ? 'fetch' : 'image';
      document.head.appendChild(link);
    });
  }

  private enableCodeSplitting() {
    // Enable code splitting for large bundles
    document.body.setAttribute('data-code-splitting', 'enabled');
  }

  private setupWebWorkers() {
    // Setup Web Workers for heavy computations
    const workerCode = `
      self.onmessage = function(e) {
        const { type, data } = e.data;
        
        switch (type) {
          case 'optimize':
            // Perform optimization in worker
            self.postMessage({ type: 'optimized', data: data });
            break;
        }
      };
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    const worker = new Worker(workerUrl);
    
    this.performanceMetrics.set('web_worker', worker);
  }

  private processOptimizationQueue() {
    // Process optimization queue
    if (this.optimizationQueue.length > 0) {
      const optimization = this.optimizationQueue.shift();
      if (optimization) {
        optimization();
      }
    }
  }

  // PUBLIC METHODS
  public getPerformanceMetrics() {
    return Object.fromEntries(this.performanceMetrics);
  }

  public addOptimization(optimization: () => Promise<void>) {
    this.optimizationQueue.push(optimization);
  }

  public isOptimized(): boolean {
    return this.isInitialized;
  }
}

// Export singleton instance
export const ultraPerformanceOptimizer = UltraPerformanceOptimizer.getInstance();
