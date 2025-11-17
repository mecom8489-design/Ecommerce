import React, { useState,useEffect } from "react";
// import image1 from "../assets/images/Homepage-AD/image-1.png";

const ProductAD = () => {


  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://e-commerce-backend-production-6fa0.up.railway.app/api/admin/all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchData();
  }, []);
  
  const product = products[0];

  if (!product) return <div>Loading...</div>;
  return (
    <>
     <div className="h-100 mt-10  mb-0 m-50 rounded-xl bg-gradient-to-br from-yellow-200 via-yellow-100 to-orange-100 flex items-center justify-center p-4">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Smart Band Image */}
          <div className="flex h-full items-center justify-center">
          <img
            src={product.image}
            alt={product.product_name}
            className="w-[300px] object-contain drop-shadow-2xl"
          />
          </div>

          {/* Right - Info */}
          <div className="space-y-6">
            {/* Tagline */}
            <div className="text-gray-500 text-sm font-medium">
              Exclusively Available on ShopEasy
            </div>

            {/* Product Title */}
            <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
             {product.product_name}
            </h1> 

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed max-w-md">
            {product.product_description}
            </p>

            {/* Buy Now Button */}
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg text-base flex items-center gap-2">
              Buy Now →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductAD;
