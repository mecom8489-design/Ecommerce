import AdminMain from "./AdminMain";
import { Users as UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getAdminUsers } from "../apiroutes/adminApi";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await getAdminUsers();
      console.log("API Response:", response.data);
      // Safely get users array from response.data
      const usersArray = Array.isArray(response.data)
        ? response.data
        : response.data.users || [];

      setUsers(usersArray);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch users ❌");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div>
        <div className="flex items-center mb-6">
          <UsersIcon className="w-6 h-6 text-indigo-500 mr-2" />
          <h1 className="text-2xl font-bold">Users</h1>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full text-left table-auto">
            <thead className="bg-indigo-500 text-white uppercase text-sm tracking-wider">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Password</th>
                <th className="p-3">Mobile Number</th>
                <th className="p-3">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-300 transition-colors`}
                  >
                    <td className="p-3">{user.id}</td>
                    <td className="p-3 font-medium">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.password}</td>
                    <td className="p-3">{user.mobile}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.role === "Admin"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="text-blue-500 hover:text-blue-700 font-medium mr-2">
                        Edit
                      </button>
                      <button className="text-red-500 hover:text-red-700 font-medium">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500">
                    No users found.
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
