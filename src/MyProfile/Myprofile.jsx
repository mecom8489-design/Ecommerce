import React, { useEffect, useState, useRef } from "react";
import Header from "../Header/header";
import { profileData, profileUpdate, sendEmailVerificationCode, verifyEmailCode } from "../apiroutes/userApi";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    address: "",
    role: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [errors, setErrors] = useState({});
  
  // Email verification states
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);

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

  // Countdown timer for resend code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Handle sending verification code to email
  const handleSendVerificationCode = async () => {
    if (!newEmail || !newEmail.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(newEmail)) {
      toast.error("Please enter a valid email format");
      return;
    }

    try {
      setIsVerifying(true);
      await sendEmailVerificationCode(newEmail);
      setIsCodeSent(true);
      setCountdown(60); // 60 seconds countdown
      toast.success("Verification code sent to your email!");
    } catch (error) {
      console.error("Error sending verification code:", error);
      toast.error(error.response?.data?.message || "Failed to send verification code");
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle verifying the code and updating email
  const handleVerifyAndUpdateEmail = async () => {
    if (!verificationCode || verificationCode.trim().length !== 6) {
      toast.error("Please enter a valid 6-digit verification code");
      return;
    }

    try {
      setIsVerifying(true);
      
      // Verify the code
      await verifyEmailCode(newEmail, verificationCode);
      
      // Update the email in profile
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const id = storedUser?.id;
      
      await profileUpdate(id, { ...user, email: newEmail });
      
      // Update local state
      setUser({ ...user, email: newEmail });
      
      // Update localStorage
      const updatedUser = { ...storedUser, email: newEmail };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      toast.success("Email updated successfully!");
      
      // Reset states
      setIsEditingEmail(false);
      setNewEmail("");
      setVerificationCode("");
      setIsCodeSent(false);
      
    } catch (error) {
      console.error("Error verifying code:", error);
      toast.error(error.response?.data?.message || "Invalid verification code");
    } finally {
      setIsVerifying(false);
    }
  };

  // Cancel email editing
  const handleCancelEmailEdit = () => {
    setIsEditingEmail(false);
    setNewEmail("");
    setVerificationCode("");
    setIsCodeSent(false);
    setCountdown(0);
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

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let tempErrors = {};

    if (!editUser.firstname?.trim())
      tempErrors.firstname = "First name is required";
    if (!editUser.lastname?.trim())
      tempErrors.lastname = "Last name is required";

    if (!editUser.mobile?.trim()) {
      tempErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(editUser.mobile)) {
      tempErrors.mobile = "Mobile must be 10 digits";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const id = storedUser?.id;

      await profileUpdate(id, editUser);
      setUser(editUser);
      toast.success("Profile Updated Successfully");
      setShowModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Profile Not Updated ");
    }
  };

  return (
    <div>
      <Header />

      {/* --- Main Layout --- */}
      <div className="min-h-screen-300 border bg-gray-100 flex flex-col md:flex-row">
        
        {/* Sidebar */}
        <aside className="w-full md:w-72 bg-white shadow-md border-r">
          <div className="p-6 flex items-center space-x-4 border-b">
            <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-xl font-semibold">
              {user.firstname?.charAt(0) || "U"}
            </div>
            <div>
              <p className="text-sm text-gray-500">Hello,</p>
              <p className="font-semibold text-gray-800">{user.firstname}</p>
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
        <main className="flex-1 p-4 md:p-8">
          <h2 className="text-lg font-semibold mb-6 text-gray-800">
            Personal Information
          </h2>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border mb-8">
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
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full md:w-auto"
            >
              Edit Profile
            </button>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-700 font-semibold">Email Address</p>
                {!isEditingEmail && (
                  <button
                    onClick={() => {
                      setIsEditingEmail(true);
                      setNewEmail(user.email);
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Edit
                  </button>
                )}
              </div>

              {!isEditingEmail ? (
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50"
                />
              ) : (
                <div className="space-y-3">
                  <div>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="Enter new email address"
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={isCodeSent}
                    />
                  </div>

                  {!isCodeSent ? (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSendVerificationCode}
                        disabled={isVerifying || !newEmail}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {isVerifying ? "Sending..." : "Send Verification Code"}
                      </button>
                      <button
                        onClick={handleCancelEmailEdit}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Enter 6-digit verification code
                        </label>
                        <input
                          type="text"
                          value={verificationCode}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            if (value.length <= 6) {
                              setVerificationCode(value);
                            }
                          }}
                          placeholder="000000"
                          maxLength="6"
                          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg tracking-widest"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Code sent to {newEmail}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={handleVerifyAndUpdateEmail}
                          disabled={isVerifying || verificationCode.length !== 6}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          {isVerifying ? "Verifying..." : "Verify & Save"}
                        </button>
                        <button
                          onClick={handleSendVerificationCode}
                          disabled={isVerifying || countdown > 0}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          {countdown > 0 ? `Resend (${countdown}s)` : "Resend Code"}
                        </button>
                        <button
                          onClick={handleCancelEmailEdit}
                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
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

      {/* --- EDIT MODAL (Mobile Responsive Only) --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2">
          <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-md shadow-xl">

            <h2 className="text-xl font-semibold mb-4 text-center">
              Edit Profile
            </h2>

            <div className="space-y-4">

              {/* First Name */}
              <div>
                <label className="block text-sm font-medium mb-1">First Name *</label>
                <input
                  type="text"
                  name="firstname"
                  value={editUser.firstname || ""}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500"
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Last Name *</label>
                <input
                  type="text"
                  name="lastname"
                  value={editUser.lastname || ""}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500"
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
                )}
              </div>

              {/* Email (Disabled) */}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={editUser.email || ""}
                  disabled
                  className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-500"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium mb-1">Mobile Number *</label>
                <input
                  type="text"
                  name="mobile"
                  value={editUser.mobile || ""}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500"
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={editUser.address || ""}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row justify-end mt-6 space-y-2 md:space-y-0 md:space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 w-full md:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 w-full md:w-auto"
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
