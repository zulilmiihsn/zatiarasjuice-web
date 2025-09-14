'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MapPin, Phone } from 'lucide-react';

interface HeaderProps {
  branch?: 'berau' | 'samarinda';
  currentPath?: string;
}

const Header: React.FC<HeaderProps> = ({ branch, currentPath }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Beranda', href: branch ? `/${branch}` : '/' },
    { name: 'Menu', href: branch ? `/${branch}/menu` : '/menu' },
    { name: 'Tentang', href: branch ? `/${branch}/about` : '/about' },
    { name: 'Kontak', href: branch ? `/${branch}/contact` : '/contact' },
  ];

  const branchInfo = {
    berau: {
      name: 'Berau',
      phone: '+62812-3456-7890',
      address: 'Jl. Ahmad Yani No. 123, Berau',
    },
    samarinda: {
      name: 'Samarinda',
      phone: '+62812-3456-7891',
      address: 'Jl. Sudirman No. 456, Samarinda',
    },
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (href: string) => {
    setIsMenuOpen(false);
    router.push(href);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft'
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link href={branch ? `/${branch}` : '/'} className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">
                  Zatiaras Juice
                </h1>
                {branch && (
                  <p className="text-sm text-gray-600">{branchInfo[branch].name}</p>
                )}
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    currentPath === item.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {branch && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 text-sm text-gray-600"
              >
                <MapPin className="w-4 h-4" />
                <span>{branchInfo[branch].name}</span>
              </motion.div>
            )}
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`https://wa.me/${branch ? branchInfo[branch].phone.replace(/\D/g, '') : '6281234567890'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-glow transition-all duration-300"
            >
              Order Now
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMenuToggle}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-strong"
          >
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                      currentPath === item.href
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    {item.name}
                  </button>
                </motion.div>
              ))}
              
              {branch && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="pt-4 border-t border-gray-200"
                >
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{branchInfo[branch].address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                    <Phone className="w-4 h-4" />
                    <span>{branchInfo[branch].phone}</span>
                  </div>
                </motion.div>
              )}
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <a
                  href={`https://wa.me/${branch ? branchInfo[branch].phone.replace(/\D/g, '') : '6281234567890'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-full text-center font-medium hover:shadow-glow transition-all duration-300 block"
                >
                  Order via WhatsApp
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
