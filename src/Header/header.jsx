import { Search, User, Heart, ShoppingCart } from "lucide-react";
import { useState, useContext, useRef, useEffect } from "react";
import SignIn from "../Sign-in/signin";
import SignUp from "../Sign-in/signup";
import { Link } from "react-router-dom";
import CartDrawer from "../CartPage/CartDrawer";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/LoginAuth";
import { Settings, LogOut, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getWishlist } from "../utils/wishlistUtils";
import debounce from "lodash.debounce";

export default function Header() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();
  const cartLength = cart?.length || 0;

  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  // search
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const wish = getWishlist();
  const wishlist = wish?.length || 0;

  const controller = useRef(null); // For aborting old requests
  const cache = useRef({});

  const fetchSuggestions = async (value) => {
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    // Check cache first
    if (cache.current[value]) {
      setSuggestions(cache.current[value]);
      return;
    }

    setLoading(true);

    // Cancel old request if exists
    if (controller.current) controller.current.abort();
    controller.current = new AbortController();

    try {
      const res = await fetch(
        `https://e-commerce-backend-production-6fa0.up.railway.app/api/search/live-search?query=${value}`,
        { signal: controller.current.signal }
      );

      const data = await res.json();

      const products = data.products || [];

      cache.current[value] = products; // Save to cache
      setSuggestions(products);
    } catch (error) {
      if (error.name === "AbortError") return; // Ignore aborted requests
      console.log("Search error:", error);
    }

    setLoading(false);
  };

  const debouncedFetch = useRef(
    debounce((value) => {
      fetchSuggestions(value);
    }, 400)
  ).current;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedFetch(value);
  };

  const handleSelect = (name) => {
    setSearchText(name);
    setSuggestions([]);

    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

    if (!history.includes(name)) {
      history.push(name);
    }

    localStorage.setItem("searchHistory", JSON.stringify(history));
    navigate(`/ProductPage?search=${encodeURIComponent(name)}`);
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="w-full font-poppins">
      {/* ---------------------- TOP BANNER ---------------------- */}
      <div className="my-element text-white py-2 sm:py-3 md:py-4 px-2 text-[10px] sm:text-[12px] md:text-[14px] font-bold overflow-hidden">
        <div className="relative w-full overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee space-x-8 sm:space-x-12">
            {Array(2)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex space-x-4 sm:space-x-8 items-center"
                >
                  {/* FREE SHIPPING */}
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-400 text-[16px] sm:text-[20px]">
                      🚚
                    </span>

                    <span className="font-extrabold tracking-wide text-black text-[10px] sm:text-[12px] md:text-[14px]">
                      FREE SHIPPING FOR ORDERS OVER ₹990/-
                    </span>
                  </div>

                  {/* ONLY IN JAMSHEDPUR */}
                  <div className="hidden sm:flex items-center space-x-2">
                    <span className="font-extrabold uppercase text-black text-[12px] sm:text-[13px] md:text-[14px]">
                      AVAILABLE ONLY IN JAMSHEDPUR
                    </span>
                  </div>

                  {/* FAST DELIVERY */}
                  <div className="flex items-center space-x-2">
                    <span className="text-[16px] sm:text-[20px]">⚡</span>

                    <span className="font-extrabold tracking-wide text-black text-[10px] sm:text-[12px] md:text-[14px]">
                      FAST DELIVERY
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* ---------------------- MAIN HEADER ---------------------- */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center space-x-2 ml-0 sm:ml-6 lg:ml-12 xl:ml-40"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-black font-bold text-[16px] sm:text-[20px]">
              E
            </div>

            <span className="text-[18px] sm:text-[24px] font-bold text-gray-900">
              ShopEasy
            </span>
          </Link>

          {/* SEARCH BAR */}
          <div className="w-full sm:flex-1 sm:max-w-xl md:max-w-2xl sm:mx-6">
            <div className="relative">
              <input
                type="text"
                value={searchText}
                onChange={handleInputChange}
                placeholder="Search for products, brands and more..."
                className="w-full py-2 sm:py-3 px-3 sm:px-4 text-[12px] sm:text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              {/* SEARCH SUGGESTIONS */}
              {searchText && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 bg-white shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto z-50">
                  {suggestions.map((item) => (
                    <div
                      key={item.id || item._id}
                      onClick={() => handleSelect(item.name)}
                      className="p-2 hover:bg-gray-100 cursor-pointer text-[12px] sm:text-[14px]"
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}

              {/* SEARCH BUTTON */}
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-black p-1 sm:p-2 rounded-lg hover:bg-yellow-500 transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* WISHLIST */}
            <Link
              to="/wishlist"
              className="flex items-center space-x-1 hover:text-red-500 text-[10px] sm:text-[12px] cursor-pointer"
            >
              <Heart
                size={20}
                className={`transition-all duration-200 text-red-600 fill-red-600 "
                  }`}
              />
              <span className="hidden sm:inline">Wishlist</span>
            </Link>

            {/* CART */}
            <button
              className="relative flex items-center space-x-1 bg-yellow-400 text-black px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg hover:bg-yellow-500 transition-colors text-[10px] sm:text-[12px] cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart size={18} />

              {/* CART COUNT BADGE */}
              {cartLength > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] sm:text-[12px] w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                  {cart.length}
                </span>
              )}

              <span className="hidden xs:inline">Cart</span>
            </button>

            {/* LOGIN / USER MENU */}
            <div
              className="relative"
              ref={menuRef}
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() =>
                setTimeout(() => {
                  if (!menuRef.current.matches(":hover")) {
                    setIsOpen(false);
                  }
                }, 150)
              }
            >
              {isLoggedIn ? (
                <>
                  <button
                    onClick={toggleMenu}
                    className="w-9 h-9 rounded-full bg-yellow-600 text-white font-semibold flex items-center justify-center hover:bg-yellow-700 transition cursor-pointer text-[14px]"
                  >
                    {user?.firstname?.charAt(0)?.toUpperCase()}
                  </button>

                  {isOpen && (
                    <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
                      <button
                        className="w-full flex items-center px-3 py-2 text-[12px] sm:text-[14px] text-gray-700 hover:bg-gray-100"
                        onClick={() => navigate("/my-Profile")}
                      >
                        <ShoppingBag
                          size={16}
                          className="mr-2 text-yellow-500"
                        />
                        My Profile
                      </button>

                      <button
                        className="w-full flex items-center px-3 py-2 text-[12px] sm:text-[14px] text-gray-700 hover:bg-gray-100"
                        onClick={() => navigate("/my-orders")}
                      >
                        <ShoppingBag
                          size={16}
                          className="mr-2 text-yellow-500"
                        />
                        My Orders
                      </button>

                      <button
                        onClick={() => {
                          localStorage.removeItem("token");
                          localStorage.removeItem("user");
                          localStorage.clear();
                          logout();
                          navigate("/home");
                        }}
                        className="w-full flex items-center px-3 py-2 text-[12px] sm:text-[14px] text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut size={16} className="mr-2 text-red-500" />
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => setShowSignIn(true)}
                  className="bg-yellow-400 text-black px-5 py-2 rounded-lg hover:bg-yellow-500 transition-colors text-[12px] sm:text-[14px] font-semibold cursor-pointer"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------NAVIGATION BAR --------------------- */}
      <div className="bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav
            className="
        flex 
        overflow-x-auto md:overflow-visible
        items-center 
        justify-start md:justify-center 
        space-x-3 sm:space-x-6 
        py-2 sm:py-4 
        font-semibold 
        text-gray-700 
        whitespace-nowrap 
        scrollbar-hide 
        text-[12px] sm:text-[14px] md:text-[16px]
      "
          >
            <Link to="/" className="hover-link">
              Home
            </Link>
            <Link to="/aboutUs" className="hover-link">
              About Us
            </Link>
            <Link to="/Contact-us" className="hover-link">
              Contact Us
            </Link>
          </nav>
        </div>
      </div>

      {/* MODALS */}
      <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} cart={cart} />

      {showSignIn && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999]">
          <SignIn setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />
        </div>
      )}

      {showSignUp && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999]">
          <SignUp setShowSignUp={setShowSignUp} setShowSignIn={setShowSignIn} />
        </div>
      )}
    </div>
  );
}
