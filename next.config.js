/** @type {import('next').NextConfig} */
const nextConfig = {
  // ULTRA PERFORMANCE OPTIMIZATIONS
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  generateEtags: false, // Disable ETags for better caching
  httpAgentOptions: {
    keepAlive: true,
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    optimizeCss: false, // Disable to avoid critters dependency
    scrollRestoration: true,
    esmExternals: true,
  },
  
  // Image optimizations
  images: {
    domains: ['supabase.co', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 300, // 5 minutes cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async rewrites() {
    return [
      {
        source: '/api/supabase/:path*',
        destination: 'https://api.supabase.co/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
