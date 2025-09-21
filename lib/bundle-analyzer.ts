// Advanced Bundle Analysis & Optimization for Zatiaras Juice
export class BundleAnalyzer {
  private static instance: BundleAnalyzer;
  private bundleMetrics: Map<string, any> = new Map();
  private chunkAnalysis: Map<string, any> = new Map();

  private constructor() {
    this.initializeBundleAnalysis();
  }

  public static getInstance(): BundleAnalyzer {
    if (!BundleAnalyzer.instance) {
      BundleAnalyzer.instance = new BundleAnalyzer();
    }
    return BundleAnalyzer.instance;
  }

  private initializeBundleAnalysis() {
    if (typeof window === 'undefined') return;

    // Analyze bundle on load
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.analyzeBundleSize();
        this.analyzeChunkEfficiency();
        this.optimizeBundleLoading();
      }, 1000);
    });
  }

  private analyzeBundleSize() {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const nextScripts = scripts.filter(script => 
      script.getAttribute('src')?.includes('_next/static')
    );

    let totalSize = 0;
    const chunkSizes: Record<string, number> = {};

    nextScripts.forEach(script => {
      const src = script.getAttribute('src') || '';
      const chunkName = this.extractChunkName(src);
      
      // Estimate size based on common patterns
      const estimatedSize = this.estimateChunkSize(src);
      totalSize += estimatedSize;
      chunkSizes[chunkName] = estimatedSize;
    });

    this.bundleMetrics.set('totalSize', totalSize);
    this.bundleMetrics.set('chunkSizes', chunkSizes);
    this.bundleMetrics.set('chunkCount', nextScripts.length);

    console.log(`📦 Bundle Analysis: ${(totalSize / 1024).toFixed(2)}KB total, ${nextScripts.length} chunks`);
  }

  private extractChunkName(src: string): string {
    const match = src.match(/_next\/static\/chunks\/([^?]+)/);
    return match ? match[1] : 'unknown';
  }

  private estimateChunkSize(src: string): number {
    // Rough estimation based on common chunk patterns
    if (src.includes('framework')) return 45; // KB
    if (src.includes('main')) return 35;
    if (src.includes('pages/_app')) return 25;
    if (src.includes('pages/index')) return 20;
    if (src.includes('pages/[')) return 15;
    if (src.includes('webpack')) return 10;
    return 8; // Default estimate
  }

  private analyzeChunkEfficiency() {
    const chunkSizes = this.bundleMetrics.get('chunkSizes') || {};
    const chunkCount = this.bundleMetrics.get('chunkCount') || 0;
    
    // Identify oversized chunks
    const oversizedChunks = Object.entries(chunkSizes)
      .filter(([_, size]) => (size as number) > 50) // > 50KB
      .map(([name, size]) => ({ name, size: size as number }));

    // Identify small chunks that could be merged
    const smallChunks = Object.entries(chunkSizes)
      .filter(([_, size]) => (size as number) < 5) // < 5KB
      .map(([name, size]) => ({ name, size: size as number }));

    this.chunkAnalysis.set('oversizedChunks', oversizedChunks);
    this.chunkAnalysis.set('smallChunks', smallChunks);
    this.chunkAnalysis.set('efficiency', this.calculateEfficiency());

    if (oversizedChunks.length > 0) {
      console.warn('⚠️ Oversized chunks detected:', oversizedChunks);
    }
    if (smallChunks.length > 3) {
      console.warn('⚠️ Too many small chunks detected:', smallChunks);
    }
  }

  private calculateEfficiency(): number {
    const chunkSizes = this.bundleMetrics.get('chunkSizes') || {};
    const totalSize = this.bundleMetrics.get('totalSize') || 0;
    const chunkCount = Object.keys(chunkSizes).length;
    
    // Efficiency based on chunk distribution
    const avgChunkSize = totalSize / chunkCount;
    const idealChunkSize = 25; // KB
    const sizeEfficiency = Math.max(0, 1 - Math.abs(avgChunkSize - idealChunkSize) / idealChunkSize);
    
    // Efficiency based on chunk count
    const idealChunkCount = 15;
    const countEfficiency = Math.max(0, 1 - Math.abs(chunkCount - idealChunkCount) / idealChunkCount);
    
    return (sizeEfficiency + countEfficiency) / 2;
  }

  private optimizeBundleLoading() {
    // Preload critical chunks
    this.preloadCriticalChunks();
    
    // Optimize chunk loading order
    this.optimizeChunkOrder();
    
    // Setup chunk prefetching
    this.setupChunkPrefetching();
  }

  private preloadCriticalChunks() {
    const criticalChunks = [
      'pages/_app.js',
      'pages/index.js',
      'pages/_document.js',
    ];

    criticalChunks.forEach(chunk => {
      const link = document.createElement('link');
      link.rel = 'modulepreload';
      link.href = `/_next/static/chunks/${chunk}`;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  private optimizeChunkOrder() {
    // Reorder script loading for better performance
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const nextScripts = scripts.filter(script => 
      script.getAttribute('src')?.includes('_next/static')
    );

    // Sort by priority (framework first, then main, then pages)
    nextScripts.sort((a, b) => {
      const srcA = a.getAttribute('src') || '';
      const srcB = b.getAttribute('src') || '';
      
      const priorityA = this.getChunkPriority(srcA);
      const priorityB = this.getChunkPriority(srcB);
      
      return priorityA - priorityB;
    });
  }

  private getChunkPriority(src: string): number {
    if (src.includes('framework')) return 1;
    if (src.includes('main')) return 2;
    if (src.includes('pages/_app')) return 3;
    if (src.includes('pages/index')) return 4;
    if (src.includes('pages/[')) return 5;
    return 6;
  }

  private setupChunkPrefetching() {
    // Prefetch likely next chunks based on user behavior
    const likelyNextChunks = [
      'pages/berau.js',
      'pages/samarinda.js',
      'pages/berau/menu.js',
      'pages/samarinda/menu.js',
    ];

    // Prefetch after initial load
    setTimeout(() => {
      likelyNextChunks.forEach(chunk => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = `/_next/static/chunks/${chunk}`;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    }, 2000);
  }

  // Get optimization recommendations
  public getOptimizationRecommendations(): string[] {
    const recommendations: string[] = [];
    const totalSize = this.bundleMetrics.get('totalSize') || 0;
    const chunkCount = this.bundleMetrics.get('chunkCount') || 0;
    const oversizedChunks = this.chunkAnalysis.get('oversizedChunks') || [];
    const smallChunks = this.chunkAnalysis.get('smallChunks') || [];
    const efficiency = this.chunkAnalysis.get('efficiency') || 0;

    if (totalSize > 500) { // > 500KB
      recommendations.push('Consider code splitting for large bundle size');
    }

    if (chunkCount > 20) {
      recommendations.push('Too many chunks - consider merging small chunks');
    }

    if (oversizedChunks.length > 0) {
      recommendations.push('Split oversized chunks for better loading performance');
    }

    if (smallChunks.length > 5) {
      recommendations.push('Merge small chunks to reduce HTTP requests');
    }

    if (efficiency < 0.7) {
      recommendations.push('Bundle structure needs optimization for better efficiency');
    }

    return recommendations;
  }

  // Get bundle metrics
  public getBundleMetrics() {
    return {
      ...Object.fromEntries(this.bundleMetrics),
      analysis: Object.fromEntries(this.chunkAnalysis),
    };
  }

  // Check if bundle is optimized
  public isBundleOptimized(): boolean {
    const totalSize = this.bundleMetrics.get('totalSize') || 0;
    const chunkCount = this.bundleMetrics.get('chunkCount') || 0;
    const efficiency = this.chunkAnalysis.get('efficiency') || 0;
    
    return totalSize < 500 && chunkCount < 20 && efficiency > 0.7;
  }

  // Cleanup
  public cleanup() {
    this.bundleMetrics.clear();
    this.chunkAnalysis.clear();
  }
}

// Hook for React components
export const useBundleAnalyzer = () => {
  const analyzer = BundleAnalyzer.getInstance();
  
  return {
    getBundleMetrics: analyzer.getBundleMetrics.bind(analyzer),
    isBundleOptimized: analyzer.isBundleOptimized.bind(analyzer),
    getOptimizationRecommendations: analyzer.getOptimizationRecommendations.bind(analyzer),
    cleanup: analyzer.cleanup.bind(analyzer),
  };
};