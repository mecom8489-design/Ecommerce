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
import image1 from "../assets/landing-page-images/image1.PNG";
import image2 from "../assets/landing-page-images/image2.PNG";
import image5 from "../assets/landing-page-images/image5.png";
import image8 from "../assets/landing-page-images/image8.png";
import ProductAD from "./ProductAD";
import buttonBg from "../assets/landing-page-images/button.png"; // adjust path if needed
import MoreToLove from "./MoreToLove"; // Import the MoreToLove component
import { useCart } from "../context/CartContext"; // top of file
import { useNavigate } from "react-router-dom";
import { addToWishlist } from "../utils/wishlistUtils";
import { getAddedProducts } from "../apiroutes/adminApi";
import Toast from "../context/ToastAddToCart"; // adjust path as needed


const Home = () => {
  const [current, setCurrent] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const images = [image1, image2];

  const { addToCart } = useCart();
  const navigate = useNavigate(); // ← This is required

  const [viewMore, setViewMore] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [ProductADs, setProductAds] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const itemsPerViews = 0; // Show 6 products initially
  const scrollStep = 3; // Move 2 products on each scroll
  const maxIndex = Math.max(recommended.length - itemsPerViews, 0);

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
      setProductAds(productAd.slice(-1));
      setViewMore(viewMore);
      setRecommended(recommended);
      const formatted = formatBestSellerData(bestSeller);
      setBestSeller(formatted.slice(-14));
    } catch (err) {
      console.error(err);
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
      offer:product.offer,
      category: product.category,
      created_at: product.created_at,
    }));
  };

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - scrollStep, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + scrollStep, maxIndex));
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

  const slides = [
    {
      title: "Summer, bottled",
      description:
        "Fresh and floral or zesty citrus? Find a scent to spritz all season.",
      buttonText: "Shop now",
      perfume: {
        brand: "LOEWE",
        name: "Paula's",
        collection: "Ibiza",
        image: image5, // replace with actual image path
      },
    },
    {
      title: "Autumn, captured",
      description:
        "Warm and woody or spicy amber? Discover fragrances for the season ahead.",
      buttonText: "Explore now",
      perfume: {
        brand: "TOM FORD",
        name: "Oud",
        collection: "Wood",
        image: image8, // replace with actual image path
      },
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
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
        "Dining",
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

  // Map each category to an icon
  const icons = [FaTshirt, FaMale, FaChild, FaHeart, FaHome, FaAppleAlt];
  const getItemsPerView = () => {
    if (window.innerWidth < 640) return 1.5; // mobile
    if (window.innerWidth < 768) return 2.5; // sm
    if (window.innerWidth < 1024) return 3.5; // md
    if (window.innerWidth < 1280) return 4.5; // lg
    return 6; // xl
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleWishlist = (product) => {
    addToWishlist(product);
  };

  return (
    <>
      {/* Header */}
      <Header />
      {/* Image slider Section */}
      <div className="relative w-full h-auto md:h-120 mt-1 overflow-hidden border border-gray-200">
        {/* Slider container */}
        <div
          className="flex h-full w-[200%] transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 50}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full md:w-1/2 flex flex-col md:flex-row h-auto md:h-full"
            >
              {/* Left Section */}
              <div className="w-full md:w-1/2 flex items-center bg-yellow-50">
                <div className="ml-6 md:ml-40 max-w-md p-6 md:p-0">
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-light text-black mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-black text-base md:text-lg mb-8 leading-relaxed">
                    {slide.description}
                  </p>

                  {/* Button */}
                  <button
                    className="text-yellow-800 font-bold text-sm px-[65px] py-[14px] bg-no-repeat bg-cover bg-center cursor-pointer transition duration-300 ease-in-out transform hover:scale-130"
                    style={{
                      backgroundImage: `url(${buttonBg})`,
                      backgroundColor: "transparent",
                    }}
                  >
                    {slide.buttonText}
                  </button>
                </div>
              </div>

              {/* Right Section (Image) */}
              <div
                className="w-full md:w-1/2 h-64 md:h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.perfume.image})`,
                }}
              />
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
      <section className="py-5  mt-4">
        <div className="container  mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Best Sellers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 [@media(min-width:1800px)]:grid-cols-7 gap-4 w-full">
            {bestSeller.map((product) => (
              <div
                key={product.id}
                className="product-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                onClick={() =>
                  navigate(`/ProductPage/products/${product.id}`, {
                    state: { product },
                  })
                }
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="product-actions absolute bottom-0 left-0 right-0 bg-white p-3 flex justify-between">
                    <button
                      className="text-gray-600 hover:text-indigo-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWishlist(product);
                        triggerToast("Added to Wishlist ✔️");
                      }}
                    >
                      <i className="far fa-heart"></i>
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
                  {parseFloat(product.discount) > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {Math.round(parseFloat(product.discount))}%
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <Link to="#" className="font-medium hover:text-indigo-600">
                    {product.name}
                  </Link>

                  <div className="flex items-center mt-2">
                    <span className="text-indigo-600 font-bold">
                      ₹{parseFloat(product.finalPrice)}
                    </span>
                    <span className="text-gray-500 text-sm line-through ml-2">
                      ₹{parseFloat(product.price)}
                    </span>
                  </div>
                  <div className="text-sm flex items-center mt-1 ">
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

      {/*  Recommended for you Products Carousel  */}
      <div className="w-full max-w-8xl mx-auto p-28 mt-20 pt-0 pb-0 rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Recommended for you
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex + itemsPerView >= recommended.length}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Product Carousel */}
        <div className="relative overflow-hidden py-6">
          <div
            className="flex gap-4 sm:gap-6 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${
                (100 / recommended.length) * currentIndex
              }%)`,
              width: `${(recommended.length / itemsPerViews) * 100}%`,
            }}
          >
            {recommended.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[calc(100%/1.5)] sm:w-[calc(100%/2.5)] md:w-[calc(100%/3.5)] lg:w-[calc(100%/4.5)] xl:w-[calc(90%/7)] bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                onClick={() =>
                  navigate(`/ProductPage/products/${product.id}`, {
                    state: { product },
                  })
                }
              >
                {/* Image Section */}
                <div className="relative h-48 bg-white flex items-center justify-center">
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
                      className={`w-5 h-5 ${
                        favorites.has(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerToast("Added to Wishlist ✔️");
                        handleWishlist(product);
                      }}
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col justify-between h-[calc(100%-12rem)] space-y-1">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800  line-clamp-2 group-hover:text-yellow-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 ">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{Math.floor(product.finalPrice)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                    {product.discount && (
                      <span className="text-sm font-medium text-green-600">
                        {Math.floor(product.discount)}% OFF
                      </span>
                    )}
                  </div>
                  {/* Price & Cart */}

                  {/* Rating */}
                  <div className="text-sm flex items-center mt-1 ">
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
                  <div className="flex items-center justify-between">
                    <div className="text-[14px] font-bold">
                      Available Stocks:
                      <span className="text-red-600"> {product.stock}</span>
                    </div>
                    <button
                      className="p-2 rounded-full bg-yellow-400 text-white hover:bg-yellow-600 transition duration-200 hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      <ShoppingCart className="w-5 h-5" />
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
      <div className="bg-white py-12 px-6 md:px-20">
        <h2 className="text-2xl font-semibold mb-10">Shop more</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          {categories.map((category, idx) => {
            const Icon = icons[idx]; // Get matching icon
            return (
              <div key={idx}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="text-yellow-500 text-5xl" />
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm ml-2 text-black font-medium hover:underline cursor-pointer"
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
