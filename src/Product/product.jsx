import { useState, useEffect, useContext } from "react";
import {
  Heart,
  Share2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Truck,
  RotateCcw,
  Info,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import Header from "../Header/header";
import ProductReviews from "./ProductReviews";
import Footer from "../Footer/footer.jsx";
import { useCart } from "../context/CartContext";
import Toast from "../context/ToastAddToCart.jsx";
import { addToWishlist } from "../utils/wishlistUtils.js";

export default function Product() {
  const { addToCart } = useCart();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);

  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleWishlist = (product) => {
    addToWishlist(product);
  };

  // Update selected product from navigation state

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Normalize values from product (convert strings → numbers)
  const rawProduct = selectedProduct || state?.product;

  const product = rawProduct
    ? {
        ...rawProduct,
        price: Number(rawProduct.price),
        discount: Number(rawProduct.discount),
        finalPrice: Number(rawProduct.finalPrice),
      }
    : null;

  const [quantity, setQuantity] = useState(1);
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

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const finalPrice = product.price - product.price * (product.discount / 100);

  useEffect(() => {
    if (state?.product) {
      setSelectedProduct(state.product);
    }
  }, [state, setSelectedProduct, product]);

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto p-6 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Product Images */}
          <div className="flex space-x-4 lg:sticky lg:top-0 self-start">
            {/* (You can add thumbnails here if needed) */}

            {/* Main Image */}
            <div className="flex-1 relative">
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  -{product.discount || "50"}%
                </span>
              </div>

              <button className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>

              <div
                className="bg-white rounded-lg p-8 h-156 w-130 flex items-center justify-center relative overflow-hidden"
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

          {/* Right Side */}
          <div className="space-y-6 pr-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline space-x-3 mb-4">
                <span className="text-xl text-gray-400 line-through">
                  ₹{Math.floor(product.price)}
                </span>
                <span className="text-3xl font-bold text-red-500">
                  ₹{Math.floor(finalPrice)}
                </span>
              </div>

              <div className="bg-red-50 border-l-4 border-red-400 p-3 mb-6">
                <p className="text-red-700 text-sm font-medium">
                  Hurry, only few left in stock!
                </p>
              </div>
            </div>

            {/* Quantity & Checkout */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={decrementQuantity}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="px-6 py-3 border-l border-r border-gray-300 bg-gray-50 min-w-[80px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>

              <button className="flex-1 bg-gray-800 text-white px-8 py-3 rounded font-medium hover:bg-gray-900 transition-colors">
                Total - ₹ {Math.floor(finalPrice * quantity)}
              </button>

              <button
                className="p-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleWishlist(product);
                  triggerToast("Added to Wishlist ✔️");
                }}
              >
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Buy Now */}
            <button
              className="w-full bg-yellow-500 text-white py-4 rounded font-bold text-lg hover:bg-yellow-600 transition-colors mb-6"
              onClick={() =>
                navigate(`/ProductPage/products/Checkout/${product.id}`, {
                  state: {
                    product,
                    quantity,
                    totalPrice: Math.floor(finalPrice * quantity),
                    finalPrice,
                  },
                })
              }
            >
              BUY IT NOW
            </button>

            {/* Add to Cart */}
            <button
              className="w-full bg-red-500 text-white py-4 rounded font-bold text-lg hover:bg-red-600 transition-colors mb-6"
              onClick={() => addToCart(product)}
            >
              ADD TO CART
            </button>

            {/* Delivery Info */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Truck className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Free Shipping</p>
                  <p className="text-gray-600 text-sm">
                    Free shipping on orders over ₹990.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <RotateCcw className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Easy Returns</p>
                  <p className="text-gray-600 text-sm">
                    Return or exchange within 7 days.
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border border-gray-200 p-5 mt-6 rounded-lg">
              <h2 className="text-xl font-bold mb-3 text-gray-800">
                Product Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description ||
                  "This is a high-quality product designed for durability and comfort."}
              </p>
            </div>

            <ProductReviews />
          </div>
        </div>
      </div>
      <Toast message={toastMessage} show={showToast} />
      <Footer />
    </div>
  );
}
