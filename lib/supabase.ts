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
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_available: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

// Interface untuk Kategori
export interface Category {
  id: string;
  name: string;
  description: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
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
    .select('*')
    .eq('is_available', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
};

// Function untuk mendapatkan produk berdasarkan kategori
export const getProductsByCategory = async (
  branch: Branch,
  category: string
): Promise<Product[]> => {
  const supabase = createSupabaseClient(branch);
  const { data, error } = await supabase
    .from('produk')
    .select('*')
    .eq('category', category)
    .eq('is_available', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }

  return data || [];
};

// Function untuk mendapatkan semua kategori
export const getCategories = async (branch: Branch): Promise<Category[]> => {
  const supabase = createSupabaseClient(branch);
  const { data, error } = await supabase
    .from('kategori')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data || [];
};

// Function untuk mendapatkan info cabang
export const getBranchInfo = async (branch: Branch): Promise<BranchInfo | null> => {
  const supabase = createSupabaseClient(branch);
  const { data, error } = await supabase
    .from('cabang')
    .select('*')
    .eq('is_active', true)
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
