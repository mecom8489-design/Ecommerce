import { useState } from "react";
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
import Header from "../Header/header";
import image251 from "../assets/images/Best Seller/image-251.png";
import image25 from "../assets/images/Best Seller/generated-image-removebg-preview.png";
import image2 from "../assets/images/Best Seller/generated-image__2_-removebg-preview.png";
import image20 from "../assets/images/Best Seller/generated-image__1_-removebg-preview.png";
import ProductReviews from "./ProductReviews";
export default function product() {
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  const thumbnails = [image251, image25, image2, image20];

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? thumbnails.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev === thumbnails.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto p-6 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Product Images */}
          <div className="flex space-x-4 lg:sticky lg:top-0 self-start">
            {/* Thumbnail Column */}
            <div className="flex flex-col space-y-3">
              {thumbnails.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-20 h-20 rounded-lg border-2 overflow-hidden ${currentImage === index
                      ? "border-gray-400"
                      : "border-gray-200"
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

            {/* Main Image with Arrows */}
            <div className="flex-1 relative">
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  -65%
                </span>
              </div>

              {/* Share Button */}
              <button className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>

              {/* Left Arrow */}
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>

              {/* Main Image */}
              <div className="bg-white rounded-lg p-8 h-156 w-130 flex items-center justify-center">
                <img
                  src={thumbnails[currentImage]}
                  alt="Kitchenify Spice Set Stainless Steel"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6 h-screen  pr-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                Kitchenify Spice Set Stainless Steel
              </h1>

              {/* Rating and Reviews */}
              <div className="flex items-center space-x-4 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-500 ml-2">No Review</span>
                </div>
                <div className="flex items-center text-red-500 text-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span>6 sold in last 20 hours</span>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div>
                  <span className="font-medium">Availability:</span>
                  <span className="text-green-600 ml-2">In Stock</span>
                </div>
                <div>
                  <span className="font-medium">Product Type:</span>
                  <span className="ml-2">Kitchen</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-3 mb-4">
                <span className="text-xl text-gray-400 line-through">
                  ₹ 285.00
                </span>
                <span className="text-3xl font-bold text-red-500">₹ 99.00</span>
              </div>

              {/* Stock Alert */}
              <div className="bg-red-50 border-l-4 border-red-400 p-3 mb-6">
                <p className="text-red-700 text-sm font-medium">
                  Hurry, only 1 item(s) left in stock!
                </p>
              </div>
            </div>

            {/* Quantity and Checkout */}
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
                CHECKOUT - ₹ 99.00
              </button>

              <button className="p-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Ask Expert */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">?</span>
              </div>
              {/* <button className="text-orange-600 font-medium hover:underline">
                Ask An Expert
              </button> */}
            </div>

            {/* Buy Now Button */}
            <button className="w-full bg-yellow-500 text-white py-4 rounded font-bold text-lg hover:bg-yellow-600 transition-colors mb-6">
              BUY IT NOW
            </button>

            {/* Pickup Information */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 text-blue-500 mt-0.5">✓</div>
                <div>
                  <p className="text-blue-600 font-medium">
                    Pickup available at ShopEasy
                  </p>
                  <p className="text-gray-600 text-sm">
                    Usually ready in 1 hour
                  </p>
                  <button className="text-gray-600 text-sm underline hover:text-gray-800">
                    View store information
                  </button>
                </div>
              </div>

              {/* Free Shipping */}
              <div className="flex items-start space-x-3">
                <Truck className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-800">
                      Free Shipping
                    </span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-gray-600 text-sm">
                    Free shipping on orders over ₹990.
                  </p>
                  <p className="text-gray-500 text-sm">
                    Estimated to be delivered on same day or within 24hrs.
                  </p>
                </div>
              </div>

              {/* Return Process */}
              <div className="flex items-start space-x-3">
                <RotateCcw className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-800">
                      Return Process
                    </span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-gray-600 text-sm">
                    Return or exchange is possible easily.
                  </p>
                  <p className="text-gray-500 text-sm">
                    For more info you can read our Return Policy
                  </p>
                </div>
              </div>
              {/* Product Description */}

              <div className="max-w-7xl mx-auto  border border-gray-200 p-5  ">
                <h1 className="text-2xl font-bold text-gray-800 border-b-1 border-gray-200 pb-2">
                  Product Description
                </h1>

                <h1 className="text-lg font-semibold  mt-6 mb-4 text-gray-800">
                  Spice Jar Set with Holder
                </h1>
                <p className="text-gray-700 mb-4">
                  Organize your kitchen in style with this premium spice jar
                  set. Crafted from durable glass with airtight black lids, each
                  jar preserves the freshness and aroma of your spices, herbs,
                  or lentils. The elegant, minimalist holder keeps your
                  ingredients within easy reach and adds a modern touch to your
                  countertop.
                </p>

                <h2 className="text-lg font-semibold mt-6 mb-2 text-gray-800">
                  Features:
                </h2>
                <ul className="list-disc ml-6 mb-4 text-gray-700 space-y-1">
                  <li>Set includes 6 glass spice jars with leak-proof lids</li>
                  <li>Sturdy, compact storage rack for easy organization</li>
                  <li>Transparent jars for quick ingredient identification</li>
                  <li>Removable lids for easy refilling and cleaning</li>
                  <li>
                    Ideal for spices, herbs, lentils, seasoning blends, and more
                  </li>
                  <li>Sleek modern design to suit any kitchen décor</li>
                </ul>

                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                  Product Details:
                </h2>
                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                  <li>Material: Glass jars, plastic lids, metal holder</li>
                  <li>Capacity: Approx. 150 ml per jar</li>
                  <li>Dimensions: Holder - 24cm x 12cm x 15cm (LxWxH)</li>
                  <li>Easy to wash and maintain</li>
                  <li>
                    Suitable for kitchen countertops, cabinets, or tabletops
                  </li>
                </ul>
              </div>
              <ProductReviews />
            </div>
          </div>
        </div>
        {/* Product Description */}

        {/* Wherever you want to place reviews */}
      </div>
    </div>
  );
}
