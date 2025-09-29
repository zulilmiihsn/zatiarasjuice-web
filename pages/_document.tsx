import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        {/* Favicon & PWA Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* ULTRA PERFORMANCE FONT LOADING */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700;800;900&family=Quicksand:wght@300;400;500;600;700&family=M+PLUS+Rounded+1c:wght@400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
        
        {/* DNS PREFETCH untuk external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        
        {/* Meta tags untuk performance */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="-W59lS_Txhh80C4hgWeriUh4_CdGq5o7iG9BwaDCKYc" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/images/hero-avocado-juice.png?v=20250926" as="image" type="image/png" />
        <link rel="preload" href="/images/hero-mango-juice.png?v=20250926" as="image" type="image/png" />
        <link rel="preload" href="/images/hero-avocado-shake.png?v=20250926" as="image" type="image/png" />
        <link rel="preload" href="/images/juice-placeholder.svg" as="image" type="image/svg+xml" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
