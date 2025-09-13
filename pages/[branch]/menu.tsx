import React, { useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import MenuFilter from '../../components/MenuFilter';
import ScrollAnimationSection from '../../components/ScrollAnimationSection';
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

  // Filter products based on category and search
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
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, products]);

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
    // Implementasi add to cart logic
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

      <div className="min-h-screen bg-gray-50">
        <Header branch={branch} currentPath={`/${branch}/menu`} />
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-br from-primary-500 to-secondary-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimationSection animation="fadeIn" delay={0.2}>
              <div className="text-center text-white">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                  Menu Zatiaras Juice
                </h1>
                <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                  Nikmati kesegaran jus alpukat dan aneka jus buah segar berkualitas tinggi
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://wa.me/${branchInfo?.whatsapp?.replace(/\D/g, '') || '6281234567890'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-strong transition-all duration-300"
                  >
                    Order via WhatsApp
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://gofood.co.id/merchant/zatiaras-juice"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
                  >
                    Order via GoFood
                  </motion.a>
                </div>
              </div>
            </ScrollAnimationSection>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari menu favorit Anda..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="lg:w-80">
                <MenuFilter
                  categories={categoriesWithCount}
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        {featuredProducts.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollAnimationSection animation="fadeIn" delay={0.2}>
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    Menu Favorit
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Pilihan terbaik dari menu Zatiaras Juice yang paling diminati
                  </p>
                </div>
              </ScrollAnimationSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.map((product, index) => (
                  <ScrollAnimationSection
                    key={product.id}
                    animation="slideUp"
                    delay={index * 0.1}
                  >
                    <ProductCard 
                      product={product} 
                      onAddToCart={handleAddToCart}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={favorites.includes(product.id)}
                    />
                  </ScrollAnimationSection>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Products Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimationSection animation="fadeIn" delay={0.2}>
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Semua Menu
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Koleksi lengkap menu Zatiaras Juice untuk memenuhi selera Anda
                </p>
              </div>
            </ScrollAnimationSection>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <ScrollAnimationSection
                    key={product.id}
                    animation="slideUp"
                    delay={index * 0.1}
                  >
                    <ProductCard 
                      product={product} 
                      onAddToCart={handleAddToCart}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={favorites.includes(product.id)}
                    />
                  </ScrollAnimationSection>
                ))}
              </div>
            ) : (
              <ScrollAnimationSection animation="fadeIn">
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Tidak ada produk ditemukan
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Coba ubah kata kunci pencarian atau pilih kategori lain
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-glow transition-all duration-300"
                  >
                    Reset Filter
                  </motion.button>
                </div>
              </ScrollAnimationSection>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollAnimationSection animation="fadeIn" delay={0.2}>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Siap Memesan?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Order sekarang dan nikmati kesegaran jus buah segar langsung di rumah Anda
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/${branchInfo?.whatsapp?.replace(/\D/g, '') || '6281234567890'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-strong transition-all duration-300"
                >
                  Order via WhatsApp
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://gofood.co.id/merchant/zatiaras-juice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
                >
                  Order via GoFood
                </motion.a>
              </div>
            </ScrollAnimationSection>
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
