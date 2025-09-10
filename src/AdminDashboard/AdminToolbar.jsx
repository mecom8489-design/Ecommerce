import { Bell, Search } from "lucide-react";

export default function Toolbar({ userName, role }) {
  return (
    <div className="w-full flex items-center justify-between bg-white dark:bg-gray-900 p-4 shadow-md">
      {/* Left Section */}
      <div className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
        Welcome, {userName}
      </div>

      {/* Search Bar */}
      <div className="hidden sm:flex flex-1 mx-4 md:mx-6">
        <div className="flex items-center w-full bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-2">
          <Search className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none flex-1 text-sm sm:text-base text-gray-700 dark:text-gray-200"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Notifications */}
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300 cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            2
          </span>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
          />
          {/* Hide name/role on very small screens */}
          <div className="hidden md:flex flex-col">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {userName}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
