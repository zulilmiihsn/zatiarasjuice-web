import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import { CartProvider } from '../contexts/CartContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
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
        <link rel="preload" href="/images/hero-avocado-juice.png?v=20250926" as="image" type="image/png" />
        <link rel="preload" href="/images/hero-mango-juice.png?v=20250926" as="image" type="image/png" />
        <link rel="preload" href="/images/hero-avocado-shake.png?v=20250926" as="image" type="image/png" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        
        {/* CRITICAL CSS INLINE - Above the fold optimization */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Performance optimizations */
            .silky-smooth { will-change: transform, opacity; }
            .fps-60 { transform: translateZ(0); }
            .img-optimized { image-rendering: -webkit-optimize-contrast; }
            .perf-container { contain: layout style paint; }
            
            /* Critical animations */
            @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
            .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
            
            /* Optimized transforms */
            .transform { transform: translateZ(0); }
            .backface-hidden { backface-visibility: hidden; }
            .perspective-3d { perspective: 1000px; }
            
            /* Critical layout styles */
            .bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); }
            .w-full { width: 100%; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-between { justify-content: space-between; }
            .gap-2 { gap: 0.5rem; }
            .min-w-0 { min-width: 0px; }
            .overflow-hidden { overflow: hidden; }
            
            /* Critical color scheme */
            .text-pink-600 { color: rgb(219 39 119); }
            .bg-pink-50 { background-color: rgb(253 242 248); }
            .border-pink-200 { border-color: rgb(251 207 232); }
            .text-gray-900 { color: rgb(17 24 39); }
            .text-gray-500 { color: rgb(107 114 128); }
            
            /* Critical typography */
            .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
            .text-xs { font-size: 0.75rem; line-height: 1rem; }
            .font-semibold { font-weight: 600; }
            .text-right { text-align: right; }
            
            /* Critical spacing */
            .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
            .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
            .mt-1 { margin-top: 0.25rem; }
            
            /* Critical layout components */
            .rounded-lg { border-radius: 0.5rem; }
            .space-y-1 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.25rem; }
            .space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem; }
            
            /* Critical grid system */
            .grid { display: grid; }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .gap-2 { gap: 0.5rem; }
            
            /* Critical responsive design */
            @media (min-width: 640px) {
              .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
              .sm\\:gap-4 { gap: 1rem; }
            }
            @media (min-width: 768px) {
              .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
              .md\\:gap-6 { gap: 1.5rem; }
            }
            @media (min-width: 1024px) {
              .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
            }
            
            /* Critical interactions */
            .hover\\:border-pink-300:hover { border-color: rgb(249 168 212); }
            .hover\\:shadow-sm:hover { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
            .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
            .duration-200 { transition-duration: 200ms; }
            
            /* Critical loading states */
            .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
            @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
          `
        }} />
      </Head>
      <Component {...pageProps} />
    </CartProvider>
  );
}
