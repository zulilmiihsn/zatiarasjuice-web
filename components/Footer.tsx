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
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Zatiaras Juice</h3>
                <p className="text-sm text-gray-400">Jus Alpukat & Buah Segar Nomor 1</p>
              </div>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed mb-6">
              Nikmati kesegaran jus alpukat dan aneka jus buah segar berkualitas tinggi. 
              Dibuat dengan cinta dan bahan-bahan terbaik untuk kesehatan Anda.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors duration-300"
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
            <h4 className="text-lg font-semibold mb-4">Menu Cepat</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-200 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
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
            <h4 className="text-lg font-semibold mb-4">
              {currentBranch ? `Cabang ${currentBranch.name}` : 'Lokasi Kami'}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-200 text-sm">
                    {currentBranch ? currentBranch.address : 'Berau & Samarinda, Kalimantan Timur'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a
                  href={`tel:${currentBranch?.phone || '+62812-3456-7890'}`}
                  className="text-gray-200 hover:text-white transition-colors duration-300 text-sm"
                >
                  {currentBranch?.phone || '+62812-3456-7890'}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <p className="text-gray-200 text-sm">
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
            <h4 className="text-lg font-semibold mb-4">Order Online</h4>
            <div className="space-y-3">
              {deliveryPartners.map((partner) => (
                <motion.a
                  key={partner.name}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-700 hover:bg-primary-500 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300"
                >
                  {partner.name}
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
        className="border-t border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span>© 2025 Zatiaras Juice. Dibuat dengan</span>
              <Heart className="w-4 h-4 text-primary-400 fill-current" />
              <span>di Kalimantan Timur</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <Link href="/privacy" className="hover:text-white transition-colors duration-300">
                Kebijakan Privasi
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-300">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
