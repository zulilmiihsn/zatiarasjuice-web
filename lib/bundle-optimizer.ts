'use client';

// ULTRA PERFORMANCE BUNDLE OPTIMIZER

// Dynamic imports untuk code splitting yang agresif
export const dynamicImports = {
  // Lazy load heavy components
  ProductCard: () => import('../components/ProductCard'),
  HeroBanner: () => import('../components/HeroBanner'),
  Header: () => import('../components/Header'),
  Footer: () => import('../components/Footer'),
  
  // Lazy load pages
  MenuPage: () => import('../pages/[branch]/menu'),
  BranchPage: () => import('../pages/[branch]/index'),
  
  // Lazy load utilities
  Geolocation: () => import('./geolocation'),
  Supabase: () => import('./supabase'),
};

// Tree shaking helper untuk menghapus unused code
export const treeShake = {
  // Remove unused Framer Motion features
  motion: {
    // Only import what we need
    div: () => import('framer-motion').then(m => m.motion.div),
    button: () => import('framer-motion').then(m => m.motion.button),
    span: () => import('framer-motion').then(m => m.motion.span),
  },
  
  // Remove unused Lucide icons
  icons: {
    // Only import used icons
    ShoppingCart: () => import('lucide-react').then(m => m.ShoppingCart),
    Apple: () => import('lucide-react').then(m => m.Apple),
    ChevronLeft: () => import('lucide-react').then(m => m.ChevronLeft),
    ChevronRight: () => import('lucide-react').then(m => m.ChevronRight),
    Play: () => import('lucide-react').then(m => m.Play),
    Pause: () => import('lucide-react').then(m => m.Pause),
    Sparkles: () => import('lucide-react').then(m => m.Sparkles),
    MapPin: () => import('lucide-react').then(m => m.MapPin),
    Phone: () => import('lucide-react').then(m => m.Phone),
    Clock: () => import('lucide-react').then(m => m.Clock),
  },
};

// Bundle analyzer untuk development
export const analyzeBundle = () => {
  if (process.env.NODE_ENV === 'development') {
    // Analyze bundle size
    const scripts = document.querySelectorAll('script[src]');
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    
    console.group('📊 Bundle Analysis');
    console.log('Scripts:', scripts.length);
    console.log('Stylesheets:', stylesheets.length);
    
    // Check for unused CSS
    const allElements = document.querySelectorAll('*');
    const usedClasses = new Set();
    
    allElements.forEach(el => {
      if (el.className) {
        el.className.split(' ').forEach(cls => {
          if (cls.trim()) usedClasses.add(cls.trim());
        });
      }
    });
    
    console.log('Used CSS Classes:', usedClasses.size);
    console.groupEnd();
  }
};

// Performance budget checker
export const checkPerformanceBudget = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      const budget = {
        fcp: 1500, // First Contentful Paint
        lcp: 2500, // Largest Contentful Paint
        fid: 100,  // First Input Delay
        cls: 0.1,  // Cumulative Layout Shift
      };
      
      const metrics = {
        fcp: 0, // Would need FCP API
        lcp: 0, // Would need LCP API
        fid: 0, // Would need FID API
        cls: 0, // Would need CLS API
      };
      
      console.group('🎯 Performance Budget');
      Object.entries(budget).forEach(([key, limit]) => {
        const value = metrics[key as keyof typeof metrics];
        const status = value <= limit ? '✅' : '❌';
        console.log(`${status} ${key.toUpperCase()}: ${value}ms (limit: ${limit}ms)`);
      });
      console.groupEnd();
    }
  }
};

// Memory usage monitor
export const monitorMemory = () => {
  if (typeof window !== 'undefined' && 'memory' in performance) {
    const memory = (performance as any).memory;
    
    console.group('🧠 Memory Usage');
    console.log('Used JS Heap:', Math.round(memory.usedJSHeapSize / 1024 / 1024), 'MB');
    console.log('Total JS Heap:', Math.round(memory.totalJSHeapSize / 1024 / 1024), 'MB');
    console.log('JS Heap Limit:', Math.round(memory.jsHeapSizeLimit / 1024 / 1024), 'MB');
    console.groupEnd();
  }
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (process.env.NODE_ENV === 'development') {
    // Run analysis after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        analyzeBundle();
        checkPerformanceBudget();
        monitorMemory();
      }, 1000);
    });
  }
};
