import React, { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // top of file
import { addToWishlist, removeFromWishlist } from "../utils/wishlistUtils";
import Toast from "../context/ToastAddToCart";

export default function MoreToLove({ products }) {
  const [visibleCount, setVisibleCount] = useState(18);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleWishlist = (product) => {
    addToWishlist(product);
  };

  const visibleProducts = (products || []).slice(0, visibleCount);

  return (
    <div className="min-h-screen py-8 mt-10">
      <div className="max-w-8xl mx-auto px-20">
        {/* Section Title */}
        <h1 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-center mb-8 text-red-600">
          More to love
        </h1>

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
              {/* SALE Badge */}
              {product.sale && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] sm:text-[12px] font-semibold px-2 py-1 rounded-md shadow-md">
                  SALE
                </div>
              )}

              {/* Wishlist Button */}
              {/* <button
                className="text-gray-600 hover:text-red-700 z-10 absolute top-3 left-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleWishlist(product);
                  triggerToast("Added to Wishlist ✔️");
                }}
              >
                <i className="far fa-heart"></i>
              </button> */}
              <button
                className={`z-10 absolute top-3 left-2 transition-all duration-300 ${
                  favorites.has(product.id)
                    ? "text-red-500"
                    : "text-gray-600 hover:text-red-700"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (favorites.has(product.id)) {
                    toggleFavorite(product.id); // remove from favorites
                    removeFromWishlist(product.id); // remove from wishlist
                    triggerToast("Removed from Wishlist ❌");
                  } else {
                    toggleFavorite(product.id); // add to favorites
                    handleWishlist(product); // add to wishlist
                    triggerToast("Added to Wishlist ✔️");
                  }
                }}
              >
                <i
                  className={
                    favorites.has(product.id) ? "fas fa-heart" : "far fa-heart"
                  }
                ></i>
              </button>

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
                <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                  {product.name}
                </h3>

                {/* Price & Discount */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[16px] sm:text-[18px] md:text-[20px] font-bold text-gray-900">
                    ₹{Math.floor(product.finalPrice)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-[12px] sm:text-[13px] md:text-[14px] font-medium text-green-600">
                      {Math.floor(product.discount)}% OFF
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="text-[12px] sm:text-[13px] md:text-[14px] flex items-center mt-1">
                  Rating:
                  <span className="ml-2 flex relative">
                    <div className="flex text-gray-300">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <div
                      className="flex text-yellow-500 absolute left-0 top-0 overflow-hidden"
                      style={{
                        width: `${(Number(product.rating) / 5) * 100}%`,
                      }}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </span>
                  <span className="ml-2 text-gray-700">
                    ({product.rating ? Number(product.rating).toFixed(2) : "-"})
                  </span>
                </div>

                {/* Product Tags */}
                <div className="flex flex-wrap gap-2 text-[10px] sm:text-[11px] md:text-[12px]">
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
        {Array.isArray(products) && visibleCount < products.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleViewMore}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full shadow transition-all duration-300 text-[14px] sm:text-[15px] md:text-[16px]"
            >
              View More
            </button>
          </div>
        )}
      </div>

      <Toast message={toastMessage} show={showToast} />
    </div>
  );
}
