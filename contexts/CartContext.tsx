import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Cart, CartItem, CartContextType } from '../lib/types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({ items: [], totalItems: 0, totalPrice: 0, branch: undefined });

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('zatiaras_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('zatiaras_cart', JSON.stringify(cart));
  }, [cart]);

  const calculateTotals = useCallback((items: CartItem[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { totalItems, totalPrice };
  }, []);

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(cartItem =>
        cartItem.id === item.id && cartItem.size === item.size
      );

      let updatedItems;
      if (existingItemIndex > -1) {
        updatedItems = prevCart.items.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedItems = [...prevCart.items, { ...item, quantity: 1 }];
      }

      const { totalItems, totalPrice } = calculateTotals(updatedItems);
      return { ...prevCart, items: updatedItems, totalItems, totalPrice };
    });
  }, [calculateTotals]);

  const removeFromCart = useCallback((itemId: string) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(item => item.id !== itemId);
      const { totalItems, totalPrice } = calculateTotals(updatedItems);
      return { ...prevCart, items: updatedItems, totalItems, totalPrice };
    });
  }, [calculateTotals]);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      );
      const { totalItems, totalPrice } = calculateTotals(updatedItems);
      return { ...prevCart, items: updatedItems, totalItems, totalPrice };
    });
  }, [calculateTotals]);

  const clearCart = useCallback(() => {
    setCart({ items: [], totalItems: 0, totalPrice: 0, branch: undefined });
  }, []);

  const setBranch = useCallback((newBranch: 'berau' | 'samarinda') => {
    setCart(prevCart => ({ ...prevCart, branch: newBranch }));
  }, []);

  const contextValue = React.useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setBranch,
  }), [cart, addToCart, removeFromCart, updateQuantity, clearCart, setBranch]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};