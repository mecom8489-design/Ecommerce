import React, { useState } from "react";
import axios from "axios";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { Link } from "react-router-dom";
import {ContactEmail} from "../apiroutes/authApi";
import { toast } from "react-toastify";



export default function TermsAndConditions() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill out all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      return;
    }

    try {
      setLoading(true);
      const response = await ContactEmail({formData});
      console.log(response);
      toast.success("Message sent successfully ");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      {/* Main container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-gray-700 text-left">
        {/* Page Header */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8">
          Terms & Conditions
        </h1>

        <p>
          <strong>Effective Date:</strong> 01 January 2025
        </p>
        <p>
          <strong>Owner:</strong> AahaSolutions
        </p>

        <p className="mt-4 sm:mt-6">
          Welcome to <strong>eshopEasy</strong> (“Website”), owned and operated
          by <strong>AahaSolutions</strong>. By accessing or using this Website, you
          agree to comply with and be bound by these Terms and Conditions
          (“Terms”). If you do not agree to these Terms, you should not access
          or use the Website. Please read these Terms carefully before
          proceeding.
        </p>

        {/* Terms Sections */}
        <TermsSection
          title="1. Definitions"
          items={[
            "“Website” refers to eshopEasy.com.",
            "“Owner” refers to AahaSolutions, the owner and operator.",
            "“User” means any person accessing or using the Website.",
            "“Products” means the goods available for purchase.",
            "“Services” includes browsing, ordering, and support.",
          ]}
        />

        <TermsSection
          title="2. Eligibility"
          items={[
            "You must be at least 18 years old to use this Website.",
            "If using on behalf of a business/entity, you confirm authority to bind it.",
          ]}
        />

        <TermsSection
          title="3. Registration and Account"
          items={[
            "Some features require registration with accurate details.",
            "You are responsible for maintaining account confidentiality and all activities under your account.",
            "The Owner reserves the right to refuse or terminate accounts at sole discretion.",
          ]}
        />

        <TermsSection
          title="4. Use of the Website"
          items={[
            "Use the Website for fraudulent or unethical purposes.",
            "Interfere with Website functionality (hacking, malware, etc.).",
            "Copy or reproduce content without permission.",
          ]}
        />

        <TermsSection
          title="5. Product Information and Pricing"
          items={[
            "We strive to provide accurate product details, but errors may occur.",
            "All prices are in INR and include applicable taxes.",
            "We reserve the right to modify or discontinue products anytime.",
            "Product images are for representation only.",
          ]}
        />

        <TermsSection
          title="6. Orders and Payments"
          items={[
            "By placing an order, you agree to purchase under these Terms.",
            "We may accept, reject, or cancel orders for various reasons.",
            "Payments must be made through secure payment gateways.",
            "Refunds, if applicable, follow our Refund Policy.",
            "For high-value orders (above ₹2000), advance payment may be required.",
          ]}
        />

        <TermsSection
          title="7. Shipping and Delivery"
          items={[
            "Delivery timelines are estimates only.",
            "Ownership passes to you once delivered.",
          ]}
        />

        <TermsSection
          title="8. Returns and Refunds"
          items={[
            "Returns are accepted only for defective, damaged, or incorrect products.",
            "Return requests must be made within 3 days of delivery.",
            "Products must be unused and in original condition with packaging intact.",
            "Refunds (if approved) are processed within 7–10 business days.",
          ]}
        />

        <TermsSection
          title="9. Intellectual Property"
          paragraph="All content on this Website (text, graphics, logos, etc.) is property of eshopEasy and protected under applicable laws. Unauthorized use is prohibited."
        />

        <TermsSection
          title="10. Privacy Policy"
          paragraph="Use of the Website is also governed by our Privacy Policy, which explains how we collect, store, and use personal information."
        />

        <TermsSection
          title="11. Limitation of Liability"
          items={[
            "We are not liable for damages arising from use or inability to use the Website or Products.",
            "Liability is limited to the amount paid for the Product in question.",
          ]}
        />

        <TermsSection
          title="12. Indemnification"
          paragraph="You agree to indemnify and hold harmless eshopEasy and its owner from any claims, damages, or expenses resulting from your use of the Website."
        />

        <TermsSection
          title="13. Governing Law and Jurisdiction"
          paragraph="These Terms are governed by the laws of India. Disputes shall be subject to the courts in Puducherry, India."
        />

        <TermsSection
          title="14. Amendments"
          paragraph="We may modify or update these Terms at any time without prior notice. Continued use of the Website constitutes acceptance of any changes."
        />

        {/* Contact Section */}
        <h2 className="mt-6 sm:mt-8 font-semibold text-gray-900 text-lg sm:text-xl">
          15. Contact Information
        </h2>
        <p className="mt-2 sm:mt-4">
          For any queries or concerns regarding these Terms or the Website, you
          may contact us at:
        </p>

        <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Address */}
          <div className="space-y-4 text-sm sm:text-base">
            <p>
              <strong>eshopEasy</strong>
              <br />
              Brindavan Colony, No: 2/119, Puducherry, India
            </p>
            <p>
              <strong>Operating Office:</strong> Brindavan Colony, No: 2/119,
              Puducherry, India
            </p>
            <p>
              <strong>Warehouse Address:</strong> Brindavan Colony, No: 2/119,
              Puducherry, India
            </p>
            <p>
              <strong>Customer Care:</strong> +91 XXXXXXXXXX
            </p>
            <p>
              <strong>Email:</strong> support@eshopeasy.com
            </p>
            <p>
              <strong>Office Hours:</strong> Monday – Saturday (except public
              holidays)
              <br />
              Time: 9.30 am to 6.00 pm
            </p>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              Get in Touch
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name *"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2874f0]"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email *"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2874f0]"
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message *"
                rows="5"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2874f0] resize-none"
              ></textarea>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#2874f0] text-white px-6 py-2 rounded-full hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>

        <p className="mt-6 sm:mt-8 text-sm text-gray-600">
          By using <strong>eshopEasy</strong>, you acknowledge that you have
          read, understood, and agreed to these Terms and Conditions.
        </p>
      </div>

      <Footer />
    </div>
  );
}

// Reusable Terms Section Component
const TermsSection = ({ title, items, paragraph }) => {
  return (
    <div>
      <h2 className="mt-6 sm:mt-8 font-semibold text-gray-900 text-lg sm:text-xl">
        {title}
      </h2>
      {items && (
        <ul className="mt-2 ml-5 list-decimal space-y-1">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      {paragraph && <p className="ml-5 mt-2">{paragraph}</p>}
      <hr className="my-4 sm:my-6 border-gray-300" />
    </div>
  );
};
