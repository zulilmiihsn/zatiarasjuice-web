import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Font sudah di-import via globals.css
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
        
        {/* ULTRA PERFORMANCE FONT LOADING */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700;800;900&family=Quicksand:wght@300;400;500;600;700&family=M+PLUS+Rounded+1c:wght@400;500;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        
        {/* CRITICAL RESOURCE PRELOADING */}
        <link rel="preload" href="/images/hero-avocado.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/images/hero-fruits.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/images/hero-seasonal.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/images/juice-placeholder.svg" as="image" type="image/svg+xml" />
        
        {/* DNS PREFETCH untuk external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        
        {/* SERVICE WORKER REGISTRATION */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
