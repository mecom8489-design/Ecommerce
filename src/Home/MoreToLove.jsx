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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden relative group"
              onClick={() =>
                navigate(`/ProductPage/products/${product.id}`, {
                  state: { product },
                })
              }
            >
              {product.sale && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                  Sale
                </div>
              )}
              <button
                onClick={() => addToCart(product)} // or any function like navigate('/cart')
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10 hover:bg-yellow-100 active:scale-95"
              >
                <ShoppingCart className="w-4 h-4 text-gray-600 hover:text-yellow-600 transition-colors" />
              </button>

              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm text-gray-800 mb-2 line-clamp-2 leading-tight">
                  {product.title}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-gray-900">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-sm text-red-500 font-medium">
                      {product.discount}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  {product.rating && (
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                      <span className="text-xs text-gray-600 ml-1">
                        {product.rating}
                      </span>
                    </div>
                  )}
                  {product.sold && (
                    <span className="text-xs text-gray-500">
                      {product.sold}
                    </span>
                  )}
                </div>
                {product.saved && (
                  <div className="text-xs text-red-500 mb-2">
                    💰 Save {product.saved}
                  </div>
                )}
                {product.customizable && (
                  <div className="text-xs text-blue-600 mb-2">Customizable</div>
                )}
                {product.premiumQuality && (
                  <div className="text-xs text-orange-600 mb-2">
                    Premium Quality
                  </div>
                )}
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
