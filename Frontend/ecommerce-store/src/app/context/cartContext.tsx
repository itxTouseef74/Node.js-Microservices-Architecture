// app/context/CartContext.tsx
'use client';

import { createContext, useContext } from 'react';

export interface CartItem {
    _id: string;
    name: string;
    desc: string;
    banner: string;
    type: string;
    unit: number;
    price: number;
    available: boolean;
    suplier: string;
    qty: number
  

}

 export interface CartContextType {
  map(arg0: (product: any) => import("react").JSX.Element): import("react").ReactNode;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  console.log("cart Context ---> " , context)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
