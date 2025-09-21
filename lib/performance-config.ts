// Performance Configuration for Zatiaras Juice - Maximum Performance Settings
export const PERFORMANCE_CONFIG = {
  // Core Web Vitals Targets
  CORE_WEB_VITALS: {
    LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint (ms)
    FID: { good: 100, poor: 300 },   // First Input Delay (ms)
    CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
    FCP: { good: 1800, poor: 3000 }, // First Contentful Paint (ms)
    TTFB: { good: 800, poor: 1800 }, // Time to First Byte (ms)
  },

  // Bundle Size Targets
  BUNDLE_SIZE: {
    TOTAL: { good: 200, poor: 500 },     // Total bundle size (KB)
    VENDOR: { good: 100, poor: 300 },    // Vendor bundle size (KB)
    APP: { good: 100, poor: 200 },       // App bundle size (KB)
    CSS: { good: 50, poor: 100 },        // CSS bundle size (KB)
  },

  // Image Optimization Targets
  IMAGE_OPTIMIZATION: {
    MAX_WIDTH: 1920,           // Maximum image width (px)
    MAX_HEIGHT: 1080,          // Maximum image height (px)
    QUALITY: 85,               // Image quality (0-100)
    FORMATS: ['webp', 'avif'], // Preferred formats
    LAZY_LOADING: true,        // Enable lazy loading
    RESPONSIVE: true,          // Enable responsive images
  },

  // Caching Strategy
  CACHING: {
    STATIC_ASSETS: 31536000,   // 1 year (seconds)
    IMAGES: 31536000,          // 1 year (seconds)
    API_RESPONSES: 3600,       // 1 hour (seconds)
    FONTS: 31536000,           // 1 year (seconds)
    MANIFEST: 86400,           // 1 day (seconds)
  },

  // Memory Management
  MEMORY: {
    MAX_CACHE_SIZE: 50 * 1024 * 1024, // 50MB
    CLEANUP_THRESHOLD: 0.8,            // 80% memory usage
    GC_INTERVAL: 30000,                // 30 seconds
    MAX_CACHE_ENTRIES: 1000,           // Maximum cache entries
  },

  // Network Optimization
  NETWORK: {
    CONNECTION_TYPES: {
      'slow-2g': { preload: false, lazy: true, quality: 60 },
      '2g': { preload: false, lazy: true, quality: 70 },
      '3g': { preload: true, lazy: true, quality: 80 },
      '4g': { preload: true, lazy: false, quality: 90 },
    },
    TIMEOUT: 10000,            // 10 seconds
    RETRY_ATTEMPTS: 3,         // Retry failed requests
    CONCURRENT_LIMIT: 6,       // Maximum concurrent requests
  },

  // Rendering Optimization
  RENDERING: {
    FRAME_RATE: 60,            // Target FPS
    LONG_TASK_THRESHOLD: 50,   // Long task threshold (ms)
    LAYOUT_SHIFT_THRESHOLD: 0.1, // Layout shift threshold
    INTERSECTION_THRESHOLD: 0.1, // Intersection observer threshold
    INTERSECTION_ROOT_MARGIN: '50px', // Intersection observer root margin
  },

  // Performance Monitoring
  MONITORING: {
    METRICS_INTERVAL: 30000,   // 30 seconds
    AUDIT_INTERVAL: 300000,    // 5 minutes
    LOG_LEVEL: 'info',         // Log level
    ENABLE_CONSOLE: true,      // Enable console logging
    ENABLE_ANALYTICS: false,   // Enable analytics
  },

  // SEO Performance
  SEO: {
    META_DESCRIPTION_LENGTH: 160,    // Max meta description length
    TITLE_LENGTH: 60,                // Max title length
    HEADING_STRUCTURE: true,         // Check heading structure
    ALT_TEXT_REQUIRED: true,         // Require alt text for images
    SCHEMA_MARKUP: true,             // Enable schema markup
  },

  // Accessibility Performance
  ACCESSIBILITY: {
    COLOR_CONTRAST_RATIO: 4.5,       // Minimum contrast ratio
    FOCUS_INDICATORS: true,          // Enable focus indicators
    KEYBOARD_NAVIGATION: true,       // Enable keyboard navigation
    SCREEN_READER_SUPPORT: true,     // Enable screen reader support
    ARIA_LABELS: true,               // Require ARIA labels
  },

  // Security Performance
  SECURITY: {
    HTTPS_REQUIRED: true,            // Require HTTPS
    CSP_ENABLED: true,               // Enable Content Security Policy
    HSTS_ENABLED: true,              // Enable HTTP Strict Transport Security
    XSS_PROTECTION: true,            // Enable XSS protection
    CLICKJACKING_PROTECTION: true,   // Enable clickjacking protection
  },

  // Experimental Features
  EXPERIMENTAL: {
    ENABLE_WEB_WORKERS: true,        // Enable Web Workers
    ENABLE_SERVICE_WORKER: true,     // Enable Service Worker
    ENABLE_PRELOADING: true,         // Enable resource preloading
    ENABLE_PREFETCHING: true,        // Enable resource prefetching
    ENABLE_COMPRESSION: true,        // Enable compression
  },
};

// Performance thresholds for different device types
export const DEVICE_PERFORMANCE_THRESHOLDS = {
  MOBILE: {
    LCP: 4000,
    FID: 300,
    CLS: 0.25,
    BUNDLE_SIZE: 300,
    IMAGE_QUALITY: 70,
  },
  TABLET: {
    LCP: 3500,
    FID: 250,
    CLS: 0.2,
    BUNDLE_SIZE: 400,
    IMAGE_QUALITY: 80,
  },
  DESKTOP: {
    LCP: 3000,
    FID: 200,
    CLS: 0.15,
    BUNDLE_SIZE: 500,
    IMAGE_QUALITY: 90,
  },
};

// Performance optimization strategies
export const OPTIMIZATION_STRATEGIES = {
  CRITICAL_PATH: {
    PRELOAD_CRITICAL_RESOURCES: true,
    INLINE_CRITICAL_CSS: true,
    DEFER_NON_CRITICAL_JS: true,
    OPTIMIZE_FONTS: true,
  },
  BUNDLE_OPTIMIZATION: {
    TREE_SHAKING: true,
    CODE_SPLITTING: true,
    DYNAMIC_IMPORTS: true,
    VENDOR_CHUNKING: true,
  },
  IMAGE_OPTIMIZATION: {
    RESPONSIVE_IMAGES: true,
    LAZY_LOADING: true,
    WEBP_CONVERSION: true,
    AVIF_CONVERSION: true,
  },
  CACHING_STRATEGY: {
    STATIC_ASSETS: 'cache-first',
    API_RESPONSES: 'network-first',
    IMAGES: 'cache-first',
    FONTS: 'cache-first',
  },
  NETWORK_OPTIMIZATION: {
    CONNECTION_POOLING: true,
    REQUEST_BATCHING: true,
    RESPONSE_COMPRESSION: true,
    CDN_OPTIMIZATION: true,
  },
};

// Performance monitoring configuration
export const MONITORING_CONFIG = {
  CORE_WEB_VITALS: {
    ENABLED: true,
    THRESHOLDS: PERFORMANCE_CONFIG.CORE_WEB_VITALS,
    REPORTING_INTERVAL: 30000,
  },
  RESOURCE_TIMING: {
    ENABLED: true,
    TRACK_IMAGES: true,
    TRACK_SCRIPTS: true,
    TRACK_STYLES: true,
    TRACK_FONTS: true,
  },
  USER_TIMING: {
    ENABLED: true,
    CUSTOM_MARKS: true,
    CUSTOM_MEASURES: true,
    NAVIGATION_TIMING: true,
  },
  MEMORY_USAGE: {
    ENABLED: true,
    MONITORING_INTERVAL: 10000,
    CLEANUP_THRESHOLD: 0.8,
  },
  NETWORK_PERFORMANCE: {
    ENABLED: true,
    TRACK_CONNECTION_TYPE: true,
    TRACK_DOWNLINK: true,
    TRACK_RTT: true,
  },
};

// Performance optimization rules
export const OPTIMIZATION_RULES = {
  IMAGES: [
    'Use WebP format when possible',
    'Implement responsive images with srcset',
    'Add loading="lazy" to non-critical images',
    'Optimize image dimensions for viewport',
    'Use appropriate image quality settings',
  ],
  JAVASCRIPT: [
    'Implement code splitting',
    'Use dynamic imports for non-critical code',
    'Minimize bundle size',
    'Optimize third-party libraries',
    'Use Web Workers for heavy computations',
  ],
  CSS: [
    'Inline critical CSS',
    'Defer non-critical CSS',
    'Use CSS containment',
    'Optimize selectors',
    'Minimize unused CSS',
  ],
  NETWORK: [
    'Implement HTTP/2',
    'Use compression (gzip/brotli)',
    'Optimize DNS lookups',
    'Minimize redirects',
    'Use CDN for static assets',
  ],
  CACHING: [
    'Set appropriate cache headers',
    'Use service worker for caching',
    'Implement cache invalidation',
    'Use browser caching effectively',
    'Optimize cache strategies',
  ],
};

// Performance metrics collection
export const METRICS_COLLECTION = {
  AUTOMATIC: [
    'LCP', 'FID', 'CLS', 'FCP', 'TTFB',
    'bundle_size', 'image_optimization',
    'memory_usage', 'network_performance',
  ],
  MANUAL: [
    'custom_timing', 'user_interactions',
    'error_rates', 'conversion_rates',
  ],
  THRESHOLDS: {
    EXCELLENT: 90,
    GOOD: 75,
    NEEDS_IMPROVEMENT: 50,
    POOR: 25,
  },
};

export default PERFORMANCE_CONFIG;
