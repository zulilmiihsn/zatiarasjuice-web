# Zatiaras Juice Web - Spesifikasi Lengkap

## 1. Tujuan Web

### 1.1 Branding & Positioning
- **Brand Identity**: Zatiaras Juice sebagai "Jus Alpukat & Buah Segar Nomor 1 di Kota"
- **Target Market**: Berau & Samarinda, Kalimantan Timur
- **Value Proposition**: Kesegaran, kualitas, dan pelayanan terbaik
- **Brand Colors**: Pink (#FF6EC7) & Hijau Alpukat (#A8E6CF)

### 1.2 Tujuan Utama
1. **Branding**: Memperkuat identitas Zatiaras Juice sebagai leader di industri jus segar
2. **Visual Impact**: Website futuristik 2025 yang memukau dan non-mainstream
3. **Realtime Data**: Menampilkan menu & harga per cabang secara realtime dari Supabase POS
4. **Multi-Cabang**: Sistem terpisah untuk Berau & Samarinda
5. **SEO Lokal**: Optimasi untuk ranking Google lokal di Berau & Samarinda
6. **UX Lokasi**: Pengalaman berbasis geolocation user
7. **Order Integration**: CTA langsung ke WhatsApp, GoFood, GrabFood
8. **Performance**: Responsif, cepat, SEO-friendly dengan Next.js + ISR/SSR

## 2. Stack Teknologi

### 2.1 Frontend
- **Framework**: Next.js 14+ dengan App Router
- **Language**: TypeScript untuk type safety
- **Styling**: Tailwind CSS + CSS Variables
- **Animations**: Framer Motion untuk micro-interactions
- **Icons**: Lucide React
- **Fonts**: Inter (body) + Poppins (headings)

### 2.2 Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Real-time**: Supabase Realtime untuk sinkronisasi POS
- **Storage**: Supabase Storage untuk gambar
- **Auth**: Supabase Auth (jika diperlukan)

### 2.3 Deployment & Hosting
- **Hosting**: Vercel (optimized untuk Next.js)
- **CDN**: Vercel Edge Network
- **Domain**: Custom domain dengan SSL
- **Analytics**: Google Analytics 4

### 2.4 SEO & Marketing
- **SEO**: Next.js built-in SEO + custom meta tags
- **Structured Data**: JSON-LD untuk LocalBusiness + Menu
- **Sitemap**: Auto-generated sitemap.xml
- **Social**: Open Graph + Twitter Cards

## 3. Multi-Cabang & Database Flow

### 3.1 Database Structure
```sql
-- Tabel Produk (per cabang)
CREATE TABLE produk (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  category VARCHAR(100) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabel Kategori (per cabang)
CREATE TABLE kategori (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- Tabel Cabang
CREATE TABLE cabang (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(20) NOT NULL,
  whatsapp VARCHAR(20) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  delivery_radius INTEGER DEFAULT 10
);
```

### 3.2 Environment Variables
```env
# Supabase Berau
NEXT_PUBLIC_SUPABASE_URL_BERAU=your_supabase_url_berau
NEXT_PUBLIC_SUPABASE_ANON_KEY_BERAU=your_supabase_anon_key_berau

# Supabase Samarinda
NEXT_PUBLIC_SUPABASE_URL_SAMARINDA=your_supabase_url_samarinda
NEXT_PUBLIC_SUPABASE_ANON_KEY_SAMARINDA=your_supabase_anon_key_samarinda

# Base URL
NEXT_PUBLIC_BASE_URL=https://zatiarasjuice.com
```

### 3.3 Realtime Sync Flow
1. **POS Update** → Supabase Database
2. **Supabase Webhook** → `/api/revalidate` endpoint
3. **ISR Revalidate** → Update halaman menu
4. **User sees** → Data terbaru dalam hitungan detik

## 4. Struktur Project & Files

```
zatiaras-juice-web/
├── pages/
│   ├── _app.tsx              # App wrapper + global styles
│   ├── index.tsx             # Homepage + geolocation redirect
│   ├── [branch]/
│   │   ├── index.tsx         # Cabang landing page
│   │   ├── menu.tsx          # Menu & kategori per cabang
│   │   ├── about.tsx         # Tentang cabang
│   │   └── contact.tsx       # Kontak & alamat cabang
│   ├── blog.tsx              # Artikel SEO & konten lokal
│   └── api/
│       └── revalidate.ts     # Endpoint revalidate ISR
├── components/
│   ├── Header.tsx            # Navigation + branch selector
│   ├── Footer.tsx            # Footer + social links
│   ├── ProductCard.tsx       # Card produk dengan animasi
│   ├── HeroBanner.tsx        # Hero slider dengan autoplay
│   ├── CTAButton.tsx         # Reusable CTA buttons
│   ├── MenuFilter.tsx        # Filter kategori menu
│   └── ScrollAnimationSection.tsx # Scroll-triggered animations
├── lib/
│   ├── supabase.ts           # Multi-cabang client config
│   ├── geolocation.ts        # Geolocation utilities
│   └── seo.ts                # SEO & structured data
├── styles/
│   └── globals.css           # Tailwind + custom vars + animasi
├── public/
│   ├── images/               # Hero images, menu images
│   ├── icons/                # Favicon, app icons
│   └── manifest.json         # PWA manifest
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind + custom theme
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies
└── specification.md          # Dokumentasi lengkap
```

## 5. UX/UI Futuristik 2025

### 5.1 Design System
- **Primary Color**: Pink (#FF6EC7) - Energi, kreativitas, modern
- **Secondary Color**: Hijau Alpukat (#A8E6CF) - Segar, alami, sehat
- **Accent Color**: Kuning (#F59E0B) - Optimis, hangat
- **Typography**: Inter (body) + Poppins (headings)
- **Shadows**: Soft, medium, strong, glow effects
- **Border Radius**: 12px, 16px, 20px, 24px

### 5.2 Hero Section
- **Full-screen slider** dengan 3 slide utama
- **Parallax background** dengan video/animation
- **Auto-play** dengan pause/play controls
- **Smooth transitions** antar slide
- **CTA buttons** dengan hover effects
- **Scroll indicator** untuk guidance

### 5.3 Product Cards
- **3D perspective** hover effects
- **Card flip** untuk detail info
- **Gradient shadows** untuk depth
- **Micro-interactions** pada hover
- **Quick order** buttons (WhatsApp, GoFood)
- **Favorite toggle** dengan animation

### 5.4 Animations & Interactions
- **Scroll-triggered** fade-in animations
- **Hover effects** dengan scale & glow
- **Loading states** dengan skeleton screens
- **Smooth transitions** antar halaman
- **Micro-interactions** pada buttons
- **Parallax scrolling** untuk depth

### 5.5 Responsive Design
- **Mobile-first** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly** buttons (min 44px)
- **Swipe gestures** untuk mobile
- **Lazy loading** untuk performa

## 6. Geolocation UX Flow

### 6.1 Location Detection
1. **Browser Geolocation** → Request permission
2. **IP Fallback** → Jika geolocation ditolak
3. **Distance Calculation** → Haversine formula
4. **Nearest Branch** → Auto-suggest/redirect
5. **Manual Override** → User bisa pilih cabang lain

### 6.2 UX Flow
```
Homepage Load
    ↓
Request Geolocation Permission
    ↓
Success? → Calculate Distance → Suggest Nearest Branch
    ↓
Failed? → IP-based Location → Suggest Nearest Branch
    ↓
User Action: Accept/Override
    ↓
Redirect to Branch Page
```

### 6.3 Implementation
- **Browser API**: navigator.geolocation
- **IP Service**: ipapi.co untuk fallback
- **Distance**: Haversine formula
- **Caching**: LocalStorage untuk performance

## 7. SEO & Structured Data

### 7.1 Meta Tags
```html
<title>Zatiaras Juice Berau — Jus Alpukat & Buah Segar Nomor 1 di Berau</title>
<meta name="description" content="Nikmati jus alpukat dan aneka jus segar di Zatiaras Juice Berau. Menu lengkap, harga transparan, order via GoFood/GrabFood/WA.">
<meta name="keywords" content="jus alpukat berau, jus segar berau, zatiaras juice berau">
```

### 7.2 Structured Data (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Zatiaras Juice Berau",
  "image": "https://zatiarasjuice.com/images/berau-hero.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Ahmad Yani No. 123",
    "addressLocality": "Berau",
    "addressRegion": "Kalimantan Timur",
    "addressCountry": "ID"
  },
  "telephone": "+62812-3456-7890",
  "hasMenu": {
    "@type": "Menu",
    "url": "https://zatiarasjuice.com/berau/menu"
  }
}
```

### 7.3 Local SEO Strategy
- **Google My Business** optimization
- **Local keywords** targeting
- **Rich snippets** untuk menu & harga
- **Structured data** untuk LocalBusiness
- **Local content** di blog section

## 8. Marketing & Social Media Integration

### 8.1 Social Media
- **Instagram**: Feed integration, story highlights
- **TikTok**: Video content showcase
- **Facebook**: Reviews & ratings
- **WhatsApp**: Direct ordering

### 8.2 Delivery Partners
- **GoFood**: Deep linking ke merchant page
- **GrabFood**: Deep linking ke restaurant page
- **WhatsApp**: Direct message dengan template

### 8.3 Content Strategy
- **Blog**: Artikel SEO lokal
- **Menu**: Highlight produk musiman
- **Promo**: Banner promosi cabang
- **Reviews**: Testimoni customer

## 9. Performance & Optimization

### 9.1 Next.js Features
- **ISR**: Incremental Static Regeneration
- **SSR**: Server-Side Rendering untuk SEO
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic code splitting
- **Prefetching**: Link prefetching

### 9.2 Performance Targets
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)
- **Speed Index**: < 3.0s
- **Lighthouse Score**: > 90

### 9.3 Optimization Strategies
- **Image Optimization**: WebP format, lazy loading
- **Font Loading**: Preload critical fonts
- **Bundle Analysis**: Webpack bundle analyzer
- **Caching**: Vercel Edge caching
- **CDN**: Global content delivery

## 10. Security & Best Practices

### 10.1 Security
- **HTTPS**: SSL certificate
- **HSTS**: HTTP Strict Transport Security
- **CSP**: Content Security Policy
- **Supabase RLS**: Row Level Security

### 10.2 Best Practices
- **TypeScript**: Type safety
- **ESLint**: Code quality
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **Conventional Commits**: Commit messages

## 11. Deployment & CI/CD

### 11.1 Deployment
- **Vercel**: Automatic deployment
- **Environment**: Production, staging
- **Domain**: Custom domain setup
- **SSL**: Automatic SSL certificate

### 11.2 CI/CD Pipeline
- **GitHub Actions**: Automated testing
- **Vercel**: Automatic deployment
- **Preview**: Branch previews
- **Rollback**: Easy rollback capability

## 12. Monitoring & Analytics

### 12.1 Analytics
- **Google Analytics 4**: User behavior
- **Vercel Analytics**: Performance metrics
- **Supabase**: Database monitoring
- **Error Tracking**: Sentry integration

### 12.2 Monitoring
- **Uptime**: Service availability
- **Performance**: Core Web Vitals
- **Errors**: Error tracking & alerting
- **User Feedback**: Feedback collection

## 13. Future Enhancements

### 13.1 Phase 2 Features
- **PWA**: Progressive Web App
- **Push Notifications**: Promo notifications
- **Loyalty Program**: Points & rewards
- **Online Ordering**: Full e-commerce

### 13.2 Phase 3 Features
- **Mobile App**: Native mobile app
- **AR Menu**: Augmented Reality menu
- **AI Chatbot**: Customer support
- **Multi-language**: English support

## 14. Maintenance & Updates

### 14.1 Regular Updates
- **Dependencies**: Monthly updates
- **Content**: Weekly menu updates
- **Images**: Seasonal updates
- **SEO**: Monthly optimization

### 14.2 Backup & Recovery
- **Database**: Daily backups
- **Images**: CDN backup
- **Code**: Git repository
- **Disaster Recovery**: 24/7 support

---

## Kesimpulan

Website Zatiaras Juice ini dirancang untuk menjadi **showcase futuristik 2025** yang memukau, dengan fokus pada:

1. **Branding kuat** sebagai leader jus segar
2. **UX berbasis lokasi** yang personal
3. **Realtime data** dari POS system
4. **SEO lokal** yang optimal
5. **Performance tinggi** dengan Next.js
6. **Visual impact** yang memukau

Dengan implementasi yang tepat, website ini akan menjadi **digital flagship** Zatiaras Juice yang mendukung pertumbuhan bisnis dan memperkuat brand presence di Berau & Samarinda.
