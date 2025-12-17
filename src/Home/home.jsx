import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from "lucide-react";
import {
  FaTshirt,
  FaMale,
  FaChild,
  FaHeart,
  FaHome,
  FaAppleAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import Header from "../Header/header"; // Make sure the file exports a component named Header
import Footer from "../Footer/footer";
import buttonBg from "../assets/landing-page-images/button.png"; // adjust path if needed
import MoreToLove from "./MoreToLove"; // Import the MoreToLove c
import { useCart } from "../context/CartContext"; 
import { useNavigate } from "react-router-dom";
import { addToWishlist, removeFromWishlist } from "../utils/wishlistUtils";
import { getAddedProducts } from "../apiroutes/adminApi";
import Toast from "../context/ToastAddToCart"; // adjust path as needed

const Home = () => {
  const [favorites, setFavorites] = useState(new Set());
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [viewMore, setViewMore] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [productAd, setProductAd] = useState([]);

  const slides = productAd.map((prod, index) => ({
    title: index === 0 ? "Hot Deals" : "Exclusive Offer",
    buttonText: index === 0 ? "Shop Now" : "Explore",
    products: prod,
  }));

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const hasFetched = useRef(false);
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAddedProducts();
      const {
        productAd = [],
        viewMore = [],
        bestSeller = [],
        recommended = [],
      } = response.data?.data || {};
      setProductAd(productAd.slice(-2));
      setViewMore(viewMore);
      setRecommended(recommended);
      const formatted = formatBestSellerData(bestSeller);
      setBestSeller(formatted.slice(-12));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(err?.response?.data?.message || "Failed to fetch products.");
    }
  };

  const formatBestSellerData = (products) => {
    return products.map((product) => ({
      id: product.id,
      image: product.image,
      name: product.name,
      finalPrice: product.finalPrice,
      price: `${parseFloat(product.price).toFixed(2)}`,
      discount: `${product.discount}`,
      rating: product.rating,
      order_count: product.order_count,
      description: product.description,
      stock: product.stock,
      offer: product.offer,
      category: product.category,
      created_at: product.created_at,
      message: product.message,
    }));
  };


  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);
  const categories = [
    {
      title: "Women’s",
      items: ["Clothing", "Shoes", "Bags", "Accessories", "Brand A-Z"],
    },
    {
      title: "Men’s",
      items: ["Clothing", "Shoes", "Bags", "Accessories", "Brands A-Z"],
    },
    {
      title: "Kids",
      items: ["Baby", "Girls", "Boys", "Toyshop", "Brands A-Z"],
    },
    {
      title: "Beauty",
      items: ["Skincare", "Make-up", "Fragrance", "Gift sets", "Brands A-Z"],
    },
    {
      title: "Home & tech",
      items: [
        "Home",
        "Technology",
        "Candles & home fragrance",
        "Electronics",
        "Brands A-Z",
      ],
    },
    {
      title: "Food",
      items: [
        "Food & wine gifting",
        "Chocolate & confectionery",
        "Pantry",
        "Health & wellbeing",
        "Brands A-Z",
      ],
    },
  ];

  const icons = [FaTshirt, FaMale, FaChild, FaHeart, FaHome, FaAppleAlt];


  const handleWishlist = (product) => {
    addToWishlist(product);
  };

  const Loader = () => (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="w-16 h-16 border-4 border-yellow-400 border-dashed rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-700 text-lg font-medium">
        Please wait Loading ....
      </p>
    </div>
  );

  // Show loader if loading
  if (loading) return <Loader />;
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );

  return (
    <>
      {/* Header */}
      <Header />
      {/* Image slider Section */}
      <div className="relative w-full h-auto md:h-120 mt-1 overflow-hidden border border-gray-200">
        {/* Slider container */}
        <div
          className="flex h-full"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
            transition: "transform 0.7s ease-in-out",
          }}
        >
          {slides.map((product, index) => (
            <div
              key={product.id || index}
              className="w-full md:w-1/2 flex flex-col md:flex-row h-auto md:h-full"
              style={{ width: `${100 / slides.length}%` }}
            >
              {/* LEFT */}
              <div className="w-full md:w-1/2 flex items-center bg-yellow-50">
                <div className="ml-6 md:ml-40 max-w-md p-6 md:p-0">
                  {/* Title */}
                  <h1
                    className="text-[22px] sm:text-[30px] md:text-[38px] lg:text-[48px] font-light text-red-600 mb-4 italic"
                  >
                    {product.title}
                  </h1>

                  {/* Description */}
                  <p
                    className="text-black text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] mb-8 font-bold leading-relaxed"
                  >
                    {product.products?.description}
                  </p>
                  {/* Button */}
                  <button
                    className="
              text-yellow-800 font-bold 
              text-[12px] sm:text-[14px] md:text-[16px]
              px-[65px] py-[14px]
              bg-no-repeat bg-cover bg-center cursor-pointer 
              transition duration-300 ease-in-out transform 
              hover:scale-130
            "
                    style={{
                      backgroundImage: `url(${buttonBg})`,
                      backgroundColor: "transparent",
                    }}
                    onClick={() =>
                      navigate(
                        `/ProductPage/products/${product.products?.id}`,
                        {
                          state: { product: product.products },
                        }
                      )
                    }
                  >
                    {product.buttonText}
                  </button>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div
                className="w-full md:w-1/2 h-64 md:h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${product.products?.image})`,
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg z-20 cursor-pointer"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg z-20 cursor-pointer"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Best Sellers */}
      <section className="py-6 mt-4">
        <div className="w-full px-20">
          {/* Title */}
          <h2 className="text-[20px] sm:text-[26px] lg:text-[32px] xl:text-[38px] font-bold text-gray-900 mb-6">
            Best Sellers
          </h2>

          {/* PRODUCT GRID */}
          <div
            className="
        grid gap-6 w-full
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        [@media(min-width:1800px)]:grid-cols-7
      "
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            }}
          >
            {bestSeller.map((product) => (
              <div
                key={product.id}
                className="product-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer w-full"
                onClick={() =>
                  navigate(`/ProductPage/products/${product.id}`, {
                    state: { product },
                  })
                }
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover"
                  />

                  {/* Wishlist + Cart buttons */}
                  <div className="product-actions absolute bottom-0 left-0 right-0 bg-white p-3 flex justify-between">
                    <button
                      className={`transition-all duration-300 ${
                        favorites.has(product.id)
                          ? "text-red-500"
                          : "text-gray-600 hover:text-indigo-600"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (favorites.has(product.id)) {
                          toggleFavorite(product.id);
                          removeFromWishlist(product.id);
                          triggerToast("Removed from Wishlist ❌");
                        } else {
                          toggleFavorite(product.id);
                          handleWishlist(product);
                          triggerToast("Added to Wishlist ✔️");
                        }
                      }}
                    >
                      <i
                        className={
                          favorites.has(product.id)
                            ? "fas fa-heart"
                            : "far fa-heart"
                        }
                      ></i>
                    </button>

                    <button
                      className="text-gray-600 hover:text-indigo-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                  </div>

                  {/* Discount Tag */}
                  {parseFloat(product.discount) > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] sm:text-[12px] lg:text-[13px] font-bold px-2 py-1 rounded">
                      {Math.round(parseFloat(product.discount))}%
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Name */}
                  <Link
                    to="#"
                    className="font-medium hover:text-indigo-600 text-[14px] sm:text-[16px] lg:text-[18px]"
                  >
                    {product.name}
                  </Link>

                  {/* Price */}
                  <div className="flex items-center mt-2">
                    <span className="text-indigo-600 font-bold text-[16px] sm:text-[18px] lg:text-[20px]">
                      ₹{parseFloat(product.finalPrice)}
                    </span>

                    <span className="text-gray-500 text-[12px] sm:text-[13px] lg:text-[14px] line-through ml-2">
                      ₹{parseFloat(product.price)}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="text-[12px] sm:text-[13px] lg:text-[14px] flex items-center mt-1">
                    Rating:
                    <span className="ml-2 flex relative">
                      <div className="flex text-gray-300">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>

                      <div
                        className="flex text-yellow-500 absolute left-0 top-0 overflow-hidden"
                        style={{
                          width: `${(Number(product.rating) / 5) * 100}%`,
                        }}
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </span>
                    <span className="ml-2 text-gray-700">
                      (
                      {product.rating ? Number(product.rating).toFixed(2) : "-"}
                      )
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products AD */}
      {/* <ProductAD product={ProductADs} /> */}

      {/* Recommended for you Products Carousel */}
      <div className="w-full max-w-8xl mx-auto px-20 mt-10 pt-0 pb-0 rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] sm:text-[26px] lg:text-[32px] xl:text-[38px] font-bold text-gray-900">
            Recommended for you
          </h2>
        </div>

        {/* Product Carousel */}
        <div className="relative overflow-x-auto overflow-y-hidden py-4 custom-scroll">
          <div className="flex gap-4 sm:gap-6">
            {recommended.map((product) => (
              <div
                key={product.id}
                className="
            flex-shrink-0
            w-[85%]  
            sm:w-[48%]
            md:w-[31%]
            lg:w-[23%]
            xl:w-[19%]
            2xl:w-[15%]
            [@media(min-width:1800px)]:w-[13.5%]
            bg-white border border-gray-200 rounded-2xl overflow-hidden 
            transition-all duration-300 hover:scale-[1.03] cursor-pointer
          "
                onClick={() =>
                  navigate(`/ProductPage/products/${product.id}`, {
                    state: { product },
                  })
                }
              >
                {/* Image */}
                <div className="relative h-40 sm:h-48 lg:h-56 bg-white flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full object-contain"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className="absolute top-3 right-3 p-1.5 transition-all duration-300 hover:scale-110"
                  >
                    <Heart
                      className={`w-5 h-5 cursor-pointer transition-all duration-300 ${
                        favorites.has(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();

                        if (favorites.has(product.id)) {
                          toggleFavorite(product.id); 
                          removeFromWishlist(product.id); 
                          triggerToast("Removed from Wishlist ❌");
                        } else {
                          toggleFavorite(product.id); 
                          handleWishlist(product); 
                          triggerToast("Added to Wishlist ✔️");
                        }
                      }}
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-3 sm:p-4 flex flex-col space-y-1">
                  {/* Product Name */}
                  <h3 className="text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[20px] font-bold text-slate-800 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Price Section */}
                  <div className="flex items-center gap-2">
                    <span className="text-[18px] sm:text-[20px] lg:text-[22px] font-bold text-gray-900">
                      ₹{Math.floor(product.finalPrice)}
                    </span>

                    {product.originalPrice && (
                      <span className="text-[12px] sm:text-[13px] lg:text-[14px] text-gray-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}

                    {product.discount && (
                      <span className="text-[12px] sm:text-[13px] lg:text-[14px] font-medium text-green-600">
                        {Math.floor(product.discount)}% OFF
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="text-[12px] sm:text-[13px] lg:text-[14px] flex items-center mt-1">
                    Rating:
                    <span className="ml-2 flex relative">
                      <div className="flex text-gray-300">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>

                      <div
                        className="flex text-yellow-500 absolute left-0 top-0 overflow-hidden"
                        style={{
                          width: `${(Number(product.rating) / 5) * 100}%`,
                        }}
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </span>
                    <span className="ml-2 text-gray-700">
                      (
                      {product.rating ? Number(product.rating).toFixed(2) : "-"}
                      )
                    </span>
                  </div>

                  {/* Stock + Add to Cart */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-[12px] sm:text-[13px] lg:text-[14px] font-bold">
                      Available Stocks:
                      <span className="text-red-600"> {product.stock}</span>
                    </div>

                    <button
                      className="p-2 rounded-full bg-yellow-400 text-white hover:bg-yellow-600 hover:scale-105 transition cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pet Store UI Section  */}
      {/* <PetStoreUI /> */}

      {/* Flash Deals UI Section  */}
      {/* <FlashDealsUI /> */}

      {/* Hot Categories Section  */}
      {/* <HotCategories /> */}

      {/* Promo UI Section  */}
      {/* <PromoUI /> */}

      {/* Browse by categories*/}
      {/* <BrowseCategories /> */}

      {/* Super Deals Section */}
      {/* <SuperDeals /> */}

      {/* More to love Section */}
      <MoreToLove products={viewMore} />

      {/* Shop more */}
      <div className="bg-white py-[48px] px-[24px] md:px-[80px]">
        <h2 className="text-[24px] md:text-[28px] font-semibold mb-[40px]">
          Shop more
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-[32px]">
          {categories.map((category, idx) => {
            const Icon = icons[idx]; // Get matching icon
            return (
              <div key={idx}>
                <div className="flex items-center gap-[8px] mb-[12px]">
                  <Icon className="text-yellow-500 text-[40px] md:text-[48px]" />
                  <h3 className="text-[16px] md:text-[18px] font-semibold">
                    {category.title}
                  </h3>
                </div>
                <ul className="space-y-[8px]">
                  {category.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-[12px] md:text-[14px] ml-[8px] text-black font-medium hover:underline cursor-pointer"
                      onClick={() => navigate(`/ProductPage?search=${item}`)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* <Landing /> */}

      {/* Footer */}
      <Toast message={toastMessage} show={showToast} />
      <Footer />
    </>
  );
};

export default Home;
