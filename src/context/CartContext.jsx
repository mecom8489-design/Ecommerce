import React, { createContext, useState, useContext } from "react";

// Create the context
const CartContext = createContext();

// Custom hook for easier access
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.some((item) => item.id === product.id);
      if (exists) return prevCart; // Prevent duplicates
      return [...prevCart, product];
    });
  };
const updateQty = (id, delta) => {
  setCart((prev) =>
    prev.map((item) =>
      item.id === id
        ? { ...item, qty: Math.max(1, (item.qty || 1) + delta) }
        : item
    )
  );
};

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Clear all items
  const clearCart = () => setCart([]);

  // Context value
  const value = { cart,updateQty, addToCart, removeFromCart, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
