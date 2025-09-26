import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart, Trash2, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '../contexts/CartContext';
import { formatCurrency, getWhatsAppUrl, formatCartItem } from '../lib/whatsapp';

// CSS untuk memastikan sidebar benar-benar fixed
const fixedSidebarStyles = `
  .cart-sidebar-fixed {
    position: fixed !important;
    top: 0 !important;
    right: 0 !important;
    height: 100vh !important;
    z-index: 9999 !important;
    transform: none !important;
    will-change: auto !important;
    contain: none !important;
  }
  
  .cart-backdrop-fixed {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    z-index: 9998 !important;
    transform: none !important;
    will-change: auto !important;
    contain: none !important;
  }
`;

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleWhatsAppOrder = () => {
    if (cart.items.length === 0) return;
    
    const whatsappUrl = getWhatsAppUrl(cart);
    window.open(whatsappUrl, '_blank');
    
    clearCart();
    onClose();
  };

  if (!mounted) return null;

  const sidebarContent = (
    <>
      <style dangerouslySetInnerHTML={{ __html: fixedSidebarStyles }} />
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop - Fixed positioning */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="cart-backdrop-fixed bg-black/50"
            />
            
            {/* Sidebar - Fixed positioning */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="cart-sidebar-fixed w-full max-w-md bg-white shadow-2xl flex flex-col"
            >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-pinky-500" />
                <h2 className="text-xl font-bold text-gray-900">Keranjang</h2>
                {cart.totalItems > 0 && (
                  <span className="bg-pinky-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {cart.totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 min-h-0 max-h-[calc(100vh-200px)]">
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-500 mb-2">
                    Keranjang Kosong
                  </h3>
                  <p className="text-gray-400">
                    Tambahkan produk ke keranjang untuk memulai pesanan
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-gray-50 rounded-xl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg flex items-center justify-center">
                              <span className="text-white text-lg">🍹</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {formatCartItem(item)}
                          </h4>
                          {item.category && (
                            <p className="text-sm text-gray-500">{item.category}</p>
                          )}
                          <p className="text-lg font-bold text-pinky-500">
                            {formatCurrency(item.price)}
                          </p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 hover:bg-red-100 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-pinky-100 hover:bg-pinky-200 rounded-full flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-4 h-4 text-pinky-600" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Subtotal</p>
                          <p className="font-bold text-gray-900">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cart.items.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4 flex-shrink-0 bg-white sticky bottom-0">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total ({cart.totalItems} item)
                  </span>
                  <span className="text-2xl font-bold text-pinky-500">
                    {formatCurrency(cart.totalPrice)}
                  </span>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-3"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Pesan Sekarang</span>
                  </button>
                  
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
                  >
                    Kosongkan Keranjang
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  Pesanan akan dikirim ke WhatsApp cabang yang dipilih
                </p>
              </div>
            )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );

  return createPortal(sidebarContent, document.body);
};

export default CartSidebar;
