import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Home/home.jsx";
import ProductPage from "./Product Page/ProductPage.jsx";
import Product from "./Product/product.jsx";
import Wishlist from "./CartPage/Wishlist.jsx";
import Termsconditions from "./common/TermsAndConditions.jsx";
import ContactUs from "./common/ContactUs.jsx";
import FAQSection from "./common/FAQSection.jsx";
import ReturnPolicy from "./common/ReturnPolicy.jsx";
import AboutUs from "./common/AboutUs.jsx";

import AdminMain from "./AdminDashboard/AdminMain.jsx";
import AdDashboard from "./AdminDashboard/AdDashboard.jsx";
import AdminOrders from "./AdminDashboard/AdminOrders.jsx"; // create this component or dummy
import AdminProducts from "./AdminDashboard/AdminProducts.jsx"; // create this component or dummy
import AdminUsers from "./AdminDashboard/AdminUserDashboard.jsx"; // create this component or dummy
import AdminCategories from "./AdminDashboard/AdminCategories.jsx"; // create this component or dummy

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/ProductPage" element={<ProductPage />} />
        <Route path="/ProductPage/products" element={<Product />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/terms&conditions" element={<Termsconditions />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/faq" element={<FAQSection />} />
        <Route path="/returnpolicy" element={<ReturnPolicy />} />
        <Route path="/aboutUs" element={<AboutUs />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminMain />}>
          <Route index element={<AdDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="categories" element={<AdminCategories />} />
        </Route>

        {/* Redirect any unknown paths to home or admin */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
