import { Search, User, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import SignIn from "../Sign-in/signin";
import SignUp from "../Sign-in/signup";
import { Link } from "react-router-dom";
import CartDrawer from "../CartPage/CartDrawer";
import { useCart } from "../context/CartContext";
export default function Header() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
   const { cart, updateQty, removeFromCart } = useCart();
const cartLength = cart?.length || 0;
console.log(cartLength)
  return (
    <div className="w-full font-poppins">
      {/* Top Banner */}
      <div className="my-element text-white py-2 sm:py-3 md:py-4 px-2 text-xs sm:text-sm md:text-base font-bold overflow-hidden">
        <div className="relative w-full overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee space-x-8 sm:space-x-12">
            {Array(2).fill(null).map((_, index) => (
              <div
                key={index}
                className="flex space-x-4 sm:space-x-8 items-center"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-orange-400 text-base sm:text-xl">🚚</span>
                  <span className="font-extrabold tracking-wide text-black text-[10px] sm:text-sm md:text-base">
                    FREE SHIPPING FOR ORDERS OVER ₹990/-
                  </span>
                </div>
                <div className="hidden sm:flex items-center space-x-2">
                  <span className="font-extrabold uppercase text-black text-xs sm:text-sm md:text-base">
                    AVAILABLE ONLY IN JAMSHEDPUR
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-base sm:text-xl">⚡</span>
                  <span className="font-extrabold tracking-wide text-black text-[10px] sm:text-sm md:text-base">
                    FAST DELIVERY
                  </span>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 ml-0 sm:ml-6 lg:ml-12 xl:ml-40"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-black font-bold text-lg sm:text-xl">
              E
            </div>
            <span className="text-lg sm:text-2xl font-bold text-gray-900">
              ShopEasy
            </span>
          </Link>

          {/* Search */}
          <div className="w-full sm:flex-1 sm:max-w-xl md:max-w-2xl sm:mx-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="w-full py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-black p-1 sm:p-2 rounded-lg hover:bg-yellow-500 transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Login */}
            <button
              className="flex items-center space-x-1 hover:text-yellow-500 text-xs sm:text-sm cursor-pointer"
              onClick={() => setShowSignIn(true)}
            >
              <User size={18} />
              <span className="hidden sm:inline">Login</span>
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="flex items-center space-x-1 hover:text-yellow-500 text-xs sm:text-sm cursor-pointer"
            >
              <Heart size={18} />
              <span className="hidden sm:inline">Wishlist</span>
            </Link>

            {/* Cart */}
            <button
              className="relative flex items-center space-x-1 bg-yellow-400 text-black px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg hover:bg-yellow-500 transition-colors text-xs sm:text-sm cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart size={18} />

              {/* Badge */}
              {cartLength > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs sm:text-sm w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                  {cart.length}
                </span>
              )}

              <span className="hidden xs:inline">Cart</span>
            </button>

          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex overflow-x-auto md:overflow-visible items-center justify-start md:justify-center space-x-3 sm:space-x-6 py-2 sm:py-4 font-semibold font-sans text-gray-700 whitespace-nowrap scrollbar-hide text-sm sm:text-base">
            <Link to="/" className="hover-link">
              Home
            </Link>
            <Link to="/hot-deals" className="hover-link">
              Hot Deals
            </Link>
            <Link to="/support" className="hover-link">
              Support
            </Link>
          </nav>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} cart={cart} />

      {/* SignIn Popup */}
      {showSignIn && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999]">
          <SignIn setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />
        </div>
      )}

      {/* SignUp Popup */}
      {showSignUp && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999]">
          <SignUp setShowSignUp={setShowSignUp} setShowSignIn={setShowSignIn} />
        </div>
      )}
    </div>
  );
}
