import { ShoppingCart } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { getAdminOrders, updateOrderDeliveryDate } from "../apiroutes/adminApi";
import { toast } from "react-toastify";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const hasFetched = useRef(false);

  // Disable past dates
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchOrders();
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getAdminOrders();

      const usersArray = Array.isArray(response.data)
        ? response.data
        : response.data.users || [];

      setOrders(usersArray);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders ");
    }
  };

  const submitDeliveryDate = async () => {
    if (!deliveryDate) {
      toast.error("Please select a delivery date");
      return;
    }

    try {
      await updateOrderDeliveryDate(selectedOrder.order_id, deliveryDate);

      toast.success("Delivery date updated!");

      setOrders((prev) =>
        prev.map((order) =>
          order.order_id === selectedOrder.order_id
            ? { ...order, delivery_date: deliveryDate }
            : order
        )
      );

      setSelectedOrder(null);
      setDeliveryDate("");
    } catch (error) {
      toast.error("Failed to update delivery date");
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <ShoppingCart className="w-6 h-6 text-indigo-500 mr-2" />
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-indigo-500 text-black uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-center">Sl.no</th>
              <th className="px-4 py-3 text-center">ID</th>
              <th className="px-4 py-3 text-center">Customer</th>
              <th className="px-4 py-3 text-center">Product</th>
              <th className="px-4 py-3 text-center">Amount/Quantity</th>
              <th className="px-4 py-3 text-center">Payment Status</th>
              <th className="px-4 py-3 text-center">Order Status</th>
              <th className="px-4 py-3 text-center">Order Placed </th>
              <th className="px-4 py-3 text-center">Delivery Date</th>
              <th className="px-4 py-3 text-center">Address</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {orders.map((order, index) => (
              <tr
                key={order.order_id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-3 text-center">{index + 1}</td>
                <td className="px-4 py-3 text-center">{order.order_id}</td>
                <td className="px-4 py-3 text-center">{order.shipping_name}</td>
                <td className="px-4 py-3 text-center">{order.product_name}</td>
                <td className="px-4 py-3 text-center">
                  ₹
                  <span className="text-blue-600 font-semibold">
                    {parseInt(order.total_price, 10)}
                  </span>
                  /
                  <span className="text-red-600 font-semibold">
                    {parseInt(order.quantity, 10)}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.payment_status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : order.payment_status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.payment_status}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.order_status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : order.order_status === "Processing"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.order_status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  {order.created_at ? (
                    <span className="text-black font-semibold">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  ) : (
                    <span className="text-gray-400 italic">Not Set</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {order.delivery_date ? (
                    <span className="text-green-600 font-semibold">
                      {new Date(order.delivery_date).toLocaleDateString()}
                    </span>
                  ) : (
                    <span className="text-gray-400 italic">Not Set</span>
                  )}
                </td>
                <td className="px-4 py-3 w-48 text-left whitespace-normal break-words break-all">
                  {order.shipping_address}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setDeliveryDate("");
                    }}
                    className="px-3 py-1 bg-amber-600 text-white rounded hover:bg-amber-700 cursor-pointer"
                  >
                    Set Delivery Date
                  </button>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center px-4 py-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
            <h2 className="text-lg font-bold mb-4">
              Set Delivery Date for Order{" "}
              <span className="text-red-700">#{selectedOrder.order_id}</span>
            </h2>

            <input
              type="date"
              value={deliveryDate}
              min={today}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-3 py-1 bg-gray-300 rounded cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={submitDeliveryDate}
                className="px-3 py-1 bg-indigo-600 text-white rounded cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
