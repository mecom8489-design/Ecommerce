import { CreditCard } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getAdminPayments } from "../apiroutes/adminApi";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchPayments();
    }
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await getAdminPayments();

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.payments || [];

      setPayments(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch payments"
      );
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <CreditCard className="w-6 h-6 text-indigo-500 mr-2" />
        <h1 className="text-2xl font-bold">Payments</h1>
      </div>

      {/* Payments Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-indigo-500 text-black uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-center">Sl.no</th>
              <th className="px-4 py-3 text-center">Order ID</th>
              <th className="px-4 py-3 text-center">Customer</th>
              <th className="px-4 py-3 text-center">Email</th>
              <th className="px-4 py-3 text-center">Product</th>
              <th className="px-4 py-3 text-center">Amount</th>
              <th className="px-4 py-3 text-center">Payment Method</th>
              <th className="px-4 py-3 text-center">Payment Status</th>
              <th className="px-4 py-3 text-center">Payment ID</th>
              <th className="px-4 py-3 text-center">Paid On</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {payments.map((item, index) => (
              <tr
                key={item.razorpay_payment_id || index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-3 text-center">{index + 1}</td>

                <td className="px-4 py-3 text-center font-semibold">
                  #{item.order_id}
                </td>

                <td className="px-4 py-3 text-center">
                  {item.firstname} {item.lastname}
                </td>

                <td className="px-4 py-3 text-center">
                  {item.email}
                </td>

                <td className="px-4 py-3 text-center">
                  {item.product_name}
                </td>

                <td className="px-4 py-3 text-center">
                  ₹
                  <span className="text-blue-600 font-semibold">
                    {parseInt(item.total_price, 10)}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                    {item.payment_method}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.payment_status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : item.payment_status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.payment_status}
                  </span>
                </td>

                <td className="px-4 py-3 text-center text-xs break-all">
                  {item.razorpay_payment_id || "—"}
                </td>

                <td className="px-4 py-3 text-center">
                  {item.order_created_at ? (
                    <span className="font-semibold">
                      {new Date(item.order_created_at).toLocaleDateString()}
                    </span>
                  ) : (
                    <span className="text-gray-400 italic">N/A</span>
                  )}
                </td>
              </tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td
                  colSpan="10"
                  className="text-center px-4 py-4 text-gray-500"
                >
                  No payment records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
