import React, { useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid3X3, List } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
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
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

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

  // Define category priority order for filter buttons
  const categoryPriority = [
    'Jus Buah & Sayur',
    'Rekomendasi Mix Jus',
    'Kocok',
    'Baby',
    'Non-Jus',
    'Teh',
    'Cemilan'
  ];

  // Sort categories by priority, then alphabetically for others
  const sortedCategories = categories.sort((a, b) => {
    const aIndex = categoryPriority.indexOf(a.name);
    const bIndex = categoryPriority.indexOf(b.name);
    
    // If both categories are in priority list, sort by priority
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    // If only a is in priority list, a comes first
    if (aIndex !== -1) {
      return -1;
    }
    // If only b is in priority list, b comes first
    if (bIndex !== -1) {
      return 1;
    }
    // If neither is in priority list, sort alphabetically
    return a.name.localeCompare(b.name);
  });

  const categoryOptions = [
    { value: 'all', label: 'Semua Menu' },
    ...sortedCategories.map(cat => ({ value: cat.name, label: cat.name }))
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

      <div className="min-h-screen bg-white overflow-x-hidden">
        <Header branch={branch} currentPath={`/${branch}/menu`} />
        
        {/* Menu Header - Premium Digital Menu Style */}
        <section className="pt-16 pb-4 sm:pb-8 md:pb-12 bg-gradient-to-br from-white via-gray-50 to-white border-b-2 border-gray-100 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Main Gradient Orbs */}
            <motion.div
              className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-primary-500/20 to-pinky-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
                x: [0, 20, 0],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-secondary-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3],
                x: [0, -20, 0],
                y: [0, 15, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Floating Menu Icons */}
            {['🍹', '🥤', '🍓', '🥭', '🍊', '🍇', '🥑', '🍌'].map((icon, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl opacity-10"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                  scale: [0.7, 1.1, 0.7],
                }}
                transition={{
                  duration: 6 + Math.random() * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3,
                }}
              >
                {icon}
              </motion.div>
            ))}
            
            {/* Subtle Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 30% 30%, #FF6EC7 1px, transparent 1px),
                                 radial-gradient(circle at 70% 70%, #22c55e 1px, transparent 1px)`,
                backgroundSize: '60px 60px, 80px 80px',
                backgroundPosition: '0 0, 30px 30px'
              }} />
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-full relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-2 sm:mb-3 md:mb-4 font-rounded">
                Menu {branch.charAt(0).toUpperCase() + branch.slice(1)}
              </h1>
              
              {/* Description - Hidden on Mobile */}
              <p className="hidden sm:block text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed mb-4 md:mb-6">
                Jelajahi koleksi lengkap jus segar dan minuman sehat kami
              </p>
              
              {/* Menu Stats - Hidden on Mobile */}
              <div className="hidden sm:flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></span>
                  <span className="whitespace-nowrap">{products.length} Menu</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pinky-500 rounded-full flex-shrink-0"></span>
                  <span className="whitespace-nowrap">Rating 4.9/5</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cute-500 rounded-full flex-shrink-0"></span>
                  <span className="whitespace-nowrap">100% Alami</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Menu Navigation - Responsive Layout */}
        <section className="py-2 sm:py-3 md:py-4 bg-white border-b border-gray-200 overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search Bar - Centered */}
            <div className="mb-2 sm:mb-4 md:mb-6">
              <div className="relative max-w-sm sm:max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Cari menu favorit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white text-sm"
                />
              </div>
            </div>

            {/* Filter Controls - Responsive Layout */}
            <div className="space-y-2 sm:space-y-4 md:space-y-6">
              {/* Category Filter - Horizontal Scroll on Mobile, Wrap on Desktop */}
              <div className="overflow-x-auto pb-1 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                <div className="flex gap-2 md:gap-3 min-w-max md:flex-wrap md:justify-center md:min-w-0">
                  {categoryOptions.map((category) => (
                    <motion.button
                      key={category.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCategoryChange(category.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                        selectedCategory === category.value
                          ? 'bg-primary-500 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-primary-50'
                      }`}
                    >
                      {category.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Controls Group - Desktop Layout */}
              <div className="hidden md:flex items-center justify-center gap-8">
                {/* View Mode Toggle */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500">Tampilan:</span>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setViewMode('list')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        viewMode === 'list'
                          ? 'bg-white text-primary-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <List className="w-4 h-4" />
                      <span>List</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setViewMode('grid')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        viewMode === 'grid'
                          ? 'bg-white text-primary-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                      <span>Grid</span>
                    </motion.button>
                  </div>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'popular')}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 min-w-[140px]"
                  >
                    <option value="name">Nama</option>
                    <option value="price">Harga</option>
                    <option value="popular">Populer</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Filter className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Mobile Controls - Stacked Layout */}
              <div className="md:hidden space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Tampilan:</span>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setViewMode('list')}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        viewMode === 'list'
                          ? 'bg-white text-primary-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <List className="w-4 h-4" />
                      <span>List</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setViewMode('grid')}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        viewMode === 'grid'
                          ? 'bg-white text-primary-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                      <span>Grid</span>
                    </motion.button>
                  </div>
                </div>
                
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'popular')}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 w-full"
                  >
                    <option value="name">Nama</option>
                    <option value="price">Harga</option>
                    <option value="popular">Populer</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Filter className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Display - Premium Interactive Layout */}
        <section className="py-2 sm:py-4 md:py-6 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Main Gradient Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-500/15 to-pinky-500/15 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/15 to-secondary-500/15 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3],
                x: [0, -25, 0],
                y: [0, 25, 0],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Floating Food Icons */}
            {['🍹', '🥤', '🍓', '🥭', '🍊', '🍇', '🥑', '🍌', '🍎', '🍑', '🥝', '🍍'].map((icon, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl opacity-8"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 15, -15, 0],
                  scale: [0.6, 1.2, 0.6],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.4,
                }}
              >
                {icon}
              </motion.div>
            ))}
            
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(45deg, #FF6EC7 1px, transparent 1px),
                                 linear-gradient(-45deg, #22c55e 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                backgroundPosition: '0 0, 20px 20px'
              }} />
            </div>
            
            {/* Animated Particles */}
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-primary-500/30 to-pinky-500/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -50, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-full relative z-10">
            {filteredProducts.length > 0 ? (
              <>
                {/* Menu Section Header - Mobile Compact */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-2 sm:mb-4 md:mb-6"
                >
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-gray-900 mb-0.5 sm:mb-1 font-rounded">
                    {selectedCategory === 'all' ? 'Semua Menu' : selectedCategory}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">
                    {filteredProducts.length} menu tersedia
                  </p>
                </motion.div>

                {/* List View - Compact */}
                {viewMode === 'list' ? (
                  <div className="space-y-1">
                    {(() => {
                      // Group products by category if not sorting by price and no specific category filter
                      if (sortBy !== 'price' && selectedCategory === 'all') {
                        const groupedProducts = filteredProducts.reduce((acc, product) => {
                          const category = product.category || 'Lainnya';
                          if (!acc[category]) {
                            acc[category] = [];
                          }
                          acc[category].push(product);
                          return acc;
                        }, {} as Record<string, Product[]>);

                        // Define category priority order
                        const categoryPriority = [
                          'Jus Buah & Sayur',
                          'Rekomendasi Mix Jus',
                          'Kocok',
                          'Baby',
                          'Non-Jus',
                          'Teh',
                          'Cemilan'
                        ];

                        // Sort categories by priority, then alphabetically for others
                        const sortedCategories = Object.keys(groupedProducts).sort((a, b) => {
                          const aIndex = categoryPriority.indexOf(a);
                          const bIndex = categoryPriority.indexOf(b);
                          
                          // If both categories are in priority list, sort by priority
                          if (aIndex !== -1 && bIndex !== -1) {
                            return aIndex - bIndex;
                          }
                          // If only a is in priority list, a comes first
                          if (aIndex !== -1) {
                            return -1;
                          }
                          // If only b is in priority list, b comes first
                          if (bIndex !== -1) {
                            return 1;
                          }
                          // If neither is in priority list, sort alphabetically
                          return a.localeCompare(b);
                        });

                        return (
                          <AnimatePresence>
                            {sortedCategories.map((category, categoryIndex) => {
                              const products = groupedProducts[category];
                              return (
                              <div key={category} className="space-y-1">
                                {/* Category Subtitle */}
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
                                  className="sticky top-0 bg-white py-2 z-10"
                                >
                                  <h3 className="text-base font-black text-gray-800 font-display border-b-2 border-primary-200 pb-2" style={{ fontWeight: 900 }}>
                                    {category}
                                  </h3>
                                </motion.div>
                                
                                {/* Products in Category - Mobile Optimized */}
                                {products.map((product, index) => (
                                  <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (index * 0.02) }}
                                    className="bg-white rounded-lg border border-gray-200 hover:border-primary-200 hover:shadow-sm transition-all duration-200 px-3 py-2.5 sm:py-2 w-full"
                                  >
                                    <div className="flex items-center justify-between gap-2 w-full">
                                      {/* Product Name */}
                                      <div className="flex-1 min-w-0 overflow-hidden">
                                        <h3 className="text-sm font-semibold text-gray-900 font-display truncate">
                                          {product.name}
                                        </h3>
                                      </div>
                                      
                                      {/* Price - Mobile Responsive */}
                                      <div className="text-right flex-shrink-0 max-w-[40%]">
                                        {product.is_minuman ? (
                                          <div className="text-right">
                                            <div className="text-xs sm:text-sm font-bold text-primary-600 font-display truncate">
                                              Regular: Rp {(product.price_regular || product.price).toLocaleString('id-ID')}
                                            </div>
                                            <div className="text-xs text-gray-600 truncate">
                                              Large: Rp {(product.price_large || product.price).toLocaleString('id-ID')}
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="text-xs sm:text-sm font-bold text-primary-600 font-display truncate">
                                            Rp {product.price.toLocaleString('id-ID')}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            );
                            })}
                          </AnimatePresence>
                        );
                      } else {
                        // Show all products without grouping (price sort or specific category filter)
                        return (
                          <AnimatePresence>
                            {filteredProducts.map((product, index) => (
                              <motion.div
                                key={product.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3, delay: index * 0.02 }}
                                className="bg-white rounded-lg border border-gray-200 hover:border-primary-200 hover:shadow-sm transition-all duration-200 px-3 py-2 w-full"
                              >
                                <div className="flex items-center justify-between gap-2 w-full">
                                  {/* Product Name */}
                                  <div className="flex-1 min-w-0 overflow-hidden">
                                    <h3 className="text-sm font-semibold text-gray-900 font-display truncate">
                                      {product.name}
                                    </h3>
                                  </div>
                                  
                                  {/* Price - Mobile Responsive */}
                                  <div className="text-right flex-shrink-0 max-w-[40%]">
                                    {product.is_minuman ? (
                                      <div className="text-right">
                                        <div className="text-xs sm:text-sm font-bold text-primary-600 font-display truncate">
                                          Regular: Rp {(product.price_regular || product.price).toLocaleString('id-ID')}
                                        </div>
                                        <div className="text-xs text-gray-600 truncate">
                                          Large: Rp {(product.price_large || product.price).toLocaleString('id-ID')}
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="text-xs sm:text-sm font-bold text-primary-600 font-display truncate">
                                        Rp {product.price.toLocaleString('id-ID')}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        );
                      }
                    })()}
                  </div>
                ) : (
                  /* Grid View - 4 columns desktop, 3 tablet, 2 mobile */
                  <div className="space-y-6">
                    {(() => {
                      // Group products by category if not sorting by price and no specific category filter
                      if (sortBy !== 'price' && selectedCategory === 'all') {
                        const groupedProducts = filteredProducts.reduce((acc, product) => {
                          const category = product.category || 'Lainnya';
                          if (!acc[category]) {
                            acc[category] = [];
                          }
                          acc[category].push(product);
                          return acc;
                        }, {} as Record<string, Product[]>);

                        // Define category priority order
                        const categoryPriority = [
                          'Jus Buah & Sayur',
                          'Rekomendasi Mix Jus',
                          'Kocok',
                          'Baby',
                          'Non-Jus',
                          'Teh',
                          'Cemilan'
                        ];

                        // Sort categories by priority, then alphabetically for others
                        const sortedCategories = Object.keys(groupedProducts).sort((a, b) => {
                          const aIndex = categoryPriority.indexOf(a);
                          const bIndex = categoryPriority.indexOf(b);
                          
                          // If both categories are in priority list, sort by priority
                          if (aIndex !== -1 && bIndex !== -1) {
                            return aIndex - bIndex;
                          }
                          // If only a is in priority list, a comes first
                          if (aIndex !== -1) {
                            return -1;
                          }
                          // If only b is in priority list, b comes first
                          if (bIndex !== -1) {
                            return 1;
                          }
                          // If neither is in priority list, sort alphabetically
                          return a.localeCompare(b);
                        });

                        return (
                          <AnimatePresence>
                            {sortedCategories.map((category, categoryIndex) => {
                              const products = groupedProducts[category];
                              return (
                              <div key={category} className="space-y-4">
                                {/* Category Subtitle */}
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
                                  className="sticky top-0 bg-white py-2 z-10"
                                >
                                  <h3 className="text-xl font-black text-gray-800 font-display border-b-2 border-primary-200 pb-3" style={{ fontWeight: 900 }}>
                                    {category}
                                  </h3>
                                </motion.div>
                                
                                {/* Products Grid in Category - Responsive */}
                                <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 w-full">
                                  {products.map((product, index) => (
                                    <motion.div
                                      key={product.id}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -20 }}
                                      transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                                      className="w-full"
                                    >
                                      <ProductCard 
                                        product={product} 
                                        onAddToCart={handleAddToCart}
                                      />
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            );
                            })}
                          </AnimatePresence>
                        );
                      } else {
                        // Show all products without grouping (price sort or specific category filter)
                        return (
                          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 w-full">
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
                                  <ProductCard 
                                    product={product} 
                                    onAddToCart={handleAddToCart}
                                  />
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                        );
                      }
                    })()}
                  </div>
                )}
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
                  className="bg-primary-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-600 transition-all duration-200"
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