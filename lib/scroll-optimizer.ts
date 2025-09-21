// Scroll optimization utilities for 60fps performance
export class ScrollOptimizer {
  private static instance: ScrollOptimizer;
  private scrollListeners: Map<string, (event: Event) => void> = new Map();
  private isScrolling: boolean = false;
  private scrollTimeout: NodeJS.Timeout | null = null;
  private lastScrollY: number = 0;
  private scrollDirection: 'up' | 'down' = 'down';

  private constructor() {
    this.initializeScrollOptimization();
  }

  public static getInstance(): ScrollOptimizer {
    if (!ScrollOptimizer.instance) {
      ScrollOptimizer.instance = new ScrollOptimizer();
    }
    return ScrollOptimizer.instance;
  }

  private initializeScrollOptimization() {
    if (typeof window === 'undefined') return;

    // Add passive scroll listener for better performance
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
  }

  private handleScroll = (event: Event) => {
    if (this.isScrolling) return;

    this.isScrolling = true;
    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
      this.lastScrollY = currentScrollY;

      // Execute scroll listeners
      this.scrollListeners.forEach(listener => {
        listener(event);
      });

      this.isScrolling = false;
    });
  };

  // Add scroll listener with throttling
  public addScrollListener(id: string, listener: (event: Event) => void, throttleMs: number = 16) {
    const throttledListener = this.throttle(listener, throttleMs);
    this.scrollListeners.set(id, throttledListener);
  }

  // Remove scroll listener
  public removeScrollListener(id: string) {
    this.scrollListeners.delete(id);
  }

  // Get current scroll position
  public getScrollPosition(): { x: number; y: number } {
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    
    return {
      x: window.scrollX,
      y: window.scrollY,
    };
  }

  // Get scroll direction
  public getScrollDirection(): 'up' | 'down' {
    return this.scrollDirection;
  }

  // Check if user is scrolling
  public isUserScrolling(): boolean {
    return this.isScrolling;
  }

  // Smooth scroll to element
  public smoothScrollTo(element: HTMLElement, offset: number = 0) {
    if (typeof window === 'undefined') return;

    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    });
  }

  // Smooth scroll to top
  public smoothScrollToTop() {
    if (typeof window === 'undefined') return;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  // Check if element is in viewport
  public isElementInViewport(element: HTMLElement, threshold: number = 0.1): boolean {
    if (typeof window === 'undefined') return false;

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    return (
      rect.top <= windowHeight * (1 - threshold) &&
      rect.bottom >= windowHeight * threshold &&
      rect.left <= windowWidth * (1 - threshold) &&
      rect.right >= windowWidth * threshold
    );
  }

  // Get elements in viewport
  public getElementsInViewport(selector: string, threshold: number = 0.1): HTMLElement[] {
    if (typeof window === 'undefined') return [];

    const elements = document.querySelectorAll(selector);
    return Array.from(elements).filter(element => 
      this.isElementInViewport(element as HTMLElement, threshold)
    ) as HTMLElement[];
  }

  // Throttle function for performance
  private throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Debounce function for performance
  private debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  // Setup intersection observer for scroll-triggered animations
  public setupIntersectionObserver(
    callback: (entries: IntersectionObserverEntry[]) => void,
    options: IntersectionObserverInit = {}
  ): IntersectionObserver {
    if (typeof window === 'undefined') {
      return {} as IntersectionObserver;
    }

    const defaultOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
      ...options,
    };

    return new IntersectionObserver(callback, defaultOptions);
  }

  // Cleanup scroll listeners
  public cleanup() {
    if (typeof window === 'undefined') return;

    window.removeEventListener('scroll', this.handleScroll);
    this.scrollListeners.clear();
    
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }
}

// Hook for React components
export const useScrollOptimizer = () => {
  const optimizer = ScrollOptimizer.getInstance();
  
  return {
    addScrollListener: optimizer.addScrollListener.bind(optimizer),
    removeScrollListener: optimizer.removeScrollListener.bind(optimizer),
    getScrollPosition: optimizer.getScrollPosition.bind(optimizer),
    getScrollDirection: optimizer.getScrollDirection.bind(optimizer),
    isUserScrolling: optimizer.isUserScrolling.bind(optimizer),
    smoothScrollTo: optimizer.smoothScrollTo.bind(optimizer),
    smoothScrollToTop: optimizer.smoothScrollToTop.bind(optimizer),
    isElementInViewport: optimizer.isElementInViewport.bind(optimizer),
    getElementsInViewport: optimizer.getElementsInViewport.bind(optimizer),
    setupIntersectionObserver: optimizer.setupIntersectionObserver.bind(optimizer),
    cleanup: optimizer.cleanup.bind(optimizer),
  };
};
