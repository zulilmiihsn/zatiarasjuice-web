import React, { useEffect, useState, lazy, Suspense } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';
import LoadingSpinner from '../components/LoadingSpinner';
import { getUserLocationWithFallback } from '../lib/geolocation';

// Lazy load heavy components for better performance
const ProductCard = lazy(() => import('../components/ProductCard'));

interface HomePageProps {
  featuredProducts: any[];
  seoData: any;
}

const HomePage: React.FC<HomePageProps> = ({ featuredProducts, seoData }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [nearestBranch, setNearestBranch] = useState<string | null>(null);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        const { nearestBranch: branch } = await getUserLocationWithFallback();
        setNearestBranch(branch);
        
        // Auto redirect ke cabang terdekat setelah 3 detik
        if (branch) {
          setTimeout(() => {
            router.push(`/${branch}`);
          }, 3000);
        }
      } catch (error) {
        // Error handling - could be logged to analytics service
      } finally {
        setIsLoading(false);
      }
    };

    detectLocation();
  }, [router]);

  const handleBranchSelect = (branch: 'berau' | 'samarinda') => {
    router.push(`/${branch}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center relative overflow-hidden">
        <LoadingSpinner
          size="xl"
          variant="pulse"
          text="Memuat Zatiaras Juice..."
          className="text-white"
        />
      </div>
    );
  }

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
        <Header 
          branch={nearestBranch as 'berau' | 'samarinda' | undefined}
          currentPath={router.asPath}
        />

        {/* Hero Section - Interactive & Trendy */}
        <HeroBanner 
          branch={nearestBranch as 'berau' | 'samarinda' | undefined}
          onBranchSelect={handleBranchSelect}
        />

        {/* Branch Selection Section - Premium & Elegant */}
        <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-primary-500/20 to-pinky-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-emerald-500/20 to-secondary-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.7, 0.4],
                x: [0, -40, 0],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-gold-500/20 to-accent-500/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-6"
              >
                <span className="text-6xl">🍹</span>
              </motion.div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8 font-rounded text-premium">
                Jus Terenak di Berau & Samarinda
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed mb-8">
                Lebih dari 500+ pelanggan puas setiap bulan. Rating 4.9/5 dari 150+ review. 
                <span className="text-primary-600 font-bold text-luxury"> Garansi uang kembali jika tidak puas!</span>
              </p>
              
              {/* Premium Stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-center"
                >
                  <div className="text-4xl font-black text-primary-500 mb-2 font-display">500+</div>
                  <div className="text-gray-600 font-semibold">Pelanggan Puas</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-center"
                >
                  <div className="text-4xl font-black text-pinky-500 mb-2 font-display">4.9/5</div>
                  <div className="text-gray-600 font-semibold">Rating</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-center"
                >
                  <div className="text-4xl font-black text-emerald-500 mb-2 font-display">100%</div>
                  <div className="text-gray-600 font-semibold">Alami</div>
                </motion.div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Berau Branch - Premium Design */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  rotateY: 5,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
                className="card-premium group perspective-3d rounded-[2rem]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="h-56 bg-gradient-to-br from-primary-500 via-pinky-500 to-cute-500 relative overflow-hidden rounded-t-[2rem]">
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0">
                    <motion.div
                      className="absolute top-4 right-4 w-20 h-20 bg-white/20 rounded-full blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    <motion.div
                      className="absolute bottom-4 left-4 w-16 h-16 bg-white/30 rounded-full blur-lg"
                      animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.4, 0.7, 0.4],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.h3 
                        className="text-4xl font-black text-white font-rounded mb-2"
                        animate={{ 
                          textShadow: [
                            '0 0 10px rgba(255, 255, 255, 0.5)',
                            '0 0 20px rgba(255, 255, 255, 0.8)',
                            '0 0 10px rgba(255, 255, 255, 0.5)'
                          ]
                        }}
                        transition={{ 
                          textShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                        }}
                      >
                        Berau
                      </motion.h3>
                      <p className="text-white/90 text-lg font-semibold">Cabang Utama</p>
                    </motion.div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-gray-900 font-rounded">Zatiaras Juice Berau</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                    Jl. Ahmad Yani No. 123, Berau, Kalimantan Timur
                  </p>
                    
                    {/* Trust Indicators - Simplified */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-semibold">4.9/5</span>
                        <span>(75+ review)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-green-500">🍃</span>
                        <span className="font-semibold">100% Alami</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-500">
                      <p className="flex items-center gap-2">
                      <span>📞</span> +62812-3456-7890
                    </p>
                      <p className="flex items-center gap-2">
                      <span>🕒</span> 08:00 - 22:00 WITA
                    </p>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ 
                      scale: 1.05, 
                      y: -2,
                      boxShadow: '0 15px 30px rgba(255, 110, 199, 0.4)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBranchSelect('berau')}
                    className="w-full bg-gradient-to-r from-primary-500 to-pinky-500 text-white py-4 rounded-2xl font-bold text-lg hover:from-pink-500 hover:to-purple-500 transition-all duration-300 mt-8 shadow-glow-primary hover:shadow-glow-pinky relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      >
                        🍹
                      </motion.span>
                      <span>Lihat Menu Berau</span>
                    </span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Samarinda Branch - Premium Design */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  rotateY: 5,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
                className="card-premium group perspective-3d rounded-[2rem]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="h-56 bg-gradient-to-br from-pinky-500 via-pinky-600 to-pinky-700 relative overflow-hidden rounded-t-[2rem]">
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0">
                    <motion.div
                      className="absolute top-4 right-4 w-20 h-20 bg-white/20 rounded-full blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    <motion.div
                      className="absolute bottom-4 left-4 w-16 h-16 bg-white/30 rounded-full blur-lg"
                      animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.4, 0.7, 0.4],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.h3 
                        className="text-4xl font-black text-white font-rounded mb-2"
                        animate={{ 
                          textShadow: [
                            '0 0 10px rgba(255, 255, 255, 0.5)',
                            '0 0 20px rgba(255, 255, 255, 0.8)',
                            '0 0 10px rgba(255, 255, 255, 0.5)'
                          ]
                        }}
                        transition={{ 
                          textShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                        }}
                      >
                        Samarinda
                      </motion.h3>
                      <p className="text-white/90 text-lg font-semibold">Cabang Utama</p>
                    </motion.div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-gray-900 font-rounded">Zatiaras Juice Samarinda</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                    Jl. Sudirman No. 456, Samarinda, Kalimantan Timur
                  </p>
                    
                    {/* Trust Indicators - Simplified */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-semibold">4.9/5</span>
                        <span>(75+ review)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-green-500">🍃</span>
                        <span className="font-semibold">100% Alami</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-500">
                      <p className="flex items-center gap-2">
                      <span>📞</span> +62812-3456-7891
                    </p>
                      <p className="flex items-center gap-2">
                      <span>🕒</span> 08:00 - 22:00 WITA
                    </p>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ 
                      scale: 1.05, 
                      y: -2,
                      boxShadow: '0 15px 30px rgba(236, 72, 153, 0.4)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBranchSelect('samarinda')}
                    className="w-full bg-gradient-to-r from-pinky-500 to-pinky-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-pink-500 hover:to-purple-500 transition-all duration-300 mt-8 shadow-glow-primary hover:shadow-glow-pinky relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      >
                        🍹
                      </motion.span>
                      <span>Lihat Menu Samarinda</span>
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section - Premium & Elegant */}
        <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Main Gradient Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-500/15 to-pinky-500/15 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 10,
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
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Floating Geometric Shapes - Optimized for Performance */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute silky-smooth fps-60"
                style={{
                  left: `${(i * 25) % 100}%`,
                  top: `${(i * 25) % 100}%`,
                  willChange: 'transform, opacity',
                  contain: 'layout style paint',
                  transform: 'translateZ(0)',
                }}
                animate={{
                  x: [0, 20, 0],
                  y: [0, 15, 0],
                  rotate: [0, 180, 360],
                  scale: [0.8, 1.1, 0.8],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 12 + i * 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500/10 to-pinky-500/10 rounded-2xl blur-sm" />
              </motion.div>
            ))}
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #FF6EC7 2px, transparent 2px),
                                 radial-gradient(circle at 75% 75%, #22c55e 2px, transparent 2px),
                                 radial-gradient(circle at 50% 50%, #f59e0b 1px, transparent 1px)`,
                backgroundSize: '60px 60px, 80px 80px, 40px 40px',
                backgroundPosition: '0 0, 30px 30px, 15px 15px'
              }} />
            </div>
            
            {/* Gradient Lines */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-pinky-500/30 to-transparent"
              animate={{
                x: ['100%', '-100%'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-8"
              >
                <span className="text-8xl">✨</span>
              </motion.div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8 font-rounded text-premium">
                Mengapa Zatiaras Juice adalah Pilihan Terbaik?
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed">
                Inilah alasan mengapa pelanggan memilih Zatiaras Juice sebagai tempat jus terenak di Berau & Samarinda
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  rotateY: 5,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
                className="text-center card-premium group perspective-3d"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-primary-100 to-pinky-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-glow-primary"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 360,
                    boxShadow: '0 0 30px rgba(255, 110, 199, 0.6)'
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.span 
                    className="text-4xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    ⭐
                  </motion.span>
                </motion.div>
                <h3 className="text-2xl font-black text-gray-900 mb-6 font-rounded text-premium">Rating 4.9/5</h3>
                <p className="text-gray-600 font-medium leading-relaxed text-lg">
                  Lebih dari 150+ review positif dari pelanggan yang puas dengan kualitas dan rasa jus kami
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-clean hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🍃</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4 font-rounded">100% Alami</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Dibuat dari buah segar pilihan, tanpa pengawet, tanpa pewarna buatan, dan tanpa pemanis sintetis
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-clean hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">💯</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4 font-rounded">Garansi Uang Kembali</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Tidak puas dengan jus kami? Kami berikan garansi uang kembali 100% tanpa syarat
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Products Section - Premium & Interactive */}
        {featuredProducts.length > 0 && (
          <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
              {/* Main Gradient Orbs */}
              <motion.div
                className="absolute top-1/3 left-1/3 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-secondary-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  x: [0, 40, 0],
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-r from-gold-500/20 to-accent-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.4, 0.7, 0.4],
                  x: [0, -35, 0],
                  y: [0, 35, 0],
                }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Floating Juice Icons */}
              {['🍹', '🥤', '🍓', '🥭', '🍊', '🍇'].map((icon, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl opacity-20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0],
                    scale: [0.8, 1.1, 0.8],
                  }}
                  transition={{
                    duration: 6 + Math.random() * 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.5,
                  }}
                >
                  {icon}
                </motion.div>
              ))}
              
              {/* Geometric Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `linear-gradient(45deg, #FF6EC7 1px, transparent 1px),
                                   linear-gradient(-45deg, #22c55e 1px, transparent 1px),
                                   linear-gradient(90deg, #f59e0b 1px, transparent 1px)`,
                  backgroundSize: '40px 40px, 60px 60px, 80px 80px',
                  backgroundPosition: '0 0, 20px 20px, 40px 40px'
                }} />
              </div>
              
              {/* Animated Dots */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary-500/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 font-rounded">
                  Menu Terlaris & Terfavorit
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
                  Menu pilihan yang paling banyak dipesan dan mendapat rating tertinggi dari pelanggan kami
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Suspense fallback={
                      <div className="h-64 bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center">
                        <LoadingSpinner size="md" variant="pulse" />
                      </div>
                    }>
                      <ProductCard product={product} />
                    </Suspense>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimoni Section - Premium & Interactive */}
        <section className="py-24 bg-gradient-to-br from-primary-50 via-pinky-50 to-cute-50 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Main Gradient Orbs */}
            <motion.div
              className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-primary-500/20 to-pinky-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [0, -40, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-cute-500/20 to-violet-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.7, 0.4],
                x: [0, 35, 0],
                y: [0, -25, 0],
              }}
              transition={{
                duration: 13,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Floating Quote Icons */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-6xl opacity-10"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 5, -5, 0],
                  scale: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.8,
                }}
              >
                "
              </motion.div>
            ))}
            
            {/* Heart Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 20% 20%, #FF6EC7 3px, transparent 3px),
                                 radial-gradient(circle at 80% 80%, #ec4899 2px, transparent 2px),
                                 radial-gradient(circle at 50% 50%, #d946ef 1px, transparent 1px)`,
                backgroundSize: '100px 100px, 120px 120px, 80px 80px',
                backgroundPosition: '0 0, 50px 50px, 25px 25px'
              }} />
            </div>
            
            {/* Floating Stars */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 180, 360],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              >
                ⭐
              </motion.div>
            ))}
            
            {/* Animated Lines */}
            <motion.div
              className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute top-1/3 right-0 w-px h-1/3 bg-gradient-to-b from-transparent via-pinky-500/30 to-transparent"
              animate={{
                y: ['-100%', '100%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 font-rounded">
                Kata Mereka Tentang Zatiaras Juice
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
                Testimoni nyata dari pelanggan yang sudah merasakan kelezatan jus kami
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-clean hover:shadow-lg transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    "Jus alpukat Zatiaras memang yang terenak di Berau! Rasanya beda banget, segar dan enak banget. Udah jadi langganan 2 tahun ini."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary-600 font-bold text-lg">S</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Sarah M.</p>
                      <p className="text-sm text-gray-500">Pelanggan Berau</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-clean hover:shadow-lg transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    "Kualitas konsisten, selalu segar dan enak. Pelayanannya juga cepat banget. Recommended banget untuk yang cari jus terbaik di Samarinda!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-pinky-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-pinky-600 font-bold text-lg">A</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Ahmad R.</p>
                      <p className="text-sm text-gray-500">Pelanggan Samarinda</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-clean hover:shadow-lg transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    "Jus mangganya segar banget, manis alami. Harganya juga reasonable. Sekeluarga suka banget, jadi langganan tetap di sini."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-green-600 font-bold text-lg">L</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Lisa K.</p>
                      <p className="text-sm text-gray-500">Pelanggan Berau</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Mock data untuk featured products dengan value proposition kuat
  const featuredProducts = [
    {
      id: '1',
      name: 'Jus Alpukat Premium',
      description: 'Jus alpukat segar dengan susu pilihan dan gula aren asli. Resep rahasia turun temurun yang membuatnya berbeda dari yang lain.',
      price: 25000,
      category: 'Alpukat',
      image_url: '/images/jus-alpukat.jpg',
      is_featured: true,
      rating: 4.9,
      review_count: 150,
    },
    {
      id: '2',
      name: 'Jus Mangga Segar',
      description: 'Jus mangga manis dengan es batu. Dibuat dari mangga pilihan yang matang pohon, tanpa pengawet dan 100% alami.',
      price: 20000,
      category: 'Mangga',
      image_url: '/images/jus-mangga.jpg',
      is_featured: true,
      rating: 4.8,
      review_count: 120,
    },
    {
      id: '3',
      name: 'Jus Jeruk Peras',
      description: 'Jus jeruk peras segar tanpa pengawet. Diperas langsung di depan Anda, garansi kesegaran maksimal.',
      price: 18000,
      category: 'Jeruk',
      image_url: '/images/jus-jeruk.jpg',
      is_featured: true,
      rating: 4.7,
      review_count: 95,
    },
  ];

  const seoData = {
    title: 'Zatiaras Juice — Jus Terenak & Terbaik di Berau & Samarinda | Rating 4.9/5',
    description: 'Jus terenak di Berau & Samarinda! Rating 4.9/5 dari 150+ review. 100% alami, tanpa pengawet, garansi uang kembali. Order via WhatsApp/GoFood. Siap dalam 15 menit!',
    keywords: [
      'jus terenak berau',
      'jus terbaik samarinda',
      'jus alpukat terenak berau',
      'jus segar terbaik samarinda',
      'zatiaras juice berau',
      'zatiaras juice samarinda',
      'jus terenak di berau',
      'jus terbaik di samarinda',
      'menu jus terenak berau',
      'harga jus terbaik samarinda',
      'gofood berau jus terenak',
      'grabfood samarinda jus terbaik',
      'delivery jus terenak berau',
      'jus buah segar terbaik samarinda',
      'restoran jus terenak berau',
      'rating 4.9 jus berau',
      'review jus terbaik samarinda',
    ],
    canonical: 'https://zatiarasjuice.com',
    openGraph: {
      title: 'Zatiaras Juice — Jus Terenak & Terbaik di Berau & Samarinda | Rating 4.9/5',
      description: 'Jus terenak di Berau & Samarinda! Rating 4.9/5 dari 150+ review. 100% alami, tanpa pengawet, garansi uang kembali. Order via WhatsApp/GoFood.',
      image: 'https://zatiarasjuice.com/images/og-home.jpg',
      url: 'https://zatiarasjuice.com',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Zatiaras Juice — Jus Terenak & Terbaik di Berau & Samarinda | Rating 4.9/5',
      description: 'Jus terenak di Berau & Samarinda! Rating 4.9/5 dari 150+ review. 100% alami, tanpa pengawet, garansi uang kembali. Order via WhatsApp/GoFood.',
      image: 'https://zatiarasjuice.com/images/twitter-home.jpg',
    },
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Zatiaras Juice',
      description: 'Jus Terenak & Terbaik di Berau & Samarinda - Rating 4.9/5 dari 150+ review',
      url: 'https://zatiarasjuice.com',
      logo: 'https://zatiarasjuice.com/images/logo.png',
      sameAs: [
        'https://www.instagram.com/zatiarasjuice',
        'https://www.facebook.com/zatiarasjuice',
        'https://www.tiktok.com/@zatiarasjuice',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '150',
        bestRating: '5',
        worstRating: '1',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Menu Zatiaras Juice',
        itemListElement: featuredProducts.map((product) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: product.name,
            description: product.description,
          },
          price: product.price,
          priceCurrency: 'IDR',
        })),
      },
    },
  };

  return {
    props: {
      featuredProducts,
      seoData,
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default HomePage;
