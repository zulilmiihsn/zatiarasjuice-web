import React, { lazy, Suspense } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Sparkles,
  Heart
} from 'lucide-react';
import Header from '../../components/Header';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getBranchSEOData } from '../../lib/seo';
import type { Branch } from '../../lib/supabase';

// Lazy load Footer untuk performa yang lebih baik
const Footer = lazy(() => import('../../components/Footer'));

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

// Instagram Icon Component
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

interface ContactPageProps {
  branch: Branch;
  seoData: any;
}

const ContactPage: React.FC<ContactPageProps> = ({ branch, seoData }) => {
  const contactInfo = {
    whatsapp: [
      {
        name: "WhatsApp Berau",
        number: "+62812-3456-7890",
        description: "Order & Customer Service Berau",
        link: "https://wa.me/6281234567890"
      },
      {
        name: "WhatsApp Samarinda", 
        number: "+62812-3456-7891",
        description: "Order & Customer Service Samarinda",
        link: "https://wa.me/6281234567891"
      }
    ],
    social: [
      {
        name: "Instagram",
        handle: "@zatiarasjuice",
        description: "Follow untuk update menu & promo",
        link: "https://instagram.com/zatiarasjuice",
        icon: InstagramIcon,
        color: "from-pink-500 to-purple-600"
      },
      {
        name: "TikTok",
        handle: "@zatiarasjuice",
        description: "Video tutorial & review produk",
        link: "https://tiktok.com/@zatiarasjuice",
        icon: TikTokIcon,
        color: "from-gray-900 to-gray-700"
      }
    ],
    branchInfo: {
      name: branch.charAt(0).toUpperCase() + branch.slice(1),
      address: branch === 'berau' 
        ? 'Jl. Ahmad Yani No. 123, Berau, Kalimantan Timur'
        : 'Jl. Sudirman No. 456, Samarinda, Kalimantan Timur',
      phone: branch === 'berau' ? '+62812-3456-7890' : '+62812-3456-7891',
      hours: '08:00 - 22:00 WITA'
    }
  };

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta property="og:title" content={seoData.ogTitle} />
        <meta property="og:description" content={seoData.ogDescription} />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <Header branch={branch} currentPath="/contact" />
        
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
                Hubungi Kami - {contactInfo.branchInfo.name}
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
                Mari <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-pinky-500">Terhubung</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Tim customer service cabang {contactInfo.branchInfo.name} siap melayani Anda 24/7. 
                Pilih cara yang paling nyaman untuk menghubungi kami!
              </p>
            </motion.div>
          </div>
        </section>

        {/* WhatsApp Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
                  WhatsApp
                </span> Customer Service
              </h2>
              <p className="text-lg text-gray-600">
                Chat langsung dengan tim cabang {contactInfo.branchInfo.name}
              </p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              {contactInfo.whatsapp.map((wa, index) => (
                <motion.div
                  key={wa.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    boxShadow: '0 25px 50px -12px rgba(34, 197, 94, 0.25)'
                  }}
                  className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-luxury hover:shadow-premium transition-all duration-500 overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <WhatsAppIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{wa.name}</h3>
                        <p className="text-gray-600">{wa.description}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-green-600" />
                        <span className="text-lg font-semibold text-gray-900">{wa.number}</span>
                      </div>

                      <motion.a
                        href={wa.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>Chat Sekarang</span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  Social Media
                </span> Kami
              </h2>
              <p className="text-lg text-gray-600">
                Follow untuk update menu terbaru, promo, dan konten menarik
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {contactInfo.social.map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                  }}
                  className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-luxury hover:shadow-premium transition-all duration-500 overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${social.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <social.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{social.name}</h3>
                        <p className="text-gray-600">{social.description}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold text-gray-900">{social.handle}</span>
                      </div>

                      <motion.a
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`inline-flex items-center gap-3 bg-gradient-to-r ${social.color} text-white px-6 py-4 rounded-2xl font-bold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl`}
                      >
                        <social.icon className="w-5 h-5" />
                        <span>Follow Sekarang</span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Branch Information */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-pinky-500">
                  Lokasi
                </span> Cabang {contactInfo.branchInfo.name}
              </h2>
              <p className="text-lg text-gray-600">
                Kunjungi cabang {contactInfo.branchInfo.name} atau hubungi langsung
              </p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  boxShadow: '0 25px 50px -12px rgba(255, 110, 199, 0.25)'
                }}
                className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-luxury hover:shadow-premium transition-all duration-500 overflow-hidden"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-pinky-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-pinky-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Cabang {contactInfo.branchInfo.name}</h3>
                      <p className="text-gray-600">Lokasi & Informasi</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary-600 mt-1" />
                      <span className="text-gray-700">{contactInfo.branchInfo.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary-600" />
                      <span className="text-gray-700">{contactInfo.branchInfo.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary-600" />
                      <span className="text-gray-700">{contactInfo.branchInfo.hours}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
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
                Siap Melayani Anda! <Heart className="inline-block w-8 h-8 text-red-400 ml-2" />
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Tim customer service cabang {contactInfo.branchInfo.name} siap membantu Anda 24/7. 
                Jangan ragu untuk menghubungi kami!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href={contactInfo.whatsapp[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <WhatsAppIcon className="w-6 h-6" />
                  <span>Chat WhatsApp</span>
                </motion.a>
                
                <motion.a
                  href="https://instagram.com/zatiarasjuice"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/30 transition-all duration-300 border border-white/30"
                >
                  <InstagramIcon className="w-6 h-6" />
                  <span>Follow Instagram</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
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
      seoData: getBranchSEOData(branch, 'contact'),
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default ContactPage;
