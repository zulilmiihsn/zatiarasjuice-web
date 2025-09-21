import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="id">
      <Head>
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
        
        {/* Preload critical resources */}
        <link rel="preload" href="/images/hero-avocado.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/images/hero-fruits.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/images/juice-placeholder.svg" as="image" type="image/svg+xml" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
