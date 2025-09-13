# Setup Supabase untuk Zatiaras Juice Web

## 1. Buat Project Supabase

1. Kunjungi [supabase.com](https://supabase.com)
2. Login atau daftar akun
3. Klik "New Project"
4. Pilih organization
5. Isi detail project:
   - **Name**: `zatiaras-juice-berau` (untuk cabang Berau)
   - **Database Password**: Buat password yang kuat
   - **Region**: Pilih region terdekat (Singapore untuk Indonesia)

6. Ulangi langkah 1-5 untuk membuat project kedua:
   - **Name**: `zatiaras-juice-samarinda` (untuk cabang Samarinda)

## 2. Setup Database Tables

### 2.1 Tabel Produk
```sql
-- Jalankan di SQL Editor Supabase untuk setiap project
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

-- Enable RLS (Row Level Security)
ALTER TABLE produk ENABLE ROW LEVEL SECURITY;

-- Create policy untuk public read access
CREATE POLICY "Enable read access for all users" ON produk
FOR SELECT USING (true);
```

### 2.2 Tabel Kategori
```sql
CREATE TABLE kategori (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

ALTER TABLE kategori ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON kategori
FOR SELECT USING (true);
```

### 2.3 Tabel Cabang
```sql
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

ALTER TABLE cabang ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON cabang
FOR SELECT USING (true);
```

## 3. Insert Sample Data

### 3.1 Data Cabang Berau
```sql
-- Jalankan di project Berau
INSERT INTO cabang (id, name, address, phone, whatsapp, latitude, longitude) VALUES
('berau', 'Zatiaras Juice Berau', 'Jl. Ahmad Yani No. 123, Berau, Kalimantan Timur', '+62812-3456-7890', '+62812-3456-7890', -2.1872, 117.3703);

INSERT INTO kategori (name, description, image_url, sort_order) VALUES
('Alpukat', 'Jus alpukat segar dan berkualitas', '/images/category-alpukat.jpg', 1),
('Mangga', 'Jus mangga manis dan segar', '/images/category-mangga.jpg', 2),
('Jeruk', 'Jus jeruk peras segar', '/images/category-jeruk.jpg', 3),
('Musiman', 'Jus buah musiman terbaru', '/images/category-seasonal.jpg', 4);

INSERT INTO produk (name, description, price, category, image_url, is_featured) VALUES
('Jus Alpukat Premium', 'Jus alpukat segar dengan susu dan gula aren', 25000, 'Alpukat', '/images/jus-alpukat.jpg', true),
('Jus Alpukat Susu', 'Jus alpukat dengan susu segar', 22000, 'Alpukat', '/images/jus-alpukat-susu.jpg', false),
('Jus Mangga Segar', 'Jus mangga manis dengan es batu', 20000, 'Mangga', '/images/jus-mangga.jpg', true),
('Jus Jeruk Peras', 'Jus jeruk peras segar tanpa pengawet', 18000, 'Jeruk', '/images/jus-jeruk.jpg', false),
('Jus Strawberry', 'Jus strawberry segar dan manis', 23000, 'Musiman', '/images/jus-strawberry.jpg', true);
```

### 3.2 Data Cabang Samarinda
```sql
-- Jalankan di project Samarinda
INSERT INTO cabang (id, name, address, phone, whatsapp, latitude, longitude) VALUES
('samarinda', 'Zatiaras Juice Samarinda', 'Jl. Sudirman No. 456, Samarinda, Kalimantan Timur', '+62812-3456-7891', '+62812-3456-7891', -0.5021, 117.1536);

INSERT INTO kategori (name, description, image_url, sort_order) VALUES
('Alpukat', 'Jus alpukat segar dan berkualitas', '/images/category-alpukat.jpg', 1),
('Mangga', 'Jus mangga manis dan segar', '/images/category-mangga.jpg', 2),
('Jeruk', 'Jus jeruk peras segar', '/images/category-jeruk.jpg', 3),
('Musiman', 'Jus buah musiman terbaru', '/images/category-seasonal.jpg', 4);

INSERT INTO produk (name, description, price, category, image_url, is_featured) VALUES
('Jus Alpukat Premium', 'Jus alpukat segar dengan susu dan gula aren', 25000, 'Alpukat', '/images/jus-alpukat.jpg', true),
('Jus Alpukat Susu', 'Jus alpukat dengan susu segar', 22000, 'Alpukat', '/images/jus-alpukat-susu.jpg', false),
('Jus Mangga Segar', 'Jus mangga manis dengan es batu', 20000, 'Mangga', '/images/jus-mangga.jpg', true),
('Jus Jeruk Peras', 'Jus jeruk peras segar tanpa pengawet', 18000, 'Jeruk', '/images/jus-jeruk.jpg', false),
('Jus Strawberry', 'Jus strawberry segar dan manis', 23000, 'Musiman', '/images/jus-strawberry.jpg', true);
```

## 4. Setup Environment Variables

### 4.1 Dapatkan API Keys
1. Di setiap project Supabase, buka **Settings** > **API**
2. Copy **Project URL** dan **anon public** key

### 4.2 Update .env.local
```env
# Supabase Configuration - Berau Branch
NEXT_PUBLIC_SUPABASE_URL_BERAU=https://your-project-berau.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY_BERAU=your_anon_key_berau

# Supabase Configuration - Samarinda Branch
NEXT_PUBLIC_SUPABASE_URL_SAMARINDA=https://your-project-samarinda.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY_SAMARINDA=your_anon_key_samarinda

# Base URL
NEXT_PUBLIC_BASE_URL=https://zatiarasjuice.com

# Revalidate Secret Key (untuk webhook)
REVALIDATE_SECRET_KEY=your_secret_key_here
```

## 5. Setup Storage untuk Gambar

### 5.1 Buat Bucket Storage
1. Di setiap project Supabase, buka **Storage**
2. Klik **New Bucket**
3. Nama bucket: `images`
4. Pilih **Public bucket**

### 5.2 Upload Gambar
Upload gambar-gambar berikut ke bucket `images`:
- `jus-alpukat.jpg`
- `jus-mangga.jpg`
- `jus-jeruk.jpg`
- `jus-strawberry.jpg`
- `category-alpukat.jpg`
- `category-mangga.jpg`
- `category-jeruk.jpg`
- `category-seasonal.jpg`

### 5.3 Update Image URLs
Update URL gambar di database dengan format:
```
https://your-project.supabase.co/storage/v1/object/public/images/filename.jpg
```

## 6. Setup Realtime (Optional)

### 6.1 Enable Realtime
1. Di setiap project Supabase, buka **Database** > **Replication**
2. Enable replication untuk tabel `produk` dan `kategori`

### 6.2 Setup Webhook
1. Buat webhook di Supabase untuk trigger revalidate
2. URL webhook: `https://your-domain.com/api/revalidate`
3. Secret key: sama dengan `REVALIDATE_SECRET_KEY`

## 7. Testing

### 7.1 Test Database Connection
```bash
npm run dev
```

Buka browser dan cek:
- `http://localhost:3000` - Homepage
- `http://localhost:3000/berau` - Cabang Berau
- `http://localhost:3000/samarinda` - Cabang Samarinda

### 7.2 Test Realtime
1. Update data di Supabase dashboard
2. Cek apakah website ter-update otomatis

## 8. Production Deployment

### 8.1 Vercel Deployment
1. Push code ke GitHub
2. Connect repository ke Vercel
3. Set environment variables di Vercel dashboard
4. Deploy

### 8.2 Domain Setup
1. Beli domain di provider domain
2. Setup DNS di Vercel
3. Update `NEXT_PUBLIC_BASE_URL` dengan domain production

## 9. Monitoring & Maintenance

### 9.1 Supabase Dashboard
- Monitor database performance
- Check API usage
- Monitor storage usage

### 9.2 Vercel Analytics
- Monitor website performance
- Check Core Web Vitals
- Monitor error rates

## 10. Troubleshooting

### 10.1 Common Issues
- **CORS Error**: Pastikan domain di-allow di Supabase
- **RLS Error**: Pastikan policy sudah dibuat dengan benar
- **Image Error**: Pastikan bucket public dan URL benar

### 10.2 Debug Mode
```bash
# Enable debug mode
NEXT_PUBLIC_DEBUG=true npm run dev
```

## 11. Security Best Practices

### 11.1 Environment Variables
- Jangan commit `.env.local` ke Git
- Gunakan environment variables di production
- Rotate API keys secara berkala

### 11.2 Database Security
- Enable RLS untuk semua tabel
- Buat policy yang tepat
- Monitor API usage

### 11.3 Image Security
- Validasi file upload
- Compress gambar
- Gunakan CDN untuk performa

---

**Catatan**: Pastikan untuk mengganti semua placeholder URL dan key dengan nilai yang sebenarnya sebelum production deployment.
