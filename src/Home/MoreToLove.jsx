import React, { useEffect, useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // top of file
import {
  Adminproductses,
  getAllCategories,
  getAddedProducts,
  deleteAdminProducts,
  AdminUpdateproduct,
} from "../apiroutes/adminApi";

export default function MoreToLove() {
  const [visibleCount, setVisibleCount] = useState(18); // Show first 18 initially
  const navigate = useNavigate(); // ← This is required
  const { addToCart } = useCart();
  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 6); // Show 6 more on each click
  };
  const [products, setProducts] = useState([]);
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const visibleProducts = products.slice(0, visibleCount);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAddedProducts();
      const rawData = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.products)
        ? response.data.products
        : [];
      setProducts(rawData);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to fetch categories.");
    }
  };

  return (
    <div className=" min-h-screen py-8 mt-10">
      <div className="max-w-8xl mx-auto px-20">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          More to love
        </h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 p-4">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer relative"
              onClick={() =>
                navigate(`/ProductPage/products/${product.id}`, {
                  state: { product },
                })
              }
            >
              {/* Sale Tag */}
              {product.sale && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
                  SALE
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-yellow-100 active:scale-95 z-10"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-yellow-600 transition-colors" />
              </button>

              {/* Product Image */}
              <div className="aspect-square overflow-hidden bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Product Details */}
              <div className="p-4">
              <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
                  {product.category}
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                  {product.name}
                </h3>
               

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-bold text-gray-900">
                   ${Math.floor(product.finalPrice)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-sm font-medium text-green-600">
                      {Math.floor(product.discount)}% OFF
                    </span>
                  )}
                </div>

                {/* Rating & Sold */}
                <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                  {product.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{product.rating}</span>
                    </div>
                  )}
                  {product.sold && (
                    <span className="text-gray-500">{product.sold} sold</span>
                  )}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 text-xs">
                  {product.saved && (
                    <span className="bg-red-50 text-red-600 px-2 py-1 rounded-full font-medium">
                      💰 Save {product.saved}
                    </span>
                  )}
                  {product.customizable && (
                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">
                      Customizable
                    </span>
                  )}
                  {product.premiumQuality && (
                    <span className="bg-orange-50 text-orange-600 px-2 py-1 rounded-full font-medium">
                      Premium Quality
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {visibleCount < products.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleViewMore}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full shadow transition-all duration-300"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
