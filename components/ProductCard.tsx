'use client';

import React, { useState, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Utensils } from 'lucide-react';
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
  // eslint-disable-next-line no-unused-vars
  onAddToCart?: (productItem: any) => void;
  className?: string;
}

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

const ProductCard: React.FC<ProductCardProps> = memo(({
  product,
  onAddToCart,
  className = '',
}) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = useCallback(async () => {
    if (onAddToCart) {
      setIsAddingToCart(true);
      try {
        await onAddToCart({ ...product, quantity: 1 });
      } finally {
        setIsAddingToCart(false);
      }
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
              {hasImage ? (
                <Image
                  src={product.gambar!}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-2 img-optimized silky-smooth"
                  priority={false}
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  quality={75}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center">
                    <Image
                      src="/images/juice-placeholder-icon.png"
                      alt="Juice Placeholder"
                      width={48}
                      height={48}
                      className="w-12 h-12 object-contain"
                      loading="lazy"
                      priority={false}
                    />
                  </div>
                </div>
              )}
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
              <WhatsAppIcon className="w-3 h-3 sm:w-4 sm:h-4" />
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
            className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-2xl text-xs font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 text-center max-w-full truncate shadow-lg hover:shadow-xl relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
              <span className="relative z-10 flex items-center justify-center gap-1">
                <Utensils className="w-3 h-3 sm:w-4 sm:h-4" />
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
