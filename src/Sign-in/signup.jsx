import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { signup } from "../apiroutes/authApi";
import { toast } from "react-toastify";


export default function SignUp({ setShowSignUp, setShowSignIn }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);
  const isValidMobile = (value) => /^[0-9]{10}$/.test(value);

  const handleSignUp = async () => {
    const fieldErrors = {};

    if (!firstName.trim()) fieldErrors.firstName = "First name is required";
    if (!lastName.trim()) fieldErrors.lastName = "Last name is required";

    if (!email) {
      fieldErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      fieldErrors.email = "Invalid email format";
    }

    if (!mobile) {
      fieldErrors.mobile = "Mobile number is required";
    } else if (!isValidMobile(mobile)) {
      fieldErrors.mobile = "Enter a valid 10-digit number";
    }

    if (!password) {
      fieldErrors.password = "Password is required";
    } else if (password.length < 6) {
      fieldErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      fieldErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      fieldErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    try {
      setLoading(true);
      await signup({
        firstname: firstName,
        lastname: lastName,
        email,
        mobile,
        password,
      });

      toast.success("Account created ✅");

      setShowSignUp(false);
      setShowSignIn(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Sign Up failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-[999] px-4">
      <div className="relative w-full max-w-[850px] h-auto md:h-[650px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => setShowSignUp(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer text-3xl z-20"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Left Panel (hidden on mobile) */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-orange-400 to-yellow-500 flex-col justify-center items-center text-white p-8">
          <h2 className="text-3xl font-bold mb-2">Join Us!</h2>
          <p className="text-sm text-center max-w-xs">
            Create an account and start shopping the best deals.
          </p>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Create your account
          </h3>

          {/* First Name */}
          <div className="flex flex-col mb-3">
            <div className="flex items-center border-b border-gray-300 focus-within:border-[#2874f0]">
              <FaUser className="text-gray-400 text-sm mr-2" />
              <input
                type="text"
                placeholder="Enter your First Name"
                className="w-full outline-none text-sm py-2"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (errors.firstName) {
                    setErrors((prevErrors) => ({ ...prevErrors, firstName: "" }));
                  }
                }}
              />
            </div>
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col mb-3">
            <div className="flex items-center border-b border-gray-300 focus-within:border-[#2874f0]">
              <FaUser className="text-gray-400 text-sm mr-2" />
              <input
                type="text"
                placeholder="Enter your Last Name"
                className="w-full outline-none text-sm py-2"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  if (errors.lastName) {
                    setErrors((prevErrors) => ({ ...prevErrors, lastName: "" }));
                  }
                }}
              />
            </div>
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col mb-3">
            <div className="flex items-center border-b border-gray-300 focus-within:border-[#2874f0]">
              <FaEnvelope className="text-gray-400 text-sm mr-2" />
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full outline-none text-sm py-2"
                value={email}
                onChange={(e) => {setEmail(e.target.value);
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

          {/* Mobile */}
          <div className="flex flex-col mb-3">
            <div className="flex items-center border-b border-gray-300 focus-within:border-[#2874f0]">
              <FaPhone className="text-gray-400 text-sm mr-2" />
              <input
                type="tel"
                placeholder="Enter your Mobile Number"
                className="w-full outline-none text-sm py-2"
                value={mobile}
                onChange={(e) => {setMobile(e.target.value);
                  if (errors.mobile) {
                    setErrors((prevErrors) => ({ ...prevErrors, mobile: "" }));
                  }
                }}
              />
            </div>
            {errors.mobile && (
              <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col mb-3">
            <div className="flex items-center border-b border-gray-300 focus-within:border-[#2874f0]">
              <FaLock className="text-gray-400 text-sm mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full outline-none text-sm py-2"
                value={password}
                onChange={(e) => {setPassword(e.target.value);
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

          {/* Confirm Password */}
          <div className="flex flex-col mb-4">
            <div className="flex items-center border-b border-gray-300 focus-within:border-[#2874f0]">
              <FaLock className="text-gray-400 text-sm mr-2" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full outline-none text-sm py-2"
                value={confirmPassword}
                onChange={(e) => {setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) {
                    setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
                  }
                }}
              />
              <span
                className="text-gray-400 text-sm ml-2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Sign Up Button */}
          <button
            onClick={handleSignUp}
            disabled={loading}
            className={`bg-[#fb641b] hover:bg-[#e65c16] text-white text-sm font-medium py-3 rounded-sm shadow cursor-pointer ${loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {/* Already have account */}
          <p className="mt-4 md:mt-auto text-xs text-center text-gray-700">
            Already have an account?{" "}
            <button
              onClick={() => {
                setShowSignUp(false);
                setShowSignIn(true);
              }}
              className="text-[#2874f0] font-medium hover:underline cursor-pointer"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
