import AdminMain from "./AdminMain"; // your layout wrapper
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  // Dummy orders data
  useEffect(() => {
    const dummyOrders = [
      {
        id: 1,
        customer: "John Doe",
        product: "Laptop",
        amount: "$1200",
        status: "Completed",
      },
      {
        id: 2,
        customer: "Jane Smith",
        product: "Phone",
        amount: "$800",
        status: "Pending",
      },
      {
        id: 3,
        customer: "Sam Wilson",
        product: "Headphones",
        amount: "$150",
        status: "Completed",
      },
      {
        id: 4,
        customer: "Alice Johnson",
        product: "Monitor",
        amount: "$300",
        status: "Cancelled",
      },
    ];
    setOrders(dummyOrders);
  }, []);

  return (
    <div>
      <div className="flex items-center mb-6">
        <ShoppingCart className="w-6 h-6 text-indigo-500 mr-2" />
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full text-left table-auto">
          <thead className="bg-indigo-500 text-white uppercase text-sm tracking-wider">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Product</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="p-3">{order.id}</td>
                <td className="p-3 font-medium">{order.customer}</td>
                <td className="p-3">{order.product}</td>
                <td className="p-3">{order.amount}</td>
                <td className="p-3">
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
                <td className="p-3">
                  <button className="text-blue-500 hover:text-blue-700 font-medium mr-5">
                    View
                  </button>
                  <button className="text-red-500 hover:text-red-700 font-medium">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
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
