import { ShoppingCart } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { getAdminOrders } from "../apiroutes/adminApi";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const hasFetched = useRef(false);

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
      alert(error.response?.data?.message || "Failed to fetch orders ❌");
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <ShoppingCart className="w-6 h-6 text-indigo-500 mr-2" />
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-indigo-500 text-white uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-center">Sl.no</th>
              <th className="px-4 py-3 text-center">ID</th>
              <th className="px-4 py-3 text-center">Customer</th>
              <th className="px-4 py-3 text-center">Product</th>
              <th className="px-4 py-3 text-center">Amount</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-3 text-center">{index + 1}</td>
                <td className="px-4 py-3 text-center">{order.orderid}</td>
                <td className="px-4 py-3 text-center">{order.customername}</td>
                <td className="px-4 py-3 text-center">{order.productname}</td>
                <td className="px-4 py-3 text-center">
                  {parseInt(order.totalamount, 10)}$
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center px-4 py-4 text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
