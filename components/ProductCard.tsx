import React, { memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Utensils } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    category?: string;
    image_url?: string;
    gambar?: string | null;
    is_featured?: boolean;
    // Price variants for minuman
    price_regular?: number;
    price_large?: number;
    is_minuman?: boolean;
  };
  branch?: 'berau' | 'samarinda';
  className?: string;
}

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);


const ProductCard: React.FC<ProductCardProps> = memo(({
  product,
  branch,
  className = '',
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getWhatsAppUrl = () => {
    const branchNumber = branch === 'berau' ? '6285255555555' : '6285255555556';
    const message = `Halo! Saya ingin memesan ${product.name} dari Zatiaras Juice ${branch === 'berau' ? 'Berau' : 'Samarinda'}.`;
    return `https://wa.me/${branchNumber}?text=${encodeURIComponent(message)}`;
  };

  const getGoFoodUrl = () => {
    if (branch === 'berau') {
      return 'https://gofood.co.id/berau/restaurant/juice-zatiaras-tanjungredeb-65ca1162-75a7-4c4e-ab1e-14369af8bf64';
    } else {
      return 'https://gofood.co.id/samarinda/restaurant/zatiaras-jus-samarinda-e66a662d-6a07-4069-b35f-62642eb1e2c6';
    }
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
      <div className="relative h-32 sm:h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {(() => {
          if (hasImage) {
            return (
              <Image
                src={product.gambar!}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={product.is_featured}
              />
            );
          } else {
            return (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Image
                    src="/images/juice-placeholder-icon.png"
                    alt="Juice Placeholder"
                    width={40}
                    height={40}
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                  />
                </div>
              </div>
            );
          }
        })()}
        
        {/* Premium Badge */}
        {product.is_featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            ⭐ Featured
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-1 line-clamp-2 group-hover:text-pink-600 transition-colors">
              {product.name}
            </h3>
            {product.category && (
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
            )}
          </div>
        </div>


        {/* Price Display */}
        <div className="mb-4">
          {product.is_minuman && product.price_regular ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Regular</span>
                <span className="font-bold text-pink-600">{formatPrice(product.price_regular)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Large</span>
                <span className="font-bold text-pink-600">{formatPrice((product.price_regular || product.price) + 8000)}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Harga</span>
              <span className="font-bold text-pink-600 text-lg">{formatPrice(product.price)}</span>
            </div>
          )}
        </div>


        {/* Order Buttons */}
        <div className="space-y-3">
          {/* WhatsApp Order Button */}
          <motion.a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <WhatsAppIcon className="w-5 h-5" />
            <span>Order via WhatsApp</span>
          </motion.a>

          {/* GoFood Order Button */}
          <motion.a
            href={getGoFoodUrl()}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Utensils className="w-5 h-5" />
            <span>Order via GoFood</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;