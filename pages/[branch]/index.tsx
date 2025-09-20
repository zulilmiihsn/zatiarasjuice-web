import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroTrendy from '../../components/HeroTrendy';
import ProductCardMinimal from '../../components/ProductCardMinimal';
import { getBranchSEOData, getMenuStructuredData } from '../../lib/seo';
import type { Branch, Product, Category } from '../../lib/supabase';

interface BranchPageProps {
  branch: Branch;
  products: Product[];
  categories: Category[];
  branchInfo: any;
  seoData: any;
}

const BranchPage: React.FC<BranchPageProps> = ({ 
  branch, 
  products, 
  categories, 
  branchInfo, 
  seoData 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

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

  const featuredProducts = products.filter(product => product.is_featured).slice(0, 6);

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
        <Header branch={branch} currentPath={`/${branch}`} />
        
        {/* Hero Section - Trendy 2024 dengan Parallax */}
        <HeroTrendy branch={branch} />
        
        {/* Branch Info Section - Modern & Trendy */}
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-display-xl text-gray-900 mb-6 font-bold">
                Zatiaras Juice {branch.charAt(0).toUpperCase() + branch.slice(1)}
              </h1>
              <p className="text-body-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {branchInfo?.description || `Nikmati kesegaran jus alpukat dan aneka jus buah segar di cabang ${branch} ✨`}
              </p>
              
              {/* Quick Stats dengan Glassmorphism */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="backdrop-blur-xl bg-white/70 rounded-2xl p-8 shadow-xl border border-white/20"
                >
                  <div className="text-4xl font-bold text-primary-500 mb-2 font-display">{products.length}+</div>
                  <div className="text-gray-600 font-medium">Menu Tersedia</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="backdrop-blur-xl bg-white/70 rounded-2xl p-8 shadow-xl border border-white/20"
                >
                  <div className="text-4xl font-bold text-pinky-500 mb-2 font-display">4.9</div>
                  <div className="text-gray-600 font-medium">Rating Pelanggan</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="backdrop-blur-xl bg-white/70 rounded-2xl p-8 shadow-xl border border-white/20"
                >
                  <div className="text-4xl font-bold text-cute-500 mb-2 font-display">100%</div>
                  <div className="text-gray-600 font-medium">Alami & Segar</div>
                </motion.div>
              </div>

              {/* Quick Order Buttons dengan Modern Design */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 20px 40px rgba(255, 105, 180, 0.3)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/${branchInfo?.whatsapp?.replace(/\D/g, '') || '6281234567890'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gradient-to-r from-primary-500 to-pinky-500 text-white px-6 py-3 rounded-xl text-base font-semibold overflow-hidden shadow-lg"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span className="text-2xl">💬</span>
                    <span>Order via WhatsApp</span>
                  </span>
                </motion.a>
                <motion.a
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 20px 40px rgba(255, 255, 255, 0.3)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  href="https://gofood.co.id/merchant/zatiaras-juice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative border-2 border-primary-500 text-primary-500 px-6 py-3 rounded-xl text-base font-semibold overflow-hidden backdrop-blur-sm"
                >
                  <motion.div
                    className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white">
                    <span className="text-2xl">🚚</span>
                    <span>Order via GoFood</span>
                  </span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Branch Info Section - Clean & Professional */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-display">
                Informasi Cabang
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                Informasi lengkap tentang cabang {branch.charAt(0).toUpperCase() + branch.slice(1)}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -4 }}
                className="text-center bg-gray-50 rounded-lg p-8 hover:shadow-medium transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-display">Lokasi</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  {branchInfo?.address || `Jl. Contoh No. 123, ${branch.charAt(0).toUpperCase() + branch.slice(1)}`}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -4 }}
                className="text-center bg-gray-50 rounded-lg p-8 hover:shadow-medium transition-all duration-300"
              >
                <div className="w-16 h-16 bg-pinky-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-pinky-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-display">Telepon</h3>
                <p className="text-gray-600 font-medium">
                  {branchInfo?.phone || '+62812-3456-7890'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -4 }}
                className="text-center bg-gray-50 rounded-lg p-8 hover:shadow-medium transition-all duration-300"
              >
                <div className="w-16 h-16 bg-cute-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-cute-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-display">Jam Operasional</h3>
                <p className="text-gray-600 font-medium">
                  {branchInfo?.hours || '08:00 - 22:00 WITA'}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Products Section - Clean & Cute */}
        {featuredProducts.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-display">
                  Menu Favorit
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                  Pilihan terbaik dari menu Zatiaras Juice yang paling diminati
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <ProductCardMinimal 
                      product={product} 
                      onAddToCart={handleAddToCart}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={favorites.includes(product.id)}
                    />
                  </motion.div>
                ))}
              </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mt-12"
              >
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={`/${branch}/menu`}
                  className="inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-primary-600 transition-all duration-200"
                >
                  <span>🍹</span>
                  <span>Lihat Semua Menu</span>
                </motion.a>
            </motion.div>
          </div>
        </section>
        )}

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

  // Mock data untuk sementara
  const mockProducts = [
      {
        id: '1',
      name: 'Jus Alpukat Segar',
      description: 'Jus alpukat segar dengan kualitas terbaik',
      price: 15000,
      category: 'Jus Alpukat',
      image_url: '/images/avocado-juice.jpg',
      gambar: '/images/avocado-juice.jpg',
        is_featured: true,
      rating: 4.8,
      review_count: 120
      },
      {
        id: '2',
      name: 'Jus Jeruk Manis',
      description: 'Jus jeruk segar tanpa pengawet',
      price: 12000,
      category: 'Jus Buah',
      image_url: '/images/orange-juice.jpg',
      gambar: '/images/orange-juice.jpg',
        is_featured: true,
      rating: 4.6,
      review_count: 95
    },
    {
      id: '3',
      name: 'Jus Mangga Segar',
        description: 'Jus mangga manis dan segar',
      price: 13000,
      category: 'Jus Buah',
      image_url: '/images/mango-juice.jpg',
      gambar: '/images/mango-juice.jpg',
      is_featured: true,
      rating: 4.7,
      review_count: 88
    }
  ];

  const mockCategories = [
    { id: '1', name: 'Jus Alpukat' },
    { id: '2', name: 'Jus Buah' },
    { id: '3', name: 'Jus Sayur' }
    ];

    const mockBranchInfo = {
    name: branch.charAt(0).toUpperCase() + branch.slice(1),
    address: `Jl. Contoh No. 123, ${branch.charAt(0).toUpperCase() + branch.slice(1)}`,
    phone: '+62812-3456-7890',
    whatsapp: '+62812-3456-7890',
    hours: '08:00 - 22:00 WITA'
  };

    return {
      props: {
        branch,
        products: mockProducts,
        categories: mockCategories,
        branchInfo: mockBranchInfo,
      seoData: getBranchSEOData(branch),
      },
      revalidate: 3600,
    };
};

export default BranchPage;