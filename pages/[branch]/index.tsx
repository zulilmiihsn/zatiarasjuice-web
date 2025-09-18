import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroBanner from '../../components/HeroBanner';
import ProductCard from '../../components/ProductCard';
import { getProducts, getCategories, getBranchInfo, createSupabaseClient } from '../../lib/supabase';
import { getBranchSEOData, getMenuStructuredData } from '../../lib/seo';
import { Branch, Product, Category } from '../../lib/supabase';

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
  const router = useRouter();
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

  const handleAddToCart = async (product: any) => {
    // Implementasi add to cart logic
    console.log('Adding to cart:', product);
  };

  const featuredProducts = products.filter(product => product.is_featured);
  const categoryNames = categories.map(cat => cat.name);

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
        <Header branch={branch} />
        
        {/* Hero Section */}
        <HeroBanner branch={branch} />

        {/* Branch Info Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Zatiaras Juice {branch.charAt(0).toUpperCase() + branch.slice(1)}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {branchInfo?.description || `Nikmati kesegaran jus alpukat dan aneka jus buah segar di cabang ${branch}`}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Lokasi</h3>
                <p className="text-gray-600">
                  {branchInfo?.address || `Jl. Contoh No. 123, ${branch.charAt(0).toUpperCase() + branch.slice(1)}`}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Telepon</h3>
                <p className="text-gray-600">
                  {branchInfo?.phone || '+62812-3456-7890'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Jam Operasional</h3>
                <p className="text-gray-600">
                  {branchInfo?.hours || '08:00 - 22:00 WITA'}
                </p>
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
                    <ProductCard 
                      product={product} 
                      onAddToCart={handleAddToCart}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={favorites.includes(product.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Category Filter Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Menu Lengkap
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Pilih kategori favorit Anda dan nikmati kesegaran jus buah segar
              </p>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryChange('all')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-primary-500 text-white shadow-glow'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                    Semua
                  </motion.button>
              {categoryNames.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white shadow-glow'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ProductCard 
                    product={product} 
                    onAddToCart={handleAddToCart}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favorites.includes(product.id)}
                  />
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-500 text-lg">Tidak ada produk dalam kategori ini</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">
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
            </motion.div>
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

export default BranchPage;
