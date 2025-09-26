import React, { lazy, Suspense } from 'react';
import { MapPin, Phone, Clock, Utensils, Apple, Grape, Cherry, Banana } from 'lucide-react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import HeroBanner from '../../components/HeroBanner';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getBranchSEOData } from '../../lib/seo';
import { getProducts, getCategories, getBranchInfo } from '../../lib/supabase';
import type { Branch, Product, Category } from '../../lib/supabase';

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

// Lazy load heavy components for better performance
const ProductCard = lazy(() => import('../../components/ProductCard'));
const Footer = lazy(() => import('../../components/Footer'));

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
        <title>{`${seoData.title}`}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords.join(', ')} />
        <link rel="canonical" href={seoData.canonical} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoData.openGraph.title} />
        <meta property="og:description" content={seoData.openGraph.description} />
        <meta property="og:image" content={seoData.openGraph.image} />
        <meta property="og:url" content={seoData.openGraph.url} />
        <meta property="og:type" content={seoData.openGraph.type} />
        
        
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
                className={`absolute text-3xl opacity-15 ${color}`}
                style={{
                  left: `${(i * 18.3) % 100}%`,
                  top: `${(i * 27.7) % 100}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: 8 + (i % 2) * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.8,
                }}
              >
                <Icon className="w-8 h-8" />
              </motion.div>
            ))}
            
            
            {/* Animated Dots */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary-500/40 rounded-full"
                style={{
                  left: `${(i * 9.7) % 100}%`,
                  top: `${(i * 13.3) % 100}%`,
                }}
                animate={{
                  scale: [0, 1.2, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 3 + (i % 2) * 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
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
                {`Nikmati kesegaran jus alpukat dan aneka jus buah segar di cabang ${branch}`}
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
                  <div className="text-4xl font-bold text-pinky-500 mb-2 font-display">100%</div>
                  <div className="text-pinky-500 font-medium">Alami & Segar</div>
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
                    <WhatsAppIcon className="w-6 h-6" />
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
                      <Utensils className="w-6 h-6" />
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

        <Suspense fallback={
          <div className="w-full h-32 bg-gray-100 animate-pulse flex items-center justify-center">
            <LoadingSpinner size="sm" />
          </div>
        }>
          <Footer branch={branch} />
        </Suspense>
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