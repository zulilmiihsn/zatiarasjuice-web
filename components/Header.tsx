'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MapPin, Phone, ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import CartSidebar from './CartSidebar';

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

interface HeaderProps {
  branch?: 'berau' | 'samarinda';
  currentPath?: string;
}

const Header: React.FC<HeaderProps> = ({ branch, currentPath }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();
  const { cart } = useCart();

  // Check if current page is menu or contact page
  const isMenuPage = currentPath?.includes('/menu');
  const isContactPage = currentPath?.includes('/contact');
  const isSpecialPage = isMenuPage || isContactPage;
  const isHomepage = currentPath === '/' || currentPath === undefined;

  const navigationItems = [
    { name: 'Menu', href: branch ? `/${branch}/menu` : '/menu' },
    { name: 'Beranda', href: branch ? `/${branch}` : '/' },
    { name: 'Pesan', href: branch ? `/${branch}/pesan` : '/pesan' },
    ...(branch ? [{ name: 'Kontak', href: `/${branch}/contact` }] : []),
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
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Zatiaras Juice Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  priority
                />
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
                      ? isSpecialPage 
                        ? 'text-pink-800 bg-pink-100/80 backdrop-blur-xl border border-pink-200 shadow-glass'
                        : 'text-white bg-white/20 backdrop-blur-xl border border-white/30 shadow-glass'
                      : isSpecialPage
                        ? 'text-pink-700 hover:text-pink-800 hover:bg-pink-100/60 hover:backdrop-blur-sm'
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
                        ? isSpecialPage
                          ? 'radial-gradient(circle, rgba(244,114,182,0.3) 0%, transparent 70%)'
                          : 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)'
                        : isSpecialPage
                          ? 'radial-gradient(circle, rgba(244,114,182,0.2) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)'
                    }}
                  />
                  
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    whileHover={{
                      boxShadow: currentPath === item.href
                        ? isSpecialPage
                          ? '0 0 20px rgba(244, 114, 182, 0.4), 0 0 40px rgba(244, 114, 182, 0.2)'
                          : '0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(255, 255, 255, 0.2)'
                        : isSpecialPage
                          ? '0 0 15px rgba(244, 114, 182, 0.3), 0 0 30px rgba(244, 114, 182, 0.1)'
                        : '0 0 15px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.1)'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.span
                    className="relative z-10"
                    whileHover={{ 
                      textShadow: currentPath === item.href
                        ? isSpecialPage
                          ? '0 0 12px rgba(244, 114, 182, 0.9)'
                          : '0 0 12px rgba(255, 255, 255, 0.9)'
                        : isSpecialPage
                          ? '0 0 8px rgba(244, 114, 182, 0.6)'
                        : '0 0 8px rgba(255, 255, 255, 0.6)'
                    }}
                >
                  {item.name}
                  </motion.span>
                  
                  {/* Active State Overlay */}
                  {currentPath === item.href && (
                    <motion.div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl backdrop-blur-xl ${
                        isSpecialPage ? 'bg-pink-200/30' : 'bg-white/30'
                      }`}
                      initial={false}
                    />
                  )}
                  
                  {/* Floating Particles Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                    whileHover={{
                      background: isSpecialPage ? [
                        'radial-gradient(circle at 20% 20%, rgba(244,114,182,0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 80%, rgba(244,114,182,0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 20%, rgba(244,114,182,0.1) 0%, transparent 50%)'
                      ] : [
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
            {/* Branch Info - Only show if branch is selected and not on homepage */}
            {branch && !isHomepage && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 text-sm transition-colors duration-500 drop-shadow-md ${
                  isSpecialPage 
                    ? 'text-pink-700' 
                    : 'text-white'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>{branchInfo[branch].name}</span>
              </motion.div>
            )}
            
            {/* Cart Icon */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className={`relative p-3 rounded-2xl transition-all duration-300 ${
                isSpecialPage
                  ? 'bg-pink-100/80 hover:bg-pink-200/80 text-pink-800'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-pinky-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cart.totalItems}
                </motion.span>
              )}
            </motion.button>
            
            {/* Pesan Button */}
            <motion.a
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: isSpecialPage 
                  ? '0 20px 40px rgba(244, 114, 182, 0.3)'
                  : '0 20px 40px rgba(255, 110, 199, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
              href={branch ? `/${branch}/pesan` : '/pesan'}
              className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center gap-2 relative overflow-hidden group backdrop-blur-xl border shadow-glass hover:shadow-glass-strong ${
                isSpecialPage
                  ? 'bg-pink-100/80 border-pink-200 text-pink-800 hover:bg-pink-200/80 hover:backdrop-blur-2xl'
                  : 'bg-white/20 border-white/30 text-white hover:bg-white/30 hover:backdrop-blur-2xl'
              }`}
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
                  background: isSpecialPage
                    ? 'radial-gradient(circle, rgba(244,114,182,0.3) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)'
                }}
              />
              
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                whileHover={{
                  background: isSpecialPage ? [
                        'linear-gradient(90deg, transparent, rgba(244,114,182,0.3), transparent)',
                        'linear-gradient(90deg, transparent, rgba(244,114,182,0.5), transparent)',
                        'linear-gradient(90deg, transparent, rgba(244,114,182,0.3), transparent)'
                      ] : [
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
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl backdrop-blur-xl ${
                  isSpecialPage ? 'bg-pink-200/30' : 'bg-white/30'
                }`}
                initial={false}
              />
              
              <span className="relative z-10">Pesan</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMenuToggle}
            className={`lg:hidden p-1.5 rounded-2xl transition-all duration-500 relative overflow-hidden group drop-shadow-lg ${
              isSpecialPage
                ? 'text-pink-700 hover:text-pink-800 hover:bg-pink-100/60'
                : 'text-white hover:text-primary-200 hover:bg-white/20'
            }`}
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
                background: isSpecialPage
                  ? 'radial-gradient(circle, rgba(244,114,182,0.2) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)'
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
            className={`lg:hidden backdrop-blur-xl border-t shadow-strong ${
              isSpecialPage
                ? 'bg-pink-50/95 border-pink-200'
                : 'bg-white/95 border-white/20'
            }`}
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
                        ? isSpecialPage
                          ? 'text-pink-800 bg-pink-100'
                          : 'text-primary-600 bg-primary-50'
                        : isSpecialPage
                          ? 'text-pink-700 hover:text-pink-800 hover:bg-pink-100'
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
                          ? isSpecialPage
                            ? 'radial-gradient(circle, rgba(244,114,182,0.2) 0%, transparent 70%)'
                            : 'radial-gradient(circle, rgba(255,110,199,0.2) 0%, transparent 70%)'
                          : isSpecialPage
                            ? 'radial-gradient(circle, rgba(244,114,182,0.1) 0%, transparent 70%)'
                          : 'radial-gradient(circle, rgba(255,110,199,0.1) 0%, transparent 70%)'
                      }}
                    />
                    <span className="relative z-10">{item.name}</span>
                  </motion.button>
                </motion.div>
              ))}
              
              {branch && !isHomepage && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="pt-4 border-t border-gray-200"
                >
                  <div className={`flex items-center space-x-2 text-sm mb-4 ${
                    isSpecialPage ? 'text-pink-600' : 'text-gray-600'
                  }`}>
                    <MapPin className="w-4 h-4" />
                    <span>{branchInfo[branch].address}</span>
                  </div>
                  <div className={`flex items-center space-x-2 text-sm mb-4 ${
                    isSpecialPage ? 'text-pink-600' : 'text-gray-600'
                  }`}>
                    <Phone className="w-4 h-4" />
                    <span>{branchInfo[branch].phone}</span>
                  </div>
                </motion.div>
              )}
              
              {/* Pesan Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <motion.a
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={branch ? `/${branch}/pesan` : '/pesan'}
                  className={`w-full text-white px-6 py-3 rounded-2xl text-center font-bold hover:shadow-glow transition-all duration-300 block relative overflow-hidden group mb-3 ${
                    isSpecialPage
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500'
                      : 'bg-gradient-to-r from-primary-500 to-primary-600'
                  }`}
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
                  
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>Pesan</span>
                  </span>
                </motion.a>
              </motion.div>

              {/* Order via WhatsApp Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-2"
              >
                <motion.a
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={`https://wa.me/${branch ? branchInfo[branch].phone.replace(/\D/g, '') : '6281234567890'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-white px-6 py-3 rounded-2xl text-center font-bold hover:shadow-glow transition-all duration-300 block relative overflow-hidden group ${
                    isSpecialPage
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500'
                      : 'bg-gradient-to-r from-primary-500 to-primary-600'
                  }`}
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
                  
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <WhatsAppIcon className="w-5 h-5" />
                    <span>Order via WhatsApp</span>
                  </span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </motion.header>
  );
};

export default Header;
