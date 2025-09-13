import React, { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
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
      <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
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

      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <HeroBanner />

        {/* Location Detection Section */}
        {nearestBranch && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 py-16"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-white mb-4"
              >
                Kami Mendeteksi Lokasi Anda
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-white/90 mb-8"
              >
                Cabang terdekat: <span className="font-semibold capitalize">{nearestBranch}</span>
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBranchSelect(nearestBranch as 'berau' | 'samarinda')}
                  className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:shadow-strong transition-all duration-300"
                >
                  Lanjut ke Cabang {nearestBranch?.charAt(0).toUpperCase() + nearestBranch?.slice(1)}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLoading(false)}
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
                >
                  Pilih Cabang Lain
                </motion.button>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Branch Selection Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Pilih Cabang Terdekat
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Nikmati kesegaran jus alpukat dan aneka jus buah segar di cabang terdekat Anda
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Berau Branch */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden group"
              >
                <div className="h-64 bg-gradient-to-br from-green-400 to-green-600 relative">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-3xl font-bold text-white">Berau</h3>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Zatiaras Juice Berau</h3>
                  <p className="text-gray-600 mb-6">
                    Jl. Ahmad Yani No. 123, Berau, Kalimantan Timur
                  </p>
                  <div className="space-y-2 mb-6">
                    <p className="text-sm text-gray-500">📞 +62812-3456-7890</p>
                    <p className="text-sm text-gray-500">🕒 08:00 - 22:00 WITA</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBranchSelect('berau')}
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-xl font-semibold hover:shadow-glow transition-all duration-300"
                  >
                    Lihat Menu Berau
                  </motion.button>
                </div>
              </motion.div>

              {/* Samarinda Branch */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden group"
              >
                <div className="h-64 bg-gradient-to-br from-pink-400 to-pink-600 relative">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-3xl font-bold text-white">Samarinda</h3>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Zatiaras Juice Samarinda</h3>
                  <p className="text-gray-600 mb-6">
                    Jl. Sudirman No. 456, Samarinda, Kalimantan Timur
                  </p>
                  <div className="space-y-2 mb-6">
                    <p className="text-sm text-gray-500">📞 +62812-3456-7891</p>
                    <p className="text-sm text-gray-500">🕒 08:00 - 22:00 WITA</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBranchSelect('samarinda')}
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-xl font-semibold hover:shadow-glow transition-all duration-300"
                  >
                    Lihat Menu Samarinda
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        {featuredProducts.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Menu Favorit
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Pilihan terbaik dari menu Zatiaras Juice yang paling diminati
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Mock data untuk featured products
  const featuredProducts = [
    {
      id: '1',
      name: 'Jus Alpukat Premium',
      description: 'Jus alpukat segar dengan susu dan gula aren',
      price: 25000,
      category: 'Alpukat',
      image_url: '/images/jus-alpukat.jpg',
      is_featured: true,
      rating: 4.8,
      review_count: 120,
    },
    {
      id: '2',
      name: 'Jus Mangga Segar',
      description: 'Jus mangga manis dengan es batu',
      price: 20000,
      category: 'Mangga',
      image_url: '/images/jus-mangga.jpg',
      is_featured: true,
      rating: 4.7,
      review_count: 95,
    },
    {
      id: '3',
      name: 'Jus Jeruk Peras',
      description: 'Jus jeruk peras segar tanpa pengawet',
      price: 18000,
      category: 'Jeruk',
      image_url: '/images/jus-jeruk.jpg',
      is_featured: true,
      rating: 4.6,
      review_count: 80,
    },
  ];

  const seoData = {
    title: 'Zatiaras Juice — Jus Alpukat & Buah Segar Nomor 1 di Berau & Samarinda',
    description: 'Nikmati jus alpukat dan aneka jus segar di Zatiaras Juice. Menu lengkap, harga transparan, order via GoFood/GrabFood/WA. Lokasi: Berau & Samarinda, Kalimantan Timur',
    keywords: [
      'jus alpukat berau',
      'jus segar samarinda',
      'zatiaras juice',
      'menu jus berau',
      'harga jus samarinda',
      'gofood berau',
      'grabfood samarinda',
      'delivery jus berau',
      'jus buah segar samarinda',
      'restoran jus berau',
    ],
    canonical: 'https://zatiarasjuice.com',
    openGraph: {
      title: 'Zatiaras Juice — Jus Alpukat & Buah Segar Nomor 1',
      description: 'Nikmati jus alpukat dan aneka jus segar di Zatiaras Juice. Menu lengkap, harga transparan, order via GoFood/GrabFood/WA.',
      image: 'https://zatiarasjuice.com/images/og-home.jpg',
      url: 'https://zatiarasjuice.com',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Zatiaras Juice — Jus Alpukat & Buah Segar Nomor 1',
      description: 'Nikmati jus alpukat dan aneka jus segar di Zatiaras Juice. Menu lengkap, harga transparan, order via GoFood/GrabFood/WA.',
      image: 'https://zatiarasjuice.com/images/twitter-home.jpg',
    },
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Zatiaras Juice',
      description: 'Jus Alpukat & Buah Segar Nomor 1 di Berau & Samarinda',
      url: 'https://zatiarasjuice.com',
      logo: 'https://zatiarasjuice.com/images/logo.png',
      sameAs: [
        'https://www.instagram.com/zatiarasjuice',
        'https://www.facebook.com/zatiarasjuice',
        'https://www.tiktok.com/@zatiarasjuice',
      ],
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
