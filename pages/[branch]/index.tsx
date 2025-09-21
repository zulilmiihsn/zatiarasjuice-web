import React, { lazy, Suspense } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroBanner from '../../components/HeroBanner';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getBranchSEOData } from '../../lib/seo';
import { getProducts, getCategories, getBranchInfo } from '../../lib/supabase';
import type { Branch, Product, Category } from '../../lib/supabase';

// Lazy load heavy components for better performance
const ProductCard = lazy(() => import('../../components/ProductCard'));

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
  seoData 
}) => {




  const handleAddToCart = () => {
    // Add to cart logic here
    // Product added to cart
  };

  // Featured products berdasarkan nama spesifik
  const featuredProductNames = ['Jus Alpukat', 'Jus Mangga', 'Alpukat Kocok'];
  const featuredProducts = featuredProductNames
    .map(name => products.find(product => 
      product.name.toLowerCase().includes(name.toLowerCase())
    ))
    .filter(Boolean) as Product[];

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
        <HeroBanner branch={branch} />
        
        {/* Branch Info Section - Premium & Interactive */}
        <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Main Gradient Orbs */}
            <motion.div
              className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-pink-500/25 to-purple-500/25 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-cyan-500/25 to-blue-500/25 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.7, 0.4],
                x: [0, -25, 0],
                y: [0, 25, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Floating Juice & Fruit Icons */}
            {['🍹', '🥤', '🍓', '🥭', '🍊', '🍇', '🥑', '🍌', '🍎', '🍑', '🥝', '🍍'].map((icon, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl opacity-15"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -25, 0],
                  rotate: [0, 15, -15, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 7 + Math.random() * 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.6,
                }}
              >
                {icon}
              </motion.div>
            ))}
            
            
            {/* Animated Dots */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary-500/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 font-rounded">
                Zatiaras Juice {branch.charAt(0).toUpperCase() + branch.slice(1)}
              </h1>
              <p className="text-body-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {`Nikmati kesegaran jus alpukat dan aneka jus buah segar di cabang ${branch} ✨`}
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
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gradient-to-r from-primary-500 to-pinky-500 text-white px-6 py-3 rounded-xl text-base font-bold overflow-hidden shadow-lg"
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
                  className="group relative border-2 border-primary-500 text-primary-500 px-6 py-3 rounded-xl text-base font-bold overflow-hidden backdrop-blur-sm"
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
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 font-rounded">
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
                  {`Jl. Contoh No. 123, ${branch.charAt(0).toUpperCase() + branch.slice(1)}`}
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
                  +62812-3456-7890
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
                  08:00 - 22:00 WITA
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
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 font-rounded">
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
                    <Suspense fallback={
                      <div className="h-64 bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center">
                        <LoadingSpinner size="md" variant="pulse" />
                      </div>
                    }>
                      <ProductCard 
                        product={product} 
                        onAddToCart={handleAddToCart}
                      />
                    </Suspense>
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
                  className="inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-primary-600 transition-all duration-200"
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

  try {
    // Fetch data from Supabase
    const [products, categories, branchInfo] = await Promise.all([
      getProducts(branch),
      getCategories(branch),
      getBranchInfo(branch)
    ]);

    return {
      props: {
        branch,
        products,
        categories,
        branchInfo,
        seoData: getBranchSEOData(branch),
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    // Error fetching data
    
    // Fallback data jika Supabase error
    const fallbackProducts = [
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
        name: 'Jus Mangga Segar',
        description: 'Jus mangga manis dan segar',
        price: 13000,
        category: 'Jus Buah',
        image_url: '/images/mango-juice.jpg',
        gambar: '/images/mango-juice.jpg',
        is_featured: true,
        rating: 4.7,
        review_count: 88
      },
      {
        id: '3',
        name: 'Alpukat Kocok',
        description: 'Alpukat kocok dengan susu segar',
        price: 18000,
        category: 'Kocok',
        image_url: '/images/avocado-shake.jpg',
        gambar: '/images/avocado-shake.jpg',
        is_featured: true,
        rating: 4.9,
        review_count: 150
      }
    ];

    const fallbackCategories = [
      { id: '1', name: 'Jus Alpukat' },
      { id: '2', name: 'Jus Buah' },
      { id: '3', name: 'Kocok' }
    ];

    const fallbackBranchInfo = {
      name: branch.charAt(0).toUpperCase() + branch.slice(1),
      address: `Jl. Contoh No. 123, ${branch.charAt(0).toUpperCase() + branch.slice(1)}`,
      phone: '+62812-3456-7890',
      whatsapp: '+62812-3456-7890',
      hours: '08:00 - 22:00 WITA'
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

export default BranchPage;