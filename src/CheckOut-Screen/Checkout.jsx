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
  const quantity = checkoutInfo.quantity;
  const totalPrice = checkoutInfo.totalPrice;
  const savedPrice = (product.price - product.finalPrice) * quantity;

  const isContinueDisabled = !address.trim() || !isSaved;

  
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
        payment_method: "Online",
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
          <h1 className="text-2xl font-bold italic">E ShopEasy</h1>
        </div>
      </header>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex-grow">
        <div className="flex gap-4">
          <div className="flex-1 space-y-4">
            <div className="bg-white shadow-sm">
              <div className="flex items-center gap-4 p-4 border-b">
                <span className="w-8 h-8 bg-yellow-600 text-white flex items-center justify-center rounded-sm font-medium">1</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 font-medium">LOGIN</span>
                  <Check className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="px-4 py-3 text-sm text-gray-700">
                {user?.mobile}
              </div>
            </div>

            {/* ADDRESS BOX */}
            <div className="bg-white shadow-sm">
              <div className="flex items-center gap-4 p-4 border-b">
                <span className="w-8 h-8 bg-yellow-600 text-white flex items-center justify-center rounded-sm font-medium">2</span>
                <span className="text-gray-700 font-medium">DELIVERY ADDRESS</span>
              </div>

              <div className="px-4 py-3">
                {isSaved ? (
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{user?.firstname}</span> {address}
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
                    <label className="text-sm font-medium text-gray-700">Enter Address</label>
                    <input
                      type="text"
                      value={address}
                      placeholder="Enter your address"
                      onChange={(e) => {
                        setAddress(e.target.value);
                        localStorage.setItem("checkout_address", e.target.value);
                      }}
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />

                    <button
                      onClick={handleSaveAddress}
                      className="mt-3 bg-blue-600 text-white text-sm px-4 py-2 rounded-md"
                    >
                      Save Address
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-white shadow-sm">
              <div className="flex items-center gap-4 p-4">
                <span className="w-8 h-8 bg-yellow-600 text-white flex items-center justify-center rounded-sm font-medium">3</span>
                <span className="font-medium">ORDER SUMMARY</span>
              </div>

              <div className="p-4 flex gap-4">
                <img src={product.image} alt={product.name} className="w-28 h-28 object-cover border" />

                <div className="flex-1">
                  <h3 className="text-sm text-gray-800 mb-1">
                    {product.name} ({quantity} item)
                  </h3>

                  <div className="flex items-center gap-2">
                    <span className="text-xl font-medium">₹{totalPrice}</span>
                    <Info className="w-3 h-3 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4 border-t pt-4 text-sm text-gray-700">
                Order confirmation email will be sent to <b>{user?.email}</b>
              </div>

              <div className="px-0 pb-4 mt-4">
                <button
                  disabled={loading || isContinueDisabled}
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
          <div className="w-80">
            <div className="bg-white shadow-sm sticky top-6">
              <div className="p-4 border-b">
                <h3 className="text-gray-500 font-medium text-sm">PRICE DETAILS</h3>
              </div>

              <div className="p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Price ({quantity} item)</span>
                  <span>₹{totalPrice}</span>
                </div>

                <div className="border-t pt-3 flex justify-between font-medium">
                  <span>Total Payable</span>
                  <span>₹{totalPrice}</span>
                </div>

                <p className="pt-2 text-green-600 font-medium">
                  Your Total Savings on this order ₹{savedPrice}
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
        <div className="fixed inset-0 bg-yellow-400 bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              🎉 Order Placed Successfully!
            </h2>
            <p className="text-gray-600 mb-4">Your order has been placed successfully.</p>
            <button
              onClick={closePopup}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t py-4 mt-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-between text-xs text-gray-600">
          <div className="flex gap-4">
            <span>Returns Policy</span>
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

