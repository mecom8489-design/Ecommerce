import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./ReduxStore/store.js";
import { ProductProvider } from "./context/ProductContext.jsx"; // ✅ Import the context provider
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/LoginAuth.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ProductProvider>
        <CartProvider>
          <ToastContainer
            toastStyle={{
              width: "430px",
              maxWidth: "90%",
            }}
          />
          <AuthProvider>
            <App />
          </AuthProvider>
        </CartProvider>
      </ProductProvider>
    </Provider>
  </StrictMode>
);
