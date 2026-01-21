import React, { useState, useEffect, useContext } from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { Link, useNavigate } from "react-router-dom";
import { getWishlist, removeFromWishlist } from "../utils/wishlistUtils";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getWishlistFromDB, deleteWishlist } from "../apiroutes/userApi";
import { AuthContext } from "../context/LoginAuth.jsx";
import { addToWishlist } from "../utils/wishlistUtils.js";


const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        if (user?.id) {
          setLoading(true);
          const res = await getWishlistFromDB(user.id);
          setWishlist(res?.data?.data || []);
          addToWishlist(res?.data?.data || []);
        } else {
          setWishlist(getWishlist());
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();

    const refreshWishlist = () => loadWishlist();
    window.addEventListener("wishlistUpdated", refreshWishlist);

    return () =>
      window.removeEventListener("wishlistUpdated", refreshWishlist);
  }, [user]);

  const handleRemove = async (productId) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to remove this item from your wishlist?");
    
    // If user cancels, return early
    if (!isConfirmed) return;
    
    removeFromWishlist(productId);
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
    if (!user?.id) return;
    try {
      await deleteWishlist(user.id, productId);
    } catch (err) {
      console.error("Failed to remove wishlist item:", err);
    }
  };


  return (
    <div>
      <Header />

      <div className="min-h-screen px-4 sm:px-6 lg:px-12 py-10">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6 truncate">
          <Link to="/" className="font-semibold hover:underline">
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

        {loading ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-yellow-400 border-dashed rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-700 text-lg font-medium">
              Please wait Loading ....
            </p>
          </div>
        ) : wishlist.length > 0 ? (
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
                {/* Image */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(product.id);
                    }}
                    className="absolute top-2 right-2 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    ✕
                  </button>

                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-[260px] object-cover rounded-lg"
                  />
                </div>

                <div className="p-4 flex flex-col gap-1">
                  <h3 className="text-lg font-bold line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">
                      ₹{Math.floor(product.finalPrice)}
                    </span>

                    {product.originalPrice && (
                      <span className="text-sm line-through text-gray-400">
                        ₹{product.originalPrice}
                      </span>
                    )}

                    {product.discount && (
                      <span className="text-sm text-green-600 font-medium">
                        {Math.floor(product.discount)}% OFF
                      </span>
                    )}
                  </div>



                  {/* Stock & Cart */}
                  <div className="flex items-center justify-between mt-2">
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
                        (
                        {product.rating ? Number(product.rating).toFixed(2) : "-"}
                        )
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="p-2 rounded-full bg-yellow-400 text-white hover:bg-yellow-600 transition"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Wishlist */
          <div className="text-center min-h-[60vh] flex items-center justify-center">
            <p className="text-gray-600 text-lg">Your wishlist is empty</p>
          </div>
        )}

        {/* Footer Text */}
        {!loading && wishlist.length > 0 && (
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
