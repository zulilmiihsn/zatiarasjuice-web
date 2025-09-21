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
  const router = useRouter();

  const navigationItems = [
    { name: 'Menu', href: branch ? `/${branch}/menu` : '/menu' },
    { name: 'Beranda', href: branch ? `/${branch}` : '/' },
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
      className="absolute top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 lg:h-14">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link href={branch ? `/${branch}` : '/'} className="flex items-center">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-primary-500 to-pinky-500 rounded-2xl flex items-center justify-center shadow-glow-primary hover:shadow-glow-pinky transition-all duration-300"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 360,
                  boxShadow: '0 0 30px rgba(255, 110, 199, 0.6), 0 0 60px rgba(255, 110, 199, 0.3)'
                }}
                whileTap={{ scale: 0.9 }}
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(255, 110, 199, 0.4)',
                    '0 0 30px rgba(255, 110, 199, 0.6)',
                    '0 0 20px rgba(255, 110, 199, 0.4)'
                  ]
                }}
                transition={{ 
                  boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                }}
              >
                <motion.span 
                  className="text-white font-black text-xl font-display"
                  animate={{ 
                    textShadow: [
                      '0 0 10px rgba(255, 255, 255, 0.5)',
                      '0 0 20px rgba(255, 255, 255, 0.8)',
                      '0 0 10px rgba(255, 255, 255, 0.5)'
                    ]
                  }}
                  transition={{ 
                    textShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                  }}
                >
                  Z
                </motion.span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link
                  href={item.href}
                  className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 relative overflow-hidden group ${
                    currentPath === item.href
                      ? 'text-white bg-white/20 backdrop-blur-xl border border-white/30 shadow-glass'
                      : 'text-white hover:text-primary-200 hover:bg-white/20 hover:backdrop-blur-sm'
                  }`}
                >
                  {/* Ripple Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    whileHover={{
                      scale: [1, 1.2, 1],
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut"
                    }}
                    style={{
                      background: currentPath === item.href 
                        ? 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)'
                    }}
                  />
                  
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    whileHover={{
                      boxShadow: currentPath === item.href
                        ? '0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(255, 255, 255, 0.2)'
                        : '0 0 15px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.1)'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.span
                    className="relative z-10"
                    whileHover={{ 
                      textShadow: currentPath === item.href
                        ? '0 0 12px rgba(255, 255, 255, 0.9)'
                        : '0 0 8px rgba(255, 255, 255, 0.6)'
                    }}
                >
                  {item.name}
                  </motion.span>
                  
                  {/* Active State Overlay */}
                  {currentPath === item.href && (
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl bg-white/30 backdrop-blur-xl"
                      initial={false}
                    />
                  )}
                  
                  {/* Floating Particles Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                    whileHover={{
                      background: [
                        'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
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
                className="flex items-center space-x-2 text-sm transition-colors duration-500 text-white drop-shadow-md"
              >
                <MapPin className="w-4 h-4" />
                <span>{branchInfo[branch].name}</span>
              </motion.div>
            )}
            
            <motion.a
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: '0 20px 40px rgba(255, 110, 199, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
              href={`https://wa.me/${branch ? branchInfo[branch].phone.replace(/\D/g, '') : '6281234567890'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center gap-2 relative overflow-hidden group bg-white/20 backdrop-blur-xl border border-white/30 text-white hover:bg-white/30 hover:backdrop-blur-2xl shadow-glass hover:shadow-glass-strong"
            >
              {/* Ripple Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                whileHover={{
                  scale: [1, 1.3, 1],
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut"
                }}
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)'
                }}
              />
              
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                whileHover={{
                  background: [
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
                      ],
                  backgroundPosition: ['-100%', '100%', '-100%']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: '200% 100%'
                }}
              />
              
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl bg-white/30 backdrop-blur-xl"
                initial={false}
              />
              
              <span className="relative z-10">Order Now</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMenuToggle}
            className="lg:hidden p-1.5 rounded-2xl transition-all duration-500 relative overflow-hidden group text-white hover:text-primary-200 hover:bg-white/20 drop-shadow-lg"
          >
            {/* Ripple Effect for Mobile Button */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              whileHover={{
                scale: [1, 1.2, 1],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut"
              }}
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)'
              }}
            />
            
            <span className="relative z-10">
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </span>
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
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-white/20 shadow-strong"
          >
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavigation(item.href)}
                    className={`w-full text-left px-3 py-2 rounded-2xl text-base font-medium transition-all duration-300 relative overflow-hidden group ${
                      currentPath === item.href
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    {/* Ripple Effect for Mobile Menu Items */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      whileHover={{
                        scale: [1, 1.1, 1],
                        opacity: [0, 0.2, 0],
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut"
                      }}
                      style={{
                        background: currentPath === item.href
                          ? 'radial-gradient(circle, rgba(255,110,199,0.2) 0%, transparent 70%)'
                          : 'radial-gradient(circle, rgba(255,110,199,0.1) 0%, transparent 70%)'
                      }}
                    />
                    <span className="relative z-10">{item.name}</span>
                  </motion.button>
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
                <motion.a
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={`https://wa.me/${branch ? branchInfo[branch].phone.replace(/\D/g, '') : '6281234567890'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-2xl text-center font-bold hover:shadow-glow transition-all duration-300 block relative overflow-hidden group"
                >
                  {/* Ripple Effect for Mobile CTA */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    whileHover={{
                      scale: [1, 1.2, 1],
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut"
                    }}
                    style={{
                      background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)'
                    }}
                  />
                  
                  {/* Shimmer Effect for Mobile CTA */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    whileHover={{
                      background: [
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                      ],
                      backgroundPosition: ['-100%', '100%', '-100%']
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      backgroundSize: '200% 100%'
                    }}
                  />
                  
                  <span className="relative z-10">Order via WhatsApp</span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
