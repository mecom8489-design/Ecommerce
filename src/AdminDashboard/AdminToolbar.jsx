import { useState, useEffect } from "react";
import { Bell } from "lucide-react";

export default function Toolbar() {
  const [user, setUser] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [dateTime, setDateTime] = useState("");

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Invalid JSON in localStorage:", err);
      }
    }
  }, []);

  // Update date & time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setDateTime(now.toLocaleString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getInitials = (firstname, lastname) => {
    if (!firstname && !lastname) return "";
    return `${firstname?.[0] ?? ""}${lastname?.[0] ?? ""}`.toUpperCase();
  };

  if (!user) return null;

  const userName = `${user.firstname} ${user.lastname}`;
  const role = user.role;
  const imageUrl = user.imageUrl ?? "";

  return (
    <div className="w-full flex items-center justify-between bg-white p-4 shadow-md">

      {/* Left Section */}
      <div className="text-base sm:text-lg font-semibold text-gray-900">
        Welcome, <span className="text-blue-600">{userName}</span>
      </div>

      {/* Middle Section (Date & Time instead of Search Bar) */}
      {/* <div className="hidden sm:flex text-gray-600 font-medium">
        {dateTime}
      </div> */}

      {/* Right Section */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        
        {/* Notification Icon */}
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
              {getInitials(user.firstname, user.lastname)}
            </div>
          )}

          {/* User details */}
          <div className="hidden md:flex flex-col">
            <span className="text-sm font-semibold text-gray-900">{userName}</span>
            <span className="text-xs text-gray-500 capitalize">{role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

