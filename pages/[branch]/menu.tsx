import React, { useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, Clock, MapPin, Phone, Heart, ShoppingCart, Plus, Minus } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import { getProducts, getCategories, getBranchInfo, createSupabaseClient } from '../../lib/supabase';
import { getBranchSEOData, getMenuStructuredData } from '../../lib/seo';
import { Branch, Product, Category } from '../../lib/supabase';

interface MenuPageProps {
  branch: Branch;
  products: Product[];
  categories: Category[];
  branchInfo: any;
  seoData: any;
}

const MenuPage: React.FC<MenuPageProps> = ({ 
  branch, 
  products, 
  categories, 
  branchInfo, 
  seoData 
}) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'popular'>('name');

  // Filter and sort products
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'popular':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, products, sortBy]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = async (product: any) => {
    console.log('Adding to cart:', product);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Prepare categories for filter
  const categoriesWithCount = categories.map(category => ({
    id: category.name,
    name: category.name,
    count: products.filter(product => product.category === category.name).length,
  }));

  const featuredProducts = products.filter(product => product.is_featured);

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords.join(', ')} />
        <link rel="canonical" href={seoData.canonical} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoData.openGraph.title} />
        <meta property="og:description" content={seoData.openGraph.description} />
        <meta property="og:image" content={seoData.openGraph.image} />
        <meta property="og:url" content={seoData.openGraph.url} />
        <meta property="og:type" content={seoData.openGraph.type} />
        
        {/* Twitter */}
        <meta name="twitter:card" content={seoData.twitter.card} />
        <meta name="twitter:title" content={seoData.twitter.title} />
        <meta name="twitter:description" content={seoData.twitter.description} />
        <meta name="twitter:image" content={seoData.twitter.image} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seoData.structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getMenuStructuredData(branch, products)) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header branch={branch} currentPath={`/${branch}/menu`} />
        
        {/* Digital Menu Header */}
        <section className="pt-20 pb-12 bg-gradient-to-r from-primary-500 via-pink-500 to-secondary-500 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-20 w-16 h-16 bg-white/5 rounded-full animate-bounce"></div>
            <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-1/3 w-8 h-8 bg-white/5 rounded-full animate-bounce"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                Menu Digital
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-light">
                Nikmati kesegaran jus alpukat dan aneka jus buah segar berkualitas tinggi
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <div className="text-3xl font-bold mb-2">{products.length}+</div>
                  <div className="text-white/80">Menu Tersedia</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <div className="text-3xl font-bold mb-2">{categories.length}</div>
                  <div className="text-white/80">Kategori</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-white/80">Alami</div>
                </motion.div>
              </div>

              {/* Quick Order Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/${branchInfo?.whatsapp?.replace(/\D/g, '') || '6281234567890'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Order via WhatsApp
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://gofood.co.id/merchant/zatiaras-juice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MapPin className="w-5 h-5" />
                  Order via GoFood
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <section className="py-6 bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari menu favorit Anda..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/90 backdrop-blur-sm"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Filter & Sort Controls */}
              <div className="flex gap-3">
                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="appearance-none bg-white/90 backdrop-blur-sm border border-gray-300 rounded-2xl px-4 py-3 pr-8 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 min-w-[150px]"
                  >
                    <option value="all">Semua Kategori</option>
                    {categoriesWithCount.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                  <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Sort Options */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'popular')}
                    className="appearance-none bg-white/90 backdrop-blur-sm border border-gray-300 rounded-2xl px-4 py-3 pr-8 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 min-w-[120px]"
                  >
                    <option value="name">Nama A-Z</option>
                    <option value="price">Harga</option>
                    <option value="popular">Populer</option>
                  </select>
                  <Star className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        {featuredProducts.length > 0 && (
          <section className="py-16 bg-gradient-to-r from-pink-50 to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                  ⭐ Menu Favorit
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Pilihan terbaik dari menu Zatiaras Juice yang paling diminati
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                {featuredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <ProductCard 
                      product={product} 
                      onAddToCart={handleAddToCart}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={favorites.includes(product.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Products Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                🍹 Semua Menu
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Koleksi lengkap menu Zatiaras Juice untuk memenuhi selera Anda
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {filteredProducts.length > 0 ? (
                <motion.div
                  key="products"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4"
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                    >
                      <ProductCard 
                        product={product} 
                        onAddToCart={handleAddToCart}
                        onToggleFavorite={handleToggleFavorite}
                        isFavorite={favorites.includes(product.id)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-16"
                >
                  <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                    <Search className="w-16 h-16 text-pink-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Tidak ada produk ditemukan
                  </h3>
                  <p className="text-gray-600 mb-8 text-lg">
                    Coba ubah kata kunci pencarian atau pilih kategori lain
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-xl transition-all duration-300"
                  >
                    Reset Filter
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-500 via-pink-500 to-secondary-500 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-bounce"></div>
            <div className="absolute bottom-10 left-1/4 w-20 h-20 bg-white/5 rounded-full animate-pulse"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Siap Memesan?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Order sekarang dan nikmati kesegaran jus buah segar langsung di rumah Anda
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/${branchInfo?.whatsapp?.replace(/\D/g, '') || '6281234567890'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-900 px-10 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Phone className="w-6 h-6" />
                  Order via WhatsApp
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://gofood.co.id/merchant/zatiaras-juice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <MapPin className="w-6 h-6" />
                  Order via GoFood
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer branch={branch} />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { branch: 'berau' } },
    { params: { branch: 'samarinda' } },
  ];

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const branch = params?.branch as Branch;

  if (!branch || !['berau', 'samarinda'].includes(branch)) {
    return {
      notFound: true,
    };
  }

  try {
    // Fetch data from Supabase
    const [products, categories, branchInfo] = await Promise.all([
      getProducts(branch),
      getCategories(branch),
      getBranchInfo(branch),
    ]);

    const seoData = getBranchSEOData(branch);

    return {
      props: {
        branch,
        products,
        categories,
        branchInfo,
        seoData,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    
    // Return mock data if Supabase is not available
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Jus Alpukat Premium',
        description: 'Jus alpukat segar dengan susu dan gula aren',
        price: 25000,
        category: 'Alpukat',
        image_url: '/images/jus-alpukat.jpg',
        is_available: true,
        is_featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Jus Mangga Segar',
        description: 'Jus mangga manis dengan es batu',
        price: 20000,
        category: 'Mangga',
        image_url: '/images/jus-mangga.jpg',
        is_available: true,
        is_featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Jus Jeruk Peras',
        description: 'Jus jeruk peras segar tanpa pengawet',
        price: 18000,
        category: 'Jeruk',
        image_url: '/images/jus-jeruk.jpg',
        is_available: true,
        is_featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    const mockCategories: Category[] = [
      {
        id: '1',
        name: 'Alpukat',
        description: 'Jus alpukat segar dan berkualitas',
        image_url: '/images/category-alpukat.jpg',
        sort_order: 1,
        is_active: true,
      },
      {
        id: '2',
        name: 'Mangga',
        description: 'Jus mangga manis dan segar',
        image_url: '/images/category-mangga.jpg',
        sort_order: 2,
        is_active: true,
      },
      {
        id: '3',
        name: 'Jeruk',
        description: 'Jus jeruk peras segar',
        image_url: '/images/category-jeruk.jpg',
        sort_order: 3,
        is_active: true,
      },
    ];

    const mockBranchInfo = {
      id: branch,
      name: `Zatiaras Juice ${branch.charAt(0).toUpperCase() + branch.slice(1)}`,
      address: branch === 'berau' 
        ? 'Jl. Ahmad Yani No. 123, Berau, Kalimantan Timur'
        : 'Jl. Sudirman No. 456, Samarinda, Kalimantan Timur',
      phone: branch === 'berau' ? '+62812-3456-7890' : '+62812-3456-7891',
      whatsapp: branch === 'berau' ? '+62812-3456-7890' : '+62812-3456-7891',
      latitude: branch === 'berau' ? -2.1872 : -0.5021,
      longitude: branch === 'berau' ? 117.3703 : 117.1536,
      is_active: true,
      delivery_radius: 10,
    };

    const seoData = getBranchSEOData(branch);

    return {
      props: {
        branch,
        products: mockProducts,
        categories: mockCategories,
        branchInfo: mockBranchInfo,
        seoData,
      },
      revalidate: 3600,
    };
  }
};

export default MenuPage;