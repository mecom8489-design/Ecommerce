import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
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
import Jacket from "../assets/images/products/jacket-1.jpg";
import bucket from "../assets/images/products/bucket.png";
import shirt from "../assets/images/products/shirt-1.jpg";
import shoe from "../assets/images/products/shoe-1.jpg";
import shorts from "../assets/images/products/shorts-1.jpg";
import watch from "../assets/images/products/watch-1.jpg";
import perfume from "../assets/images/products/perfume.jpg";
import jewellery from "../assets/images/products/jewellery-1.jpg";
import oilDispenser from "../assets/images/products/oil Dispenser.png";
import BrowseCategories from "./browseCategories";
import ProductAD from "./ProductAD";
import buttonBg from "../assets/landing-page-images/button.png"; // adjust path if needed
import PromoUI from "./PromoUI";
import image251 from "../assets/images/Best Seller/image-251.png";
import image15 from "../assets/images/Best Seller/image15.png";
import image17 from "../assets/images/Best Seller/image17.png";
import image16 from "../assets/images/Best Seller/image__16.png";
import Landing from "./landing";
import MoreToLove from "./MoreToLove"; // Import the MoreToLove component
import SuperDeals from "./SuperDeals";
import PetStoreUI from "./PetStore";
import FlashDealsUI from "./FlashDeals";
import HotCategories from "./HotCategories";
import { GetSlides } from "../apiroutes/authApi";
import { useCart } from "../context/CartContext"; // top of file
import { useNavigate } from "react-router-dom";
import { addToWishlist } from "../utils/wishlistUtils";
import { Adminproductses, getAllCategories, getAddedProducts, deleteAdminProducts, AdminUpdateproduct } from "../apiroutes/adminApi";

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const images = [image1, image2];
  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const { addToCart } = useCart();
  const navigate = useNavigate(); // ← This is required
  const products = [
    {
      id: 1,
      brand: "MAISON FRANCIS KURKDJIAN",
      name: "Baccarat Rouge 540 edp spray 70ml",
      price: 245,
      image: Jacket,
      badge: "Bestseller",
      rating: 4.8,
      reviews: 1234,
    },
    {
      id: 2,
      brand: "CREED",
      name: " Multipurposes Plastic Bucket  20Ltr",
      price: 220,
      image: bucket,
      badge: "Bestseller",
      rating: 4.9,
      reviews: 2156,
    },
    {
      id: 3,
      brand: "VICTORIA BECKHAM BEAUTY",
      name: "oil Dispenser",
      price: 32,
      image: oilDispenser,
      badge: "Bestseller",
      rating: 4.6,
      reviews: 892,
    },
    {
      id: 4,
      brand: "VIVIENNE WESTWOOD JEWELLERY",
      name: "Mini Bas Relief brass and cubic zirconia pendant...",
      price: 105,
      image: shoe,
      badge: "Bestseller",
      rating: 4.7,
      reviews: 456,
    },
    {
      id: 5,
      brand: "COMME DES GARCONS",
      name: "Comme des Garçons PLAY x Converse canvas...",
      price: 140,
      image: shorts,
      badge: "Limited Edition",
      rating: 4.5,
      reviews: 789,
    },
    {
      id: 6,
      brand: "VEUVE CLICQUOT",
      name: "City Arrow limited-edition Brut NV champagne 75cl",
      price: 74,
      image: watch,
      badge: "Personalise me",
      rating: 4.8,
      reviews: 324,
    },
    {
      id: 7,
      brand: "UGG",
      name: "Classic Ultra Mini sheepskin boots",
      price: 155,
      image: perfume,
      badge: "Bestseller",
      rating: 4.9,
      reviews: 1567,
    },
    {
      id: 8,
      brand: "VIVIENNE WESTWOOD JEWELLERY",
      name: "Mayfair bas relief earrings",
      price: 95,
      image: jewellery,
      badge: "Bestseller",
      rating: 4.6,
      reviews: 234,
    },
    {
      id: 9,
      brand: "DIOR",
      name: "DIOR Addict Lip Glow Oil 6ml",
      price: 33,
      image: image1,
      badge: "Bestseller",
      rating: 4.7,
      reviews: 2890,
    },
  ];
  const itemsPerViews = 0; // Show 6 products initially
  const scrollStep = 3; // Move 2 products on each scroll
  const maxIndex = Math.max(products.length - itemsPerViews, 0);

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

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Bestseller":
        return "bg-black text-white";
      case "Limited Edition":
        return "bg-red-500 text-white";
      case "Personalise me":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
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
  const Bestsell = [
    {
      id: 1,
      image:
        "https://tiny-tarsier-3c15cf.netlify.app/assets/images/products/1.jpg",
      title: "Baby fabric shoes",
      price: 4,
      oldPrice: "$5.00",
      discount: "-20%",
      rating: 4,
      reviews: 24,
    },
    {
      id: 2,
      image:
        "https://tiny-tarsier-3c15cf.netlify.app/assets/images/products/2.jpg",
      title: "Men's hoodies t-shirt",
      price: 7,
      oldPrice: "$17.00",
      discount: "-59%",
      rating: 3.5,
      reviews: 18,
    },
    {
      id: 3,
      image: image251,
      title: "6 Pc Spice's Rack",
      price: 3,
      oldPrice: "$5.00",
      discount: "-40%",
      rating: 5,
      reviews: 32,
    },
    {
      id: 4,
      image:
        "https://tiny-tarsier-3c15cf.netlify.app/assets/images/products/4.jpg",
      title: "Woolen hat for men",
      price: 12,
      oldPrice: "$15.00",
      discount: "-20%",
      rating: 4.5,
      reviews: 27,
    },
    {
      id: 5,
      image: image15,
      title: " Maggie Bowl ",
      price: 12,
      oldPrice: "$15.00",
      discount: "-20%",
      rating: 4.5,
      reviews: 27,
    },
    {
      id: 6,
      image: image17,
      title: "plate set ",
      price: 12,
      oldPrice: "$15.00",
      discount: "-20%",
      rating: 4.5,
      reviews: 27,
    },
    {
      id: 7,
      image: image16,
      title: "Silver Spoons Set",
      price: 12,
      oldPrice: "$15.00",
      discount: "-20%",
      rating: 4.5,
      reviews: 27,
    },
  ];

  const handleWishlist = (product) => {
    // const isLoggedIn = localStorage.getItem("token"); // or however you track login

    // if (isLoggedIn) {
    //   // Save to backend (API call)
    //   fetch("http://localhost:5000/api/wishlist", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${isLoggedIn}`,
    //     },
    //     body: JSON.stringify(product),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => alert("Added to wishlist!"))
    //     .catch((err) => console.error("Error:", err));
    // } else {
    // Save to localStorage
    addToWishlist(product);
    alert("Added to wishlist ❤️");
    // }
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
                    className="text-yellow-800 font-bold text-sm px-[65px] py-[14px] bg-no-repeat bg-cover bg-center cursor-pointer 
             transition duration-300 ease-in-out 
             transform hover:scale-130"
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
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Best Sellers</h2>
            <Link
              to="/ProductPage"
              className="text-indigo-600 font-medium hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 [@media(min-width:1800px)]:grid-cols-7 gap-4 w-full">
            {Bestsell.map((product) => (
              <div
                key={product.id}
                className="product-card  bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                onClick={() =>
                  navigate(`/ProductPage/products/${product.id}`, {
                    state: { product },
                  })
                }
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="product-actions absolute bottom-0 left-0 right-0 bg-white p-3 flex justify-between">
                    <button
                      className="text-gray-600 hover:text-indigo-600"
                      onClick={() => handleWishlist(product)}
                    >
                      <i className="far fa-heart"></i>
                    </button>

                    <button
                      className="text-gray-600 hover:text-indigo-600"
                      onClick={() => addToCart(product)}
                    >
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                  </div>
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.discount}
                  </span>
                </div>
                <div className="p-4">
                  <Link to="#" className="font-medium hover:text-indigo-600">
                    {product.title}
                  </Link>
                  <div className="flex items-center mt-2">
                    <span className="text-indigo-600 font-bold">
                      {product.price}
                    </span>
                    <span className="text-gray-500 text-sm line-through ml-2">
                      {product.oldPrice}
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400">
                      {Array.from({ length: 5 }, (_, i) => {
                        const fullStar = i < Math.floor(product.rating);
                        const halfStar =
                          product.rating % 1 !== 0 &&
                          i === Math.floor(product.rating);
                        return fullStar ? (
                          <i key={i} className="fas fa-star"></i>
                        ) : halfStar ? (
                          <i key={i} className="fas fa-star-half-alt"></i>
                        ) : (
                          <i key={i} className="far fa-star"></i>
                        );
                      })}
                    </div>
                    <span className="text-gray-500 text-sm ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products AD */}
      <ProductAD />

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
              disabled={currentIndex + itemsPerView >= products.length}
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
                (100 / products.length) * currentIndex
              }%)`,
              width: `${(products.length / itemsPerViews) * 100}%`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[calc(100%/1.5)] sm:w-[calc(100%/2.5)] md:w-[calc(100%/3.5)] lg:w-[calc(100%/4.5)] xl:w-[calc(90%/7)] bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03]"
                onClick={() =>
                  navigate(`/ProductPage/products/${product.id}`, {
                    state: { product },
                  })
                }
              >
                {/* Image Section */}
                <div className="relative h-48 bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-3 right-3 p-1.5 transition-all duration-300 hover:scale-110"
                    // onClick={() => handleWishlist(product)}
                 >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.has(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                  <span
                    className={`absolute bottom-3 left-3 px-2.5 py-1 text-xs font-bold rounded-full ${getBadgeColor(
                      product.badge
                    )} bg-opacity-80 shadow`}
                  >
                    {product.badge}
                  </span>
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col justify-between h-[calc(100%-12rem)] space-y-3">
                  <div>
                    <h3 className="text-xs text-indigo-600 font-semibold uppercase tracking-wider">
                      {product.brand}
                    </h3>
                    <p className="text-sm font-medium text-gray-800 line-clamp-2">
                      {product.name}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <div className="flex gap-[1px]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price & Cart */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      {product.price}
                    </span>
                    <button
                      className="p-2 rounded-full bg-yellow-400 text-white hover:bg-yellow-600 transition duration-200 hover:scale-105"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicator */}
        {/* <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === Math.floor(currentIndex / itemsPerView)
                  ? "bg-black w-6"
                  : "bg-gray-300 w-2 hover:bg-gray-400"
              }`}
            />
          ))}
        </div> */}
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
      <MoreToLove />

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
      <Footer />
    </>
  );
};

export default Home;
