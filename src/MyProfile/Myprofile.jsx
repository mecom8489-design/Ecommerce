import React from "react";
import Header from "../Header/header";

const Myprofile = () => {
  return (
    <div>
      <Header />
      <div className="min-h-screen-300 border bg-gray-100 flex">
        {/* Sidebar */}
        <aside className="w-72 bg-white shadow-md border-r">
          <div className="p-6 flex items-center space-x-4 border-b">
            <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-xl font-semibold">
              S
            </div>
            <div>
              <p className="text-sm text-gray-500">Hello,</p>
              <p className="font-semibold text-gray-800">Siva</p>
            </div>
          </div>

          {/* Sidebar Menu */}
          <div className="p-4 space-y-6 text-sm text-gray-700">
            {/* <div>
              <p className="font-semibold text-gray-600 mb-2">MY ORDERS</p>
            </div> */}

            <div>
              <p className="font-semibold text-gray-600 mb-2">
                ACCOUNT SETTINGS
              </p>
              <ul className="space-y-1">
                <li className="px-3 py-2 bg-blue-50 text-blue-600 rounded cursor-pointer">
                  Profile Information
                </li>
                <li className="px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
                  Manage Addresses
                </li>
                {/* <li className="px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
                  PAN Card Information
                </li> */}
              </ul>
            </div>

            {/* <div>
              <p className="font-semibold text-gray-600 mb-2">PAYMENTS</p>
              <ul className="space-y-1">
                <li className="px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
                  Gift Cards
                </li>
                <li className="px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
                  Saved UPI
                </li>
                <li className="px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
                  Saved Cards
                </li>
              </ul>
            </div> */}
            {/* 
            <div>
              <p className="font-semibold text-gray-600 mb-2">MY STUFF</p>
              <ul className="space-y-1">
                <li className="px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
                  My Coupons
                </li>
                <li className="px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
                  My Reviews & Ratings
                </li>
                <li className="px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
                  All Notifications
                </li>
                <li className="px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
                  My Wishlist
                </li>
              </ul>
            </div> */}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h2 className="text-lg font-semibold mb-6 text-gray-800">
            Personal Information
            <button className="text-blue-600 text-sm ml-2 hover:underline">
              Edit
            </button>
          </h2>

          {/* Profile Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value="Siva"
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                readOnly
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <p className="text-gray-700 font-medium mb-2">Your Gender</p>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="gender" />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="gender" />
                  <span>Female</span>
                </label>
              </div>
            </div>
          </div>

          {/* Email & Mobile Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <div className="mb-6">
              <p className="text-gray-700 font-semibold mb-2">
                Email Address{" "}
                <button className="text-blue-600 text-sm hover:underline">
                  Edit
                </button>
              </p>
              <input
                type="email"
                value="athrimr@gmail.com"
                readOnly
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none"
              />
            </div>

            <div>
              <p className="text-gray-700 font-semibold mb-2">
                Mobile Number{" "}
                <button className="text-blue-600 text-sm hover:underline">
                  Edit
                </button>
              </p>
              <input
                type="text"
                value="+919994354019"
                readOnly
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none"
              />
            </div>
          </div>

          {/* FAQs */}
          {/* <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-800 mb-4">FAQs</h3>
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>
                <strong>
                  What happens when I update my email address or mobile number?
                </strong>
                <br />
                Your login email id (or mobile number) changes, likewise. You'll
                receive all account-related communication on your updated email
                address or mobile number.
              </p>
              <p>
                <strong>When will my account be updated?</strong>
                <br />
                It happens as soon as you confirm the verification code sent to
                your email or mobile and save the changes.
              </p>
            </div>
          </div> */}
        </main>
      </div>
    </div>
  );
};

export default Myprofile;
