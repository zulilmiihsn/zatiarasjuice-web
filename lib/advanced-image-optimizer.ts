// Advanced Image Optimization for Zatiaras Juice
export class AdvancedImageOptimizer {
  private static instance: AdvancedImageOptimizer;
  private imageCache: Map<string, HTMLImageElement> = new Map();
  private loadingQueue: Set<string> = new Set();
  private intersectionObserver: IntersectionObserver | null = null;

  private constructor() {
    this.initializeAdvancedOptimization();
  }

  public static getInstance(): AdvancedImageOptimizer {
    if (!AdvancedImageOptimizer.instance) {
      AdvancedImageOptimizer.instance = new AdvancedImageOptimizer();
    }
    return AdvancedImageOptimizer.instance;
  }

  private initializeAdvancedOptimization() {
    if (typeof window === 'undefined') return;

    this.setupIntersectionObserver();
    this.optimizeExistingImages();
    this.setupImagePreloading();
  }

  private setupIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            this.loadImageWithOptimization(img);
            this.intersectionObserver?.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      }
    );
  }

  private optimizeExistingImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      this.optimizeImageElement(img);
    });
  }

  private optimizeImageElement(img: HTMLImageElement) {
    // Add loading optimization
    if (!img.loading) {
      img.loading = 'lazy';
    }

    // Add decoding optimization
    img.decoding = 'async';

    // Add fetchpriority for critical images
    if (img.dataset.priority === 'high') {
      img.fetchPriority = 'high';
    }

    // Setup intersection observer for lazy loading
    if (img.dataset.src && !img.src) {
      this.intersectionObserver?.observe(img);
    }
  }

  private loadImageWithOptimization(img: HTMLImageElement) {
    const src = img.dataset.src || img.src;
    if (!src || this.loadingQueue.has(src)) return;

    this.loadingQueue.add(src);

    // Create optimized image
    const optimizedImg = new Image();
    optimizedImg.decoding = 'async';
    optimizedImg.loading = 'lazy';

    // Add progressive loading
    this.addProgressiveLoading(img, optimizedImg, src);

    // Add error handling
    optimizedImg.onerror = () => {
      this.handleImageError(img, src);
      this.loadingQueue.delete(src);
    };

    optimizedImg.onload = () => {
      this.handleImageLoad(img, optimizedImg, src);
      this.loadingQueue.delete(src);
    };

    // Start loading
    optimizedImg.src = src;
  }

  private addProgressiveLoading(originalImg: HTMLImageElement, newImg: HTMLImageElement, src: string) {
    // Add blur placeholder
    originalImg.style.filter = 'blur(5px)';
    originalImg.style.transition = 'filter 0.3s ease-in-out';

    // Add loading state
    originalImg.classList.add('loading');

    newImg.onload = () => {
      // Replace with optimized image
      originalImg.src = newImg.src;
      originalImg.style.filter = 'none';
      originalImg.classList.remove('loading');
      originalImg.classList.add('loaded');

      // Cache the image
      this.imageCache.set(src, newImg);
    };
  }

  private handleImageError(img: HTMLImageElement, src: string) {
    // Fallback to placeholder
    img.src = '/images/juice-placeholder.svg';
    img.classList.add('error');
    console.warn(`Failed to load image: ${src}`);
  }

  private handleImageLoad(img: HTMLImageElement, newImg: HTMLImageElement, src: string) {
    // Update image source
    img.src = newImg.src;
    img.classList.add('loaded');
    
    // Cache the image
    this.imageCache.set(src, newImg);
  }

  private setupImagePreloading() {
    // Preload critical images
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
      img.decoding = 'async';
      img.loading = 'eager';
      img.fetchPriority = 'high';

      img.onload = () => {
        this.imageCache.set(src, img);
        resolve(img);
      };

      img.onerror = reject;
      img.src = src;
    });
  }

  // Get optimized image props for Next.js
  public getOptimizedImageProps(
    src: string, 
    alt: string, 
    options: {
      priority?: boolean;
      quality?: number;
      sizes?: string;
      placeholder?: 'blur' | 'empty';
    } = {}
  ) {
    const {
      priority = false,
      quality = this.getOptimalQuality(),
      sizes = this.getResponsiveSizes(),
      placeholder = 'blur'
    } = options;

    return {
      src,
      alt,
      priority,
      quality,
      sizes,
      placeholder,
      loading: priority ? 'eager' : 'lazy',
      decoding: 'async',
      fetchPriority: priority ? 'high' : 'auto',
      blurDataURL: placeholder === 'blur' ? this.getBlurDataURL() : undefined,
    };
  }

  private getOptimalQuality(): number {
    if (typeof window === 'undefined') return 85;

    const connection = (navigator as any).connection;
    if (!connection) return 85;

    // Adjust quality based on connection
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

  private getResponsiveSizes(): string {
    return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  }

  private getBlurDataURL(): string {
    // Base64 encoded 1x1 transparent pixel
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
  }

  // Get optimal image format
  public getOptimalFormat(): string {
    if (typeof window === 'undefined') return 'webp';

    // Check browser support
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
  public async preloadImages(urls: string[]): Promise<HTMLImageElement[]> {
    const promises = urls.map(url => this.preloadImage(url));
    return Promise.all(promises);
  }

  // Get image loading progress
  public getLoadingProgress(): number {
    const totalImages = document.querySelectorAll('img').length;
    const loadedImages = this.imageCache.size;
    return totalImages > 0 ? (loadedImages / totalImages) * 100 : 100;
  }

  // Check if image is loaded
  public isImageLoaded(src: string): boolean {
    return this.imageCache.has(src);
  }

  // Clear image cache
  public clearCache() {
    this.imageCache.clear();
    this.loadingQueue.clear();
  }

  // Cleanup
  public cleanup() {
    this.intersectionObserver?.disconnect();
    this.clearCache();
  }
}

// Hook for React components
export const useAdvancedImageOptimizer = () => {
  const optimizer = AdvancedImageOptimizer.getInstance();
  
  return {
    getOptimizedImageProps: optimizer.getOptimizedImageProps.bind(optimizer),
    getOptimalFormat: optimizer.getOptimalFormat.bind(optimizer),
    preloadImages: optimizer.preloadImages.bind(optimizer),
    getLoadingProgress: optimizer.getLoadingProgress.bind(optimizer),
    isImageLoaded: optimizer.isImageLoaded.bind(optimizer),
    clearCache: optimizer.clearCache.bind(optimizer),
    cleanup: optimizer.cleanup.bind(optimizer),
  };
};
