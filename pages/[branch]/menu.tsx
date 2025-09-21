import React, { useState, useMemo, useCallback } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid3X3, List, Eye, Apple, Grape, Cherry, Banana } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getBranchSEOData } from '../../lib/seo';
import { getProducts, getCategories, getBranchInfo } from '../../lib/supabase';
import type { Branch, Product, Category } from '../../lib/supabase';
import Link from 'next/link';

// Import ProductCard directly to prevent Fast Refresh issues
import ProductCard from '../../components/ProductCard';

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
  seoData 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Optimized filter and sort products with useMemo
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, searchQuery, sortBy, products]);

  // No need for useEffect since we're using useMemo directly

  const handleAddToCart = useCallback(() => {
    // Add to cart logic here
    // Product added to cart
  }, []);

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

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 overflow-x-hidden">
        <Header branch={branch} currentPath={`/${branch}/menu`} />
        
        {/* Menu Header - Premium Digital Menu Style */}
        <section className="pt-16 pb-4 sm:pb-8 md:pb-12 bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 border-b-2 border-pink-200 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Main Gradient Orbs */}
            <motion.div
              className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-pink-400/30 to-rose-400/30 rounded-full blur-3xl"
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
              className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-rose-400/25 to-pink-300/25 rounded-full blur-3xl"
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
            {[
              { icon: Apple, color: 'text-red-400' },
              { icon: Apple, color: 'text-orange-400' },
              { icon: Grape, color: 'text-purple-400' },
              { icon: Cherry, color: 'text-pink-400' },
              { icon: Banana, color: 'text-yellow-400' },
              { icon: Apple, color: 'text-yellow-500' },
              { icon: Apple, color: 'text-green-400' },
              { icon: Apple, color: 'text-orange-500' }
            ].map(({ icon: Icon, color }, i) => (
              <motion.div
                key={i}
                className={`absolute text-2xl opacity-10 silky-smooth fps-60 ${color}`}
                style={{
                  left: `${(i * 12.5) % 100}%`,
                  top: `${(i * 12.5) % 100}%`,
                  willChange: 'transform, opacity',
                  contain: 'layout style paint',
                  transform: 'translateZ(0)',
                }}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0],
                  scale: [0.8, 1.0, 0.8],
                }}
                transition={{
                  duration: 8 + i * 0.5,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.2,
                }}
              >
                <Icon className="w-6 h-6" />
              </motion.div>
            ))}
            
            {/* Subtle Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 30% 30%, #f472b6 1px, transparent 1px),
                                 radial-gradient(circle at 70% 70%, #fb7185 1px, transparent 1px)`,
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
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-pink-800 mb-2 sm:mb-3 md:mb-4 font-rounded">
                Menu {branch.charAt(0).toUpperCase() + branch.slice(1)}
              </h1>
              
              {/* Description - Hidden on Mobile */}
              <p className="hidden sm:block text-base md:text-lg text-pink-700 max-w-2xl mx-auto font-medium leading-relaxed mb-4 md:mb-6">
                Jelajahi koleksi lengkap jus segar dan minuman sehat kami
              </p>
              

              {/* Mobile Overview Button */}
              <div className="sm:hidden mt-4">
                <Link href={`/${branch}/overview`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-200 mx-auto shadow-lg hover:shadow-xl"
                  >
                    <Eye className="w-5 h-5" />
                    <span>Lihat Semua Menu</span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Menu Navigation - Responsive Layout */}
        <section className="py-2 sm:py-3 md:py-4 bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-200 overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search Bar - Centered */}
            <div className="mb-2 sm:mb-4 md:mb-6">
              <div className="relative max-w-sm sm:max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Cari menu favorit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 bg-white text-sm"
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
                      onClick={() => setSelectedCategory(category.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                        selectedCategory === category.value
                          ? 'bg-pink-500 text-white shadow-sm'
                          : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                      }`}
                    >
                      {category.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Controls Group - Desktop Layout */}
              <div className="hidden md:flex items-center justify-center gap-8">
                {/* Overview Button - Desktop */}
                <Link href={`/${branch}/overview`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Eye className="w-5 h-5" />
                    <span>Overview Menu</span>
                  </motion.button>
                </Link>
                {/* View Mode Toggle */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-pink-600">Tampilan:</span>
                    <div className="flex bg-pink-100 rounded-lg p-1">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setViewMode('list')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        viewMode === 'list'
                          ? 'bg-white text-pink-600 shadow-sm'
                          : 'text-pink-600 hover:text-pink-800'
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
                          ? 'bg-white text-pink-600 shadow-sm'
                          : 'text-pink-600 hover:text-pink-800'
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
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'price')}
                    className="appearance-none bg-white border border-pink-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 min-w-[120px]"
                  >
                    <option value="name">Nama</option>
                    <option value="price">Harga</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Filter className="w-4 h-4 text-pink-400" />
                  </div>
                </div>
              </div>

              {/* Mobile Controls - Compact Layout */}
              <div className="md:hidden">
                <div className="flex items-center justify-between gap-3">
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-pink-600">Tampilan:</span>
                    <div className="flex bg-pink-100 rounded-lg p-1">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setViewMode('list')}
                        className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                        viewMode === 'list'
                            ? 'bg-white text-pink-600 shadow-sm'
                            : 'text-pink-600 hover:text-pink-800'
                      }`}
                    >
                        <List className="w-3 h-3" />
                      <span>List</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setViewMode('grid')}
                        className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                        viewMode === 'grid'
                            ? 'bg-white text-pink-600 shadow-sm'
                            : 'text-pink-600 hover:text-pink-800'
                      }`}
                    >
                        <Grid3X3 className="w-3 h-3" />
                      <span>Grid</span>
                    </motion.button>
                  </div>
                </div>

                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-pink-600">Urutkan:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'name' | 'price')}
                        className="appearance-none bg-white border border-pink-300 rounded-lg px-3 py-1.5 pr-6 text-xs font-medium focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 min-w-[80px]"
                  >
                    <option value="name">Nama</option>
                    <option value="price">Harga</option>
                  </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <Filter className="w-3 h-3 text-pink-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Display - Premium Interactive Layout */}
        <section className="py-2 sm:py-4 md:py-6 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Main Gradient Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-full blur-3xl"
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
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-rose-400/20 to-pink-300/20 rounded-full blur-3xl"
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
            {[
              { icon: Apple, color: 'text-red-400' },
              { icon: Apple, color: 'text-orange-400' },
              { icon: Grape, color: 'text-purple-400' },
              { icon: Cherry, color: 'text-pink-400' },
              { icon: Banana, color: 'text-yellow-400' },
              { icon: Apple, color: 'text-yellow-500' },
              { icon: Apple, color: 'text-green-400' },
              { icon: Apple, color: 'text-orange-500' },
              { icon: Grape, color: 'text-indigo-400' },
              { icon: Cherry, color: 'text-rose-400' },
              { icon: Banana, color: 'text-amber-400' },
              { icon: Apple, color: 'text-lime-400' }
            ].map(({ icon: Icon, color }, i) => (
              <motion.div
                key={i}
                className={`absolute text-3xl opacity-8 ${color}`}
                style={{
                  left: `${(i * 15.7) % 100}%`,
                  top: `${(i * 23.3) % 100}%`,
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
                <Icon className="w-8 h-8" />
              </motion.div>
            ))}
            
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(45deg, #f472b6 1px, transparent 1px),
                                 linear-gradient(-45deg, #fb7185 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                backgroundPosition: '0 0, 20px 20px'
              }} />
            </div>
            
            {/* Animated Particles */}
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-pink-400/40 to-rose-400/40 rounded-full"
                style={{
                  left: `${(i * 7.3) % 100}%`,
                  top: `${(i * 11.7) % 100}%`,
                }}
                animate={{
                  y: [0, -50, 0],
                  x: [0, (i % 3 - 1) * 10, 0],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 4 + (i % 3) * 1.5,
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
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-pink-800 mb-0.5 sm:mb-1 font-rounded">
                    {selectedCategory === 'all' ? 'Semua Menu' : selectedCategory}
                  </h2>
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
                                  className="sticky top-0 bg-pink-50 py-2 z-10"
                                >
                                  <h3 className="text-base font-black text-pink-800 font-display border-b-2 border-pink-300 pb-2" style={{ fontWeight: 900 }}>
                                    {category}
                                  </h3>
                                </motion.div>
                                
                                {/* Products in Category - Mobile Optimized */}
                                {products.map((product, index) => (
                                  <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2, delay: index * 0.01 }}
                                    className="bg-white rounded-lg border border-pink-200 hover:border-pink-300 hover:shadow-sm transition-all duration-200 px-3 py-2.5 sm:py-2 w-full"
                                  >
                                    <div className="flex items-center justify-between gap-2 w-full">
                                      {/* Product Name */}
                                      <div className="flex-1 min-w-0 overflow-hidden">
                                        <h3 className="text-sm font-semibold text-pink-900 font-display truncate">
                                          {product.name}
                                        </h3>
                                      </div>
                                      
                                      {/* Price - Mobile Responsive */}
                                      <div className="text-right flex-shrink-0 max-w-[40%]">
                                        {product.is_minuman ? (
                                          <div className="text-right">
                                            <div className="text-xs sm:text-sm font-bold text-pink-600 font-display truncate">
                                              Regular: Rp {(product.price_regular || product.price).toLocaleString('id-ID')}
                                            </div>
                                            <div className="text-xs text-pink-500 truncate">
                                              Large: Rp {(product.price_large || product.price).toLocaleString('id-ID')}
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="text-xs sm:text-sm font-bold text-pink-600 font-display truncate">
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
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.2, delay: index * 0.01 }}
                                className="bg-white rounded-lg border border-pink-200 hover:border-pink-300 hover:shadow-sm transition-all duration-200 px-3 py-2 w-full"
                              >
                                <div className="flex items-center justify-between gap-2 w-full">
                                  {/* Product Name */}
                                  <div className="flex-1 min-w-0 overflow-hidden">
                                    <h3 className="text-sm font-semibold text-pink-900 font-display truncate">
                                      {product.name}
                                    </h3>
                                  </div>
                                  
                                  {/* Price - Mobile Responsive */}
                                  <div className="text-right flex-shrink-0 max-w-[40%]">
                                    {product.is_minuman ? (
                                      <div className="text-right">
                                        <div className="text-xs sm:text-sm font-bold text-pink-600 font-display truncate">
                                          Regular: Rp {(product.price_regular || product.price).toLocaleString('id-ID')}
                                        </div>
                                        <div className="text-xs text-pink-500 truncate">
                                          Large: Rp {(product.price_large || product.price).toLocaleString('id-ID')}
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="text-xs sm:text-sm font-bold text-pink-600 font-display truncate">
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
                                  className="sticky top-0 bg-pink-50 py-2 z-10"
                                >
                                  <h3 className="text-xl font-black text-pink-800 font-display border-b-2 border-pink-300 pb-3" style={{ fontWeight: 900 }}>
                                    {category}
                                  </h3>
                                </motion.div>
                                
                                {/* Products Grid in Category - Responsive */}
                                <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 w-full">
                                  {products.map((product, index) => (
                                    <motion.div
                                      key={product.id}
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      transition={{ duration: 0.2, delay: index * 0.02 }}
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
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.2, delay: index * 0.02 }}
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
                <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-pink-400" />
                </div>
                <h3 className="text-2xl font-black text-pink-800 mb-4 font-rounded">
                  Menu tidak ditemukan
                </h3>
                <p className="text-pink-600 mb-6 font-medium">
                  Coba gunakan kata kunci yang berbeda atau pilih kategori lain
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="bg-pink-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-pink-600 transition-all duration-200"
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
    // Error fetching data from Supabase
    
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