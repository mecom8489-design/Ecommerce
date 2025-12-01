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
import Orderdetails from "./Orderdetails";
export default function MyOrders() {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
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
  const [refresh, setRefresh] = useState(false);

  // STATE HANDLERS

  useEffect(() => {
    if (!id) return;
  }, [id]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getorderplace(id);
        const data = response.data;
        setOrderData(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id, refresh]); // 👈 Added refresh

  if (loading) return <p>Loading order details...</p>;

  if (!orderData) return <p>No order found.</p>;

  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>›</span>
              <span className="text-gray-900 font-medium">My Orders</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

            {/* Filters Sidebar */}
            <div className={`
              bg-white rounded-lg shadow-sm p-4 sm:p-5
              fixed lg:static top-0 left-0 bottom-0 z-50 lg:z-auto
              w-80 sm:w-96 lg:w-64 xl:w-72
              transform transition-transform duration-300 ease-in-out
              ${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
              overflow-y-auto lg:sticky lg:top-6 lg:h-fit
            `}>
              {/* Filter Header with Close Button */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Filters
                </h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
                >
                  <XCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>

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

            {/* Orders List */}
            <div className="flex-1 min-w-0">
              {/* Filter Button and Search Bar Container */}
              <div className="flex items-start gap-3 mb-4">
                {/* Mobile Filter Button - Outside the white box */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300 flex items-center justify-center bg-white shadow-sm"
                  aria-label="Open Filters"
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                {/* Search Bar */}
                <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 flex-1">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search Input */}
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

                    {/* Search Button */}
                    <button className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium whitespace-nowrap">
                      <Search className="w-4 h-4" />
                      <span className="hidden sm:inline">Search Orders</span>
                      <span className="sm:hidden">Search</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Cards */}
              <div className="space-y-3 sm:space-y-4">
                {orderData.map((order) => (
                  <div
                    key={order.order_id}
                    className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsOpen(true);
                    }}
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0 mx-auto sm:mx-0">
                        <img
                          src={order.product_image}
                          alt={order.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded border border-gray-200"
                        />
                      </div>

                      {/* Product Details - Mobile & Desktop */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1 line-clamp-2">
                              {order.product_name}
                            </h3>
                            {order.color && (
                              <p className="text-xs sm:text-sm text-gray-500">
                                Color: {order.color}
                              </p>
                            )}
                          </div>

                          {/* Price - Desktop */}
                          <div className="hidden sm:block flex-shrink-0 text-right">
                            <p className="text-base font-semibold text-gray-900">
                              ₹{order.total_price}
                            </p>
                          </div>
                        </div>

                        {/* Status and Actions */}
                        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          {/* Status */}
                          <div className="flex-1">
                            {order.cancelled == 1 ? (
                              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-3 py-1.5 rounded-lg text-sm">
                                <span className="text-red-600">⚠️</span>
                                <p className="font-medium">Order Cancelled</p>
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`w-2 h-2 rounded-full ${order.order_status === "delivered"
                                      ? "bg-green-500"
                                      : "bg-orange-500"
                                      }`}
                                  ></span>
                                  <span className="text-xs sm:text-sm font-medium text-gray-900">
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
                                <p className="text-xs sm:text-sm text-gray-600">
                                  {order.status === "delivered"
                                    ? "Your item has been delivered"
                                    : order.reason || "Order in progress"}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Price - Mobile & Actions */}
                          <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                            {/* Price - Mobile Only */}
                            <p className="sm:hidden text-lg font-bold text-gray-900">
                              ₹{order.total_price}
                            </p>

                            {/* Rate Button */}
                            <button className="text-blue-600 text-xs sm:text-sm font-medium hover:text-blue-700 flex items-center gap-1 whitespace-nowrap">
                              <span className="text-blue-600">★</span>
                              Rate & Review
                            </button>
                          </div>
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
        <Orderdetails
          selectedOrder={selectedOrder}
          setIsOpen={setIsOpen}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
}
