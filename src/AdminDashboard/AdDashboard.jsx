import AdminMain from "./AdminMain";
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
import { Link } from 'react-router-dom';





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
      console.log("API Response:", response.data);
      const usersArray = response.data;
      setData(usersArray);

    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch users ❌");
    }
  };

  const getAdminRecentOrder = async () => {
    try {
      const response = await getAdminRecentOrders();
      const usersArray = Array.isArray(response.data)
        ? response.data
        : response.data.users || [];
      setRecentOrders(usersArray);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch orders ❌");
    }
  };

  // const recentOrders = [
  //   {
  //     id: 1,
  //     customer: "John Doe",
  //     product: "Laptop",
  //     amount: "$1200",
  //     status: "Completed",
  //   },
  //   {
  //     id: 2,
  //     customer: "Jane Smith",
  //     product: "Phone",
  //     amount: "$800",
  //     status: "Pending",
  //   },
  //   {
  //     id: 3,
  //     customer: "Sam Wilson",
  //     product: "Headphones",
  //     amount: "$150",
  //     status: "Completed",
  //   },
  // ];


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
      color: "text-blue-500",
      route: "orders",
    },
    {
      id: 2,
      title: "Products",
      value: data.products,
      icon: Package,
      color: "text-green-500",
      route: "products",
    },
    {
      id: 3,
      title: "Users",
      value: data.users,
      icon: Users,
      color: "text-purple-500",
      route: "users",
    },
    {
      id: 4,
      title: "Revenue",
      value: "$12,500",
      icon: DollarSign,
      color: "text-yellow-500",
      route: "/revenue",
    },
  ];


  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              to={stat.route}
              key={stat.id}
              className="flex items-center p-6 bg-white shadow rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            >
              <Icon className={`${stat.color} w-10 h-10 mr-4`} />
              <div>
                <p className="text-gray-500">{stat.title}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
              </div>
            </Link>
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
            {Array.isArray(recentOrders) && recentOrders.map(order => (
              <tr key={order.id} className="border-t">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customername}</td>
                <td className="p-3">{order.productname}</td>
                <td className="p-3">{parseInt(order.totalamount) + "$"}</td>
                <td
                  className={`p-3 font-medium ${order.status === "Completed"
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
