import React, { useState, useEffect, useContext } from "react";
import { Search, Package, Clock, XCircle, RotateCcw } from "lucide-react";
import Header from "../Header/header";
import { getorderplace } from "../apiroutes/userApi";
import { AuthContext } from "../context/LoginAuth";
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
              <div className="space-y-4">
                {orderData.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => openModal(order)}
                    className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                  >
                    <div className="p-5">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <img
                            src={order.product_image}
                            alt={order.product_name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-medium text-gray-900 mb-1 truncate">
                            {order.product_name}
                          </h3>
                          {/* <p className="text-sm text-gray-600 mb-2">
                            Color: {order.color}
                          </p> */}
                          <p className="text-lg font-semibold text-gray-900">
                            ₹{order.total_price}
                          </p>
                        </div>

                        {/* Status */}
                        <div className="flex flex-col items-end gap-3">
                          <div
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.order_status)}
                            <span className="text-sm font-medium capitalize">
                              {order.status === "delivered"
                                ? `Delivered on ${order.date}`
                                : `Cancelled on ${order.date}`}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {order.status === "delivered"
                              ? "Your item has been delivered"
                              : order.reason}
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                            ⭐ Rate & Review Product
                          </button>
                        </div>
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-8xl h-[90vh] rounded-none p-6 overflow-y-auto animate-fadeIn relative">
            {/* Close Button */}
            <button
              className="absolute right-4 top-4 text-gray-500 hover:text-black text-2xl"
              onClick={closeModal}
            >
              ✖
            </button>

            {/* Product Section */}
            <div className="flex gap-6 border-b pb-5">
              <div className="w-44 h-44 rounded-xl overflow-hidden shadow">
                <img
                  src={selectedOrder.product_image}
                  alt={selectedOrder.product_name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-start gap-1">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {selectedOrder.product_name}
                </h2>

                <p className="text-gray-700 text-lg">
                  Price:{" "}
                  <span className="font-bold text-black">
                    ₹{selectedOrder.total_price}
                  </span>
                </p>

                <p className="text-gray-700">
                  Status:{" "}
                  <span className="font-semibold text-green-600">
                    {selectedOrder.status}
                  </span>
                </p>

                <p className="text-gray-700">
                  Ordered on:{" "}
                  <span className="font-semibold">{selectedOrder.date}</span>
                </p>

                {selectedOrder.reason && (
                  <p className="text-red-600 font-medium text-lg">
                    ❗Cancellation Reason: {selectedOrder.reason}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons Section */}
            <div className="mt-6 flex flex-col gap-4">
              {/* Rate & Review */}
              <button
                onClick={() => setShowReviewBox(true)}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg shadow flex items-center justify-center gap-2"
              >
                ⭐ Rate & Review Product
              </button>

              {/* Cancel Order */}
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg shadow flex items-center justify-center gap-2"
              >
                ❌ Cancel Order
              </button>

              {/* Customer Support */}
              <button
                onClick={() => setShowSupportBox(true)}
                className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 rounded-lg shadow flex items-center justify-center gap-2"
              >
                📞 Contact Customer Support
              </button>
            </div>
            {showCancelConfirm && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl text-center">
                  <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
                  <p className="text-gray-700 mb-6">
                    Do you really want to cancel this order?
                  </p>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowCancelConfirm(false)}
                      className="flex-1 py-2 rounded-lg border border-gray-400 text-gray-700"
                    >
                      No
                    </button>

                    <button
                      onClick={handleCancelOrder}
                      className="flex-1 py-2 rounded-lg bg-red-500 text-white"
                    >
                      Yes, Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            {showReviewBox && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-xl">
                  <h2 className="text-xl font-semibold mb-4">
                    Write your Review
                  </h2>

                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your experience..."
                    className="w-full h-32 p-3 border rounded-xl mb-4"
                  />

                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowReviewBox(false)}
                      className="flex-1 py-2 rounded-lg border border-gray-400 text-gray-700"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleSubmitReview}
                      className="flex-1 py-2 rounded-lg bg-green-600 text-white"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>
            )}
            {showSupportBox && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-xl">
                  <h2 className="text-xl font-semibold mb-4">
                    Contact Support
                  </h2>

                  <textarea
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    placeholder="Describe your issue..."
                    className="w-full h-32 p-3 border rounded-xl mb-4"
                  />

                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowSupportBox(false)}
                      className="flex-1 py-2 rounded-lg border border-gray-400 text-gray-700"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleSendSupport}
                      className="flex-1 py-2 rounded-lg bg-blue-600 text-white"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
