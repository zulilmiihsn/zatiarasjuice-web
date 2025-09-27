import React, { lazy, Suspense, startTransition } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Utensils, ArrowLeft, Sparkles, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import LoadingSpinner from '../../components/LoadingSpinner';
import type { Branch } from '../../lib/supabase';

// Lazy load Footer untuk performa yang lebih baik
const Footer = lazy(() => import('../../components/Footer'));

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

// GoFood Icon Component (Sendok & Garpu)
const GoFoodIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
  </svg>
);

// Grab Icon Component (Sendok & Garpu)
const GrabIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
  </svg>
);

interface PesanPageProps {
  branch: Branch;
}

const PesanPage: React.FC<PesanPageProps> = ({ branch }) => {
  const router = useRouter();
  const branchInfo = {
    berau: {
      name: 'Berau',
      phone: '+62813-4988-2015',
      address: 'Jl. Merah Delima depan Klinik Berlian Bakti, Berau, Kalimantan Timur',
      city: 'Berau'
    },
    samarinda: {
      name: 'Samarinda',
      phone: '+62813-5007-6071',
      address: 'Jl. Juanda Samping Ami Ali Parfum, Samarinda, Kalimantan Timur',
      city: 'Samarinda'
    }
  }[branch] || {
    name: 'Zatiaras Juice',
    phone: '+62813-4988-2015',
    address: 'Cabang Utama',
    city: 'Kalimantan Timur'
  };
  
  const orderOptions = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      description: 'Chat langsung dengan tim kami',
      icon: WhatsAppIcon,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50',
      textColor: 'text-green-700',
      link: `https://wa.me/${branchInfo.phone.replace(/\D/g, '')}?text=Halo, saya ingin order dari Zatiaras Juice ${branchInfo.name}`,
      features: ['Chat langsung', 'Custom order', 'Konfirmasi cepat']
    },
    {
      id: 'gofood',
      name: 'GoFood',
      description: 'Order via GoFood',
      icon: GoFoodIcon,
      color: 'from-red-500 to-red-600',
      bgColor: 'from-red-50 to-red-50',
      textColor: 'text-red-700',
      link: branch === 'berau' 
        ? 'https://gofood.co.id/berau/restaurant/juice-zatiaras-tanjungredeb-65ca1162-75a7-4c4e-ab1e-14369af8bf64'
        : 'https://gofood.co.id/samarinda/restaurant/zatiaras-jus-samarinda-e66a662d-6a07-4069-b35f-62642eb1e2c6',
      features: ['Delivery cepat', 'Pembayaran mudah', 'Tracking order']
    },
    {
      id: 'grab',
      name: 'Grab',
      description: 'Order via Grab',
      icon: GrabIcon,
      color: 'from-green-600 to-green-700',
      bgColor: 'from-green-50 to-green-50',
      textColor: 'text-green-700',
      link: branch === 'berau'
        ? 'https://food.grab.com/id/en/restaurant/zatiaras-juice-berau'
        : 'https://food.grab.com/id/en/restaurant/zatiaras-juice-samarinda',
      features: ['Promo menarik', 'Rating & review', 'Customer support']
    }
  ];

  return (
    <>
      <Head>
        <title>{`Pesan Sekarang - Zatiaras Juice ${branchInfo.name} | WhatsApp, GoFood, Grab`}</title>
        <meta name="description" content={`Pesan Zatiaras Juice ${branchInfo.name} melalui WhatsApp, GoFood, atau Grab. Delivery cepat dan mudah di ${branchInfo.city}.`} />
        <meta name="keywords" content={`pesan zatiaras juice ${branch}, whatsapp order ${branchInfo.city}, gofood ${branchInfo.city}, grab ${branchInfo.city}, delivery ${branchInfo.city}`} />
        <link rel="canonical" href={`https://zatiarasjuice.com/${branch}/pesan`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`Pesan Sekarang - Zatiaras Juice ${branchInfo.name} | WhatsApp, GoFood, Grab`} />
        <meta property="og:description" content={`Pesan Zatiaras Juice ${branchInfo.name} melalui WhatsApp, GoFood, atau Grab. Delivery cepat dan mudah di ${branchInfo.city}.`} />
        <meta property="og:url" content={`https://zatiarasjuice.com/${branch}/pesan`} />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-white">
        <Header branch={branch} currentPath={`/${branch}/pesan`} />
        
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-pinky-500/10" />
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-32 right-16 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-pinky-500 text-white rounded-full text-sm font-semibold mb-6"
              >
                <Sparkles className="w-4 h-4" />
                {branchInfo.name}
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-pinky-500">Pesan</span> Sekarang
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Pilih platform pesanan favorit Anda untuk cabang <strong>{branchInfo.name}</strong>.
              </p>

              {/* Branch Info */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-pinky-500" />
                  <span>{branchInfo.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-pinky-500" />
                  <span>{branchInfo.phone}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Order Options Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                Pilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-pinky-500">Platform</span> Pesanan
              </h2>
              <p className="text-lg text-gray-600">
                WhatsApp untuk chat langsung, GoFood & Grab untuk delivery
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {orderOptions.map((option, index) => (
                <motion.a
                  key={option.id}
                  href={option.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }}
                  className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-luxury hover:shadow-premium transition-all duration-500 overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${option.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <div className={`w-20 h-20 bg-gradient-to-r ${option.color} rounded-3xl flex items-center justify-center shadow-lg mx-auto mb-6`}>
                        <option.icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className={`text-2xl font-bold ${option.textColor} mb-2`}>{option.name}</h3>
                      <p className="text-gray-600">{option.description}</p>
                    </div>

                    <div className="space-y-4 mb-8">
                      {option.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <div className={`w-2 h-2 bg-gradient-to-r ${option.color} rounded-full`} />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full bg-gradient-to-r ${option.color} text-white px-6 py-4 rounded-2xl font-bold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl text-center`}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <option.icon className="w-5 h-5" />
                        <span>Pesan Sekarang</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary-500 to-pinky-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                Masih Bingung Pilih Platform? <Sparkles className="inline-block w-8 h-8 text-yellow-300 ml-2" />
              </h2>
              <p className="text-xl text-white/90 mb-8">
                <strong>WhatsApp</strong> untuk chat langsung dan custom order, 
                <strong> GoFood & Grab</strong> untuk delivery cepat dan mudah!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    startTransition(() => {
                      router.push(`/${branch}`);
                    });
                  }}
                  className="inline-flex items-center gap-3 bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Kembali ke Beranda</span>
                </button>
                <Link
                  href={`/${branch}/menu`}
                  className="inline-flex items-center gap-3 bg-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Utensils className="w-5 h-5" />
                  <span>Lihat Menu</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

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

  return {
    props: {
      branch,
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default PesanPage;
