import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // For internal routing

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Footer sections with links as objects {name, url}
  const footerSections = [
    {
      title: "Customer Services",
      links: [
        { name: "Contact us", url: "/contactUs" },
        { name: "FAQs", url: "/faq" },
        { name: "Returns and refunds", url: "/returns" },
        { name: "Personal Shopping", url: "/personal-shopping" },
        { name: "Gift cards", url: "/gift-cards" },
        { name: "Gift packaging", url: "/gift-packaging" },
      ],
    },
    {
      title: "Online Shopping",
      links: [
        { name: "Delivery", url: "/delivery" },
        { name: "Click & Collect", url: "/click-collect" },
        { name: "ShopEasy +", url: "/shopeasy-plus" },
        { name: "Tracking your order", url: "/tracking" },
        { name: "Online Brand Directory", url: "/brands" },
      ],
    },
    {
      title: "Our Stores",
      links: [
        { name: "London", url: "/stores/london" },
        { name: "Birmingham", url: "/stores/birmingham" },
        { name: "Manchester Trafford", url: "/stores/manchester-trafford" },
        { name: "Manchester Exchange", url: "/stores/manchester-exchange" },
      ],
    },
    {
      title: "In Store",
      links: [
        { name: "A-Z store services", url: "/store-services" },
        { name: "Restaurants", url: "/restaurants" },
        { name: "Services", url: "/services" },
        { name: "Events", url: "/events" },
      ],
    },
    {
      title: "About Us",
      links: [
        { name: "Inspiration", url: "/inspiration" },
        { name: "About ShopEasy", url: "/about" },
        { name: "Careers", url: "/careers" },
        { name: "Suppliers", url: "/suppliers" },
        { name: "Press area", url: "/press" },
        { name: "Our policies and statements", url: "/policies" },
      ],
    },
    {
      title: "Seasonal",
      links: [
        { name: "Sale", url: "/sale" },
        { name: "Hampers", url: "/hampers" },
        { name: "Weddings", url: "/weddings" },
      ],
    },
  ];

  // Bottom links with URLs
  const bottomLinks = [
    { name: "Modern slavery statement", url: "/modern-slavery" },
    { name: "Accessibility", url: "/accessibility" },
    { name: "Terms & conditions", url: "/terms&conditions" },
    { name: "Privacy & cookie policies", url: "/privacy" },
  ];

  // Show scroll-to-top button when user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-gray-100 border-t border-gray-200">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.url}
                        className="text-gray-700 text-sm hover:text-gray-900 transition-colors duration-200"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

              {/* Left Side - Copyright */}
              <div className="text-gray-600 text-sm text-center md:text-left">
                © ShopEasy
              </div>

              {/* Right Side - Links */}
              <div className="flex flex-wrap justify-center md:justify-end items-center gap-4">
                {bottomLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.url}
                    className="text-gray-600 text-sm hover:text-gray-900 transition-colors duration-200"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <button
            onClick={scrollToTop}
            className="bg-yellow-400 hover:bg-yellow-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
            aria-label="Scroll to top"
          >
            ↑
          </button>
        </div>
      )}
    </>
  );
};

export default Footer;
