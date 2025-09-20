import React, { useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCardMinimal from '../../components/ProductCardMinimal';
import { getBranchSEOData, getMenuStructuredData } from '../../lib/seo';
import { getProducts, getCategories, getBranchInfo } from '../../lib/supabase';
import type { Branch, Product, Category } from '../../lib/supabase';

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
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'popular':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, sortBy, products]);

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

  const handleAddToCart = (product: any) => {
    // Add to cart logic here
    console.log('Added to cart:', product);
  };

  const categoryOptions = [
    { value: 'all', label: 'Semua Menu' },
    ...categories.map(cat => ({ value: cat.name, label: cat.name }))
  ];

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
      </Head>

      <div className="min-h-screen bg-white">
        <Header branch={branch} currentPath={`/${branch}/menu`} />
        
        {/* Menu Header - Digital Menu Style */}
        <section className="pt-16 pb-12 bg-white border-b-2 border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4 font-rounded">
                Menu {branch.charAt(0).toUpperCase() + branch.slice(1)}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed mb-6">
                Jelajahi koleksi lengkap jus segar dan minuman sehat kami
              </p>
              
              {/* Menu Stats - Minimal */}
              <div className="flex justify-center items-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                  <span>{products.length} Menu Tersedia</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pinky-500 rounded-full"></span>
                  <span>Rating 4.9/5</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cute-500 rounded-full"></span>
                  <span>100% Alami</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Menu Navigation - Digital Menu Style */}
        <section className="py-6 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Bar - Menu Focused */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari menu favorit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white"
                />
              </div>

              {/* Category Filter - Menu Categories */}
              <div className="flex flex-wrap gap-2">
                {categoryOptions.map((category) => (
                  <motion.button
                    key={category.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategoryChange(category.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      selectedCategory === category.value
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
                    }`}
                  >
                    {category.label}
                  </motion.button>
                ))}
              </div>

              {/* Sort Dropdown - Menu Sorting */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'popular')}
                  className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-8 text-sm font-semibold focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                >
                  <option value="name">Urutkan: Nama</option>
                  <option value="price">Urutkan: Harga</option>
                  <option value="popular">Urutkan: Populer</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Filter className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Grid - Digital Menu Layout */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProducts.length > 0 ? (
              <>
                {/* Menu Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2 font-rounded">
                    {selectedCategory === 'all' ? 'Semua Menu' : selectedCategory}
                  </h2>
                  <p className="text-gray-600 font-medium">
                    {filteredProducts.length} menu tersedia
                  </p>
                </motion.div>

                {/* Menu Grid - 4 columns desktop, 3 tablet, 2 mobile */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  <AnimatePresence>
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="w-full"
                      >
                        <ProductCardMinimal 
                          product={product} 
                          onAddToCart={handleAddToCart}
                          onToggleFavorite={handleToggleFavorite}
                          isFavorite={favorites.includes(product.id)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 font-rounded">
                  Menu tidak ditemukan
                </h3>
                <p className="text-gray-600 mb-6 font-medium">
                  Coba gunakan kata kunci yang berbeda atau pilih kategori lain
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-all duration-200"
                >
                  Reset Filter
                </motion.button>
              </motion.div>
            )}
          </div>
        </section>

        <Footer branch={branch} />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { branch: 'berau' } },
      { params: { branch: 'samarinda' } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const branch = params?.branch as Branch;

  try {
    // Fetch data from Supabase
    const [products, categories, branchInfo] = await Promise.all([
      getProducts(branch),
      getCategories(branch),
      getBranchInfo(branch)
    ]);

    // Fallback data if Supabase fails
    const fallbackProducts: Product[] = [
      {
        id: 'fallback-1',
        name: 'Jus Alpukat Segar',
        kategori_id: null,
        price: 15000,
        gambar: '/images/juice-placeholder.svg',
        created_at: new Date().toISOString(),
        tipe: 'premium',
        ekstra_ids: null,
        category: 'Jus Alpukat',
        description: 'Jus alpukat segar dengan kualitas terbaik',
        image_url: '/images/juice-placeholder.svg',
        is_featured: true,
        rating: 4.8,
        review_count: 120
      }
    ];

    const fallbackCategories: Category[] = [
      { 
        id: 'fallback-1', 
        name: 'Jus Alpukat',
        description: 'Koleksi Jus Alpukat segar',
        image_url: '/images/juice-placeholder.svg',
        sort_order: 1,
        is_active: true
      }
    ];

    const fallbackBranchInfo = {
      id: 'fallback',
      name: branch.charAt(0).toUpperCase() + branch.slice(1),
      address: `Jl. Contoh No. 123, ${branch.charAt(0).toUpperCase() + branch.slice(1)}`,
      phone: '+62812-3456-7890',
      whatsapp: '+62812-3456-7890',
      latitude: 0,
      longitude: 0,
      is_active: true,
      delivery_radius: 10
    };

    return {
      props: {
        branch,
        products: products.length > 0 ? products : fallbackProducts,
        categories: categories.length > 0 ? categories : fallbackCategories,
        branchInfo: branchInfo || fallbackBranchInfo,
        seoData: getBranchSEOData(branch),
      },
      revalidate: 60, // Revalidate every minute for fresh data
    };
  } catch (error) {
    console.error('Error fetching data from Supabase:', error);
    
    // Return fallback data on error
    const fallbackProducts: Product[] = [
      {
        id: 'error-1',
        name: 'Jus Alpukat Segar',
        kategori_id: null,
        price: 15000,
        gambar: '/images/juice-placeholder.svg',
        created_at: new Date().toISOString(),
        tipe: 'premium',
        ekstra_ids: null,
        category: 'Jus Alpukat',
        description: 'Jus alpukat segar dengan kualitas terbaik',
        image_url: '/images/juice-placeholder.svg',
        is_featured: true,
        rating: 4.8,
        review_count: 120
      }
    ];

    const fallbackCategories: Category[] = [
      { 
        id: 'error-1', 
        name: 'Jus Alpukat',
        description: 'Koleksi Jus Alpukat segar',
        image_url: '/images/juice-placeholder.svg',
        sort_order: 1,
        is_active: true
      }
    ];

    const fallbackBranchInfo = {
      id: 'error',
      name: branch.charAt(0).toUpperCase() + branch.slice(1),
      address: `Jl. Contoh No. 123, ${branch.charAt(0).toUpperCase() + branch.slice(1)}`,
      phone: '+62812-3456-7890',
      whatsapp: '+62812-3456-7890',
      latitude: 0,
      longitude: 0,
      is_active: true,
      delivery_radius: 10
    };

    return {
      props: {
        branch,
        products: fallbackProducts,
        categories: fallbackCategories,
        branchInfo: fallbackBranchInfo,
        seoData: getBranchSEOData(branch),
      },
      revalidate: 60,
    };
  }
};

export default MenuPage;