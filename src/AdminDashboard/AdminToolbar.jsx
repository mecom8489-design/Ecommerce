import { useState } from "react";
import { Bell, Search } from "lucide-react";

export default function Toolbar() {
  const userName = "Jane Doe";
  const role = "Admin";
  const imageUrl = "https://example.com/profile.jpg"; // Use your image URL or broken URL to test fallback

  const [imgError, setImgError] = useState(false);

  // Get initials from userName
  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="w-full flex items-center justify-between bg-white p-4 shadow-md">
      {/* Left Section */}
      <div className="text-base sm:text-lg font-semibold text-gray-900">
        Welcome, <span className="text-blue-600">{userName}</span>
      </div>

      {/* Search Bar */}
      <div className="hidden sm:flex flex-1 mx-4 md:mx-6">
        <div className="flex items-center w-full bg-gray-100 rounded-full px-3 py-2 shadow-sm">
          <Search className="w-5 h-5 text-blue-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none flex-1 text-sm sm:text-base text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Notifications */}
        <div className="relative group">
          <Bell className="w-6 h-6 text-blue-600 cursor-pointer group-hover:text-yellow-500 transition-colors duration-200" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] leading-none rounded-full px-[5px] py-[1px] font-semibold">
            2
          </span>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2 cursor-pointer">
          {!imgError && imageUrl ? (
            <img
              src={imageUrl}
              alt={`${userName} profile`}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-blue-600"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold border-2 border-blue-600">
              {getInitials(userName)}
            </div>
          )}

          {/* User details */}
          <div className="hidden md:flex flex-col">
            <span className="text-sm font-semibold text-gray-900">{userName}</span>
            <span className="text-xs text-gray-500">{role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
