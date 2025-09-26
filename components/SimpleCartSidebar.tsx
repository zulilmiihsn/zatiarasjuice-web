import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Minus, ShoppingCart, Trash2, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '../contexts/CartContext';
import { formatCurrency, getWhatsAppUrl, formatCartItem } from '../lib/whatsapp';

interface SimpleCartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SimpleCartSidebar: React.FC<SimpleCartSidebarProps> = ({ isOpen, onClose }) => {
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

  if (!mounted || !isOpen) return null;

  const sidebarContent = (
    <>
      {/* CSS untuk memastikan sidebar benar-benar fixed */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Reset semua kemungkinan konflik CSS */
          .simple-cart-backdrop,
          .simple-cart-sidebar,
          .simple-cart-content,
          .simple-cart-footer {
            all: unset !important;
            box-sizing: border-box !important;
          }
          
          .simple-cart-backdrop {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: 9998 !important;
            background-color: rgba(0, 0, 0, 0.5) !important;
            transform: none !important;
            will-change: auto !important;
            contain: none !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            outline: none !important;
            overflow: visible !important;
            clip: none !important;
            clip-path: none !important;
            filter: none !important;
            backdrop-filter: none !important;
            perspective: none !important;
            transform-style: flat !important;
            backface-visibility: visible !important;
            isolation: auto !important;
            mix-blend-mode: normal !important;
            object-fit: fill !important;
            object-position: 50% 50% !important;
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
            cursor: pointer !important;
          }
          
          .simple-cart-sidebar {
            position: fixed !important;
            top: 0 !important;
            right: 0 !important;
            left: auto !important;
            bottom: auto !important;
            width: 100% !important;
            max-width: 28rem !important;
            height: 100vh !important;
            z-index: 9999 !important;
            background-color: white !important;
            box-shadow: -10px 0 25px rgba(0, 0, 0, 0.1) !important;
            transform: none !important;
            will-change: auto !important;
            contain: none !important;
            display: flex !important;
            flex-direction: column !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            outline: none !important;
            clip: none !important;
            clip-path: none !important;
            filter: none !important;
            backdrop-filter: none !important;
            perspective: none !important;
            transform-style: flat !important;
            backface-visibility: visible !important;
            isolation: auto !important;
            mix-blend-mode: normal !important;
            object-fit: fill !important;
            object-position: 50% 50% !important;
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
            cursor: default !important;
          }
          
          .simple-cart-content {
            flex: 1 !important;
            overflow-y: auto !important;
            padding: 1.5rem !important;
            min-height: 0 !important;
            max-height: calc(100vh - 200px) !important;
            box-sizing: border-box !important;
            margin: 0 !important;
            border: none !important;
            outline: none !important;
            background: transparent !important;
            transform: none !important;
            will-change: auto !important;
            contain: none !important;
          }
          
          .simple-cart-footer {
            border-top: 1px solid #e5e7eb !important;
            padding: 1.5rem !important;
            background-color: white !important;
            flex-shrink: 0 !important;
            box-sizing: border-box !important;
            margin: 0 !important;
            outline: none !important;
            transform: none !important;
            will-change: auto !important;
            contain: none !important;
          }
          
          /* Pastikan tidak ada elemen parent yang mengganggu */
          body, html {
            overflow-x: visible !important;
          }
          
          /* Override semua kemungkinan transform pada parent */
          * {
            transform: none !important;
          }
          
          .simple-cart-backdrop,
          .simple-cart-sidebar {
            transform: none !important;
          }
        `
      }} />
      
      {/* Backdrop */}
      <div className="simple-cart-backdrop" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="simple-cart-sidebar">
        {/* Header */}
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

        {/* Content */}
        <div className="simple-cart-content">
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
                <div
                  key={item.id}
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
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="simple-cart-footer">
            <div className="flex justify-between items-center mb-4">
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

            <p className="text-xs text-gray-500 text-center mt-4">
              Pesanan akan dikirim ke WhatsApp cabang yang dipilih
            </p>
          </div>
        )}
      </div>
    </>
  );

  return createPortal(sidebarContent, document.body);
};

export default SimpleCartSidebar;
