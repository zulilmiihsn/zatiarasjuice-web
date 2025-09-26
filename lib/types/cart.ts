// Types untuk fitur keranjang
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
  description?: string;
  // Untuk minuman dengan size
  size?: 'regular' | 'large';
  priceRegular?: number;
  priceLarge?: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  branch?: 'berau' | 'samarinda';
}

export interface CartContextType {
  cart: Cart;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  // eslint-disable-next-line no-unused-vars
  removeFromCart: (itemId: string) => void;
  // eslint-disable-next-line no-unused-vars
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  // eslint-disable-next-line no-unused-vars
  setBranch: (branch: 'berau' | 'samarinda') => void;
}
