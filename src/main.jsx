import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./ReduxStore/store.js";
import { ProductProvider } from "./context/ProductContext.jsx"; // ✅ Import the context provider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>

      <ProductProvider>
        <App />
      </ProductProvider>
    </Provider>
  </StrictMode>
);
