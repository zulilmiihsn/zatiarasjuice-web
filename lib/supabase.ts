import { createClient } from '@supabase/supabase-js';

// Konfigurasi Supabase untuk Multi-Cabang
export const supabaseConfig = {
  berau: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL_BERAU!,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_BERAU!,
  },
  samarinda: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL_SAMARINDA!,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_SAMARINDA!,
  },
};

// Type untuk Branch
export type Branch = 'berau' | 'samarinda';

// Interface untuk Produk
export interface Product {
  id: string;
  name: string;
  kategori_id: string | null;
  price: number;
  gambar: string | null;
  created_at: string | null;
  tipe: string | null;
  ekstra_ids: string[] | null;
  // Computed fields
  category?: string;
  description?: string;
  image_url?: string;
  is_featured?: boolean;
  rating?: number;
  review_count?: number;
  // Price variants for minuman
  price_regular?: number;
  price_large?: number;
  is_minuman?: boolean;
}

// Interface untuk Kategori
export interface Category {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  sort_order?: number;
  is_active?: boolean;
}

// Interface untuk Cabang
export interface BranchInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  is_active: boolean;
  delivery_radius: number;
  // Additional fields for compatibility
  hours?: string;
}

// Function untuk membuat Supabase client berdasarkan cabang
export const createSupabaseClient = (branch: Branch) => {
  const config = supabaseConfig[branch];
  if (!config.url || !config.key) {
    throw new Error(`Supabase configuration missing for branch: ${branch}`);
  }
  return createClient(config.url, config.key);
};

// Function untuk mendapatkan semua produk dari cabang
export const getProducts = async (branch: Branch): Promise<Product[]> => {
  const supabase = createSupabaseClient(branch);
  const { data, error } = await supabase
    .from('produk')
    .select(`
      *,
      kategori: kategori_id (
        id,
        name
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  // Transform data to match expected interface
  const transformedData = (data || []).map((product: any) => {
    const isMinuman = product.tipe === 'minuman';
    const basePrice = product.price;
    
    return {
      ...product,
      category: product.kategori?.name || 'Lainnya',
      description: product.tipe || 'Jus segar berkualitas tinggi',
      // Keep original gambar field, let ProductCard handle fallback
      is_featured: product.tipe === 'premium' || product.tipe === 'favorit',
      rating: 4.5, // Default rating
      review_count: Math.floor(Math.random() * 50) + 10, // Random review count
      // Price variants for minuman
      is_minuman: isMinuman,
      price_regular: isMinuman ? basePrice : basePrice,
      price_large: isMinuman ? basePrice + 3000 : basePrice,
    };
  });

  return transformedData;
};

// Function untuk mendapatkan produk berdasarkan kategori
export const getProductsByCategory = async (
  branch: Branch,
  category: string
): Promise<Product[]> => {
  const supabase = createSupabaseClient(branch);
  const { data, error } = await supabase
    .from('produk')
    .select(`
      *,
      kategori: kategori_id (
        id,
        name
      )
    `)
    .eq('kategori.name', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }

  // Transform data to match expected interface
  const transformedData = (data || []).map((product: any) => {
    const isMinuman = product.tipe === 'minuman';
    const basePrice = product.price;
    
    return {
      ...product,
      category: product.kategori?.name || 'Lainnya',
      description: product.tipe || 'Jus segar berkualitas tinggi',
      // Keep original gambar field, let ProductCard handle fallback
      is_featured: product.tipe === 'premium' || product.tipe === 'favorit',
      rating: 4.5, // Default rating
      review_count: Math.floor(Math.random() * 50) + 10, // Random review count
      // Price variants for minuman
      is_minuman: isMinuman,
      price_regular: isMinuman ? basePrice : basePrice,
      price_large: isMinuman ? basePrice + 3000 : basePrice,
    };
  });

  return transformedData;
};

// Function untuk mendapatkan semua kategori
export const getCategories = async (branch: Branch): Promise<Category[]> => {
  const supabase = createSupabaseClient(branch);
  const { data, error } = await supabase
    .from('kategori')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  // Transform data to match expected interface
  const transformedData = (data || []).map((category: any) => ({
    ...category,
    description: category.description || `Koleksi ${category.name} segar`,
    image_url: category.image_url || '/images/juice-placeholder.svg',
    sort_order: category.sort_order || 0,
    is_active: category.is_active !== false, // Default to true
  }));

  return transformedData;
};

// Function untuk mendapatkan info cabang
export const getBranchInfo = async (branch: Branch): Promise<BranchInfo | null> => {
  const supabase = createSupabaseClient(branch);
  const { data, error } = await supabase
    .from('cabang')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching branch info:', error);
    return null;
  }

  return data;
};

// Function untuk menghitung jarak antara dua koordinat (Haversine formula)
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius bumi dalam kilometer
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Function untuk mendapatkan cabang terdekat berdasarkan koordinat
export const getNearestBranch = async (
  userLat: number,
  userLon: number
): Promise<Branch | null> => {
  try {
    const berauInfo = await getBranchInfo('berau');
    const samarindaInfo = await getBranchInfo('samarinda');

    if (!berauInfo || !samarindaInfo) return null;

    const berauDistance = calculateDistance(
      userLat, userLon,
      berauInfo.latitude, berauInfo.longitude
    );
    
    const samarindaDistance = calculateDistance(
      userLat, userLon,
      samarindaInfo.latitude, samarindaInfo.longitude
    );

    return berauDistance < samarindaDistance ? 'berau' : 'samarinda';
  } catch (error) {
    console.error('Error getting nearest branch:', error);
    return null;
  }
};
