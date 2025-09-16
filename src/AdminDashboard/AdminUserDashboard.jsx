import React from "react";
import AdminMain from "./AdminMain";
import { Users as UsersIcon } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { getAdminUsers, updateAdminUser, deleteAdminUser } from "../apiroutes/adminApi";
import { Edit, Trash2 } from "lucide-react";



export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const hasFetched = useRef(false);


  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAdminUsers();
      console.log("API Response:", response.data);
      const usersArray = Array.isArray(response.data) ? response.data : response.data.users || [];

      setUsers(usersArray);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch users ❌");
    }
  };



  const handleEditClick = (user) => {
    const fullName = user.name?.trim() || "";
    const nameParts = fullName.split(" ");
    const lastName = nameParts.length > 1 ? nameParts.pop() : "";
    const firstName = nameParts.join(" ");

    setCurrentUser({
      ...user,
      name: firstName,
      lastName: lastName,
      role: user.role || "User", // default fallback
    });

    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };


  const handleSave = async () => {
    try {
      const updatedUser = {
        ...currentUser,
        firstname: currentUser.name.trim(),
        lastname: currentUser.lastName?.trim() || ""
      };
      // Remove unwanted fields
      delete updatedUser.name;
      delete updatedUser.lastName;
      delete updatedUser.created_at;

      const response = await updateAdminUser(updatedUser);
      const usersArray = Array.isArray(response.data) ? response.data : response.data.users || [];
      setUsers(usersArray);
      alert("User updated successfully ✅");
      setIsModalOpen(false);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Update Error:", error);
      alert(error?.response?.data?.message || "Failed to update user ❌");
    }
  };

  const handleDeleteClick = (userId) => {
    setDeleteUserId(userId);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (!deleteUserId) return;

    try {
      await deleteAdminUser(deleteUserId);
      alert("User deleted successfully ✅");
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Delete Error:", error);
      alert(error?.response?.data?.message || "Failed to delete user ❌");
    } finally {
      setIsDeleteModalOpen(false);
      setDeleteUserId(null);
    }
  };

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
                <th className="p-3 text-center">Sl. No</th> 
                <th className="p-3 text-center">ID</th>
                <th className="p-3 text-center">Name</th>
                <th className="p-3 text-center">Email</th>
                <th className="p-3 text-center">Password</th>
                <th className="p-3 text-center">Mobile Number</th>
                <th className="p-3 text-center">Role</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-300 transition-colors`}
                  >
                    <td className="p-3 text-center">{index + 1}</td> 
                    <td className="p-3 text-center">{user.id}</td>
                    <td className="p-3 text-center font-medium">{user.name}</td>
                    <td className="p-3 text-center">{user.email}</td>
                    <td className="p-3 text-center">{user.password}</td>
                    <td className="p-3 text-center">{user.mobile}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${user.role === "Admin"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                          }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3 flex justify-center items-center">
                      <button
                        className="flex items-center text-blue-500 hover:text-blue-700 font-medium mr-3 cursor-pointer"
                        onClick={() => handleEditClick(user)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        className="flex items-center text-red-500 hover:text-red-700 font-medium cursor-pointer"
                        onClick={() => handleDeleteClick(user.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
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
      {isModalOpen && currentUser && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-center">Edit User</h2>

            <div className="space-y-4">
              {/* First Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentUser.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter first name"
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={currentUser.lastName || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter last name"
                />
              </div>

              {/* Email (disabled) */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  disabled
                  value={currentUser.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                  placeholder="Email address"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={currentUser.password}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter password"
                />
              </div>

              {/* Mobile */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={currentUser.mobile}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter mobile number"
                />
              </div>

              {/* Role */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={currentUser.role || ''}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>

              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-3 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-gray-300 rounded-lg p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-center text-red-600">
              Confirm Deletion
            </h2>
            <p className="text-center text-gray-700 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-black bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
