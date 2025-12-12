import React, { createContext, useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const { clearCart } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
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


  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    // User info goes to localStorage
    localStorage.setItem("user", JSON.stringify(userData));

    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    localStorage.clear();
    clearCart();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setIsLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
