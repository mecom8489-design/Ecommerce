import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/home.jsx";
import ProductPage from "./Product Page/ProductPage.jsx";
import Product from "./Product/product.jsx";
import Wishlist from "./CartPage/Wishlist.jsx";
import Termsconditions from "./common/TermsAndConditions.jsx";
import ContactUs from "./common/ContactUs.jsx";
import FAQSection from "./common/FAQSection.jsx";
import ReturnPolicy from "./common/ReturnPolicy.jsx";
import AboutUs from "./common/AboutUs.jsx";





function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ProductPage" element={<ProductPage />} />
          <Route path="/ProductPage/products" element={<Product />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/terms&conditions" element={<Termsconditions />} />
          <Route path="/contactUs" element={< ContactUs/>} />
          <Route path="/faq" element={< FAQSection/>} />
          <Route path="/returnpolicy" element={< ReturnPolicy/>} />
          <Route path="/aboutUs" element={< AboutUs/>} />


        </Routes>
      </Router>
    </>
  );
}

export default App;
