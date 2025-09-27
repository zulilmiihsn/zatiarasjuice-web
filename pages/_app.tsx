import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
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
        {/* Critical resource preloading */}
        <link rel="preload" href="/images/hero-avocado-juice.png?v=20250926" as="image" type="image/png" />
        <link rel="preload" href="/images/hero-mango-juice.png?v=20250926" as="image" type="image/png" />
        <link rel="preload" href="/images/hero-avocado-shake.png?v=20250926" as="image" type="image/png" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//wa.me" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* Preconnect for critical external resources */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://wa.me" />
        
        {/* Font preloading */}
        <link rel="preload" href="/fonts/nunito-sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* CRITICAL CSS INLINE - Optimized for minimal size */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical performance */
            .silky-smooth{will-change:transform,opacity}.fps-60{transform:translateZ(0)}.perf-container{contain:layout style paint}
            
            /* Critical animations */
            @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}.animate-pulse{animation:pulse 2s infinite}
            
            /* Critical layout */
            .w-full{width:100%}.flex{display:flex}.items-center{align-items:center}.justify-between{justify-content:space-between}
            .gap-2{gap:.5rem}.min-w-0{min-width:0}.overflow-hidden{overflow:hidden}
            
            /* Critical colors */
            .text-pink-600{color:#db2777}.bg-pink-50{background-color:#fdf2f8}.text-gray-900{color:#111827}.text-gray-500{color:#6b7280}
            
            /* Critical typography */
            .text-sm{font-size:.875rem;line-height:1.25rem}.text-xs{font-size:.75rem;line-height:1rem}.font-semibold{font-weight:600}
            
            /* Critical spacing */
            .px-3{padding-left:.75rem;padding-right:.75rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}
            
            /* Critical components */
            .rounded-lg{border-radius:.5rem}.grid{display:grid}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
            
            /* Critical responsive */
            @media (min-width:640px){.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\\:gap-4{gap:1rem}}
            @media (min-width:768px){.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.md\\:gap-6{gap:1.5rem}}
            @media (min-width:1024px){.lg\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}}
            
            /* Critical interactions */
            .hover\\:border-pink-300:hover{border-color:#f9a8d4}.transition-all{transition:all .2s}
          `
        }} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
