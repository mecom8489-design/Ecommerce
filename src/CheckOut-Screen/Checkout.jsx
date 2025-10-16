import { useState, useEffect, useContext } from "react";
import { Check, ChevronDown, Plus, Minus, Info } from 'lucide-react';
import { ProductContext } from "../context/ProductContext";
import { useLocation } from "react-router-dom";
export default function Checkout() {
  const [quantity, setQuantity] = useState(1);
  const [useGST, setUseGST] = useState(false);
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);
    const { state } = useLocation();
  // Update selected product from navigation state
  useEffect(() => {
    if (state?.product) {
      setSelectedProduct(state.product);
    }
  }, [state, setSelectedProduct]);

  const product = selectedProduct || state?.product;
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="my-element text-white px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold italic"> E ShopEasy</h1>
            {/* <div className="flex items-center gap-1 text-xs">
              <span>Explore</span>
              <span className="font-semibold">Plus</span>
              <Plus className="w-3 h-3" />
            </div> */}
         
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-4">
          {/* Left Section */}
          <div className="flex-1 space-y-4">
            {/* Login Section */}
            <div className="bg-white shadow-sm">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-8 h-8 bg-yellow-600 text-white rounded-sm font-medium">
                    1
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-medium">LOGIN</span>
                    <Check className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <button className="text-blue-600 font-medium text-sm hover:underline">
                  CHANGE
                </button>
              </div>
              <div className="px-4 py-3">
                <p className="text-sm text-gray-700">+919003472938</p>
              </div>
            </div>

            {/* Delivery Address Section */}
            <div className="bg-white shadow-sm">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-8 h-8 bg-yellow-600 text-white rounded-sm font-medium">
                    2
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-medium">DELIVERY ADDRESS</span>
                    <Check className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <button className="text-blue-600 font-medium text-sm hover:underline">
                  CHANGE
                </button>
              </div>
              <div className="px-4 py-3">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Dinesh</span> No.192 ,venkateswara nagar,acharampattu,vanur tk,viluppuram., Venkateswara Temple, Tiruchtrambalam, Tamil Nadu - <span className="font-medium">605111</span>
                </p>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="bg-white shadow-sm">
              <div className="flex items-center gap-4 p-4 text-black">
                <span className="flex items-center justify-center w-8 h-8 bg-yellow-600 text-white rounded-sm font-medium">
                  3
                </span>
                <span className="font-medium">ORDER SUMMARY</span>
              </div>

              {/* Product Details */}
              <div className="p-4">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={product.image}
                      alt="Samsung Galaxy S25 Ultra"
                      className="w-28 h-28 object-cover border"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-sm text-gray-800 mb-1">
                     {product.name}
                    </h3>
                    {/* <p className="text-xs text-gray-500 mb-2">12 GB RAM</p>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                      <span>Seller: MightyDeal</span>
                      <img src="https://via.placeholder.com/50x12/4A90E2/FFFFFF?text=Assured" alt="Assured" className="h-3" />
                    </div> */}

                    {/* Price Section */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-400 line-through text-sm"> ₹{product.originalPrice}</span>
                      <span className="text-xl font-medium text-gray-900"> ₹{product.currentPrice}</span>
                      <span className="text-green-600 text-xs font-medium">16% Off</span>
                      <span className="text-green-600 text-xs font-medium">7 offers available</span>
                      <Info className="w-3 h-3 text-gray-400" />
                    </div>

                    {/* Protect Promise Fee */}
                    <div className="flex items-center gap-1 text-xs text-gray-700 mb-3">
                      <span>+ ₹149 Protect Promise Fee</span>
                      <Info className="w-3 h-3 text-gray-400" />
                    </div>

                    <p className="text-xs text-gray-600 mb-3">
                      Or Pay ₹107,860 + ₹100 (with coin icon)
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="text"
                          value={quantity}
                          readOnly
                          className="w-12 text-center border-x text-sm"
                        />
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
                        REMOVE
                      </button>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="text-right">
                    <p className="text-xs text-gray-600 mb-2">Delivery by Fri Oct 17</p>
                    <div className="flex items-start gap-2 bg-yellow-50 p-2 rounded text-xs">
                      <span className="text-2xl">👉</span>
                      <div className="text-left">
                        <p className="font-medium text-gray-800 mb-1">
                          Open Box Delivery is eligible for this item. You will receive a confirmation post payment.
                        </p>
                        <button className="text-blue-600 font-medium hover:underline">
                          Know More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* GST Invoice Checkbox */}
              <div className="px-4 pb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useGST}
                    onChange={(e) => setUseGST(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Use GST Invoice</span>
                </label>
              </div>

              {/* Email Confirmation */}
              <div className="px-4 pb-4 border-t pt-4">
                <p className="text-sm text-gray-700">
                  Order confirmation email will be sent to{' '}
                  <span className="font-medium">xxyyy@gmail.com</span>
                </p>
              </div>

              {/* Continue Button */}
              <div className="px-4 pb-4">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded shadow-md">
                  CONTINUE
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Price Details */}
          <div className="w-80">
            <div className="bg-white shadow-sm sticky top-6">
              <div className="p-4 border-b">
                <h3 className="text-gray-500 font-medium text-sm">PRICE DETAILS</h3>
              </div>

              <div className="p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-700">Price (1 item)</span>
                    <Info className="w-3 h-3 text-gray-400" />
                  </div>
                  <span className="text-gray-900"> ₹{product.currentPrice}</span>
                </div>

                {/* <div className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-700">Protect Promise Fee</span>
                    <Info className="w-3 h-3 text-gray-400" />
                  </div>
                  <span className="text-gray-900">₹149</span>
                </div> */}

                <div className="border-t pt-3 flex justify-between font-medium text-base">
                  <span className="text-gray-900">Total Payable</span>
                  <span className="text-gray-900"> ₹{product.currentPrice}</span>
                </div>

                <div className="pt-2">
                  <p className="text-green-600 font-medium">
                    Your Total Savings on this order ₹21,890
                  </p>
                </div>
              </div>

              {/* Safe and Secure */}
              <div className="px-4 pb-4 pt-2">
                <div className="flex items-start gap-2 text-xs text-gray-600">
                  <div className="flex-shrink-0 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-gray-600" />
                  </div>
                  <p>
                    Safe and Secure Payments. Easy returns. 100% Authentic products.
                  </p>
                </div>
              </div>

              {/* Terms */}
              <div className="px-4 pb-4 pt-2 text-xs text-gray-600 border-t">
                <p>
                  By continuing with the order, you confirm that you are above 18 years of age, and you agree to the E ShopEasy's{' '}
                  <a href="#" className="text-blue-600 hover:underline">Terms of Use</a> and{' '}
                  <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-xs text-gray-600">
          <div className="flex gap-4">
            <span>Policies: Returns Policy</span>
            <span>|</span>
            <span>Terms of use</span>
            <span>|</span>
            <span>Security</span>
            <span>|</span>
            <span>Privacy</span>
          </div>
          <div className="flex gap-4">
            <span>© 2007-2025 E ShopEasy.com</span>
            <span>Need help? Visit the <a href="#" className="text-blue-600 hover:underline">Help Center</a> or <a href="#" className="text-blue-600 hover:underline">Contact Us</a></span>
          </div>
        </div>
      </footer>
    </div>
  );
}