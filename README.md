# Zatiaras Juice Web - Website Futuristik 2025

Website futuristik dan canggih untuk Zatiaras Juice, menampilkan menu & harga tiap cabang secara realtime dari database Supabase, dengan optimasi SEO lokal untuk Berau & Samarinda.

## 🚀 Fitur Utama

- **🎨 UI/UX Futuristik 2025** - Design memukau dengan animasi dan micro-interactions
- **📍 Multi-Cabang** - Sistem terpisah untuk Berau & Samarinda
- **🔄 Realtime Data** - Sinkronisasi dengan database Supabase POS
- **🌍 Geolocation UX** - Deteksi lokasi user untuk cabang terdekat
- **🔍 SEO Lokal** - Optimasi untuk ranking Google lokal
- **📱 Responsive** - Mobile-first design dengan performa tinggi
- **⚡ Performance** - Next.js + ISR/SSR untuk kecepatan optimal

## 🛠️ Stack Teknologi

- **Frontend**: Next.js 14+ + TypeScript + Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Icons**: Lucide React
- **Fonts**: Inter + Poppins

## 📦 Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/your-username/zatiaras-juice-web.git
   cd zatiaras-juice-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Setup environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` dengan konfigurasi Supabase Anda:
   ```env
   NEXT_PUBLIC_SUPABASE_URL_BERAU=your_supabase_url_berau
   NEXT_PUBLIC_SUPABASE_ANON_KEY_BERAU=your_supabase_anon_key_berau
   NEXT_PUBLIC_SUPABASE_URL_SAMARINDA=your_supabase_url_samarinda
   NEXT_PUBLIC_SUPABASE_ANON_KEY_SAMARINDA=your_supabase_anon_key_samarinda
   NEXT_PUBLIC_BASE_URL=https://zatiarasjuice.com
   ```

4. **Run development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

5. **Buka browser**
   ```
   http://localhost:3000
   ```

## 🗄️ Database Setup

### Supabase Tables

Buat tabel berikut di Supabase untuk setiap cabang:

```sql
-- Tabel Produk
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

-- Tabel Kategori
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

### Sample Data

```sql
-- Insert sample data untuk Berau
INSERT INTO cabang (id, name, address, phone, whatsapp, latitude, longitude) VALUES
('berau', 'Zatiaras Juice Berau', 'Jl. Ahmad Yani No. 123, Berau, Kalimantan Timur', '+62812-3456-7890', '+62812-3456-7890', -2.1872, 117.3703);

-- Insert sample data untuk Samarinda
INSERT INTO cabang (id, name, address, phone, whatsapp, latitude, longitude) VALUES
('samarinda', 'Zatiaras Juice Samarinda', 'Jl. Sudirman No. 456, Samarinda, Kalimantan Timur', '+62812-3456-7891', '+62812-3456-7891', -0.5021, 117.1536);
```

## 🎨 Design System

### Colors
- **Primary**: Pink (#FF6EC7) - Energi, kreativitas, modern
- **Secondary**: Hijau Alpukat (#A8E6CF) - Segar, alami, sehat
- **Accent**: Kuning (#F59E0B) - Optimis, hangat

### Typography
- **Headings**: Poppins (600, 700, 800)
- **Body**: Inter (400, 500, 600)

### Components
- **Buttons**: Gradient dengan hover effects
- **Cards**: Soft shadows dengan hover animations
- **Forms**: Rounded corners dengan focus states

## 📱 Pages & Routes

- `/` - Homepage dengan geolocation detection
- `/berau` - Cabang Berau
- `/berau/menu` - Menu cabang Berau
- `/samarinda` - Cabang Samarinda
- `/samarinda/menu` - Menu cabang Samarinda
- `/blog` - Artikel SEO lokal
- `/contact` - Kontak & alamat

## 🔧 Configuration

### Next.js Config
```javascript
// next.config.js
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['supabase.co', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  async rewrites() {
    return [
      {
        source: '/api/supabase/:path*',
        destination: 'https://api.supabase.co/:path*',
      },
    ];
  },
};
```

### Tailwind Config
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#FF6EC7',
          // ... other shades
        },
        secondary: {
          500: '#A8E6CF',
          // ... other shades
        },
      },
      // ... other customizations
    },
  },
};
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect repository** ke Vercel
2. **Set environment variables** di Vercel dashboard
3. **Deploy** otomatis dari main branch

### Manual Deployment

```bash
# Build production
npm run build

# Start production server
npm start
```

## 📊 Performance

### Core Web Vitals
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Speed Index**: < 3.0s

### Optimization
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic
- **ISR**: Incremental Static Regeneration
- **CDN**: Vercel Edge Network

## 🔍 SEO

### Local SEO
- **Google My Business** integration
- **Structured Data** (JSON-LD)
- **Local keywords** targeting
- **Rich snippets** untuk menu

### Meta Tags
```html
<title>Zatiaras Juice Berau — Jus Alpukat & Buah Segar Nomor 1 di Berau</title>
<meta name="description" content="Nikmati jus alpukat dan aneka jus segar di Zatiaras Juice Berau. Menu lengkap, harga transparan, order via GoFood/GrabFood/WA.">
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📈 Analytics

### Google Analytics 4
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

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Support

- **Email**: support@zatiarasjuice.com
- **WhatsApp**: +62812-3456-7890
- **Website**: https://zatiarasjuice.com

## 🙏 Acknowledgments

- **Next.js** team untuk framework yang luar biasa
- **Supabase** team untuk backend yang powerful
- **Tailwind CSS** team untuk utility-first CSS
- **Framer Motion** team untuk animasi yang smooth

---

**Dibuat dengan ❤️ untuk Zatiaras Juice - Jus Alpukat & Buah Segar Nomor 1 di Berau & Samarinda**
