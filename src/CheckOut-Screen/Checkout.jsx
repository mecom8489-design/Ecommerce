import { useState, useEffect, useContext } from "react";
import { Check, ChevronDown, Plus, Minus, Info } from "lucide-react";
import { ProductContext } from "../context/ProductContext";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/LoginAuth";
import { orderplace } from "../apiroutes/userApi";
import { useNavigate } from "react-router-dom";
export default function Checkout() {
  const [quantity, setQuantity] = useState(1);
  // const [useGST, setUseGST] = useState(false);
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const { state } = useLocation();
  // Update selected product from navigation state
  useEffect(() => {
    if (state?.product) {
      setSelectedProduct(state.product);
    }
  }, [state, setSelectedProduct]);
  const navigate = useNavigate();
  const product = selectedProduct || state?.product;
  const totalPrice = state?.totalPrice;
  const Qua = state?.quantity;
  console.log(totalPrice);
  const [address, setAddress] = useState(user?.address || "");
  const [isSaved, setIsSaved] = useState(!!user?.address);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (address.trim() === "") {
      alert("Please enter your address before saving.");
      return;
    }

    // You can replace this with your API call
    console.log("Saved address:", address);

    setIsSaved(true);
  };
  const savedprice = product.price - product.finalPrice;

  // console.log(savedprice);

  const handleContinue = async () => {
    setLoading(true); // start loading
    try {
      const orderData = {
        user_id: user.id, // Assuming user object has an id
        product_id: product.id,
        quantity: Qua || 1,
        price_per_unit: product.price,
        total_price: totalPrice,
        shipping_name: user.firstname,
        shipping_phone: user.mobile,
        shipping_address: address,
        payment_method: "Online", // or "Cash on Delivery"
        payment_status: "Pending",
        order_status: "Processing",
        user_email: user.email,
        productname: product.name,
      };

      console.log("Order Data Sent:", orderData);

      // Call your API function
      const response = await orderplace(orderData);
      console.log("Order placed successfully:", response);

      // ✅ Show popup instead of alert
      setShowPopup(true);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false); // stop loading
    }
  };

  const nav = () => {
    setShowPopup(false);
    navigate("/my-orders"); // optional redirect
  };

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
                {/* <button className="text-blue-600 font-medium text-sm hover:underline">
                  CHANGE
                </button> */}
              </div>
              <div className="px-4 py-3">
                <p className="text-sm text-gray-700">{user.mobile}</p>
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
                    <span className="text-gray-700 font-medium">
                      DELIVERY ADDRESS
                    </span>
                    {/* <Check className="w-5 h-5 text-blue-600" /> */}
                  </div>
                </div>
                {/* <button className="text-blue-600 font-medium text-sm hover:underline focus:outline-none">
                  + Add
                </button> */}
              </div>
              <div className="px-4 py-3">
                {isSaved ? (
                  // ✅ Show saved address
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{user.firstname}</span>{" "}
                      {address}
                    </p>

                    <button
                      className="mt-2 text-blue-600 text-sm font-medium hover:underline"
                      onClick={() => setIsSaved(false)} // allow editing again
                    >
                      + Edit Address
                    </button>
                  </div>
                ) : (
                  // ❌ No address → show input + save button
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enter Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      placeholder="Enter your address"
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                      onClick={handleSave}
                      className="mt-3 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      Save Address
                    </button>
                  </div>
                )}
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
                      {product.name} <span>({Qua} item)</span>
                    </h3>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl font-medium text-gray-900">
                        {" "}
                        ₹{totalPrice}
                      </span>
                      <Info className="w-3 h-3 text-gray-400" />
                    </div>


                    {/* Quantity Controls */}
                  </div>

                  {/* Delivery Info */}
                  <div className="text-right">
                    <div className="flex items-start gap-2 bg-yellow-50 p-2 rounded text-xs">
                      <span className="text-sm">
                        👉{"  Delivery by Fri Oct 17"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* GST Invoice Checkbox */}

              {/* Email Confirmation */}
              <div className="px-4 pb-4 border-t pt-4">
                <p className="text-sm text-gray-700">
                  Order confirmation email will be sent to{" "}
                  <span className="font-medium">{user.email}</span>
                </p>
              </div>

              {/* Continue Button */}
              {/* ✅ CONTINUE button */}
              <div className="px-0 pb-4 mt-4">
                <button
                  disabled={!isSaved || loading}
                  onClick={isSaved ? handleContinue : undefined}
                  className={`w-full font-medium py-3 rounded shadow-md transition flex items-center justify-center${isSaved ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      <span>Placing order...</span>
                    </div>
                  ) : (
                    "CONTINUE"
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="w-80">
            <div className="bg-white shadow-sm sticky top-6">
              <div className="p-4 border-b">
                <h3 className="text-gray-500 font-medium text-sm">
                  PRICE DETAILS
                </h3>
              </div>

              <div className="p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-700">Price ({Qua} item)</span>
                    <Info className="w-3 h-3 text-gray-400" />
                  </div>
                  <span className="text-gray-900"> ₹{totalPrice}</span>
                </div>

                <div className="border-t pt-3 flex justify-between font-medium text-base">
                  <span className="text-gray-900">Total Payable</span>
                  <span className="text-gray-900">
                    {" "}
                    ₹{Math.floor(totalPrice)}
                  </span>
                </div>

                <div className="pt-2">
                  <p className="text-green-600 font-medium">
                    Your Total Savings on this order ₹{savedprice}
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
                    Safe and Secure Payments. Easy returns. 100% Authentic
                    products.
                  </p>
                </div>
              </div>

              {/* Terms */}
              <div className="px-4 pb-4 pt-2 text-xs text-gray-600 border-t">
                <p>
                  By continuing with the order, you confirm that you are above
                  18 years of age, and you agree to the E ShopEasy's{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-yellow-400 bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center relative animate-fadeIn">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              🎉 Order Placed Successfully!
            </h2>
            <p className="text-gray-600 mb-4">
              Your order has been placed successfully. You’ll receive a
              confirmation email soon.
            </p>
            <button
              onClick={nav}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

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
            <span>
              Need help? Visit the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Help Center
              </a>{" "}
              or{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Contact Us
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
