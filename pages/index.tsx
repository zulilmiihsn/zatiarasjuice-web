import React, { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroTrendy from '../components/HeroTrendy';
import ProductCardMinimal from '../components/ProductCardMinimal';
import LoadingSpinner from '../components/LoadingSpinner';
import { getUserLocationWithFallback } from '../lib/geolocation';
import { getBranchSEOData } from '../lib/seo';

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
        console.error('Error detecting location:', error);
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
        <Header />

        {/* Hero Section - Interactive & Trendy */}
        <HeroTrendy 
          branch={nearestBranch as 'berau' | 'samarinda' | null} 
          onBranchSelect={handleBranchSelect}
        />

        {/* Branch Selection Section - Clean & Elegant */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 font-rounded">
                Jus Terenak di Berau & Samarinda
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
                Lebih dari 500+ pelanggan puas setiap bulan. Rating 4.9/5 dari 150+ review. 
                <span className="text-primary-600 font-semibold"> Garansi uang kembali jika tidak puas!</span>
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Berau Branch - Clean Design */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl shadow-clean hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-600 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-3xl font-black text-white font-rounded">Berau</h3>
                      <p className="text-white/80 mt-2">Cabang Utama</p>
                    </div>
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
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBranchSelect('berau')}
                    className="w-full bg-primary-500 text-white py-3 rounded-xl font-semibold text-base hover:bg-primary-600 transition-all duration-200 mt-6"
                  >
                    Lihat Menu Berau
                  </motion.button>
                </div>
              </motion.div>

              {/* Samarinda Branch - Clean Design */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl shadow-clean hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-pinky-500 to-pinky-600 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-3xl font-black text-white font-rounded">Samarinda</h3>
                      <p className="text-white/80 mt-2">Cabang Utama</p>
                    </div>
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
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBranchSelect('samarinda')}
                    className="w-full bg-pinky-500 text-white py-3 rounded-xl font-semibold text-base hover:bg-pinky-600 transition-all duration-200 mt-6"
                  >
                    Lihat Menu Samarinda
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section - Clean & Elegant */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 font-display">
                Mengapa Zatiaras Juice adalah Pilihan Terbaik?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
                Inilah alasan mengapa pelanggan memilih Zatiaras Juice sebagai tempat jus terenak di Berau & Samarinda
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-clean hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">⭐</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4 font-rounded">Rating 4.9/5</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
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

        {/* Featured Products Section - Clean & Elegant */}
        {featuredProducts.length > 0 && (
          <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                {featuredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <ProductCardMinimal product={product} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimoni Section - Clean & Elegant */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-pinky-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
        itemListElement: featuredProducts.map((product, index) => ({
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
