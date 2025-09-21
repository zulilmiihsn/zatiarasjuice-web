// Bundle analysis utilities for Zatiaras Juice
export const analyzeBundleSize = () => {
  if (typeof window === 'undefined') return;

  // Analyze JavaScript bundle size
  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const totalScriptSize = scripts.reduce((total, script) => {
    const src = script.getAttribute('src');
    if (src && src.includes('_next/static')) {
      // This is a Next.js chunk
      return total + 1; // Placeholder for actual size calculation
    }
    return total;
  }, 0);

  console.log('Total script chunks:', scripts.length);
  console.log('Estimated bundle size:', totalScriptSize);

  // Analyze CSS bundle size
  const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  console.log('Total stylesheets:', stylesheets.length);

  // Analyze image loading
  const images = Array.from(document.querySelectorAll('img'));
  const loadedImages = images.filter(img => img.complete);
  console.log('Images loaded:', loadedImages.length, 'of', images.length);

  return {
    scriptChunks: scripts.length,
    stylesheets: stylesheets.length,
    imagesLoaded: loadedImages.length,
    totalImages: images.length,
  };
};

// Monitor resource loading performance
export const monitorResourceLoading = () => {
  if (typeof window === 'undefined') return;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'resource') {
        const resource = entry as PerformanceResourceTiming;
        console.log('Resource loaded:', {
          name: resource.name,
          duration: resource.duration,
          size: resource.transferSize,
          type: resource.initiatorType,
        });
      }
    }
  });

  observer.observe({ entryTypes: ['resource'] });
  return observer;
};

// Check for unused CSS
export const checkUnusedCSS = () => {
  if (typeof window === 'undefined') return;

  const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  const usedClasses = new Set<string>();

  // Get all used classes from DOM
  const allElements = document.querySelectorAll('*');
  allElements.forEach(element => {
    element.classList.forEach(className => {
      usedClasses.add(className);
    });
  });

  console.log('Total unique classes used:', usedClasses.size);
  return usedClasses;
};

// Monitor memory usage
export const monitorMemoryUsage = () => {
  if (typeof window === 'undefined') return;

  const memory = (performance as any).memory;
  if (memory) {
    console.log('Memory usage:', {
      used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
      total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
      limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB',
    });
  }
};

// Performance budget checker
export const checkPerformanceBudget = () => {
  if (typeof window === 'undefined') return;

  const budget = {
    maxBundleSize: 500000, // 500KB
    maxImageSize: 200000,  // 200KB
    maxCSSSize: 50000,     // 50KB
    maxLCP: 2500,          // 2.5s
    maxFID: 100,           // 100ms
    maxCLS: 0.1,           // 0.1
  };

  const metrics = analyzeBundleSize();
  const violations = [];

  if (metrics.scriptChunks > 10) {
    violations.push('Too many script chunks');
  }

  if (metrics.stylesheets > 5) {
    violations.push('Too many stylesheets');
  }

  if (metrics.imagesLoaded < metrics.totalImages * 0.8) {
    violations.push('Too many unloaded images');
  }

  return {
    budget,
    violations,
    metrics,
  };
};
