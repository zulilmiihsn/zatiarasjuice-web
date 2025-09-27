import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Clock,
  Heart,
  Utensils,
  Sparkles
} from 'lucide-react';

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

interface FooterProps {
  branch?: 'berau' | 'samarinda';
}

const Footer: React.FC<FooterProps> = ({ branch }) => {
  const branchInfo = {
    berau: {
      name: 'Berau',
      address: 'Jl. Merah Delima depan Klinik Berlian Bakti, Berau, Kalimantan Timur',
      phone: '+62813-4988-2015',
      whatsapp: '+62813-5035-4856',
      hours: '08:00 - 22:00 WITA',
    },
    samarinda: {
      name: 'Samarinda',
      address: 'Jl. Juanda Samping Ami Ali Parfum, Samarinda, Kalimantan Timur',
      phone: '+62813-5007-6071',
      whatsapp: '+62858-2061-5188',
      hours: '08:00 - 22:00 WITA',
    },
  };

  const currentBranch = branch ? branchInfo[branch] : null;

  const quickLinks = [
    { name: 'Beranda', href: branch ? `/${branch}` : '/' },
    { name: 'Menu', href: branch ? `/${branch}/menu` : '/menu' },
    { name: 'Kontak', href: branch ? `/${branch}/contact` : '/contact' },
  ];

  // TikTok Icon Component
  const TikTokIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );

  const socialLinks = branch === 'berau' ? [
    { name: 'Instagram', href: 'https://instagram.com/zatiarasjuice', icon: Instagram },
    { name: 'Facebook', href: 'https://facebook.com/zatiarasjuice', icon: Facebook },
    { name: 'TikTok', href: 'https://tiktok.com/@zatiarasjuice_01', icon: TikTokIcon },
  ] : branch === 'samarinda' ? [
    { name: 'Instagram', href: 'https://instagram.com/zatiarasjuice_smr', icon: Instagram },
    { name: 'Facebook', href: 'https://facebook.com/zatiarasjuice', icon: Facebook },
    { name: 'TikTok', href: 'https://tiktok.com/@zatiarasjuice_01', icon: TikTokIcon },
  ] : [
    { name: 'Instagram', href: 'https://instagram.com/zatiarasjuice_smr', icon: Instagram },
    { name: 'Facebook', href: 'https://facebook.com/zatiarasjuice', icon: Facebook },
    { name: 'TikTok', href: 'https://tiktok.com/@zatiarasjuice_01', icon: TikTokIcon },
  ];

  const deliveryPartners = branch === 'berau' ? [
    { name: 'GoFood', href: 'https://gofood.co.id/berau/restaurant/juice-zatiaras-tanjungredeb-65ca1162-75a7-4c4e-ab1e-14369af8bf64' },
    { name: 'GrabFood', href: 'https://food.grab.com/id/en/restaurant/zatiaras-juice-berau' },
    { name: 'WhatsApp', href: `https://wa.me/${currentBranch?.whatsapp.replace(/\D/g, '') || '6281350354856'}?text=Halo, saya ingin order dari Zatiaras Juice Berau` },
  ] : branch === 'samarinda' ? [
    { name: 'GoFood', href: 'https://gofood.co.id/samarinda/restaurant/zatiaras-jus-samarinda-e66a662d-6a07-4069-b35f-62642eb1e2c6' },
    { name: 'GrabFood', href: 'https://food.grab.com/id/en/restaurant/zatiaras-juice-samarinda' },
    { name: 'WhatsApp', href: `https://wa.me/${currentBranch?.whatsapp.replace(/\D/g, '') || '6285820615188'}?text=Halo, saya ingin order dari Zatiaras Juice Samarinda` },
  ] : [
    { name: 'GoFood', href: 'https://gofood.co.id/merchant/zatiaras-juice' },
    { name: 'GrabFood', href: 'https://food.grab.com/id/en/restaurant/zatiaras-juice' },
    { name: 'WhatsApp', href: 'https://wa.me/6281234567890' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-luxury-900 to-gray-800 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-primary-500/20 to-pinky-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
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
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-secondary-500/20 rounded-full blur-3xl"
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
        <motion.div
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-gold-500/15 to-accent-500/15 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-4 mb-8">
              <motion.div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Zatiaras Juice Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <div>
                <h3 className="text-2xl font-black text-white font-display text-premium">Zatiaras Juice</h3>
                <p className="text-base text-gray-300 font-semibold">Jus Alpukat & Buah Segar Nomor 1</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Nikmati kesegaran Jus Alpukat dan Aneka Jus Buah Segar berkualitas. 
              Dibuat dengan cinta dan bahan-bahan terbaik untuk kesehatan dan kepuasan Anda.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: 5,
                    boxShadow: '0 10px 25px rgba(255, 110, 199, 0.4)'
                  }}
                  whileTap={{ scale: 0.9 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-600 rounded-2xl flex items-center justify-center hover:from-primary-500 hover:to-pinky-500 transition-all duration-300 shadow-elegant hover:shadow-glow-primary"
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xl font-bold mb-6 text-white font-display">🚀 Menu Cepat</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm font-medium hover:translate-x-2 inline-block"
                  >
                    <Sparkles className="w-4 h-4 text-pink-400" /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Branch Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-bold mb-6 text-white font-display">
              {currentBranch ? `🏪 Cabang ${currentBranch.name}` : '📍 Lokasi Kami'}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    {currentBranch ? currentBranch.address : 'Berau & Samarinda, Kalimantan Timur'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a
                  href={`tel:${currentBranch?.phone || '+62812-3456-7890'}`}
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm"
                >
                  {currentBranch?.phone || '+62812-3456-7890'}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  {currentBranch?.hours || '08:00 - 22:00 WITA'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Delivery Partners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-xl font-bold mb-6 text-white font-display">🛒 Order Online</h4>
            <div className="space-y-4">
              {deliveryPartners.map((partner) => (
                <motion.a
                  key={partner.name}
                  whileHover={{ scale: 1.05, x: 5, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-r from-gray-700 to-gray-600 hover:from-primary-500 hover:to-cute-500 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-300 shadow-cute hover:shadow-elegant"
                >
                  <span className="flex items-center gap-2">
                    {partner.name === 'WhatsApp' ? (
                      <WhatsAppIcon className="w-5 h-5 text-green-500" />
                    ) : partner.name === 'GoFood' ? (
                      <Utensils className="w-5 h-5 text-red-500" />
                    ) : (
                      <Utensils className="w-5 h-5 text-orange-500" />
                    )}
                    <span>{partner.name}</span>
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-t border-gray-700 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-300 font-medium">
              <span>© 2025 Zatiaras Juice. Dibuat dengan</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-5 h-5 text-primary-400 fill-current" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
