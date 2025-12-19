import React, { createContext, useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { getWishlist } from "../utils/wishlistUtils";
import { syncWishlistToDB,syncCartToDB } from "../apiroutes/userApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const { clearCart, setCart,cart} = useCart();

  //  Sync wishlist localStorage → DB
  const syncWishlist = async (userData) => {
    const localWishlist = getWishlist();

    if (localWishlist.length === 0) return;

    try {
      await syncWishlistToDB(userData.id, localWishlist);
      localStorage.removeItem("wishlist");
      console.log("Wishlist synced to DB");
    } catch (error) {
      console.error("Wishlist sync failed", error);
    }
  };


  const syncCart = async (userData) => {
  if (!cart || cart.length === 0) return;

  try {
    await syncCartToDB(userData.id, cart);
    clearCart(); 
    console.log("Cart synced to DB");
  } catch (error) {
    console.error("Cart sync failed", error);
  }
};



  //  On page load / refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUser(parsedUser);

      // Sync wishlist after refresh
      syncWishlist(parsedUser);
      syncCart(parsedUser);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      clearCart();
      setIsLoggedIn(false);
      setUser(null);
    }

    const syncLogout = (event) => {
      if (event.key === "token" && event.newValue === null) {
        clearCart();
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    window.addEventListener("storage", syncLogout);

    return () => {
      window.removeEventListener("storage", syncLogout);
    };
  }, []);

  // 🔐 LOGIN
  const login = async (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));

    setIsLoggedIn(true);
    setUser(userData);

    syncWishlist(userData);
    syncCart(userData);
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.clear();
    clearCart();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, setUser, setIsLoggedIn, syncWishlist, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
