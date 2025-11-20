import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { Link } from "react-router-dom";
import { getWishlist, removeFromWishlist } from "../utils/wishlistUtils";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext"; 
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const savedWishlist = getWishlist();
    setWishlist(savedWishlist);
  }, []);

  const handleRemove = (id) => {
    removeFromWishlist(id);
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };



  return (
    <div>
      <Header />
      <div className="min-h-screen px-4 sm:px-6 lg:px-12 py-10">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6 truncate max-w-xs sm:max-w-sm md:max-w-full">
          <Link to="/" className="font-semibold cursor-pointer hover:underline">
            Home
          </Link>{" "}
          &gt; <span className="font-semibold">Wishlist</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-2">Wishlist</h1>
        <p className="text-center text-gray-600 mb-10">
          You currently have <b>{wishlist.length}</b>{" "}
          {wishlist.length === 1 ? "item" : "items"} in your list
        </p>

        {/* Wishlist Grid */}
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8">
            {wishlist.map((product) => (
              <div
                key={product.id}
                onClick={() =>
                  navigate(`/ProductPage/products/${product.id}`, {
                    state: { product },
                  })
                }
                className="border rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col bg-white cursor-pointer"
              >
                {/* Image wrapper */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleRemove(product.id);
                    }}
                    className="absolute top-2 right-2 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-sm"
                  >
                    ✕
                  </button>

                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-60 sm:h-72 md:h-80 object-cover rounded-lg"
                  />
                </div>

                <div className="p-4 flex flex-col justify-between h-[calc(100%-12rem)] space-y-1">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 line-clamp-2 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{Math.floor(product.finalPrice)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                    {product.discount && (
                      <span className="text-sm font-medium text-green-600">
                        {Math.floor(product.discount)}% OFF
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="text-sm flex items-center mt-1">
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

                  <div className="flex items-center justify-between">
                    <div className="text-[14px] font-bold">
                      Available Stocks:
                      <span className="text-red-600"> {product.stock}</span>
                    </div>
                    <button
                      className="p-2 rounded-full bg-yellow-400 text-white hover:bg-yellow-600 transition duration-200 hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center px-4 sm:px-6 py-20">
            <p className="text-gray-600 text-lg mb-6">
              Your wishlist is empty
            </p>
          </div>
        )}

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="text-center text-gray-600 mt-10">
            Showing {wishlist.length} of {wishlist.length} results
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
