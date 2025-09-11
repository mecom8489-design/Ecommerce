import AdminMain from "./AdminMain";
import {
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdDashboard() {
  useEffect(() => {
    console.log("Admin Dashboard Mounted");
  }, []);

  // Dummy sales data
  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4000 },
    { month: "May", sales: 6000 },
    { month: "Jun", sales: 7000 },
  ];

  const stats = [
    {
      id: 1,
      title: "Orders",
      value: 120,
      icon: ShoppingCart,
      color: "text-blue-500",
    },
    {
      id: 2,
      title: "Products",
      value: 58,
      icon: Package,
      color: "text-green-500",
    },
    {
      id: 3,
      title: "Users",
      value: 340,
      icon: Users,
      color: "text-purple-500",
    },
    {
      id: 4,
      title: "Revenue",
      value: "$12,500",
      icon: DollarSign,
      color: "text-yellow-500",
    },
  ];

  const recentOrders = [
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
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon; // FIX: Use uppercase variable
          return (
            <div
              key={stat.id}
              className="flex items-center p-6 bg-white shadow rounded-lg"
            >
              <Icon className={`${stat.color} w-10 h-10 mr-4`} />
              <div>
                <p className="text-gray-500">{stat.title}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-6 rounded-lg shadow mt-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-indigo-500" />
          Monthly Sales
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#6366f1"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-6 rounded-lg shadow mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Product</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.product}</td>
                <td className="p-3">{order.amount}</td>
                <td
                  className={`p-3 font-medium ${
                    order.status === "Completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
