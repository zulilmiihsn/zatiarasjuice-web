'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, ShoppingCart, Plus, Minus, Sparkles, Zap, Apple } from 'lucide-react';
import Image from 'next/image';
import GlassCard from './GlassCard';
import NeumorphicButton from './NeumorphicButton';

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
  };
  onAddToCart?: (product: any) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // 3D tilt effect - optimized for performance
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-300, 300], [5, -5]), { stiffness: 200, damping: 40 });
  const rotateY = useSpring(useTransform(x, [-300, 300], [-5, 5]), { stiffness: 200, damping: 40 });

  const handleAddToCart = async () => {
    if (onAddToCart) {
      setIsAddingToCart(true);
      await onAddToCart({ ...product, quantity });
      setTimeout(() => setIsAddingToCart(false), 1000);
    }
  };

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(product.id);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };


  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    // Only update if hovered to save performance
    if (!isHovered) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative ${className}`}
    >
      <GlassCard
        variant="frosted"
        intensity="low"
        className="h-full"
      >

        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleFavorite}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-300 ${
              isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
            }`}
          />
        </motion.button>

        {/* Product Image */}
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-pink-50 to-pink-100">
          {(() => {
            // Simple logic: if gambar is empty/null, use placeholder
            const hasImage = product.gambar && product.gambar.trim().length > 0;
            const imageSrc = hasImage ? product.gambar : '/images/juice-placeholder.svg';
            const isPlaceholder = !hasImage || imageSrc.includes('placeholder');
            
            return (
              <>
                <Image
                  src={imageSrc}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={() => {
                    // Force to placeholder on error
                    const img = document.querySelector(`img[alt="${product.name}"]`) as HTMLImageElement;
                    if (img) img.src = '/images/juice-placeholder.svg';
                  }}
                />
                {!isPlaceholder && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                )}
                {isPlaceholder && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <Apple className="w-12 h-12 text-pink-500" />
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          {product.category && (
            <div className="mb-2">
              <span className="inline-block px-2 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-full">
                {product.category}
              </span>
            </div>
          )}

          {/* Product Name */}
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mb-3">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Quantity Selector */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-3"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600">Jumlah:</span>
                  <div className="flex items-center space-x-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
                    >
                      <Minus className="w-3 h-3" />
                    </motion.button>
                    <span className="w-6 text-center text-sm font-medium">{quantity}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
                    >
                      <Plus className="w-3 h-3" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add to Cart Button */}
          <NeumorphicButton
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            loading={isAddingToCart}
            variant="primary"
            size="sm"
            className="w-full py-1.5 px-3 text-xs"
          >
            {isAddingToCart ? null : (
              <span className="flex items-center justify-center space-x-1">
                <Zap className="w-3 h-3" />
                <span>Tambah ke Keranjang</span>
              </span>
            )}
          </NeumorphicButton>

          {/* Quick Order Buttons */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mt-2 grid grid-cols-2 gap-1.5"
              >
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={`https://wa.me/6281234567890?text=Halo, saya ingin memesan ${product.name} sebanyak ${quantity} pcs`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white py-1 px-2 rounded text-xs font-medium hover:bg-green-600 transition-colors duration-300 text-center"
                >
                  WhatsApp
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://gofood.co.id/merchant/zatiaras-juice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500 text-white py-1 px-2 rounded text-xs font-medium hover:bg-orange-600 transition-colors duration-300 text-center"
                >
                  GoFood
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default ProductCard;
