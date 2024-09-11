'use client';
import React, { useState, useEffect, ReactNode } from 'react';
import CartContext, { CartItem } from './cartContext';

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);


    const shoppingBaseUrl = process.env.NEXT_PUBLIC_SHOPPING_API_URL
    console.log("shopping base url -->" , shoppingBaseUrl)

  
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch('http://localhost:8003/cart'); 
                if (response.ok) {
                    const data = await response.json();
                    console.log("Response " , response)
                    setCart(data);
                    console.log("data fetched data")
                } else {
                    console.error('Failed to fetch cart:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []);

    const addToCart = async (item: CartItem) => {
      console.log('Entering addToCart function');
      console.log('Item to add:', item);
      console.log('Item to addtocart:', addToCart);
        try {
            const response = await fetch('http://localhost:8003/cart', { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            console.log("add to cart" , response)

            if (response.ok) {
                const updatedCart = await response.json();
                setCart(updatedCart);
                console.log("updated cart -->", updatedCart)
            } else {
                console.error('Failed to add to cart:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const removeFromCart = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8002/cart/${id}`, { 
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedCart = await response.json();
                setCart(updatedCart);
            } else {
                console.error('Failed to remove from cart:', response.statusText);
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const clearCart = async () => {
        try {
            const response = await fetch('/api/cart/clear', { 
                method: 'DELETE',
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
    }

    return (
        <CartContext.Provider value={{ map, cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
