import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";

// Lazy load components
const Home = lazy(() => import("./Home/home.jsx"));
const ProductPage = lazy(() => import("./Product Page/ProductPage.jsx"));
const Product = lazy(() => import("./Product/product.jsx"));
const Wishlist = lazy(() => import("./CartPage/Wishlist.jsx"));
const Termsconditions = lazy(() => import("./common/TermsAndConditions.jsx"));
const ContactUs = lazy(() => import("./common/ContactUs.jsx"));
const FAQSection = lazy(() => import("./common/FAQSection.jsx"));
const ReturnPolicy = lazy(() => import("./common/ReturnPolicy.jsx"));
const AboutUs = lazy(() => import("./common/AboutUs.jsx"));
const AdminMain = lazy(() => import("./AdminDashboard/AdminMain.jsx"));
const AdDashboard = lazy(() => import("./AdminDashboard/AdDashboard.jsx"));
const AdminOrders = lazy(() => import("./AdminDashboard/AdminOrders.jsx"));
const AdminProducts = lazy(() => import("./AdminDashboard/AdminProducts.jsx"));
const AdminUsers = lazy(() => import("./AdminDashboard/AdminUserDashboard.jsx"));
const AdminCategories = lazy(() => import("./AdminDashboard/AdminCategories.jsx"));
const AdminSupport = lazy(() => import("./AdminDashboard/AdminSupport.jsx"));
const AdminPayments = lazy(() => import("./AdminDashboard/AdminPayments.jsx"));
const Checkout = lazy(() => import("./CheckOut-Screen/Checkout.jsx"));
const MyOrders = lazy(() => import("./MyOrders/MyOrders.jsx"));
const Myprofile = lazy(() => import("./MyProfile/Myprofile.jsx"));

function App() {
  return (
    <Router>
      {/* Suspense shows a Tailwind-styled loader while lazy components load */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/ProductPage" element={<ProductPage />} />
          <Route path="/ProductPage/products/:id" element={<Product />} />
          <Route path="/ProductPage/products/Checkout/:id" element={<Checkout />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/terms&conditions" element={<Termsconditions />} />
          <Route path="/Contact-us" element={<ContactUs />} />
          <Route path="/faq" element={<FAQSection />} />
          <Route path="/returnpolicy" element={<ReturnPolicy />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/my-Profile" element={<Myprofile />} />

          {/* Protected Admin routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminMain />}>
              <Route index element={<AdDashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="support" element={<AdminSupport />} />
              <Route path="payments" element={<AdminPayments />} />
            </Route>
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
