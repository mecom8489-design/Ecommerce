import React, { useState, useContext } from "react";
import {
  Home,
  User,
  ChevronDown,
  Copy,
  ChevronLeft,
} from "lucide-react";
import { AuthContext } from "../context/LoginAuth";
import { cancelUserOrder, addReview } from "../apiroutes/userApi";
import { toast } from "react-toastify";

const Orderdetails = ({ selectedOrder, setIsOpen, setRefresh }) => {
  const { user } = useContext(AuthContext);
  const fullName = `${user.firstname} ${user.lastname}`;
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewTextValue, setreviewTextValue] = useState(0);
  const [ratingValue, setRatingValue] = useState(0);

  const [reviewText, setReviewText] = useState("");
  const [showTotalFees, setShowTotalFees] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isSubmitted, setisSubmitted] = useState(false);

  const handleCancelOrder = async () => {
    try {
      const reason = {
        reason: cancelReason,
      };
      await cancelUserOrder(selectedOrder.order_id, reason);
      toast.success("Order Cancelled Successfully!");
      setRefresh((prev) => !prev);
      setReviewText("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Failed to cancel order");
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!rating) {
      alert("Please select a star rating");
      return;
    }

    setisSubmitted(true);
    const reviewData = {
      user_id: selectedOrder.user_id,
      product_id: selectedOrder.product_id,
      rating: rating,
      review_text: reviewText,
    };

    try {
      await addReview(reviewData);
      toast.success("Review submitted successfully!");
      setRatingValue(reviewData.rating);
      setreviewTextValue(reviewData.review_text);
      setReviewText("");
      setRating(0);
      setisSubmitted(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Failed to submit review");
      setisSubmitted(false);
    }
  };

  return (
    <>
      <div>
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white w-full max-w-7xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-lg shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setIsOpen(false), setRefresh((prev) => !prev);
              }}
              className="sticky top-2 left-2 sm:top-4 sm:left-4 z-10 flex items-center gap-1 
             px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white shadow-md
             text-gray-800 hover:bg-gray-100 transition-all mb-5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs sm:text-sm  font-medium">Back</span>
            </button>

            <div className="min-h-screen bg-gray-50 rounded-lg">
              <div className="bg-white border-b border-gray-200 rounded-t-lg">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-3">
                  <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 overflow-x-auto">
                    <span className="hover:text-blue-600 cursor-pointer whitespace-nowrap">
                      Home
                    </span>
                    <span>›</span>
                    <span className="hover:text-blue-600 cursor-pointer whitespace-nowrap">
                      My Account
                    </span>
                    <span>›</span>
                    <span className="hover:text-blue-600 cursor-pointer whitespace-nowrap">
                      My Orders
                    </span>
                    <span>›</span>
                    <span className="text-gray-900 whitespace-nowrap">
                      OD#{selectedOrder.order_id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 sm:gap-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                      <div className="flex gap-3 sm:gap-4">
                        <img
                          src={selectedOrder.product_image}
                          alt="Product"
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded border border-gray-200 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h1 className="text-sm sm:text-base font-medium text-gray-900 mb-1 line-clamp-2">
                            {selectedOrder.product_name}
                          </h1>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                            {selectedOrder.product_description}
                          </p>
                          <p className="text-base sm:text-lg font-semibold text-gray-900">
                            ₹{selectedOrder.total_price}
                          </p>
                        </div>
                      </div>
                    </div>

                    {reviewTextValue && ratingValue ? (
                      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                        <div className="flex gap-3 sm:gap-4">
                          <div className="flex-1">
                            <h1 className="text-sm sm:text-base font-medium text-gray-900 mb-2">
                              {reviewTextValue}
                            </h1>

                            <div className="text-xs sm:text-sm flex items-center flex-wrap gap-2">
                              <span>Rating:</span>
                              <span className="flex relative">
                                <div className="flex text-gray-300">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <span
                                      key={i}
                                      className="text-base sm:text-lg"
                                    >
                                      ★
                                    </span>
                                  ))}
                                </div>

                                <div
                                  className="flex text-yellow-500 absolute left-0 top-0 overflow-hidden"
                                  style={{
                                    width: `${(Number(ratingValue) / 5) * 100
                                      }%`,
                                  }}
                                >
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <span
                                      key={i}
                                      className="text-base sm:text-lg"
                                    >
                                      ★
                                    </span>
                                  ))}
                                </div>
                              </span>
                              <span className="text-gray-700">
                                (
                                {ratingValue
                                  ? Number(ratingValue).toFixed(2)
                                  : "-"}
                                )
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                      <div className="space-y-0">
                        <div className="flex items-start justify-between gap-3 flex-wrap">

                          {selectedOrder.cancelled == 1 ? (
                            <div className="flex gap-3">
                              <div className="flex flex-col items-center">
                                <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                                  <svg
                                    className="w-3 h-3 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <div className="w-0.5 flex-1 bg-red-500"></div>
                              </div>

                              <div className="pt-0.5 pb-6">
                                <p className="text-xs sm:text-sm text-gray-900">
                                  Order Confirmed,&nbsp;
                                  {new Date(
                                    selectedOrder.created_at
                                  ).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex gap-3">
                              <div className="flex flex-col items-center">
                                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                  <svg
                                    className="w-3 h-3 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <div className="w-0.5 flex-1 bg-green-500"></div>
                              </div>

                              <div className="pt-0.5 pb-6">
                                <p className="text-xs sm:text-sm text-gray-900">
                                  Order Confirmed,&nbsp;
                                  {new Date(
                                    selectedOrder.created_at
                                  ).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                          )}
                          {selectedOrder.cancelled == 1 ? (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-3 py-1.5 rounded-lg shadow-sm text-xs sm:text-sm">
                              <span className="text-red-600">⚠️</span>
                              <p className="font-medium whitespace-nowrap">
                                Order Cancelled
                              </p>
                            </div>
                          ) : (
                            <button
                              onClick={() => setShowCancelPopup(true)}
                              className="px-3 py-1.5 text-xs sm:text-sm bg-red-600 text-white rounded-md hover:bg-red-700 whitespace-nowrap"
                            >
                              Cancel Order
                            </button>
                          )}
                        </div>
                        {showCancelPopup && (
                          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
                            <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-lg shadow-lg">
                              <h2 className="text-base sm:text-lg font-semibold mb-3">
                                Reason for Cancellation
                              </h2>

                              <textarea
                                className="w-full border p-2 sm:p-3 rounded-md text-sm sm:text-base"
                                rows="4"
                                placeholder="Enter reason…"
                                value={cancelReason}
                                onChange={(e) =>
                                  setCancelReason(e.target.value)
                                }
                              ></textarea>

                              <div className="flex justify-end gap-3 mt-4">
                                <button
                                  onClick={() => setShowCancelPopup(false)}
                                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-sm sm:text-base"
                                >
                                  Close
                                </button>

                                <button
                                  onClick={() => {
                                    handleCancelOrder();
                                    setShowCancelPopup(false);
                                    setCancelReason("");
                                  }}
                                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm sm:text-base"
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        )}


                        {selectedOrder.cancelled == 1 ? (
                          <div className="flex items-start gap-3">
                            <div className="flex flex-col items-center">
                              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="pt-0.5">
                              <p className="text-xs sm:text-sm text-gray-900">
                                Cancelled on,{" "}
                                {new Date(
                                  selectedOrder.updated_at
                                ).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start gap-3">
                            <div className="flex flex-col items-center">
                              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="pt-0">
                              <p className="text-xs sm:text-sm text-gray-900">
                                Expected Delivery{" "}
                                {new Date(
                                  selectedOrder.delivery_date
                                ).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                      <h2 className="text-sm sm:text-base font-medium text-gray-900 mb-4">
                        Rate your experience
                      </h2>

                      <div className="flex gap-1 sm:gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
                          >
                            <svg
                              className={`w-6 h-6 sm:w-8 sm:h-8 ${rating >= star
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                                }`}
                              stroke="currentColor"
                              fill={rating >= star ? "currentColor" : "none"}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                              />
                            </svg>
                          </button>
                        ))}
                      </div>
                      <div className="mt-4">
                        <form onSubmit={handleSubmitReview}>
                          <textarea
                            className="w-full p-2 sm:p-3 border rounded-lg focus:ring focus:ring-blue-300 resize-none text-sm sm:text-base"
                            rows="4"
                            placeholder="Enter your text here..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                          ></textarea>
                          <button
                            type="submit"
                            disabled={isSubmitted}
                            className={`mt-3 px-3 sm:px-4 py-1.5 sm:py-2 text-white rounded-lg text-sm sm:text-base ${isSubmitted
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700"
                              }`}
                          >
                            {isSubmitted ? "Submitted" : "Submit"}
                          </button>
                        </form>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <span>Order #{selectedOrder.order_id}</span>
                        <button
                          className="text-blue-600 hover:text-blue-700 cursor-pointer"
                          onClick={() => {
                            const orderId = String(selectedOrder.order_id);
                            if (navigator.clipboard && navigator.clipboard.writeText) {
                              navigator.clipboard.writeText(orderId)
                                .then(() => toast.success("Order ID copied to clipboard!"))
                                .catch((err) => {
                                  console.error("Failed to copy:", err);
                                  toast.error("Failed to copy Order ID");
                                });
                            } else {
                              try {
                                const textArea = document.createElement("textarea");
                                textArea.value = orderId;
                                document.body.appendChild(textArea);
                                textArea.select();
                                document.execCommand("copy");
                                document.body.removeChild(textArea);
                                toast.success("Order ID copied to clipboard!");
                              } catch (err) {
                                console.error("Fallback copy failed:", err);
                                toast.error("Failed to copy Order ID");
                              }
                            }
                          }}
                        >
                          <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                      <h2 className="text-sm sm:text-base font-medium text-gray-900 mb-4">
                        Delivery details
                      </h2>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Home className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-medium text-gray-900">
                              Address
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 break-words">
                              {selectedOrder.shipping_address}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-900">
                              {fullName}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {user.mobile}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                      <h2 className="text-sm sm:text-base font-medium text-gray-900 mb-4">
                        Price details
                      </h2>

                      <div className="space-y-3">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-gray-700">Listing price</span>
                          <span className="text-gray-900">
                            ₹{selectedOrder.total_price}
                          </span>
                        </div>

                        <div className="flex justify-between text-xs sm:text-sm">
                          <button
                            className="flex items-center gap-1 text-gray-700"
                            onClick={() => setShowTotalFees(!showTotalFees)}
                          >
                            <span>Total fees</span>
                            <ChevronDown
                              className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${showTotalFees ? "rotate-180" : ""
                                }`}
                            />
                          </button>
                          <span className="text-gray-900">₹16</span>
                        </div>

                        <div className="border-t border-gray-200 pt-3 mt-3">
                          <div className="flex justify-between text-xs sm:text-sm font-medium">
                            <span className="text-gray-900">Total amount</span>
                            <span className="text-gray-900">
                              ₹{Number(selectedOrder.total_price) + 16}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <span className="text-xs sm:text-sm text-gray-700">
                            Payment method
                          </span>
                          <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-900">
                            <span className="text-base sm:text-lg">💵</span>
                            <span>Cash On Delivery</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orderdetails;
