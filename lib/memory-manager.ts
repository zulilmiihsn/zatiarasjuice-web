// Memory management utilities for Zatiaras Juice
export class MemoryManager {
  private static instance: MemoryManager;
  private memoryUsage: number = 0;
  private memoryThreshold: number = 50 * 1024 * 1024; // 50MB
  private cleanupInterval: NodeJS.Timeout | null = null;

  private constructor() {
    this.initializeMemoryMonitoring();
  }

  public static getInstance(): MemoryManager {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
    }
    return MemoryManager.instance;
  }

  private initializeMemoryMonitoring() {
    if (typeof window === 'undefined') return;

    // Monitor memory usage every 30 seconds
    this.cleanupInterval = setInterval(() => {
      this.checkMemoryUsage();
    }, 30000);

    // Monitor memory on page visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.performCleanup();
      }
    });

    // Monitor memory on page unload
    window.addEventListener('beforeunload', () => {
      this.performCleanup();
    });
  }

  private checkMemoryUsage() {
    if (typeof window === 'undefined') return;

    const memory = (performance as any).memory;
    if (memory) {
      this.memoryUsage = memory.usedJSHeapSize;
      
      if (this.memoryUsage > this.memoryThreshold) {
        this.performCleanup();
      }
    }
  }

  private performCleanup() {
    // Clear unused caches
    this.clearUnusedCaches();
    
    // Force garbage collection if available
    if ((window as any).gc) {
      (window as any).gc();
    }
  }

  private clearUnusedCaches() {
    // Clear image cache if it's too large
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!this.isImageVisible(img)) {
        img.src = '';
        img.removeAttribute('src');
      }
    });

    // Clear unused DOM elements
    this.clearUnusedElements();
  }

  private isImageVisible(img: HTMLImageElement): boolean {
    const rect = img.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    return (
      rect.top < windowHeight &&
      rect.bottom > 0 &&
      rect.left < windowWidth &&
      rect.right > 0
    );
  }

  private clearUnusedElements() {
    // Remove elements that are not visible and not needed
    const elements = document.querySelectorAll('[data-cleanup="true"]');
    elements.forEach(element => {
      if (!this.isElementVisible(element as HTMLElement)) {
        element.remove();
      }
    });
  }

  private isElementVisible(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    return (
      rect.top < windowHeight &&
      rect.bottom > 0 &&
      rect.left < windowWidth &&
      rect.right > 0
    );
  }

  // Get current memory usage
  public getMemoryUsage(): {
    used: number;
    total: number;
    limit: number;
    percentage: number;
  } {
    if (typeof window === 'undefined') {
      return { used: 0, total: 0, limit: 0, percentage: 0 };
    }

    const memory = (performance as any).memory;
    if (memory) {
      const used = memory.usedJSHeapSize;
      const total = memory.totalJSHeapSize;
      const limit = memory.jsHeapSizeLimit;
      const percentage = (used / limit) * 100;

      return { used, total, limit, percentage };
    }

    return { used: 0, total: 0, limit: 0, percentage: 0 };
  }

  // Check if memory usage is high
  public isMemoryUsageHigh(): boolean {
    const { percentage } = this.getMemoryUsage();
    return percentage > 80;
  }

  // Force memory cleanup
  public forceCleanup() {
    this.performCleanup();
  }

  // Set memory threshold
  public setMemoryThreshold(threshold: number) {
    this.memoryThreshold = threshold;
  }

  // Get memory threshold
  public getMemoryThreshold(): number {
    return this.memoryThreshold;
  }

  // Monitor specific element for memory usage
  public monitorElement(element: HTMLElement, callback: (usage: number) => void) {
    const observer = new MutationObserver(() => {
      const usage = this.getElementMemoryUsage(element);
      callback(usage);
    });

    observer.observe(element, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return observer;
  }

  private getElementMemoryUsage(element: HTMLElement): number {
    // Estimate memory usage based on element properties
    let usage = 0;
    
    // Count text nodes
    const textNodes = this.getTextNodes(element);
    usage += textNodes.length * 2; // 2 bytes per character estimate
    
    // Count child elements
    const childElements = element.querySelectorAll('*');
    usage += childElements.length * 100; // 100 bytes per element estimate
    
    // Count attributes
    const attributes = element.attributes;
    usage += attributes.length * 50; // 50 bytes per attribute estimate
    
    return usage;
  }

  private getTextNodes(element: HTMLElement): Text[] {
    const textNodes: Text[] = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node as Text);
    }

    return textNodes;
  }

  // Cleanup memory manager
  public cleanup() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

// Hook for React components
export const useMemoryManager = () => {
  const manager = MemoryManager.getInstance();
  
  return {
    getMemoryUsage: manager.getMemoryUsage.bind(manager),
    isMemoryUsageHigh: manager.isMemoryUsageHigh.bind(manager),
    forceCleanup: manager.forceCleanup.bind(manager),
    setMemoryThreshold: manager.setMemoryThreshold.bind(manager),
    getMemoryThreshold: manager.getMemoryThreshold.bind(manager),
    monitorElement: manager.monitorElement.bind(manager),
    cleanup: manager.cleanup.bind(manager),
  };
};
