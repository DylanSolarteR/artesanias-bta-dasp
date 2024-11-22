'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  sessionId: string;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  localStorage.clear();
  
  const [sessionId] = useState(localStorage.getItem('sessionId') || generateSessionId());
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem(`cart-${sessionId}`);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const addToCart = (item: CartItem) => {
    const existingItem = cart.find(cartItem => cartItem.productId === item.productId);
  
    if (existingItem) {
      const updatedCart = cart.map(cartItem =>
        cartItem.productId === item.productId
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, item]);
    }
  };
  
  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter(cartItem => cartItem.productId !== productId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(`cart-${sessionId}`);
  };

  useEffect(() => {
    localStorage.setItem(`cart-${sessionId}`, JSON.stringify(cart));
  }, [cart, sessionId]);

  return (
    <CartContext.Provider value={{ cart, sessionId, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

const generateSessionId = () => {
  return Math.random().toString(36).substring(2, 15);
};