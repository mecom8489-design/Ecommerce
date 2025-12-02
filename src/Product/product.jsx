import { useState, useEffect, useContext } from "react";
import { Heart, Share2, Truck, RotateCcw } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import Header from "../Header/header";
import ProductReviews from "./ProductReviews";
import Footer from "../Footer/footer.jsx";
import { useCart } from "../context/CartContext";
import Toast from "../context/ToastAddToCart.jsx";
import { addToWishlist } from "../utils/wishlistUtils.js";
import { AuthContext } from "../context/LoginAuth.jsx";
import SignIn from "../Sign-in/signin.jsx";
import SignUp from "../Sign-in/signup.jsx";

export default function Product() {
  const { addToCart } = useCart();
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    selectedProduct,
    setSelectedProduct,
    checkoutInfo,
    setCheckoutInfo,
    currentProductId,
    setCurrentProductId,
  } = useContext(ProductContext);

  const { user } = useContext(AuthContext);

  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleWishlist = (product) => {
    addToWishlist(product);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

 

  const rawProduct = selectedProduct || state?.product;

  const product = rawProduct
    ? {
        ...rawProduct,
        price: Number(rawProduct.price),
        discount: Number(rawProduct.discount),
        finalPrice: Number(rawProduct.finalPrice),
      }
    : null;

  const [quantity, setQuantity] = useState(checkoutInfo?.quantity || 1);
  const [currentImage, setCurrentImage] = useState(0);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Product not found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const thumbnails = [
    product.image,
    product.altImage1 || product.image,
    product.altImage2 || product.image,
    product.altImage3 || product.image,
  ];

  const finalPrice =
    product?.price - product?.price * (product?.discount / 100);

  const incrementQuantity = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    setCheckoutInfo({
      quantity: newQty,
      finalPrice,
      totalPrice: Math.floor(finalPrice * newQty),
    });
  };

  const decrementQuantity = () => {
    const newQty = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQty);
    setCheckoutInfo({
      quantity: newQty,
      finalPrice,
      totalPrice: Math.floor(finalPrice * newQty),
    });
  };

  useEffect(() => {
    if (state?.product) {
      const newProductId = state.product.id;
      if (currentProductId !== newProductId) {
        setSelectedProduct(state.product);
        const finalPrice =
          state.product.price -
          state.product.price * (state.product.discount / 100);
        setCheckoutInfo({
          quantity: 1,
          totalPrice: Math.floor(finalPrice),
          finalPrice: finalPrice,
        });
        setQuantity(1);
        setCurrentProductId(newProductId);
      } else {
        setSelectedProduct(state.product);
      }
    }
  }, [
    state,
    currentProductId,
    setSelectedProduct,
    setCheckoutInfo,
    setCurrentProductId,
  ]);

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto p-6 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Product Images */}
          <div className="flex w-full lg:sticky lg:top-0 self-start">
            <div className="flex-1 relative">
              {/* Discount Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs sm:text-sm font-medium">
                  -{product.discount || "50"}%
                </span>
              </div>

              {/* Share Button */}
              <button className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>

              {/* Image Container */}
              <div
                className="bg-white rounded-lg p-4 sm:p-6 md:p-8 w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[520px] flex items-center justify-center relative overflow-hidden"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  setZoomPosition({ x, y });
                }}
              >
                <img
                  src={thumbnails[currentImage]}
                  alt={product.name}
                  className={`w-full h-full object-contain transition-transform duration-300 ease-in-out ${
                    isZoomed
                      ? "scale-150 cursor-zoom-out"
                      : "scale-100 cursor-zoom-in"
                  }`}
                  style={{
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right - Product Details */}
          <div className="space-y-6 pr-4">
            <div>
              <h1 className="text-[20px] sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <span className="text-[16px] sm:text-xl text-gray-400 line-through">
                  ₹{Math.floor(product.price)}
                </span>
                <span className="text-[22px] sm:text-3xl font-bold text-red-500">
                  ₹{Math.floor(finalPrice)}
                </span>
              </div>

              <div className="bg-red-50 border-l-4 border-red-400 p-2 sm:p-3 mb-4 sm:mb-6">
                <p className="text-red-700 text-[12px] sm:text-sm font-medium">
                  Hurry, only few left in stock!
                </p>
              </div>
            </div>

            {/* Quantity & Checkout - Responsive */}
            {/* Quantity + Total + Wishlist */}
            <div className="flex items-center gap-2 sm:gap-3 mb-6 w-full overflow-hidden">
              {/* Quantity Box */}
              <div
                className="flex items-center border border-gray-300 rounded 
                  min-w-[95px] sm:min-w-[110px] 
                  flex-shrink-0"
              >
                <button
                  onClick={decrementQuantity}
                  className="px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base text-gray-600 hover:bg-gray-50"
                >
                  -
                </button>

                <span
                  className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base 
                     border-l border-r border-gray-300 bg-gray-50
                     min-w-[35px] sm:min-w-[40px] text-center"
                >
                  {quantity}
                </span>

                <button
                  onClick={incrementQuantity}
                  className="px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base text-gray-600 hover:bg-gray-50"
                >
                  +
                </button>
              </div>

              {/* Total Button */}
              <button
                className="flex-1 bg-gray-800 text-white 
               px-3 py-2 text-sm 
               sm:px-4 sm:py-2 sm:text-base 
               md:text-lg
               rounded font-medium 
               hover:bg-gray-900 whitespace-nowrap"
              >
                Total - ₹ {Math.floor(finalPrice * quantity)}
              </button>

              {/* Wishlist */}
              <button
                className="p-2 sm:p-3 border border-gray-300 rounded hover:bg-gray-50 flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleWishlist(product);
                  triggerToast("Added to Wishlist ✔️");
                }}
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>

            {/* Buy Now */}
            <button
              className="w-full bg-yellow-500 text-white rounded font-bold hover:bg-yellow-600 transition-colors mb-4 h-[44px] text-[14px] sm:h-[56px] sm:text-[18px]"
              onClick={() => {
                if (!user || !user.email) {
                  setShowSignIn(true);
                  return;
                }
                setSelectedProduct(product);
                setCheckoutInfo({
                  quantity,
                  totalPrice: Math.floor(finalPrice * quantity),
                  finalPrice,
                });

                navigate(`/ProductPage/products/Checkout/${product?.id}`, {
                  state: { product: product },
                });

                // hello
              }}
            >
              BUY IT NOW
            </button>

            {/* Add to Cart */}
            <button
              className="w-full bg-red-500 text-white rounded font-bold hover:bg-red-600 transition-colors mb-6 h-[44px] text-[14px] sm:h-[56px] sm:text-[18px]"
              onClick={() => addToCart(product)}
            >
              ADD TO CART
            </button>

            {/* Delivery Info */}
            <div className="space-y-4">
              {/* Free Shipping */}
              <div className="flex items-start space-x-3">
                <Truck className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-gray-600 mt-[2px]" />
                <div>
                  <p className="font-medium text-[14px] sm:text-gray-800 sm:text-base">
                    Free Shipping
                  </p>
                  <p className="text-gray-600 text-[12px] sm:text-sm">
                    Free shipping on orders over ₹990.
                  </p>
                </div>
              </div>

              {/* Easy Returns */}
              <div className="flex items-start space-x-3">
                <RotateCcw className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-gray-600 mt-[2px]" />
                <div>
                  <p className="font-medium text-[14px] sm:text-gray-800 sm:text-base">
                    Easy Returns
                  </p>
                  <p className="text-gray-600 text-[12px] sm:text-sm">
                    Return or exchange within 7 days.
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border border-gray-200 p-[12px] sm:p-5 mt-6 rounded-lg">
              <h2 className="font-bold mb-2 text-[16px] sm:text-xl text-gray-800">
                Product Description
              </h2>
              <p className="text-gray-700 leading-relaxed text-[13px] sm:text-base">
                {product.description ||
                  "This is a high-quality product designed for durability and comfort."}
              </p>
            </div>

            <ProductReviews />
          </div>
        </div>
      </div>

      {/* SignIn / SignUp Popup */}
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

      {/* Toast */}
      <Toast message={toastMessage} show={showToast} />
      <Footer />
    </div>
  );
}
