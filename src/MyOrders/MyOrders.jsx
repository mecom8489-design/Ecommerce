import React, { useState, useEffect, useContext } from "react";
import { Search, XCircle } from "lucide-react";
import Header from "../Header/header";
import { getorderplace } from "../apiroutes/userApi";
import { AuthContext } from "../context/LoginAuth";
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

  const [orderData, setOrderData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const id = user?.id; 
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);


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
  }, [id, refresh]); 

  if (loading) return <p>Loading order details...</p>;

  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredOrders = orderData
    ? orderData.filter((order) => {
        if (
          searchTerm &&
          !order.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return false;
        }

        const statusFiltersActive =
          filters.onTheWay ||
          filters.delivered ||
          filters.cancelled ||
          filters.returned;
        if (statusFiltersActive) {
          let statusMatch = false;
          if (filters.cancelled && order.cancelled == 1) statusMatch = true;
          if (
            filters.delivered &&
            order.order_status === "delivered" &&
            order.cancelled != 1
          )
            statusMatch = true;
          if (filters.returned && order.order_status === "returned")
            statusMatch = true;
          if (
            filters.onTheWay &&
            order.order_status !== "delivered" &&
            order.order_status !== "returned" &&
            order.cancelled != 1
          )
            statusMatch = true;

          if (!statusMatch) return false;
        }

        const timeFiltersActive =
          filters.last30Days ||
          filters.year2024 ||
          filters.year2023 ||
          filters.older;
        if (timeFiltersActive) {
          const orderDate = new Date(order.created_at);
          const now = new Date();
          let timeMatch = false;

          if (filters.last30Days) {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(now.getDate() - 30);
            if (orderDate >= thirtyDaysAgo) timeMatch = true;
          }

          if (filters.year2024 && orderDate.getFullYear() === 2024)
            timeMatch = true;
          if (filters.year2023 && orderDate.getFullYear() === 2023)
            timeMatch = true;
          if (filters.older && orderDate.getFullYear() < 2023) timeMatch = true;

          if (!timeMatch) return false;
        }

        return true;
      })
    : [];

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50">
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
            <div
              className={`
              bg-white rounded-lg shadow-sm p-4 sm:p-5
              fixed lg:static top-0 left-0 bottom-0 z-50 lg:z-auto
              w-80 sm:w-96 lg:w-64 xl:w-72
              transform transition-transform duration-300 ease-in-out
              ${
                showFilters
                  ? "translate-x-0"
                  : "-translate-x-full lg:translate-x-0"
              }
              overflow-y-auto lg:sticky lg:top-6 lg:h-fit
            `}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
                >
                  <XCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">
                  Order Status
                </h3>
                <div className="space-y-2">
                  {[
                    { key: "onTheWay", label: "In transit" },
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

            <div className="flex-1 min-w-0">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 mb-4">
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 flex-1 w-full ">
                  <div className="flex flex-col sm:flex-row gap-3 w-full ">
                    <div className="flex-1 relative w-full">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search your orders here"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.order_id}
                    className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsOpen(true);
                    }}
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <div className="flex-shrink-0 mx-auto sm:mx-0">
                        <img
                          src={order.product_image}
                          alt={order.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded border border-gray-200"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
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

                          <div className="hidden sm:block flex-shrink-0 text-right">
                            <p className="text-base font-semibold text-gray-900">
                              ₹{order.total_price}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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
                                    className={`w-2 h-2 rounded-full ${
                                      order.order_status === "delivered"
                                        ? "bg-green-500"
                                        : "bg-orange-500"
                                    }`}
                                  ></span>
                                  <span className="text-xs sm:text-sm font-medium text-gray-900">
                                    {new Date(
                                      order.created_at
                                    ).toLocaleDateString("en-GB", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    })}
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

                          <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                            <p className="sm:hidden text-lg font-bold text-gray-900">
                              ₹{order.total_price}
                            </p>

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
