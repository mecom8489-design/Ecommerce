// Toast.jsx
import React from "react";
import { CheckCircle } from "lucide-react";

const ToastAddToCart = ({ message, show }) => {
  return (
    <div
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 
      flex items-center bg-gray-900 text-white text-sm font-medium px-4 py-2 
      rounded-md shadow-lg transition-all duration-500 z-50
      ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <CheckCircle size={18} className="text-green-400 mr-2" />
      {message}
    </div>
  );
};

export default ToastAddToCart;
