import { createContext, useState } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutInfo, setCheckoutInfo] = useState({
    quantity: 1,
    totalPrice: 0,
    finalPrice: 0,
  });
  const [currentProductId, setCurrentProductId] = useState(null); // Track current product

  return (
    <ProductContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        checkoutInfo,
        setCheckoutInfo,
        currentProductId,
        setCurrentProductId,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
