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

  // Handle scroll effect with smooth transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled
          ? 'bg-white shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 lg:h-14">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link href={branch ? `/${branch}` : '/'} className="flex items-center">
              <motion.div 
                className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center shadow-clean"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-bold text-lg font-display">Z</span>
              </motion.div>
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
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPath === item.href
                      ? 'text-white bg-primary-500'
                      : isScrolled
                      ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      : 'text-white hover:text-primary-200 hover:bg-white/20'
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
                className={`flex items-center space-x-2 text-sm transition-colors duration-500 ${
                  isScrolled ? 'text-gray-600' : 'text-white drop-shadow-md'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>{branchInfo[branch].name}</span>
              </motion.div>
            )}
            
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`https://wa.me/${branch ? branchInfo[branch].phone.replace(/\D/g, '') : '6281234567890'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 bg-primary-500 text-white hover:bg-primary-600"
            >
              <span>🍹</span>
              <span>Order Now</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMenuToggle}
            className={`lg:hidden p-1.5 rounded-lg transition-all duration-500 ${
              isScrolled
                ? 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                : 'text-white hover:text-primary-200 hover:bg-white/20 drop-shadow-lg'
            }`}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl text-center font-bold hover:shadow-glow transition-all duration-300 block"
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
