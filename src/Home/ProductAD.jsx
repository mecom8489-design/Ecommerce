import React from "react";
import { useNavigate } from "react-router-dom";

const ProductAD = ({ product }) => {
  const navigate = useNavigate();

  if (!product || product.length === 0) return <div>Loading...</div>;

  // Ensure we always deal with an array
  const productsArray = Array.isArray(product) ? product : [product];

  return (
    <>
      {productsArray.map((product) => (
        <div
          key={product.id}
          className="h-100 mt-10 mb-0 m-50 rounded-xl bg-gradient-to-br from-yellow-200 via-yellow-100 to-orange-100 flex items-center justify-center p-4"
        >
          <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="flex h-full items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-[300px] object-contain drop-shadow-2xl"
              />
            </div>

            {/* Right - Info */}
            <div className="space-y-6">
              <div className="text-gray-500 text-sm font-medium">
                Exclusively Available on ShopEasy
              </div>

              <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
                {product.name}
              </h1>

              <p className="text-gray-600 text-base leading-relaxed max-w-md">
                {product.description}
              </p>

              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg text-base flex items-center gap-2 cursor-pointer"
                onClick={() =>
                  navigate(`/ProductPage/products/${product.id}`, {
                    state: { product },
                  })
                }
              >
                Buy Now →
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductAD;
