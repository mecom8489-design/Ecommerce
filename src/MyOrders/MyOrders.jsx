import React, { useState, useEffect, useContext } from "react";
import { Search, Package, Clock, XCircle, RotateCcw } from "lucide-react";
import Header from "../Header/header";
import { getorderplace } from "../apiroutes/userApi";
import { AuthContext } from "../context/LoginAuth";
import {
  Home,
  User,
  ChevronDown,
  MessageCircle,
  Download,
  Copy,
  ChevronLeft,
} from "lucide-react";

export default function MyOrders() {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    onTheWay: false,
    delivered: false,
    cancelled: false,
    returned: false,
    last30Days: false,
    year2024: false,
    year2023: false,
    older: false,
  });

  const [rating, setRating] = useState(0);
  const [showTotalFees, setShowTotalFees] = useState(false);

  const [orderData, setOrderData] = useState(null); // to store the fetched order
  const [loading, setLoading] = useState(true);
  const id = user?.id; // ✅ prevents error if user is null
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  // STATE HANDLERS
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [showSupportBox, setShowSupportBox] = useState(false);

  const [reviewText, setReviewText] = useState("");
  const [supportMessage, setSupportMessage] = useState("");

  // Example submit handlers
  const handleCancelOrder = () => {
    console.log("Order Cancelled");
    setShowCancelConfirm(false);
  };

  const handleSubmitReview = () => {
    console.log("Review Submitted:", reviewText);
    setShowReviewBox(false);
  };

  const handleSendSupport = () => {
    console.log("Support Message:", supportMessage);
    setShowSupportBox(false);
  };
  useEffect(() => {
    if (!id) return; // Wait until user is available
    console.log(id);
  }, [id]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getorderplace(id); // 👈 call API
        console.log("Order response:", response);
        const data = response.data;
        setOrderData(Array.isArray(data) ? data : [data]); // ✅ Safe for both single/multiple
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrder(); // only call when id exists
  }, [id]); // 👈 triggers again if id changes

  if (loading) return <p>Loading order details...</p>;

  if (!orderData) return <p>No order found.</p>;

  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <Package className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };
  const openModal = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedOrder(null);
  };

  // const handleCancelOrder = (id) => {
  //   console.log("Cancel order:", id);
  //   // Call API here
  // };

  return (
    <div>
      <Header />
      <div className="min-h-screen ">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="hover:text-gray-900 cursor-pointer">Home</span>
              <span>›</span>
              <span className="hover:text-gray-900 cursor-pointer">
                My Account
              </span>
              <span>›</span>
              <span className="text-gray-900 font-medium">My Orders</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Filters Sidebar */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm border p-5 sticky top-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Filters
                </h2>

                {/* Order Status */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">
                    Order Status
                  </h3>
                  <div className="space-y-2">
                    {[
                      { key: "onTheWay", label: "On the way" },
                      { key: "delivered", label: "Delivered" },
                      { key: "cancelled", label: "Cancelled" },
                      { key: "returned", label: "Returned" },
                    ].map((filter) => (
                      <label
                        key={filter.key}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={filters[filter.key]}
                          onChange={() => toggleFilter(filter.key)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">
                          {filter.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Order Time */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">
                    Order Time
                  </h3>
                  <div className="space-y-2">
                    {[
                      { key: "last30Days", label: "Last 30 days" },
                      { key: "year2024", label: "2024" },
                      { key: "year2023", label: "2023" },
                      { key: "older", label: "Older" },
                    ].map((filter) => (
                      <label
                        key={filter.key}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={filters[filter.key]}
                          onChange={() => toggleFilter(filter.key)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">
                          {filter.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="flex-1">
              {/* Search Bar */}
              <div className="bg-white rounded-lg shadow-sm border p-4 mb-4 flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search your orders here"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                  <Search className="w-4 h-4" />
                  Search Orders
                </button>
              </div>

              {/* Order Cards */}
              <div className="max-w-6xl mx-auto p-4 bg-gray-50">
                {orderData.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg shadow-sm mb-3 p-6 border border-gray-200"
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsOpen(true);
                    }}
                  >
                    <div className="flex items-start gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={order.product_image}
                          alt={order.name}
                          className="w-24 h-24 object-cover rounded border border-gray-200"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-normal text-gray-900 mb-1">
                          {order.product_name}
                        </h3>
                        {order.color && (
                          <p className="text-sm text-gray-500">
                            Color: {order.color}
                          </p>
                        )}
                      </div>

                      {/* Price */}
                      <div className="flex-shrink-0 text-right">
                        <p className="text-base font-normal text-gray-900">
                          {order.total_price}
                        </p>
                      </div>

                      {/* Status and Actions */}
                      <div className="flex-shrink-0 text-right min-w-[200px]">
                        <div className="flex items-center justify-end gap-2 mb-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              order.status === "delivered"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          ></span>
                          <span className="text-sm font-normal text-gray-900">
                            {new Date(order.created_at).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {order.status === "delivered"
                            ? "Your item has been delivered"
                            : order.reason}
                        </p>
                        <button className="text-blue-600 text-sm font-normal hover:text-blue-700 flex items-center justify-end gap-1 w-full">
                          <span className="text-blue-600">★</span>
                          Rate & Review Product
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && selectedOrder && (
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
                onClick={() => setIsOpen(false)}
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
                        OD335850880580880100
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
                              {selectedOrder.total_price}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Order Status Timeline */}
                      <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="space-y-4">
                          {/* Order Confirmed */}
                          <div className="flex items-start justify-between gap-3">
                            {/* Left Section */}
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

                            {/* Right Side: Cancel Button */}
                            <button
                              onClick={() =>
                                handleCancelOrder(selectedOrder.order_id)
                              }
                              className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                              Cancel Order
                            </button>
                          </div>

                          {/* Delivered */}
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
                        </div>

                        {/* <button className="text-blue-600 text-sm font-normal mt-4 hover:text-blue-700 flex items-center gap-1">
                          See All Updates
                          <span className="text-xs">›</span>
                        </button> */}

                        {/* <p className="text-sm text-gray-500 mt-6">
                          Return policy ended on Nov 11
                        </p> */}
                      </div>

                      {/* Chat Button */}
                      {/* <button className="w-full bg-white rounded-lg shadow-sm p-4 flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-50 border border-gray-200">
                        <MessageCircle className="w-5 h-5" />
                        Chat with us
                      </button> */}

                      {/* Rate Your Experience */}
                      <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-base font-normal text-gray-900 mb-4">
                          Rate your experience
                        </h2>

                        <div className="flex items-center gap-3 mb-4">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700">
                            Rate the product
                          </span>
                        </div>

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
                        <div class="p-4">
                          <form>
                            <textarea
                              class="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                              rows="5"
                              placeholder="Enter your text here..."
                            ></textarea>

                            <button
                              type="submit"
                              class="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              Submit
                            </button>
                          </form>
                        </div>
                      </div>

                      {/* Order ID */}
                      <div className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>Order #OD335850880580880100</span>
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
                                Home
                              </p>
                              <p className="text-sm text-gray-600">
                                No.2 kalangar nagar tc koolroad GKB Traders,
                                Tindiva...
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <User className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Siva
                              </p>
                              <p className="text-sm text-gray-600">
                                9994354019
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

                          {/* <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <span className="text-gray-700">
                                Special price
                              </span>
                              <span className="text-gray-400 text-xs">ⓘ</span>
                            </div>
                            <span className="text-gray-900">₹449</span>
                          </div> */}

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
                              <span className="text-gray-900">
                                Total amount
                              </span>
                              {/* <span className="text-gray-900">₹465</span> */}
                              ₹{Number(selectedOrder.total_price) + 16}
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

                      {/* Download Invoice Button */}
                      {/* <button className="w-full bg-white rounded-lg shadow-sm p-4 flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-50 border border-gray-200">
                        <Download className="w-5 h-5" />
                        Download Invoice
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
