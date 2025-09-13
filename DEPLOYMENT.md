# Deployment Guide - Zatiaras Juice Web

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+ installed
- Git installed
- Vercel account (recommended)
- Supabase account

### 2. Local Development
```bash
# Clone repository
git clone https://github.com/your-username/zatiaras-juice-web.git
cd zatiaras-juice-web

# Install dependencies
npm install

# Setup environment variables
cp env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev

# Open browser
# http://localhost:3000
```

## 🌐 Production Deployment

### Option 1: Vercel (Recommended)

#### 1.1 Connect to Vercel
1. Push code ke GitHub repository
2. Login ke [vercel.com](https://vercel.com)
3. Klik "New Project"
4. Import repository dari GitHub
5. Vercel akan auto-detect Next.js

#### 1.2 Environment Variables
Set environment variables di Vercel dashboard:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL_BERAU=https://your-project-berau.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY_BERAU=your_anon_key_berau
NEXT_PUBLIC_SUPABASE_URL_SAMARINDA=https://your-project-samarinda.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY_SAMARINDA=your_anon_key_samarinda

# Base URL
NEXT_PUBLIC_BASE_URL=https://zatiarasjuice.com

# Revalidate Secret
REVALIDATE_SECRET_KEY=your_secret_key_here

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

#### 1.3 Deploy
1. Klik "Deploy"
2. Vercel akan build dan deploy otomatis
3. Website akan tersedia di `https://your-project.vercel.app`

#### 1.4 Custom Domain
1. Di Vercel dashboard, buka project settings
2. Klik "Domains"
3. Add custom domain: `zatiarasjuice.com`
4. Setup DNS records sesuai instruksi Vercel

### Option 2: Netlify

#### 2.1 Build Settings
```yaml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 2.2 Deploy
1. Connect repository ke Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Set environment variables
5. Deploy

### Option 3: Self-Hosted (VPS)

#### 3.1 Server Setup
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
git clone https://github.com/your-username/zatiaras-juice-web.git
cd zatiaras-juice-web

# Install dependencies
npm install

# Build production
npm run build
```

#### 3.2 PM2 Configuration
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'zatiaras-juice-web',
    script: 'npm',
    args: 'start',
    cwd: '/path/to/zatiaras-juice-web',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

#### 3.3 Start Application
```bash
# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup
```

#### 3.4 Nginx Configuration
```nginx
# /etc/nginx/sites-available/zatiaras-juice
server {
    listen 80;
    server_name zatiarasjuice.com www.zatiarasjuice.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔧 Configuration

### 1. Environment Variables

#### Development (.env.local)
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL_BERAU=https://your-project-berau.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY_BERAU=your_anon_key_berau
NEXT_PUBLIC_SUPABASE_URL_SAMARINDA=https://your-project-samarinda.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY_SAMARINDA=your_anon_key_samarinda

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Revalidate Secret
REVALIDATE_SECRET_KEY=your_secret_key_here
```

#### Production
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL_BERAU=https://your-project-berau.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY_BERAU=your_anon_key_berau
NEXT_PUBLIC_SUPABASE_URL_SAMARINDA=https://your-project-samarinda.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY_SAMARINDA=your_anon_key_samarinda

# Base URL
NEXT_PUBLIC_BASE_URL=https://zatiarasjuice.com

# Revalidate Secret
REVALIDATE_SECRET_KEY=your_secret_key_here

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Maps (Optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 2. Supabase Configuration

#### 2.1 Database Setup
- Buat 2 project Supabase (Berau & Samarinda)
- Setup tabel sesuai `SUPABASE_SETUP.md`
- Enable RLS dan buat policy

#### 2.2 Storage Setup
- Buat bucket `images` di setiap project
- Upload gambar produk dan kategori
- Update URL gambar di database

#### 2.3 Realtime Setup
- Enable replication untuk tabel `produk` dan `kategori`
- Setup webhook untuk revalidate ISR

### 3. Domain & DNS

#### 3.1 Domain Registration
- Beli domain di provider domain (Namecheap, GoDaddy, etc.)
- Domain: `zatiarasjuice.com`

#### 3.2 DNS Configuration
```
# A Records
@ -> Vercel IP
www -> Vercel IP

# CNAME Records
www -> your-project.vercel.app

# TXT Records (untuk verification)
@ -> vc-domain-verify=your-verification-code
```

## 📊 Monitoring & Analytics

### 1. Vercel Analytics
- Built-in analytics di Vercel dashboard
- Core Web Vitals monitoring
- Real-time performance metrics

### 2. Google Analytics 4
```javascript
// pages/_app.tsx
import { GoogleAnalytics } from 'nextjs-google-analytics';

export default function App({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics gaMeasurementId="G-XXXXXXXXXX" />
      <Component {...pageProps} />
    </>
  );
}
```

### 3. Supabase Monitoring
- Database performance di Supabase dashboard
- API usage monitoring
- Storage usage tracking

### 4. Error Tracking (Optional)
```bash
# Install Sentry
npm install @sentry/nextjs

# Setup Sentry
npx @sentry/wizard -i nextjs
```

## 🔒 Security

### 1. Environment Variables
- Jangan commit `.env.local` ke Git
- Gunakan environment variables di production
- Rotate API keys secara berkala

### 2. Supabase Security
- Enable RLS untuk semua tabel
- Buat policy yang tepat
- Monitor API usage

### 3. HTTPS & SSL
- Vercel menyediakan SSL otomatis
- Pastikan semua traffic menggunakan HTTPS

### 4. Headers Security
```javascript
// next.config.js
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
}
```

## 🚀 Performance Optimization

### 1. Next.js Optimization
- ISR (Incremental Static Regeneration)
- Image optimization dengan Next.js Image
- Code splitting otomatis
- Prefetching

### 2. CDN & Caching
- Vercel Edge Network
- Supabase CDN untuk gambar
- Browser caching

### 3. Bundle Analysis
```bash
# Analyze bundle size
npm run build
npm run analyze
```

### 4. Core Web Vitals
- Target LCP < 2.5s
- Target FID < 100ms
- Target CLS < 0.1

## 🔄 CI/CD Pipeline

### 1. GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
```

### 2. Vercel Git Integration
- Auto-deploy dari main branch
- Preview deployments untuk pull requests
- Rollback capability

## 📱 PWA Configuration

### 1. Manifest File
- `public/manifest.json` sudah dikonfigurasi
- Icons tersedia di `public/icons/`

### 2. Service Worker
```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  // ... other config
});
```

## 🧪 Testing

### 1. Local Testing
```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

### 2. Production Testing
- Test semua halaman setelah deploy
- Test responsive design
- Test performance dengan Lighthouse
- Test SEO dengan Google Search Console

## 📈 SEO Optimization

### 1. Meta Tags
- Title dan description untuk setiap halaman
- Open Graph tags
- Twitter Card tags

### 2. Structured Data
- JSON-LD untuk LocalBusiness
- Menu structured data
- Breadcrumb structured data

### 3. Sitemap
- Auto-generated sitemap.xml
- Submit ke Google Search Console

### 4. Local SEO
- Google My Business integration
- Local keywords targeting
- Rich snippets

## 🆘 Troubleshooting

### 1. Common Issues

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

#### Supabase Connection Issues
- Check environment variables
- Verify Supabase project URL
- Check RLS policies

#### Image Loading Issues
- Check Supabase storage bucket
- Verify image URLs
- Check CORS settings

### 2. Debug Mode
```bash
# Enable debug mode
NEXT_PUBLIC_DEBUG=true npm run dev
```

### 3. Logs
- Vercel: Check function logs di dashboard
- Supabase: Check logs di dashboard
- Browser: Check console untuk client-side errors

## 📞 Support

- **Documentation**: README.md
- **Supabase Setup**: SUPABASE_SETUP.md
- **Issues**: GitHub Issues
- **Email**: support@zatiarasjuice.com

---

**Selamat! Website Zatiaras Juice sudah siap untuk production! 🎉**
