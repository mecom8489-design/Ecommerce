import React, { useState , useEffect } from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { Link } from "react-router-dom";
import { getWishlist, removeFromWishlist } from "../utils/wishlistUtils";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // const removeItem = (id) => {
  //   setWishlist(wishlist.filter((item) => item.id !== id));
  // };
  useEffect(() => {
    const savedWishlist = getWishlist();
    setWishlist(savedWishlist);
  }, []);

  const handleRemove = (id) => {
    removeFromWishlist(id);
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };
  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

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
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col bg-white"
              >
                {/* Image wrapper */}
                <div className="relative">
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="absolute top-2 right-2 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-sm"
                  >
                    ✕
                  </button>

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-60 sm:h-72 md:h-80 object-cover rounded-lg"
                  />
                </div>

                {/* Text content */}
                <h2 className="font-semibold text-sm sm:text-base mt-4">
                  {item.brand}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mb-2 line-clamp-2">
                  {item.title}
                </p>
                <p className="font-semibold mb-4">{formatPrice(item.price)}</p>

                <button className="mt-auto w-full border border-black py-2 rounded-lg text-xs sm:text-sm md:text-base hover:bg-black hover:text-white transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center px-4 sm:px-6 py-20">
            <p className="text-gray-600 text-lg mb-6">
              Your wishlist is empty 😔
            </p>
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Continue Shopping
            </button>
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
