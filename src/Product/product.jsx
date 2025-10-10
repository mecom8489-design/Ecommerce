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

export default function product() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);

  // Update selected product from navigation state
  useEffect(() => {
    if (state?.product) {
      setSelectedProduct(state.product);
    }
  }, [state, setSelectedProduct]);

  const product = selectedProduct || state?.product;
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
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handlePrevImage = () => setCurrentImage((prev) => (prev === 0 ? thumbnails.length - 1 : prev - 1));
  const handleNextImage = () => setCurrentImage((prev) => (prev === thumbnails.length - 1 ? 0 : prev + 1));

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto p-6 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Product Images */}
          <div className="flex space-x-4 lg:sticky lg:top-0 self-start">
            {/* Thumbnails */}
            <div className="flex flex-col space-y-3">
              {thumbnails.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-20 h-20 rounded-lg border-2 overflow-hidden ${
                    currentImage === index ? "border-gray-400" : "border-gray-200"
                  } hover:border-gray-400 transition-colors`}
                >
                  <img
                    src={thumb}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
              <button className="w-20 h-20 flex items-center justify-center border-2 border-gray-200 rounded-lg hover:border-gray-400 transition-colors">
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </button>
            </div>

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

              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>

              <div className="bg-white rounded-lg p-8 h-156 w-130 flex items-center justify-center">
                <img
                  src={thumbnails[currentImage]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6 pr-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline space-x-3 mb-4">
                <span className="text-xl text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
                <span className="text-3xl font-bold text-red-500">
                  ₹{product.currentPrice}
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
                CHECKOUT - ₹{product.currentPrice * quantity}
              </button>

              <button className="p-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Buy Now */}
            <button className="w-full bg-yellow-500 text-white py-4 rounded font-bold text-lg hover:bg-yellow-600 transition-colors mb-6">
              BUY IT NOW
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
    </div>
  );
}
