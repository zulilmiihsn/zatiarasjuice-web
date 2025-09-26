
export interface CartContextType {
  cart: Cart;
  // eslint-disable-next-line no-unused-vars
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  // eslint-disable-next-line no-unused-vars
  removeFromCart: (itemId: string) => void;
  // eslint-disable-next-line no-unused-vars
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  // eslint-disable-next-line no-unused-vars
  setBranch: (branch: 'berau' | 'samarinda') => void;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
  description?: string;
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
