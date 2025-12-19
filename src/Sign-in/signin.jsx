import React, { useState, useContext, useEffect } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import {
  login,
  verifyOtp,
  VerifyEmail,
  resetPassword,
} from "../apiroutes/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { AuthContext } from "../context/LoginAuth";




export default function SignIn({ setShowSignIn, setShowSignUp }) {
  const { setIsLoggedIn, setUser, syncWishlist,syncCart } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Forgot Password
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState("");

  // New Password Modal
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);



  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const handleSignIn = async () => {
    const fieldErrors = {};
    if (!email) fieldErrors.email = "Email is required";
    else if (!isValidEmail(email)) fieldErrors.email = "Invalid email address";

    if (!password) fieldErrors.password = "Password is required";
    else if (password.length < 6)
      fieldErrors.password = "Password must be at least 6 characters";

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await login({ email, password });
      const { user } = response.data;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login successful");
      const role = response.data.user.role;
      const token = response.data.token;
      localStorage.setItem("token", token);
      if (syncWishlist) {
        await syncWishlist(user);
      }
      if(syncCart){
        await syncCart(user);
      }
      window.dispatchEvent(new Event("wishlistUpdated"));
      if (role == "admin") {
        navigate("/admin");
      }
      setIsLoggedIn(true);
      setShowSignIn(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed ");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      toast.error("Please enter your email");
      return;
    }
    if (!isValidEmail(resetEmail)) {
      toast.error("Invalid email format");
      return;
    }

    try {
      setResetLoading(true);
      const response = await VerifyEmail({ email: resetEmail });
      if (response.data.message === "Email is not registered.") {
        toast.error(response.data.message);
        return;
      }
      else{
        toast.success("OTP sent to your email ");
        setShowOtpField(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to  reset  ");
    } finally {
      setResetLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      const response = await verifyOtp({ otp: otp, email: resetEmail });
      toast.success("OTP verified ");
      setShowOtpField(false);
      setOtp("");
      setShowNewPasswordModal(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP ");
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      toast.error("Email is required");
      return;
    }
    if (!isValidEmail(resetEmail)) {
      toast.error("Invalid email format");
      return;
    }
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match ");
      return;
    }

    try {
      setResetPasswordLoading(true);
      const response = await resetPassword({
        email: resetEmail,
        newPassword: newPassword,
      });
      toast.success("Password reset successful ");
      setShowForgotPassword(false);
      setShowNewPasswordModal(false);
      setNewPassword("");
      setConfirmPassword("");
      setResetEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed ");
    } finally {
      setResetPasswordLoading(false);
    }
  };



  return (
    <div className="fixed inset-0 flex justify-center items-center z-[999] px-4">
      {/* ---- SIGN IN MODAL ---- */}
      <div className="relative w-full max-w-[850px] h-auto md:h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => setShowSignIn(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer text-3xl z-20"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Left Panel */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-yellow-400 to-orange-500 flex-col justify-center items-center text-white p-8 relative overflow-hidden">
          <h2 className="z-10 text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="z-10 text-sm text-center max-w-xs">
            Sign in to continue shopping your favorite items and enjoy exclusive
            deals.
          </p>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Sign in to your account
          </h3>

          {/* Email Input */}
          <div className="flex flex-col mb-4">
            <div className="flex items-center border-b border-gray-300 focus-within:border-[#2874f0]">
              <FaEnvelope className="text-gray-400 text-sm mr-2" />
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full outline-none text-sm py-2"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
                  }
                }}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col mb-2">
            <div className="flex items-center border-b border-gray-300 focus-within:border-[#2874f0]">
              <FaLock className="text-gray-400 text-sm mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full outline-none text-sm py-2"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
                  }
                }}
              />
              <span
                className="text-gray-400 text-sm ml-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Forgot Password */}
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-xs text-[#2874f0] hover:underline self-end mb-4 cursor-pointer"
          >
            Forgot Password?
          </button>

          {/* Sign In Button */}
          <button
            onClick={handleSignIn}
            disabled={loading}
            className={`bg-[#fb641b] hover:bg-[#e65c16] text-white text-sm font-medium py-3 rounded-sm shadow cursor-pointer ${loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Create Account */}
          <p className="mt-4 md:mt-auto text-xs text-center text-gray-700">
            New to ShopEasy?{" "}
            <button
              onClick={() => {
                setShowSignIn(false);
                setShowSignUp(true);
              }}
              className="text-[#2874f0] font-medium hover:underline cursor-pointer"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>

      {/* ---- Forgot Password Modal ---- */}
      {showForgotPassword && (
        <div className="fixed inset-0 flex justify-center items-center z-[1000] px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[400px]">
            <h3 className="text-lg font-bold mb-4">Reset Password</h3>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4 outline-none focus:border-[#2874f0]"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />

            {showOtpField && (
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4 outline-none focus:border-[#2874f0]"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            )}

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setShowOtpField(false);
                  setResetEmail("");
                  setOtp("");
                }}
                className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>

              {!showOtpField ? (
                <button
                  onClick={handleForgotPassword}
                  disabled={resetLoading}
                  className={`px-4 py-2 text-sm bg-[#2874f0] text-white rounded hover:bg-blue-600 ${resetLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                >
                  {resetLoading ? "Sending..." : "Send Reset Link"}
                </button>
              ) : (
                <button
                  onClick={handleVerifyOtp}
                  className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Verify OTP
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---- New Password Modal ---- */}
      {showNewPasswordModal && (
        <div className="fixed inset-0 flex justify-center items-center z-[1100] px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[400px]">
            <h3 className="text-lg font-bold mb-4">Set New Password</h3>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4 outline-none focus:border-[#2874f0]"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />

            {/* New Password */}
            <div className="flex items-center border-b border-gray-300 focus-within:border-[#2874f0] mb-4">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full outline-none text-sm py-2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                className="text-gray-400 text-sm ml-2 cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="flex items-center border-b border-gray-300 focus-within:border-[#2874f0] mb-4">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                className="w-full outline-none text-sm py-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className="text-gray-400 text-sm ml-2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowNewPasswordModal(false)}
                className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                disabled={resetPasswordLoading}
                className={`px-4 py-2 text-sm bg-[#2874f0] text-white rounded hover:bg-blue-600 ${resetPasswordLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
              >
                {resetPasswordLoading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
