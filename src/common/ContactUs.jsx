import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
  FaWhatsapp,
  FaLinkedinIn,
} from "react-icons/fa"; // Correct import path here
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { Contactus } from "../apiroutes/userApi";
import { toast } from "react-toastify";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.message ||
      !formData.mobile
    ) {
      toast.error("Please fill out all fields");
      return;
    }

    // --- Validation Logic ---
    const isValidEmail = (value) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) return false;
      if (value.includes("..") || value.startsWith(".") || value.endsWith(".")) return false;

      // Check for common typos
      const domain = value.split("@")[1];
      const typoDomains = ["gmaiil.com", "gamil.com", "yaho.com", "hotmal.com"];
      if (typoDomains.includes(domain)) return false;

      return true;
    };

    const isValidMobile = (value) => /^[6-9]\d{9}$/.test(value);
    const isValidName = (value) => /^[A-Za-z\s]+$/.test(value);

    // --- Execute Validation ---
    if (!isValidName(formData.name)) {
      toast.error("Name must contain only letters");
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!isValidMobile(formData.mobile)) {
      toast.error("Enter a valid 10-digit mobile number starting with 6-9");
      return;
    }

    try {
      setLoading(true);
      const response = await Contactus({ formData });
      console.log(response);
      toast.success("Message sent successfully");
      setFormData({ name: "", email: "", message: "", mobile: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6 lg:px-20 overflow-x-hidden">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-800">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Location Info */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-semibold mb-8 text-gray-800 border-b pb-4">
              Our Location
            </h3>

            <div className="space-y-6 text-gray-700">
              <div>
                <h4 className="font-semibold">eshopEasy</h4>
                <p>Brindavan Colony, No: 2/119, Puducherry, India</p>
              </div>

              <div>
                <h4 className="font-semibold">Operating Office:</h4>
                <p>Brindavan Colony, No: 2/119, Puducherry, India</p>
              </div>

              <div>
                <h4 className="font-semibold">Warehouse Address:</h4>
                <p>Brindavan Colony, No: 2/119, Puducherry, India</p>
              </div>

              <div>
                <h4 className="font-semibold">Customer Care</h4>
                <p>📞 +91 XXXXXXXXXX</p>
              </div>

              <div>
                <h4 className="font-semibold">Email</h4>
                <p>support@eshopeasy.com</p>
              </div>

              <div>
                <h4 className="font-semibold">Office Hours</h4>
                <p>
                  Monday – Saturday (except public holidays) <br />
                  Time: 9.30 am to 6.00 pm
                </p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#"
                className="p-3 border rounded-full hover:bg-blue-500 hover:text-white transition"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="#"
                className="p-3 border rounded-full hover:bg-gray-800 hover:text-white transition"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="#"
                className="p-3 border rounded-full hover:bg-pink-500 hover:text-white transition"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                className="p-3 border rounded-full hover:bg-red-500 hover:text-white transition"
              >
                <FaYoutube size={18} />
              </a>
              <a
                href="#"
                className="p-3 border rounded-full hover:bg-red-600 hover:text-white transition"
              >
                <FaPinterestP size={18} />
              </a>
              <a
                href="#"
                className="p-3 border rounded-full hover:bg-green-500 hover:text-white transition"
              >
                <FaWhatsapp size={18} />
              </a>
              <a
                href="#"
                className="p-3 border rounded-full hover:bg-blue-600 hover:text-white transition"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              Get in Touch
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mb-4 text-base focus:ring-2 focus:ring-black outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mb-4 text-base focus:ring-2 focus:ring-black outline-none"
              required
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile number *"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mb-4 text-base focus:ring-2 focus:ring-black outline-none"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message *"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full border p-3 rounded-lg mb-6 text-base focus:ring-2 focus:ring-black outline-none"
              required
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-black to-gray-700 text-white py-3 rounded-lg font-medium hover:from-gray-800 hover:to-black transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
