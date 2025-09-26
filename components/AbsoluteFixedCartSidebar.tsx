import React from 'react';
import { X, Plus, Minus, ShoppingCart, Trash2, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '../contexts/CartContext';
import { formatCurrency, getWhatsAppUrl, formatCartItem } from '../lib/whatsapp';

interface AbsoluteFixedCartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AbsoluteFixedCartSidebar: React.FC<AbsoluteFixedCartSidebarProps> = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleWhatsAppOrder = () => {
    if (cart.items.length === 0) return;
    
    const whatsappUrl = getWhatsAppUrl(cart);
    window.open(whatsappUrl, '_blank');
    
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998,
          margin: 0,
          padding: 0,
          border: 'none',
          outline: 'none',
          transform: 'none',
          willChange: 'auto',
          contain: 'none',
          overflow: 'visible',
          clip: 'none',
          clipPath: 'none',
          filter: 'none',
          backdropFilter: 'none',
          perspective: 'none',
          transformStyle: 'flat',
          backfaceVisibility: 'visible',
          isolation: 'auto',
          mixBlendMode: 'normal',
          objectFit: 'fill',
          objectPosition: '50% 50%',
          opacity: 1,
          visibility: 'visible',
          pointerEvents: 'auto',
          cursor: 'pointer',
        }}
      />
      
      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          left: 'auto',
          bottom: 'auto',
          width: '100%',
          maxWidth: '28rem',
          height: '100vh',
          backgroundColor: 'white',
          boxShadow: '-10px 0 25px rgba(0, 0, 0, 0.1)',
          zIndex: 9999,
          margin: 0,
          padding: 0,
          border: 'none',
          outline: 'none',
          transform: 'none',
          willChange: 'auto',
          contain: 'none',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          clip: 'none',
          clipPath: 'none',
          filter: 'none',
          backdropFilter: 'none',
          perspective: 'none',
          transformStyle: 'flat',
          backfaceVisibility: 'visible',
          isolation: 'auto',
          mixBlendMode: 'normal',
          objectFit: 'fill',
          objectPosition: '50% 50%',
          opacity: 1,
          visibility: 'visible',
          pointerEvents: 'auto',
          cursor: 'default',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem',
          borderBottom: '1px solid #e5e7eb',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShoppingCart style={{ width: '1.5rem', height: '1.5rem', color: '#ec4899' }} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
              Keranjang
            </h2>
            {cart.totalItems > 0 && (
              <span style={{
                backgroundColor: '#ec4899',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                padding: '0.25rem 0.5rem',
                borderRadius: '9999px',
              }}>
                {cart.totalItems}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
          </button>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          minHeight: 0,
          maxHeight: 'calc(100vh - 200px)',
        }}>
          {cart.items.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
            }}>
              <ShoppingCart style={{ width: '4rem', height: '4rem', color: '#d1d5db', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.5rem', margin: 0 }}>
                Keranjang Kosong
              </h3>
              <p style={{ color: '#9ca3af', margin: 0 }}>
                Tambahkan produk ke keranjang untuk memulai pesanan
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{
                      width: '4rem',
                      height: '4rem',
                      background: 'linear-gradient(to bottom right, #fce7f3, #fecaca)',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem' }}
                        />
                      ) : (
                        <div style={{
                          width: '2rem',
                          height: '2rem',
                          background: 'linear-gradient(to bottom right, #f472b6, #f43f5e)',
                          borderRadius: '0.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <span style={{ color: 'white', fontSize: '1.125rem' }}>🍹</span>
                        </div>
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{
                        fontWeight: '600',
                        color: '#111827',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {formatCartItem(item)}
                      </h4>
                      {item.category && (
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                          {item.category}
                        </p>
                      )}
                      <p style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#ec4899', margin: 0 }}>
                        {formatCurrency(item.price)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        padding: '0.25rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <Trash2 style={{ width: '1rem', height: '1rem', color: '#ef4444' }} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '2rem',
                          height: '2rem',
                          backgroundColor: '#e5e7eb',
                          border: 'none',
                          borderRadius: '50%',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d1d5db'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                      >
                        <Minus style={{ width: '1rem', height: '1rem', color: '#4b5563' }} />
                      </button>
                      <span style={{ width: '2rem', textAlign: 'center', fontWeight: '600' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '2rem',
                          height: '2rem',
                          backgroundColor: '#fce7f3',
                          border: 'none',
                          borderRadius: '50%',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fbcfe8'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fce7f3'}
                      >
                        <Plus style={{ width: '1rem', height: '1rem', color: '#db2777' }} />
                      </button>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Subtotal</p>
                      <p style={{ fontWeight: 'bold', color: '#111827', margin: 0 }}>
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
          <div style={{
            borderTop: '1px solid #e5e7eb',
            padding: '1.5rem',
            backgroundColor: 'white',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
                Total ({cart.totalItems} item)
              </span>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ec4899' }}>
                {formatCurrency(cart.totalPrice)}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={handleWhatsAppOrder}
                style={{
                  width: '100%',
                  backgroundColor: '#22c55e',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '1rem 1.5rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#22c55e'}
              >
                <MessageCircle style={{ width: '1.25rem', height: '1.25rem' }} />
                <span>Pesan Sekarang</span>
              </button>
              
              <button
                onClick={clearCart}
                style={{
                  width: '100%',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  fontWeight: '600',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              >
                Kosongkan Keranjang
              </button>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#6b7280', textAlign: 'center', marginTop: '1rem', margin: 0 }}>
              Pesanan akan dikirim ke WhatsApp cabang yang dipilih
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default AbsoluteFixedCartSidebar;
