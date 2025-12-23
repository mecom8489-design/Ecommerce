import { useState, useEffect, useContext } from "react";
import { Check, Info, ArrowLeft, X } from "lucide-react";
import { ProductContext } from "../context/ProductContext";
import { AuthContext } from "../context/LoginAuth";
import {
  orderplace,
  addressUpdate,
  verifyRazorpayPayment,
  createRazorpayOrder,
} from "../apiroutes/userApi";
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
  const [isLoading, setIsLoading] = useState(false);

  const isCartCheckout = state?.isCartCheckout;
  const cartProducts = state?.products || [];

  const product = selectedProduct || state?.product;
  const quantity =
    checkoutInfo.quantity && checkoutInfo.quantity > 0
      ? checkoutInfo.quantity
      : 1;

  const totalPrice = isCartCheckout
    ? cartProducts.reduce((acc, item) => acc + item.finalPrice * (item.qty || 1), 0)
    : checkoutInfo.totalPrice && checkoutInfo.totalPrice > 0
      ? checkoutInfo.totalPrice
      : quantity * (product?.finalPrice || product?.price || 0);

  const savedPrice = isCartCheckout
    ? cartProducts.reduce(
      (acc, item) => acc + (item.price - item.finalPrice) * (item.qty || 1),
      0
    )
    : product?.price && product?.finalPrice
      ? (product.price - product.finalPrice) * quantity
      : 0;

  const [paymentMethod, setPaymentMethod] = useState("");

  const isContinueDisabled = !address.trim() || !isSaved || !paymentMethod;

  useEffect(() => {
    if (state?.product) setSelectedProduct(state.product);
  }, [state, setSelectedProduct]);

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

  const handleRazorpayPayment = async () => {
    try {
      setLoading(true);

      // 1️⃣ Create Razorpay Order
      const { data: order } = await createRazorpayOrder({ amount: totalPrice });

      // 2️⃣ Razorpay Options
      const options = {
        key: "rzp_test_RqAz9S8L2bcJlg",
        amount: order.amount,
        currency: "INR",
        name: "E ShopEasy",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {
          const { data: verify } = await verifyRazorpayPayment(response);
          if (verify.success) {
            setIsLoading(true);
            if (isCartCheckout) {
              const orderPromises = cartProducts.map((item) =>
                orderplace({
                  user_id: user.id,
                  product_id: item.id,
                  quantity: item.qty || 1,
                  price_per_unit: item.finalPrice,
                  total_price: item.finalPrice * (item.qty || 1),
                  shipping_name: user.firstname,
                  shipping_phone: user.mobile,
                  shipping_address: address,
                  payment_method: "Razorpay",
                  payment_status: "Paid",
                  order_status: "Processing",
                  user_email: user.email,
                  productname: item.name,
                  razorpay_order_id: verify.razorpay_order_id,
                  razorpay_payment_id: verify.razorpay_payment_id,
                  razorpay_signature: verify.razorpay_signature,
                })
              );
              await Promise.all(orderPromises);
            } else {
              await orderplace({
                user_id: user.id,
                product_id: product.id,
                quantity,
                price_per_unit: product.price,
                total_price: totalPrice,
                shipping_name: user.firstname,
                shipping_phone: user.mobile,
                shipping_address: address,
                payment_method: "Razorpay",
                payment_status: "Paid",
                order_status: "Processing",
                user_email: user.email,
                productname: product.name,
                razorpay_order_id: verify.razorpay_order_id,
                razorpay_payment_id: verify.razorpay_payment_id,
                razorpay_signature: verify.razorpay_signature,
              });
            }
            setIsLoading(false);
            setShowPopup(true);
          } else {
            alert("Payment verification failed.");
          }
        },

        theme: { color: "#F37254" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      alert("Failed to start Razorpay payment.");
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    if (paymentMethod === "COD") {
      setLoading(true);

      try {
        if (isCartCheckout) {
          const orderPromises = cartProducts.map((item) =>
            orderplace({
              user_id: user.id,
              product_id: item.id,
              quantity: item.qty || 1,
              price_per_unit: item.finalPrice,
              total_price: item.finalPrice * (item.qty || 1),
              shipping_name: user.firstname,
              shipping_phone: user.mobile,
              shipping_address: address,
              payment_method: "COD",
              payment_status: "Pending",
              order_status: "Processing",
              user_email: user.email,
              productname: item.name,
            })
          );
          await Promise.all(orderPromises);
        } else {
          const orderData = {
            user_id: user.id,
            product_id: product.id,
            quantity,
            price_per_unit: product.price,
            total_price: totalPrice,
            shipping_name: user.firstname,
            shipping_phone: user.mobile,
            shipping_address: address,
            payment_method: "COD",
            payment_status: "Pending",
            order_status: "Processing",
            user_email: user.email,
            productname: product.name,
          };

          await orderplace(orderData);
        }
        setShowPopup(true);
      } catch (err) {
        console.error("Error placing COD order:", err);
        alert("Failed to place order.");
      } finally {
        setLoading(false);
      }
      return;
    }

    if (paymentMethod === "Razorpay") {
      handleRazorpayPayment();
      return;
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate("/my-orders");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* HEADER */}
      <header className="my-element text-white px-4 py-3 shadow-md bg-yellow-400">
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

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 flex-grow w-full">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* LEFT SECTION */}
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

            {/* ADDRESS */}
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

              <div className="p-3 sm:p-4 space-y-4">
                {isCartCheckout ? (
                  cartProducts.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 sm:gap-4 border-b pb-4 last:border-0 last:pb-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-sm flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm text-gray-800 mb-1 line-clamp-2">
                          {item.name} ({item.qty || 1} item)
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-lg sm:text-xl font-medium">
                            ₹{Math.floor(item.finalPrice * (item.qty || 1))}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex gap-3 sm:gap-4">
                    <img
                      src={product?.image}
                      alt={product?.name}
                      className="w-20 h-20 object-cover rounded-sm flex-shrink-0"
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
                )}
              </div>

              <div className="px-4 pb-4 border-t pt-4 text-sm text-gray-700">
                Order confirmation email will be sent to{" "}
                <b className="break-all">{user?.email}</b>
              </div>

              {/* PAYMENT METHODS */}
              <div className="bg-gray-50 px-4 py-4 border-t space-y-3">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Payment Method
                </h3>

                {/* COD */}
                <label className="flex items-center gap-3 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                  />
                  <span>Cash on Delivery (COD)</span>
                </label>

                {/* Razorpay */}
                <label className="flex items-center gap-3 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "Razorpay"}
                    onChange={() => setPaymentMethod("Razorpay")}
                  />
                  <span>Razorpay (UPI / Card / Wallet)</span>
                </label>
              </div>

              <div className="px-4 pb-4 mt-4">
                <button
                  disabled={isContinueDisabled || loading}
                  onClick={handleContinue}
                  className={`w-full font-medium py-3 rounded shadow-md flex justify-center
                    ${isContinueDisabled || loading
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-orange-500 text-white"
                    }`}
                >
                  {loading ? "Processing..." : "CONTINUE"}
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
                  <span>
                    Price ({isCartCheckout ? cartProducts.length : quantity} item)
                  </span>
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

      {isLoading && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md shadow-md text-center">
            <div className="loader border-4 border-t-transparent border-blue-600 rounded-full w-10 h-10 mx-auto animate-spin"></div>
            <p className="mt-3 font-medium text-gray-700">
              Processing pls wait...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
