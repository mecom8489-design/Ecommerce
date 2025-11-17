import React, { createContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Check token & user when app loads
    // const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setIsLoggedIn(true);
      
      setUser(JSON.parse(storedUser));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [isLoggedIn]);
//   console.log(isLoggedIn)
  // ✅ Login handler (store in localStorage)
  const login = ( userData) => {
    // localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  // ✅ Logout handler
  const logout = () => {
    // localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user,setIsLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


// comment for token 


// import React, { createContext, useState, useEffect } from "react";

// // Create the context
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // ✅ Check token & user when app loads
//     const token = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");

//     if (token && storedUser) {
//       setIsLoggedIn(true);
//       setUser(JSON.parse(storedUser));
//     } else {
//       setIsLoggedIn(false);
//       setUser(null);
//     }
//   }, []);

//   // ✅ Login handler (store in localStorage)
//   const login = (token, userData) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(userData));
//     setIsLoggedIn(true);
//     setUser(userData);
//   };

//   // ✅ Logout handler
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setIsLoggedIn(false);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
