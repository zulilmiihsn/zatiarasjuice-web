'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Twitter,
  Clock,
  Heart
} from 'lucide-react';

interface FooterProps {
  branch?: 'berau' | 'samarinda';
}

const Footer: React.FC<FooterProps> = ({ branch }) => {
  const branchInfo = {
    berau: {
      name: 'Berau',
      address: 'Jl. Ahmad Yani No. 123, Berau, Kalimantan Timur',
      phone: '+62812-3456-7890',
      whatsapp: '+62812-3456-7890',
      hours: '08:00 - 22:00 WITA',
    },
    samarinda: {
      name: 'Samarinda',
      address: 'Jl. Sudirman No. 456, Samarinda, Kalimantan Timur',
      phone: '+62812-3456-7891',
      whatsapp: '+62812-3456-7891',
      hours: '08:00 - 22:00 WITA',
    },
  };

  const currentBranch = branch ? branchInfo[branch] : null;

  const quickLinks = [
    { name: 'Beranda', href: branch ? `/${branch}` : '/' },
    { name: 'Menu', href: branch ? `/${branch}/menu` : '/menu' },
    { name: 'Tentang Kami', href: branch ? `/${branch}/about` : '/about' },
    { name: 'Kontak', href: branch ? `/${branch}/contact` : '/contact' },
  ];

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/zatiarasjuice', icon: Instagram },
    { name: 'Facebook', href: 'https://facebook.com/zatiarasjuice', icon: Facebook },
    { name: 'Twitter', href: 'https://twitter.com/zatiarasjuice', icon: Twitter },
  ];

  const deliveryPartners = [
    { name: 'GoFood', href: 'https://gofood.co.id/merchant/zatiaras-juice' },
    { name: 'GrabFood', href: 'https://food.grab.com/id/en/restaurant/zatiaras-juice' },
    { name: 'WhatsApp', href: `https://wa.me/${currentBranch?.whatsapp.replace(/\D/g, '') || '6281234567890'}` },
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-6">
              <motion.div 
                className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center shadow-clean"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-white font-bold text-lg font-display">Z</span>
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white font-display">Zatiaras Juice</h3>
                <p className="text-sm text-gray-300 font-medium">Jus Alpukat & Buah Segar Nomor 1</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Nikmati kesegaran jus alpukat dan aneka jus buah segar berkualitas tinggi. 
              Dibuat dengan cinta dan bahan-bahan terbaik untuk kesehatan Anda.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-all duration-200"
                >
                  <social.icon className="w-5 h-5" />
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
                    ✨ {link.name}
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
                  className="block bg-gradient-to-r from-gray-700 to-gray-600 hover:from-primary-500 hover:to-cute-500 rounded-2xl px-6 py-3 text-sm font-bold transition-all duration-300 shadow-cute hover:shadow-elegant"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">
                      {partner.name === 'WhatsApp' ? '💬' : partner.name === 'GoFood' ? '🚚' : '🍽️'}
                    </span>
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
              <span>di Kalimantan Timur ✨</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <Link href="/privacy" className="hover:text-primary-400 transition-colors duration-300 font-medium">
                🔒 Kebijakan Privasi
              </Link>
              <Link href="/terms" className="hover:text-primary-400 transition-colors duration-300 font-medium">
                📋 Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
