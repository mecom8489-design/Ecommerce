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
              <div className="bg-white rounded-lg shadow-sm  p-5 sticky top-6">
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
              <div className="bg-white rounded-lg shadow-sm  p-4 mb-4 flex gap-3">
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
                        <h3 className="text-base font-normal text-gray-900 mb-0">
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
                        {order.cancelled == 1 ? (
                          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-xl shadow-sm">
                          <span className="text-red-600 text-sm">⚠️</span>
                          <p className="font-medium">Order Cancelled</p>
                        </div>
                        
                         
                        ) : (
                          <div className="flex items-center justify-end gap-2 mb-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                order.order_status === "delivered"
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
                        )}

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
        <Orderdetails selectedOrder={selectedOrder} setIsOpen={setIsOpen}  />
      )}
    </div>
  );
}
