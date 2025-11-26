import React, { useEffect, useState, useRef } from "react";
import Header from "../Header/header";
import { profileData, profileUpdate } from "../apiroutes/userApi";

const MyProfile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    role: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState({});
  const effectRan = useRef(false);

  useEffect(() => {
    if (!effectRan.current) {
      fetchData();
      effectRan.current = true;
    }
  }, []);

  const fetchData = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const id = storedUser?.id;

      const response = await profileData(id);
      const data = response.data;

      setUser({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        mobile: data.mobile,
        address: data.address,
        id: data.id,
        role: data.role,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const openEditModal = () => {
    setEditUser(user);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const id = storedUser?.id;

      await profileUpdate(id, editUser);
      setUser(editUser);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <Header />

      <div className="min-h-screen-300 border bg-gray-100 flex">
        {/* Sidebar */}
        <aside className="w-72 bg-white shadow-md border-r">
          <div className="p-6 flex items-center space-x-4 border-b">
            <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-xl font-semibold">
              {user.firstName?.charAt(0) || "U"}
            </div>
            <div>
              <p className="text-sm text-gray-500">Hello,</p>
              <p className="font-semibold text-gray-800">{user.firstName}</p>
            </div>
          </div>

          <div className="p-4 space-y-6 text-sm text-gray-700">
            <p className="font-semibold text-gray-600 mb-2">ACCOUNT SETTINGS</p>
            <ul className="space-y-1">
              <li className="px-3 py-2 bg-blue-50 text-blue-600 rounded cursor-pointer">
                Profile Information
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h2 className="text-lg font-semibold mb-6 text-gray-800">
            Personal Information
          </h2>

          <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={user.firstname}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-2.5"
              />
              <input
                type="text"
                value={user.lastname}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-2.5"
              />
            </div>

            <div className="mb-4">
              <p className="text-gray-700 font-medium mb-2">Address</p>
              <input
                type="text"
                value={user.address || ""}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-2.5"
              />
            </div>

            <button
              onClick={openEditModal}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="mb-6">
              <p className="text-gray-700 font-semibold mb-2">Email Address</p>
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-2.5"
              />
            </div>

            <div>
              <p className="text-gray-700 font-semibold mb-2">Mobile Number</p>
              <input
                type="text"
                value={user.mobile}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-2.5"
              />
            </div>
          </div>
        </main>
      </div>

      {/* ---------- EDIT POPUP MODAL ---------- */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Edit Profile
            </h2>

            <div className="space-y-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={editUser.firstname || ""}
                  onChange={handleInputChange}
                  className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={editUser.lastname || ""}
                  onChange={handleInputChange}
                  className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editUser.email || ""}
                  disabled
                  className="w-full border px-4 py-2 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium mb-1">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={editUser.mobile || ""}
                  onChange={handleInputChange}
                  className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={editUser.address || ""}
                  onChange={handleInputChange}
                  className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="mr-3 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
