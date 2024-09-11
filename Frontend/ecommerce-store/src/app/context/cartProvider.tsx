'use client';
import React, { useState, useEffect, ReactNode } from 'react';
import CartContext, { CartItem } from './cartContext';

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
      
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    const shoppingBaseUrl = process.env.NEXT_PUBLIC_SHOPPING_API_URL;
    const productBaseUrl =  process.env.NEXT_PUBLIC_PRODUCT_API_URL
    console.log("shopping base url -->", shoppingBaseUrl);

    useEffect(() => {
        if (token && shoppingBaseUrl) {
            const fetchCart = async () => {
                try {
                    const response = await fetch(`${shoppingBaseUrl}/cart`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log("Response", response);

                        // Transform the response data
                        const cartItems = data[0]?.items.map((item: any) => ({
                            _id: item.product._id,
                            name: item.product.name,
                            desc: item.product.desc,
                            banner: item.product.banner,
                            type: item.product.type,
                            unit: item.product.unit,
                            price: item.product.price,
                            available: item.product.available,
                            suplier: item.product.suplier,
                            qty: item.unit,
                        })) || [];

                        setCart(cartItems || []);
                        console.log("Data fetched", cartItems);
                    } else {
                        console.error('Failed to fetch cart:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching cart:', error);
                }
            };

            fetchCart();
        }
    }, [shoppingBaseUrl, token]);

    const addToCart = async (item: CartItem) => {
        console.log('Entering addToCart function');
        console.log('Item to add:', item);

        try {
            const response = await fetch(`http://localhost:8002/cart`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(item),
            });

            console.log("Add to cart response", response);

            if (response.ok) {
                setCart(prevCart => {
                    const itemIndex = prevCart.findIndex(cartItem => cartItem._id === item._id);
                    if (itemIndex > -1) {
                        const updatedCart = [...prevCart];
                        updatedCart[itemIndex] = { ...updatedCart[itemIndex], qty: item.qty };
                        return updatedCart;
                    } else {
                        return [...prevCart, item];
                    }
                });
            } else {
                console.error('Failed to add to cart:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const handleAddToCart = (product: CartItem) => {
        const existingItem = cart.find(item => item._id === product._id);
        const newQty = existingItem ? Math.min(product.unit, existingItem.qty + 1) : 1;

        const updatedCartItem: CartItem = {
            ...product,
            qty: newQty,
        };

        addToCart(updatedCartItem);
    };

    const removeFromCart = async (id: string) => {
      console.log('Removing item from cart with ID:', id);
  
      try {
          const response = await fetch(`${productBaseUrl}/cart/${id}`, {
              method: 'DELETE',
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
          });
  
          if (response.ok) {
            
              setCart(prevCart => prevCart.filter(item => item._id !== id));
              console.log(`Item with ID: ${id} removed from cart`);
          } else {
              console.error('Failed to remove from cart:', response.statusText);
          }
      } catch (error) {
          console.error('Error removing from cart:', error);
      }
  };
  

    const clearCart = async () => {
        try {
            const response = await fetch(`${shoppingBaseUrl}/cart/clear`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setCart([]);
            } else {
                console.error('Failed to clear cart:', response.statusText);
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const map = (callback: (product: CartItem) => JSX.Element) => {
        return cart.map(callback);
    };

    return (
        <CartContext.Provider value={{ map, cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
