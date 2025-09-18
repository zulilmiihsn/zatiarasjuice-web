/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   appDir: true,
  // },
  images: {
    domains: ['supabase.co', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
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
