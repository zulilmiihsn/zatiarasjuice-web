'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Apple } from 'lucide-react';
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
  };
  onAddToCart?: (product: any) => void;
  className?: string;
}

const ProductCardMinimal: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = async () => {
    if (onAddToCart) {
      setIsAddingToCart(true);
      await onAddToCart({ ...product, quantity });
      setIsAddingToCart(false);
    }
  };


  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const hasImage = product.gambar && product.gambar.trim().length > 0;
  const imageSrc = hasImage ? product.gambar : '/images/juice-placeholder.svg';
  const isPlaceholder = !hasImage || imageSrc.includes('placeholder');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative bg-white rounded-lg border border-gray-100 shadow-clean hover:shadow-medium transition-all duration-300 overflow-hidden ${className}`}
    >

      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-gray-50">
        {(() => {
          return (
            <>
              <Image
                src={imageSrc}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
              {isPlaceholder && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    <Apple className="w-8 h-8 text-primary-500" />
                  </motion.div>
                </div>
              )}
            </>
          );
        })()}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category Tag */}
        {product.category && (
          <div className="mb-2">
            <span className="inline-block px-2 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-full">
              {product.category}
            </span>
          </div>
        )}

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 font-display">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mb-4">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="w-full bg-primary-500 text-white py-3 rounded-xl font-semibold text-sm hover:bg-primary-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isAddingToCart ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Menambahkan...
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Tambah ke Keranjang
            </>
          )}
        </motion.button>

        {/* Quick Order Buttons */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={`https://wa.me/6281234567890?text=Halo, saya ingin order ${product.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white py-2 px-3 rounded-xl text-xs font-semibold hover:bg-green-600 transition-all duration-200 text-center"
          >
            WhatsApp
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://gofood.co.id/merchant/zatiaras-juice"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 text-white py-2 px-3 rounded-xl text-xs font-semibold hover:bg-orange-600 transition-all duration-200 text-center"
          >
            GoFood
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardMinimal;
