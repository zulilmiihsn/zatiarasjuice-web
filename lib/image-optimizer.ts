// Image optimization utilities for Zatiaras Juice
export class ImageOptimizer {
  private static instance: ImageOptimizer;
  private loadedImages: Set<string> = new Set();
  private imageCache: Map<string, HTMLImageElement> = new Map();

  private constructor() {
    this.initializeImageLoading();
  }

  public static getInstance(): ImageOptimizer {
    if (!ImageOptimizer.instance) {
      ImageOptimizer.instance = new ImageOptimizer();
    }
    return ImageOptimizer.instance;
  }

  private initializeImageLoading() {
    if (typeof window === 'undefined') return;

    // Preload critical images
    this.preloadCriticalImages();
    
    // Setup intersection observer for lazy loading
    this.setupLazyLoading();
  }

  private preloadCriticalImages() {
    const criticalImages = [
      '/images/hero-avocado.jpg',
      '/images/hero-fruits.jpg',
      '/images/juice-placeholder.svg',
    ];

    criticalImages.forEach(src => {
      this.preloadImage(src);
    });
  }

  private preloadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      if (this.imageCache.has(src)) {
        resolve(this.imageCache.get(src)!);
        return;
      }

      const img = new Image();
      img.onload = () => {
        this.imageCache.set(src, img);
        this.loadedImages.add(src);
        resolve(img);
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  private setupLazyLoading() {
    if (typeof window === 'undefined') return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          
          if (src && !this.loadedImages.has(src)) {
            this.loadImage(img, src);
          }
          
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1,
    });

    // Observe all lazy images
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  private loadImage(img: HTMLImageElement, src: string) {
    img.src = src;
    img.classList.remove('lazy');
    img.classList.add('loaded');
    
    // Add fade-in effect
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease-in-out';
    
    img.onload = () => {
      img.style.opacity = '1';
      this.loadedImages.add(src);
    };
  }

  // Get optimized image props for Next.js Image component
  public getOptimizedImageProps(src: string, alt: string, priority: boolean = false) {
    return {
      src,
      alt,
      priority,
      loading: priority ? 'eager' : 'lazy',
      quality: 85,
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
      placeholder: 'blur',
      blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
    };
  }

  // Get responsive image sizes
  public getResponsiveSizes() {
    return {
      mobile: '(max-width: 768px) 100vw',
      tablet: '(max-width: 1200px) 50vw',
      desktop: '33vw',
    };
  }

  // Check if image is loaded
  public isImageLoaded(src: string): boolean {
    return this.loadedImages.has(src);
  }

  // Get image loading progress
  public getLoadingProgress(): number {
    const totalImages = document.querySelectorAll('img').length;
    const loadedCount = this.loadedImages.size;
    return totalImages > 0 ? (loadedCount / totalImages) * 100 : 100;
  }

  // Optimize image quality based on device
  public getOptimalQuality(): number {
    if (typeof window === 'undefined') return 85;

    const connection = (navigator as any).connection;
    if (connection) {
      switch (connection.effectiveType) {
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

    return 85;
  }

  // Get optimal image format
  public getOptimalFormat(): string {
    if (typeof window === 'undefined') return 'webp';

    // Check browser support for modern formats
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Check AVIF support
      const avifSupported = canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
      if (avifSupported) return 'avif';
      
      // Check WebP support
      const webpSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      if (webpSupported) return 'webp';
    }

    return 'jpeg';
  }

  // Preload images for better performance
  public preloadImages(urls: string[]): Promise<HTMLImageElement[]> {
    return Promise.all(urls.map(url => this.preloadImage(url)));
  }

  // Clear image cache
  public clearCache() {
    this.imageCache.clear();
    this.loadedImages.clear();
  }
}

// Hook for React components
export const useImageOptimizer = () => {
  const optimizer = ImageOptimizer.getInstance();
  
  return {
    getOptimizedImageProps: optimizer.getOptimizedImageProps.bind(optimizer),
    getResponsiveSizes: optimizer.getResponsiveSizes.bind(optimizer),
    isImageLoaded: optimizer.isImageLoaded.bind(optimizer),
    getLoadingProgress: optimizer.getLoadingProgress.bind(optimizer),
    getOptimalQuality: optimizer.getOptimalQuality.bind(optimizer),
    getOptimalFormat: optimizer.getOptimalFormat.bind(optimizer),
    preloadImages: optimizer.preloadImages.bind(optimizer),
    clearCache: optimizer.clearCache.bind(optimizer),
  };
};
