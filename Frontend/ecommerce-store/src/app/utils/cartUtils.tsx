// utils/cartUtils.ts
import { CartItem } from "@/app/context/cartContext";
import { useCart } from "@/app/context/cartContext";

export const handleAddToCart = (product: CartItem) => {
  const { addToCart } = useCart();

  const cartItem: CartItem = {
    ...product,
    qty: 1, 
  };


  addToCart(cartItem);
};
