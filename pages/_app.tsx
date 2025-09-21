import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import '../styles/globals.css';

// Import ultra performance optimizations
// import { ultraPerformanceOptimizer } from '../lib/ultra-performance-optimizer';
// import { performanceAuditor } from '../lib/performance-auditor';
// import { PerformanceIntegration } from '../lib/performance-integration';

// Preload critical resources
if (typeof window !== 'undefined') {
  // Preload critical images
  const preloadImage = (src: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'image';
    document.head.appendChild(link);
  };

  // Preload critical resources
  preloadImage('/images/hero-avocado.jpg');
  preloadImage('/images/hero-fruits.jpg');
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Disable performance monitoring to prevent reload loops
    // const initializePerformance = async () => {
    //   try {
    //     // Initialize performance integration
    //     const performanceIntegration = PerformanceIntegration.getInstance();
    //     
    //     // Initialize ultra performance optimizer
    //     const optimizer = ultraPerformanceOptimizer;
    //     
    //     // Start performance auditing
    //     const auditor = performanceAuditor;
    //     
    //     // Performance optimizations initialized silently
    //     
    //   } catch (error) {
    //     // Performance optimization failed silently
    //   }
    // };

    // initializePerformance();
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FF69B4" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Zatiaras Juice" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* CRITICAL RESOURCE PRELOADING */}
        <link rel="preload" href="/images/hero-avocado.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/images/hero-fruits.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/images/juice-placeholder.svg" as="image" type="image/svg+xml" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        
        {/* SERVICE WORKER REGISTRATION - DISABLED TO PREVENT RELOAD LOOPS */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      // Service worker registered
                    })
                    .catch(function(registrationError) {
                      // Service worker registration failed
                    });
                });
              }
            `,
          }}
        /> */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}
