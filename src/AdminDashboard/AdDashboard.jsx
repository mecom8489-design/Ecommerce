import {
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getAdminDashboard, getAdminRecentOrders } from "../apiroutes/adminApi";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';


export default function AdDashboard() {
  const hasFetched = useRef(false);
  const [data, setData] = useState({
    orders: 0,
    products: 0,
    users: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchDashBoard();
      getAdminRecentOrder();
    }
  }, []);

  const fetchDashBoard = async () => {
    try {
      const response = await getAdminDashboard();
      setData(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users ❌");
    }
  };

  const getAdminRecentOrder = async () => {
    try {
      const response = await getAdminRecentOrders();
      const orders = Array.isArray(response.data)
        ? response.data
        : response.data.users || [];
      setRecentOrders(orders);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders ❌");
    }
  };

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
      value: data.orders,
      icon: ShoppingCart,
      color: "bg-blue-100 text-blue-600",
      iconColor: "text-blue-500",
      route: "/admin/orders",
    },
    {
      id: 2,
      title: "Products",
      value: data.products,
      icon: Package,
      color: "bg-green-100 text-green-600",
      iconColor: "text-green-500",
      route: "/admin/products",
    },
    {
      id: 3,
      title: "Users",
      value: data.users,
      icon: Users,
      color: "bg-purple-100 text-purple-600",
      iconColor: "text-purple-500",
      route: "/admin/users",
    },
    {
      id: 4,
      title: "Revenue",
      value: "$12,500",
      icon: DollarSign,
      color: "bg-yellow-100 text-yellow-600",
      iconColor: "text-yellow-500",
      route: "/revenue",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-10 text-gray-900">Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ id, title, value, icon: Icon, color, iconColor, route }) => (
          <Link
            to={route}
            key={id}
            className={`flex items-center space-x-4 p-6 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer ${color}`}
          >
            <div className={`p-3 rounded-full bg-white ${iconColor} shadow-md`}>
              <Icon size={28} />
            </div>
            <div>
              <p className="text-lg font-semibold">{title}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Sales Chart Section */}
      <div className="bg-white mt-12 rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-5 flex items-center text-indigo-600">
          <TrendingUp size={24} className="mr-2" />
          Monthly Sales
        </h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#4b5563", fontWeight: "600" }}
              />
              <YAxis tick={{ fill: "#4b5563", fontWeight: "600" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#4f46e5",
                  borderRadius: "10px",
                  border: "none",
                  color: "white",
                }}
                labelStyle={{ fontWeight: "bold", color: "white" }}
                itemStyle={{ color: "white" }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#6366f1"
                strokeWidth={3}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white mt-12 rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.length > 0 ? (
                recentOrders.map(({ id, customername, productname, totalamount, status }) => (
                  <tr key={id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{id}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">{customername}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{productname}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">${totalamount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
