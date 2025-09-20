'use client';

import React, { useState, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Apple } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description?: string;
    price: number;
    category?: string;
    image_url?: string;
    gambar?: string | null;
    is_featured?: boolean;
    rating?: number;
    review_count?: number;
    // Price variants for minuman
    price_regular?: number;
    price_large?: number;
    is_minuman?: boolean;
  };
  onAddToCart?: (product: any) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = memo(({
  product,
  onAddToCart,
  className = '',
}) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = useCallback(async () => {
    if (onAddToCart) {
      setIsAddingToCart(true);
      await onAddToCart({ ...product, quantity: 1 });
      setIsAddingToCart(false);
    }
  }, [onAddToCart, product]);


  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const hasImage = product.gambar && product.gambar.trim().length > 0;
  const imageSrc = hasImage ? product.gambar! : '/images/juice-placeholder.svg';
  const isPlaceholder = !hasImage || imageSrc.includes('placeholder');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        rotateY: 5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}
      className={`group relative bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-luxury hover:shadow-premium transition-all duration-500 overflow-hidden max-w-full perspective-3d silky-smooth fps-60 perf-container ${className}`}
      style={{ 
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
        contain: 'layout style paint'
      }}
    >

      {/* Product Image */}
      <div className="relative h-32 sm:h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {(() => {
          return (
            <>
              <Image
                src={imageSrc}
                alt={product.name}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-2 img-optimized silky-smooth"
                onError={() => {}}
                priority={false}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5
                }}
              />
              
              {isPlaceholder && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-primary-100 to-pinky-100 rounded-full flex items-center justify-center shadow-glow-primary"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    >
                      <Apple className="w-10 h-10 text-primary-500" />
                    </motion.div>
                  </motion.div>
                </div>
              )}
            </>
          );
        })()}
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4 max-w-full">
        {/* Category Tag */}
        {product.category && (
          <div className="mb-2 sm:mb-3">
            <motion.span 
              className="inline-block px-2 py-1 sm:px-3 sm:py-1.5 text-xs font-bold text-primary-600 bg-gradient-to-r from-primary-50 to-pinky-50 rounded-lg sm:rounded-full border border-primary-200 shadow-soft"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 4px 12px rgba(255, 110, 199, 0.3)'
              }}
            >
              {product.category}
            </motion.span>
          </div>
        )}

        {/* Product Name */}
        <motion.h3 
          className="text-sm sm:text-lg font-black text-gray-900 mb-2 sm:mb-3 line-clamp-2 font-display max-w-full truncate"
          whileHover={{ 
            color: '#FF6EC7',
            textShadow: '0 0 10px rgba(255, 110, 199, 0.3)'
          }}
        >
          {product.name}
        </motion.h3>

        {/* Price */}
        <div className="mb-3 sm:mb-4 max-w-full">
          {product.is_minuman ? (
            <div className="space-y-1 sm:space-y-1 max-w-full">
              <div className="flex items-center justify-between max-w-full">
                <span className="text-xs sm:text-sm text-gray-600 truncate">Regular:</span>
                <span className="text-sm sm:text-xl font-bold text-primary-600 truncate">
                  {formatPrice(product.price_regular || product.price)}
                </span>
              </div>
              <div className="flex items-center justify-between max-w-full">
                <span className="text-xs sm:text-sm text-gray-600 truncate">Large:</span>
                <span className="text-xs sm:text-sm font-semibold text-gray-700 truncate">
                  {formatPrice(product.price_large || product.price)}
                </span>
              </div>
            </div>
          ) : (
            <span className="text-sm sm:text-xl font-bold text-gray-900 max-w-full truncate block">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ 
            scale: 1.05, 
            y: -2,
            boxShadow: '0 10px 25px rgba(255, 110, 199, 0.4)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="w-full max-w-full bg-gradient-to-r from-primary-500 to-pinky-500 text-white py-2.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm hover:from-pink-500 hover:to-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 sm:gap-3 shadow-glow-primary hover:shadow-glow-pinky relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
          {isAddingToCart ? (
            <>
              <motion.div 
                className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10" 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <span className="relative z-10 text-xs sm:text-sm">Menambahkan...</span>
            </>
          ) : (
            <>
              <motion.div
                className="relative z-10"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
              <span className="relative z-10 text-xs sm:text-sm">Tambah ke Keranjang</span>
            </>
          )}
        </motion.button>

        {/* Quick Order Buttons */}
        <div className="mt-2 sm:mt-4 grid grid-cols-2 gap-1.5 sm:gap-3 max-w-full">
          <motion.a
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: '0 8px 20px rgba(34, 197, 94, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
            href={`https://wa.me/6281234567890?text=Halo, saya ingin order ${product.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-emerald-500 to-secondary-500 text-white py-2 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-2xl text-xs font-bold hover:from-green-500 hover:to-emerald-600 transition-all duration-300 text-center max-w-full truncate shadow-glow-secondary hover:shadow-glow-green relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <span className="relative z-10 flex items-center justify-center gap-1">
              <span className="text-xs sm:text-sm">💬</span>
              <span className="text-xs sm:text-sm">WhatsApp</span>
            </span>
          </motion.a>
          <motion.a
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: '0 8px 20px rgba(245, 158, 11, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
            href="https://gofood.co.id/merchant/zatiaras-juice"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-gold-500 to-accent-500 text-white py-2 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-2xl text-xs font-bold hover:from-orange-500 hover:to-gold-600 transition-all duration-300 text-center max-w-full truncate shadow-glow-gold hover:shadow-glow-orange relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500 to-gold-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <span className="relative z-10 flex items-center justify-center gap-1">
              <span className="text-xs sm:text-sm">🚚</span>
              <span className="text-xs sm:text-sm">GoFood</span>
            </span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
