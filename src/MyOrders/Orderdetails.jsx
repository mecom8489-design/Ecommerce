import React, { useState, useContext } from "react";
import {
  Home,
  User,
  ChevronDown,
  MessageCircle,
  Download,
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setIsOpen(false)} // Close on outside click
        >
          <div
            className="bg-white w-full max-w-8xl max-h-[100vh] overflow-y-auto rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setIsOpen(false), setRefresh((prev) => !prev);
              }}
              className="absolute top-1 left-4 flex items-center gap-1 
             px-3 py-1.5 rounded-full bg-white shadow 
             text-gray-800 hover:bg-gray-100 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </button>

            <div className="min-h-screen bg-gray-50 rounded-lg">
              {/* Breadcrumb */}
              <div className="bg-white border-b border-gray-200 rounded-t-lg">
                <div className="max-w-7xl mx-auto px-6 py-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="hover:text-blue-600 cursor-pointer">
                      Home
                    </span>
                    <span>›</span>
                    <span className="hover:text-blue-600 cursor-pointer">
                      My Account
                    </span>
                    <span>›</span>
                    <span className="hover:text-blue-600 cursor-pointer">
                      My Orders
                    </span>
                    <span>›</span>
                    <span className="text-gray-900">
                      OD#{selectedOrder.order_id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
                  {/* Left Column - Order Details */}
                  <div className="space-y-4">
                    {/* Product Info Card */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex gap-4">
                        <img
                          src={selectedOrder.product_image}
                          alt="Product"
                          className="w-20 h-20 object-cover rounded border border-gray-200"
                        />
                        <div className="flex-1">
                          <h1 className="text-base font-normal text-gray-900 mb-1">
                            {selectedOrder.product_name}
                          </h1>
                          {/* <p className="text-sm text-gray-600 mb-1">Maroon</p> */}
                          <p className="text-sm text-gray-600 mb-2">
                            {selectedOrder.product_description}
                          </p>
                          <p className="text-lg font-normal text-gray-900">
                            ${selectedOrder.total_price}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* <div className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <h1 className="text-base font-normal text-gray-900 mb-1">
                            {reviewTextValue}
                          </h1>
                          <div className="text-sm flex items-center mt-1 ">
                            Rating:
                            <span className="ml-2 flex relative">
                              <div className="flex text-gray-300">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <span key={i}>★</span>
                                ))}
                              </div>

                              <div
                                className="flex text-yellow-500 absolute left-0 top-0 overflow-hidden"
                                style={{
                                  width: `${
                                    (Number(ratingValue) / 5) * 100
                                  }%`,
                                }}
                              >
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <span key={i}>★</span>
                                ))}
                              </div>
                            </span>
                            <span className="ml-2 text-gray-700">
                              (
                              {ratingValue
                                ? Number(ratingValue).toFixed(2)
                                : "-"}
                              )
                            </span>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    {reviewTextValue && ratingValue ? (
                      <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <h1 className="text-base font-normal text-gray-900 mb-1">
                              {reviewTextValue}
                            </h1>

                            <div className="text-sm flex items-center mt-1 ">
                              Rating:
                              <span className="ml-2 flex relative">
                                <div className="flex text-gray-300">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i}>★</span>
                                  ))}
                                </div>

                                <div
                                  className="flex text-yellow-500 absolute left-0 top-0 overflow-hidden"
                                  style={{
                                    width: `${
                                      (Number(ratingValue) / 5) * 100
                                    }%`,
                                  }}
                                >
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i}>★</span>
                                  ))}
                                </div>
                              </span>
                              <span className="ml-2 text-gray-700">
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

                    {/* Order Status Timeline */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <div className="space-y-4">
                        {/* Order Confirmed */}
                        <div className="flex items-start justify-between gap-3">
                          {/* Left Section */}

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
                                <div className="w-0.5 h-10 bg-red-500"></div>
                              </div>

                              <div className="pt-0.5">
                                <p className="text-sm text-gray-900">
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
                                <div className="w-0.5 h-8 bg-green-500"></div>
                              </div>

                              <div className="pt-0.5">
                                <p className="text-sm text-gray-900">
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

                          {/* Right Side: Cancel Button */}

                          {selectedOrder.cancelled == 1 ? (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-xl shadow-sm">
                              <span className="text-red-600 text-sm">⚠️</span>
                              <p className="font-medium">Order Cancelled</p>
                            </div>
                          ) : (
                            <button
                              onClick={() => setShowCancelPopup(true)}
                              className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                              Cancel Order
                            </button>
                          )}
                        </div>
                        {showCancelPopup && (
                          <div className="fixed  inset-0 flex items-center justify-center bg-black/40 z-50">
                            <div className="bg-white p-5 rounded-lg w-150 shadow-lg">
                              <h2 className="text-lg font-semibold mb-3">
                                Reason for Cancellation
                              </h2>

                              <textarea
                                className="w-[500px] border p-2 rounded-md"
                                rows="4"
                                placeholder="Enter reason…"
                                value={cancelReason}
                                onChange={(e) =>
                                  setCancelReason(e.target.value)
                                }
                              ></textarea>

                              {/* Buttons */}
                              <div className="flex justify-end gap-3 mt-4">
                                <button
                                  onClick={() => setShowCancelPopup(false)}
                                  className="px-3 py-1 rounded-md bg-gray-300 hover:bg-gray-400"
                                >
                                  Close
                                </button>

                                <button
                                  onClick={() => {
                                    handleCancelOrder();
                                    setShowCancelPopup(false);
                                    setCancelReason("");
                                  }}
                                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Delivered */}

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
                              <p className="text-sm text-gray-900">
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
                              <p className="text-sm text-gray-900">
                                Delivered, Nov 05
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-base font-normal text-gray-900 mb-4">
                        Rate your experience
                      </h2>

                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
                          >
                            <svg
                              className={`w-8 h-8 ${
                                rating >= star
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
                      <div className="p-4">
                        <form onSubmit={handleSubmitReview}>
                          <textarea
                            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 resize-none"
                            rows="5"
                            placeholder="Enter your text here..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                          ></textarea>
                          <button
                            type="submit"
                            disabled={isSubmitted}
                            className={`mt-3 px-4 py-2 text-white rounded-lg ${
                              isSubmitted
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                          >
                            {isSubmitted ? "Submitted" : "Submit"}
                          </button>
                        </form>
                      </div>
                    </div>

                    {/* Order ID */}
                    <div className="bg-white rounded-lg shadow-sm p-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Order #{selectedOrder.order_id}</span>
                        <button className="text-blue-600 hover:text-blue-700">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Delivery & Price Details */}
                  <div className="space-y-4">
                    {/* Delivery Details Card */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-base font-medium text-gray-900 mb-4">
                        Delivery details
                      </h2>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Home className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Address
                            </p>
                            <p className="text-sm text-gray-600">
                              {selectedOrder.shipping_address}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <User className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {fullName}
                            </p>
                            <p className="text-sm text-gray-600">
                              {user.mobile}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price Details Card */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-base font-medium text-gray-900 mb-4">
                        Price details
                      </h2>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">Listing price</span>
                          <span className="text-gray-900">
                            ${selectedOrder.total_price}
                          </span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <button
                            className="flex items-center gap-1 text-gray-700"
                            onClick={() => setShowTotalFees(!showTotalFees)}
                          >
                            <span>Total fees</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                showTotalFees ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <span className="text-gray-900">$16</span>
                        </div>

                        <div className="border-t border-gray-200 pt-3 mt-3">
                          <div className="flex justify-between text-sm font-medium">
                            <span className="text-gray-900">Total amount</span>
                            {/* <span className="text-gray-900">$465</span> */}$
                            {Number(selectedOrder.total_price) + 16}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <span className="text-sm text-gray-700">
                            Payment method
                          </span>
                          <div className="flex items-center gap-1 text-sm text-gray-900">
                            <span className="text-lg">💵</span>
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
