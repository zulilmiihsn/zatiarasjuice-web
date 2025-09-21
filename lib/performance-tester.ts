// Performance testing utilities for Zatiaras Juice
export class PerformanceTester {
  private static instance: PerformanceTester;
  private testResults: Map<string, any> = new Map();

  private constructor() {
    this.initializePerformanceTesting();
  }

  public static getInstance(): PerformanceTester {
    if (!PerformanceTester.instance) {
      PerformanceTester.instance = new PerformanceTester();
    }
    return PerformanceTester.instance;
  }

  private initializePerformanceTesting() {
    if (typeof window === 'undefined') return;

    // Run performance tests on page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.runAllTests();
      }, 1000);
    });
  }

  // Run all performance tests
  public async runAllTests(): Promise<void> {
    console.log('🚀 Running performance tests...');

    await Promise.all([
      this.testPageLoadPerformance(),
      this.testAnimationPerformance(),
      this.testImageLoadingPerformance(),
      this.testMemoryUsage(),
      this.testNetworkPerformance(),
      this.testBundlePerformance(),
    ]);

    this.generateReport();
  }

  // Test page load performance
  private async testPageLoadPerformance(): Promise<void> {
    const startTime = performance.now();
    
    // Wait for page to be fully loaded
    await new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve(void 0);
      } else {
        window.addEventListener('load', () => resolve(void 0));
      }
    });

    const endTime = performance.now();
    const loadTime = endTime - startTime;

    this.testResults.set('pageLoad', {
      loadTime,
      status: loadTime < 3000 ? 'PASS' : 'FAIL',
      threshold: 3000,
    });

    console.log(`📄 Page Load: ${loadTime.toFixed(2)}ms (${loadTime < 3000 ? 'PASS' : 'FAIL'})`);
  }

  // Test animation performance
  private async testAnimationPerformance(): Promise<void> {
    const startTime = performance.now();
    
    // Test animation frame rate
    let frameCount = 0;
    const testDuration = 1000; // 1 second
    
    const testAnimation = () => {
      frameCount++;
      if (performance.now() - startTime < testDuration) {
        requestAnimationFrame(testAnimation);
      } else {
        const fps = frameCount;
        const status = fps >= 55 ? 'PASS' : 'FAIL';
        
        this.testResults.set('animation', {
          fps,
          status,
          threshold: 55,
        });

        console.log(`🎬 Animation FPS: ${fps} (${status})`);
      }
    };

    requestAnimationFrame(testAnimation);
  }

  // Test image loading performance
  private async testImageLoadingPerformance(): Promise<void> {
    const images = document.querySelectorAll('img');
    const totalImages = images.length;
    let loadedImages = 0;

    const imageLoadPromises = Array.from(images).map(img => {
      return new Promise<void>((resolve) => {
        if (img.complete) {
          loadedImages++;
          resolve();
        } else {
          img.onload = () => {
            loadedImages++;
            resolve();
          };
          img.onerror = () => resolve();
        }
      });
    });

    await Promise.all(imageLoadPromises);

    const loadRate = (loadedImages / totalImages) * 100;
    const status = loadRate >= 90 ? 'PASS' : 'FAIL';

    this.testResults.set('imageLoading', {
      loadedImages,
      totalImages,
      loadRate,
      status,
      threshold: 90,
    });

    console.log(`🖼️ Image Loading: ${loadedImages}/${totalImages} (${loadRate.toFixed(1)}%) (${status})`);
  }

  // Test memory usage
  private async testMemoryUsage(): Promise<void> {
    if (typeof window === 'undefined') return;

    const memory = (performance as any).memory;
    if (!memory) {
      this.testResults.set('memory', {
        status: 'SKIP',
        message: 'Memory API not available',
      });
      return;
    }

    const usedMemory = memory.usedJSHeapSize;
    const totalMemory = memory.totalJSHeapSize;
    const memoryUsage = (usedMemory / totalMemory) * 100;

    const status = memoryUsage < 80 ? 'PASS' : 'FAIL';

    this.testResults.set('memory', {
      usedMemory: Math.round(usedMemory / 1024 / 1024), // MB
      totalMemory: Math.round(totalMemory / 1024 / 1024), // MB
      memoryUsage,
      status,
      threshold: 80,
    });

    console.log(`💾 Memory Usage: ${Math.round(usedMemory / 1024 / 1024)}MB (${memoryUsage.toFixed(1)}%) (${status})`);
  }

  // Test network performance
  private async testNetworkPerformance(): Promise<void> {
    if (typeof window === 'undefined') return;

    const connection = (navigator as any).connection;
    if (!connection) {
      this.testResults.set('network', {
        status: 'SKIP',
        message: 'Connection API not available',
      });
      return;
    }

    const effectiveType = connection.effectiveType;
    const downlink = connection.downlink;
    const rtt = connection.rtt;

    const isGoodConnection = effectiveType === '4g' && downlink > 5 && rtt < 100;
    const status = isGoodConnection ? 'PASS' : 'WARN';

    this.testResults.set('network', {
      effectiveType,
      downlink,
      rtt,
      status,
    });

    console.log(`🌐 Network: ${effectiveType} (${downlink}Mbps, ${rtt}ms) (${status})`);
  }

  // Test bundle performance
  private async testBundlePerformance(): Promise<void> {
    const scripts = document.querySelectorAll('script[src]');
    const nextScripts = Array.from(scripts).filter(script => 
      script.getAttribute('src')?.includes('_next/static')
    );

    const totalChunks = nextScripts.length;
    const status = totalChunks < 20 ? 'PASS' : 'WARN';

    this.testResults.set('bundle', {
      totalChunks,
      status,
      threshold: 20,
    });

    console.log(`📦 Bundle: ${totalChunks} chunks (${status})`);
  }

  // Generate performance report
  private generateReport(): void {
    const results = Object.fromEntries(this.testResults);
    const passedTests = Object.values(results).filter((result: any) => result.status === 'PASS').length;
    const totalTests = Object.values(results).length;
    const passRate = (passedTests / totalTests) * 100;

    console.log('\n📊 Performance Test Report');
    console.log('========================');
    console.log(`Overall Score: ${passRate.toFixed(1)}% (${passedTests}/${totalTests} tests passed)`);
    console.log('\nDetailed Results:');
    
    Object.entries(results).forEach(([test, result]: [string, any]) => {
      const status = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⚠️';
      console.log(`${status} ${test}: ${JSON.stringify(result, null, 2)}`);
    });

    // Store results for external access
    this.testResults.set('overall', {
      passRate,
      passedTests,
      totalTests,
      timestamp: new Date().toISOString(),
    });
  }

  // Get test results
  public getTestResults(): Record<string, any> {
    return Object.fromEntries(this.testResults);
  }

  // Get overall score
  public getOverallScore(): number {
    const overall = this.testResults.get('overall');
    return overall ? overall.passRate : 0;
  }

  // Check if performance is good
  public isPerformanceGood(): boolean {
    return this.getOverallScore() >= 80;
  }

  // Run specific test
  public async runTest(testName: string): Promise<any> {
    switch (testName) {
      case 'pageLoad':
        await this.testPageLoadPerformance();
        break;
      case 'animation':
        await this.testAnimationPerformance();
        break;
      case 'imageLoading':
        await this.testImageLoadingPerformance();
        break;
      case 'memory':
        await this.testMemoryUsage();
        break;
      case 'network':
        await this.testNetworkPerformance();
        break;
      case 'bundle':
        await this.testBundlePerformance();
        break;
      default:
        throw new Error(`Unknown test: ${testName}`);
    }

    return this.testResults.get(testName);
  }

  // Cleanup performance tester
  public cleanup() {
    this.testResults.clear();
  }
}

// Hook for React components
export const usePerformanceTester = () => {
  const tester = PerformanceTester.getInstance();
  
  return {
    runAllTests: tester.runAllTests.bind(tester),
    getTestResults: tester.getTestResults.bind(tester),
    getOverallScore: tester.getOverallScore.bind(tester),
    isPerformanceGood: tester.isPerformanceGood.bind(tester),
    runTest: tester.runTest.bind(tester),
    cleanup: tester.cleanup.bind(tester),
  };
};
