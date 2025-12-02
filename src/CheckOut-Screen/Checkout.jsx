import { useState, useEffect, useContext } from "react";
import { Check, Info, ArrowLeft } from "lucide-react";
import { ProductContext } from "../context/ProductContext";
import { AuthContext } from "../context/LoginAuth";
import { orderplace, addressUpdate } from "../apiroutes/userApi";
import { useLocation, useNavigate } from "react-router-dom";

export default function Checkout() {
  const { selectedProduct, setSelectedProduct, checkoutInfo } =
    useContext(ProductContext);
  const { user } = useContext(AuthContext);
  const { state } = useLocation();
  const navigate = useNavigate();

  const [address, setAddress] = useState(user?.address || "");
  const [isSaved, setIsSaved] = useState(!!user?.address);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const product = selectedProduct || state?.product;
  const quantity =
    checkoutInfo.quantity && checkoutInfo.quantity > 0
      ? checkoutInfo.quantity
      : 1;

  // Safely calculate totalPrice
  const totalPrice =
    checkoutInfo.totalPrice && checkoutInfo.totalPrice > 0
      ? checkoutInfo.totalPrice
      : quantity * (product?.finalPrice || product?.price || 0);

  // Calculate savings
  const savedPrice =
    product?.price && product?.finalPrice
      ? (product.price - product.finalPrice) * quantity
      : 0;

  const [isCODSelected, setIsCODSelected] = useState(false); // default unchecked
  const isContinueDisabled = !address.trim() || !isSaved || !isCODSelected;
  // Payment method state

  useEffect(() => {
    if (state?.product) setSelectedProduct(state.product);
  }, [state]);

  useEffect(() => {
    const savedAddress = localStorage.getItem("checkout_address");
    if (savedAddress) {
      setAddress(savedAddress);
      setIsSaved(true);
    }
  }, []);

  const handleSaveAddress = async () => {
    if (!address.trim()) {
      alert("Please enter your address before saving.");
      return;
    }

    try {
      const updatedUser = { ...user, address: address.trim() };
      await addressUpdate(updatedUser);

      localStorage.setItem("checkout_address", address.trim());
      setIsSaved(true);
    } catch (err) {
      console.error("Address update failed:", err);
      alert("Failed to update address. Please try again.");
    }
  };

  const handleContinue = async () => {
    setLoading(true);
    try {
      const orderData = {
        user_id: user.id,
        product_id: product.id,
        quantity,
        price_per_unit: product.price,
        total_price: totalPrice,
        shipping_name: user.firstname,
        shipping_phone: user.mobile,
        shipping_address: address,
        payment_method: isCODSelected ? "COD" : "",
        payment_status: "Pending",
        order_status: "Processing",
        user_email: user.email,
        productname: product.name,
      };

      await orderplace(orderData);
      setShowPopup(true);
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate("/my-orders");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* HEADER */}
      <header className="my-element text-white px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-black font-medium hover:underline"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-xl sm:text-2xl font-bold italic">E ShopEasy</h1>
        </div>
      </header>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 flex-grow w-full">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <div className="flex-1 space-y-4">
            {/* LOGIN STEP */}
            <div className="bg-white shadow-sm">
              <div className="flex items-center gap-4 p-3 sm:p-4 border-b">
                <span className="w-8 h-8 bg-yellow-600 text-white flex items-center justify-center rounded-sm font-medium flex-shrink-0">
                  1
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">
                    LOGIN
                  </span>
                  <Check className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="px-4 py-3 text-sm text-gray-700">
                {user?.mobile}
              </div>
            </div>

            {/* ADDRESS BOX */}
            <div className="bg-white shadow-sm">
              <div className="flex items-center gap-4 p-3 sm:p-4 border-b">
                <span className="w-8 h-8 bg-yellow-600 text-white flex items-center justify-center rounded-sm font-medium flex-shrink-0">
                  2
                </span>
                <span className="text-gray-700 font-medium text-sm sm:text-base">
                  DELIVERY ADDRESS
                </span>
              </div>

              <div className="px-4 py-3">
                {isSaved ? (
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{user?.firstname}</span>{" "}
                      {address}
                    </p>
                    <button
                      onClick={() => setIsSaved(false)}
                      className="mt-2 text-blue-600 text-sm font-medium"
                    >
                      + Edit Address
                    </button>
                  </div>
                ) : (
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Enter Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      placeholder="Enter your address"
                      onChange={(e) => {
                        setAddress(e.target.value);
                        localStorage.setItem(
                          "checkout_address",
                          e.target.value
                        );
                      }}
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />

                    <button
                      onClick={handleSaveAddress}
                      className="mt-3 bg-blue-600 text-white text-sm px-4 py-2 rounded-md w-full sm:w-auto"
                    >
                      Save Address
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-white shadow-sm">
              <div className="flex items-center gap-4 p-3 sm:p-4">
                <span className="w-8 h-8 bg-yellow-600 text-white flex items-center justify-center rounded-sm font-medium flex-shrink-0">
                  3
                </span>
                <span className="font-medium text-sm sm:text-base">
                  ORDER SUMMARY
                </span>
              </div>

              <div className="p-3 sm:p-4 flex gap-3 sm:gap-4">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-20 h-20 sm:w-28 sm:h-28 object-cover border flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm text-gray-800 mb-1 line-clamp-2">
                    {product?.name} ({quantity} item)
                  </h3>

                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl font-medium">
                      ₹{totalPrice}
                    </span>
                    <Info className="w-3 h-3 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4 border-t pt-4 text-sm text-gray-700">
                Order confirmation email will be sent to{" "}
                <b className="break-all">{user?.email}</b>
              </div>

              {/* COD Checkbox */}
              <div className="bg-gray-50 px-4 py-4 border-t">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Payment Method
                </h3>

                <label
                  className="flex items-center gap-3 cursor-pointer text-sm"
                  onClick={() => setIsCODSelected(!isCODSelected)} // toggle
                >
                  <span
                    className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                      isCODSelected
                        ? "bg-blue-500 border-black"
                        : "border-black"
                    }`}
                  >
                    {isCODSelected && (
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    )}
                  </span>
                  <span>Cash on Delivery (COD)</span>
                </label>
              </div>

              <div className="px-4 pb-4 mt-4">
                <button
                  disabled={isContinueDisabled}
                  onClick={handleContinue}
                  className={`w-full font-medium py-3 rounded shadow-md flex justify-center
                    ${
                      isContinueDisabled
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-orange-500 text-white"
                    }`}
                >
                  {loading ? "Placing Order..." : "CONTINUE"}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PRICE DETAILS */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white shadow-sm lg:sticky lg:top-6">
              <div className="p-4 border-b">
                <h3 className="text-gray-500 font-medium text-sm">
                  PRICE DETAILS
                </h3>
              </div>

              <div className="p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Price ({quantity} item)</span>
                  <span>₹{Math.floor(totalPrice)}</span>
                </div>

                <div className="border-t pt-3 flex justify-between font-medium">
                  <span>Total Payable</span>
                  <span>₹{Math.floor(totalPrice)}</span>
                </div>

                <p className="pt-2 text-green-600 font-medium">
                  Your Total Savings on this order ₹{Math.floor(savedPrice)}
                </p>
              </div>

              <div className="px-4 pb-4 pt-2 text-xs text-gray-600 border-t">
                Safe and Secure Payments. Easy returns. 100% Authentic products.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              🎉 Order Placed Successfully!
            </h2>
            <p className="text-gray-600 mb-4">
              Your order has been placed successfully.
            </p>
            <button
              onClick={closePopup}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg w-full sm:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t py-4 mt-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 text-center md:text-left">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <span>Returns Policy</span>
            <span className="hidden md:inline">|</span>
            <span>Terms of use</span>
            <span className="hidden md:inline">|</span>
            <span>Security</span>
            <span className="hidden md:inline">|</span>
            <span>Privacy</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
            <span>© 2007-2025 E ShopEasy.com</span>
            <span>
              Need help? Visit the{" "}
              <a href="#" className="text-blue-600">
                Help Center
              </a>{" "}
              or{" "}
              <a href="#" className="text-blue-600">
                Contact Us
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
