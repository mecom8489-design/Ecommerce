import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star, ChevronDown, ChevronRight } from "lucide-react";
import Header from "../Header/header";
import image251 from "../assets/images/Best Seller/image-251.png";
import image15 from "../assets/images/Best Seller/image15.png";
import image17 from "../assets/images/Best Seller/image17.png";
import image16 from "../assets/images/Best Seller/image__16.png";

export default function ProductPage() {
  const [selectedRating, setSelectedRating] = useState([]);
  const [priceRange, setPriceRange] = useState([100, 800]);
  const [expandedCategories, setExpandedCategories] = useState({
    storage: true,
  });
  const navigate = useNavigate(); // ← This is required
  const products = [
    {
      id: 1,
      name: "RK Grihon Plastic Grocery Container - 1200 ml, 650 ml,...",
      image:
        "https://tiny-tarsier-3c15cf.netlify.app/assets/images/products/1.jpg",
      rating: 4.2,
      reviews: 64013,
      currentPrice: 495,
      originalPrice: 1590,
      discount: 69,
      sponsored: "Sponsored",
      assured: true,
      description: "These stylish baby sneakers feature a soft, coral-orange canvas design enhanced with playful black and white striped accents on the toe and collar. The shoes are equipped with white laces and easy-to-fasten eyelets, making them both fashionable and functional for little feet. Their flexible soles and gentle inner lining ensure maximum comfort and support for early walkers, while the unique color and pattern combinations add a vibrant touch to any outfit. Perfect for toddlers, these sneakers blend adorable aesthetics with practical everyday wear.",
    },
    {
      id: 2,
      name: "Some Product Name",
      image:
        "https://tiny-tarsier-3c15cf.netlify.app/assets/images/products/2.jpg",
      rating: 4.4,
      reviews: 944,
      currentPrice: 399,
      originalPrice: 1400,
      discount: 73,
      sponsored: "Sponsored",
      assured: true,
    },

    {
      id: 3,
      name: "Kitchenify Spice Set Stainless Steel",
      image: image251,
      rating: 3.8,
      reviews: 3763,
      currentPrice: 120,
      originalPrice: 849,
      discount: 85,

      lowStock: true,
    },
    {
      id: 4,
      name: "DDdecora Dish Drainer Kitchen Rack Plastic 3 in 1 Large ...",
      image: image15,
      rating: 4.2,
      reviews: 18301,
      currentPrice: 247,
      originalPrice: 1449,
      discount: 82,

      assured: true,
    },
    {
      id: 5,
      name: "Premium Spice Rack Rotating Stand",
      image: image17,
      rating: 4.1,
      reviews: 2156,
      currentPrice: 899,
      originalPrice: 1299,
      discount: 31,

    },
    {
      id: 6,
      name: "Airtight Storage Containers Set",
      image: image16,
      rating: 4.3,
      reviews: 5432,
      currentPrice: 567,
      originalPrice: 999,
      discount: 43,
      assured: true,
    }, {
      id: 7,
      name: "Some Product Name",
      image:
        "https://tiny-tarsier-3c15cf.netlify.app/assets/images/products/2.jpg",
      rating: 4.4,
      reviews: 944,
      currentPrice: 399,
      originalPrice: 1400,
      discount: 73,
      sponsored: "Sponsored",
      assured: true,
    },

    {
      id: 8,
      name: "Kitchenify Spice Set Stainless Steel",
      image: image251,
      rating: 3.8,
      reviews: 3763,
      currentPrice: 120,
      originalPrice: 849,
      discount: 85,

      lowStock: true,
    },
    {
      id: 9,
      name: "DDdecora Dish Drainer Kitchen Rack Plastic 3 in 1 Large ...",
      image: image15,
      rating: 4.2,
      reviews: 18301,
      currentPrice: 247,
      originalPrice: 1449,
      discount: 82,

      assured: true,
    },
    {
      id: 10,
      name: "Premium Spice Rack Rotating Stand",
      image: image17,
      rating: 4.1,
      reviews: 2156,
      currentPrice: 899,
      originalPrice: 1299,
      discount: 31,

    },
    {
      id: 11,
      name: "Airtight Storage Containers Set",
      image: image16,
      rating: 4.3,
      reviews: 5432,
      currentPrice: 567,
      originalPrice: 999,
      discount: 43,
      assured: true,
    },

  ];

  const categories = [
    { name: "Kitchen Containers", count: 1542 },
    { name: "Oil Dispensers", count: 876 },
    { name: "Condiment Sets", count: 654 },
    { name: "Storage Drums", count: 432 },
    { name: "Egg Holders", count: 298 },
  ];

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleRatingChange = (rating) => {
    setSelectedRating((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  return (
    <div>
      <Header />
      <div className="bg-gray-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white px-4 py-3 border-b">
          <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-600">
            <span className="text-blue-600 hover:underline cursor-pointer">
              Home
            </span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-blue-600 hover:underline cursor-pointer">
              Kitchen, Coo...
            </span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>Kitchen Stor...</span>
          </div>
        </div>

        <div className="max-w-7xl mr-130 mx-auto p-4 flex gap-6">
          {/* Filters Sidebar */}
          <div className=" bg-white w-300 rounded-lg shadow-sm p-13 h-fit   ">
            <h2 className="text-xl  font-semibold mb-6">Filters</h2>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4">CATEGORIES</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-blue-600 cursor-pointer">
                  <span className="text-sm">← Kitchen, Cookware &...</span>
                </div>

                <div>
                  <div
                    className="flex items-center justify-between cursor-pointer py-1"
                    onClick={() => toggleCategory("storage")}
                  >
                    <span className="text-sm font-medium">
                      Kitchen Storage & Co...
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${expandedCategories.storage ? "rotate-180" : ""
                        }`}
                    />
                  </div>

                  {expandedCategories.storage && (
                    <div className="ml-4 mt-2 space-y-2">
                      {categories.map((category, index) => (
                        <div
                          key={index}
                          className="text-sm text-gray-700 py-1 cursor-pointer hover:text-blue-600"
                        >
                          {category.name}
                        </div>
                      ))}
                      <button className="text-blue-600 text-sm font-medium">
                        Show 9 more
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4">PRICE</h3>
              <div className="space-y-4">
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select className="border rounded px-3 py-1 text-sm flex-1">
                    <option>Min</option>
                  </select>
                  <span className="text-gray-500">to</span>
                  <select className="border rounded px-3 py-1 text-sm flex-1">
                    <option>800+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Customer Ratings */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4">
                CUSTOMER RATINGS
              </h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <label
                    key={rating}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedRating.includes(rating)}
                      onChange={() => handleRatingChange(rating)}
                      className="w-4 h-4"
                    />
                    <div className="flex items-center gap-1">
                      <span className="text-sm">{rating}★</span>
                      <span className="text-sm text-gray-600">& above</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Discount */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4 flex items-center justify-between">
                DISCOUNT
                <ChevronDown className="w-4 h-4" />
              </h3>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full">
            {/* Results Header */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 w-370">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-lg font-medium">
                    Showing 1 – 40 of 1,72,603 results for "kitchen accessories"
                  </h1>
                </div>

                {/* Sort Options */}
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-sm font-medium text-gray-700">
                    Sort By
                  </span>
                  <button className="px-3 py-1 text-blue-600 border-b-2 border-blue-600 font-medium">
                    Relevance
                  </button>
                  <button className="px-3 py-1 text-gray-600 hover:text-gray-900">
                    Popularity
                  </button>
                  {/* <button className="px-3 py-1 text-gray-600 hover:text-gray-900">
                    Price -- Low to High
                  </button>
                  <button className="px-3 py-1 text-gray-600 hover:text-gray-900">
                    Price -- High to Low
                  </button> */}
                  <button className="px-3 py-1 text-gray-600 hover:text-gray-900">
                    Newest First
                  </button>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full px-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-4 hover:shadow-lg transition-shadow rounded-xl relative group"
                    onClick={() => navigate(`/ProductPage/products/${product.id}`, { state: { product } })}
                  >
                    {/* Wishlist Heart */}
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                    </button>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 space-y-1">
                      {product.bestseller && (
                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                          Bestseller
                        </span>
                      )}
                      {product.hotDeal && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                          Hot Deal
                        </span>
                      )}
                    </div>

                    {/* Product Image */}
                    <div className="relative mb-4">
                      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Sponsored Tag */}
                    {product.sponsored && (
                      <span className="text-xs text-gray-500 mb-2 block">
                        {product.sponsored}
                      </span>
                    )}

                    {/* Product Title */}
                    <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs">
                        <span>{product.rating}</span>
                        <Star className="w-3 h-3 fill-current" />
                      </div>
                      <span className="text-xs text-gray-500">
                        ({product.reviews.toLocaleString()})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-semibold text-gray-900">
                        ₹{product.currentPrice}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                      <span className="text-sm text-green-600 font-medium">
                        {product.discount}% off
                      </span>
                    </div>

                    {/* Low Stock */}
                    {product.lowStock && (
                      <span className="text-xs text-orange-600 font-medium">
                        Only few left
                      </span>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
