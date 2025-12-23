import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Heart, Star, ChevronDown, ChevronRight, Filter, X } from "lucide-react";
import Header from "../Header/header";
import { liveSearchProducts } from "../apiroutes/userApi";

export default function ProductPage() {
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [expandedCategories, setExpandedCategories] = useState({
    storage: true,
  });
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("search");

  const navigate = useNavigate(); // ← This is required
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [total, settotal] = useState();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProductFilter, setSelectedProductFilter] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchLiveSearch = async () => {
      try {
        const response = await liveSearchProducts(query);
        settotal(response.data.total)
        setProducts(response.data.products || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLiveSearch();
  }, [query]);

  // const categories = [
  //   { name: "Kitchen Containers", count: 1542 },
  //   { name: "Oil Dispensers", count: 876 },
  //   { name: "Condiment Sets", count: 654 },
  //   { name: "Storage Drums", count: 432 },
  //   { name: "Egg Holders", count: 298 },
  // ];

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

  const handleDiscountChange = (discount) => {
    setSelectedDiscount((prev) =>
      prev.includes(discount)
        ? prev.filter((d) => d !== discount)
        : [...prev, discount]
    );
  };

  const clearFilters = () => {
    setSelectedRating([]);
    setSelectedDiscount([]);
    setPriceRange([0, 10000]);
    setSelectedProductFilter(null);
  };

  const filteredProducts = products.filter((product) => {
    // Price Filter
    const productPrice = parseFloat(product.price) || 0;
    const [minPrice, maxPrice] = priceRange;
    const isPriceInRange = productPrice >= minPrice && productPrice <= maxPrice;

    // Rating Filter
    // If no rating is selected, include all.
    // If ratings are selected, check if product rating is >= any of the selected thresholds.
    // Since thresholds are "X & above", we essentially need productRating >= min(selectedRating).
    let isRatingMatch = true;
    if (selectedRating.length > 0) {
      const productRating = parseFloat(product.rating) || 0;
      const minSelectedRating = Math.min(...selectedRating);
      isRatingMatch = productRating >= minSelectedRating;
    }

    // Discount Filter
    let isDiscountMatch = true;
    if (selectedDiscount.length > 0) {
      const productDiscount = parseFloat(product.discount) || 0;
      const minSelectedDiscount = Math.min(...selectedDiscount);
      isDiscountMatch = productDiscount >= minSelectedDiscount;
    }

    // Name Filter
    let isNameMatch = true;
    if (selectedProductFilter) {
      isNameMatch = product.name === selectedProductFilter;
    }

    return isPriceInRange && isRatingMatch && isDiscountMatch && isNameMatch;
  });

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
              {query}
            </span>
          </div>
        </div>

        <div className="max-w-8xl mx-auto p-4 flex flex-col lg:flex-row gap-6">

          {/* Filters Sidebar */}
          <div className={`
            bg-white rounded-lg shadow-sm p-4 h-fit
            fixed lg:static top-0 left-0 bottom-0 z-50 lg:z-auto
            w-80 sm:w-96 lg:w-64 xl:w-80
            transform transition-transform duration-300 ease-in-out
            ${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            overflow-y-auto
          `}>
            {/* Close button for mobile */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-xs font-medium text-blue-600 hover:text-blue-800 uppercase tracking-wide"
                >
                  Clear All
                </button>
              </div>
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4">CATEGORIES</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-blue-600 cursor-pointer">
                  <span className="text-sm">← {query}...</span>
                </div>

                <div>
                  <div
                    className="flex items-center justify-between cursor-pointer py-1"
                    onClick={() => toggleCategory("storage")}
                  >
                    <span className="text-sm font-medium">{query}...</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${expandedCategories.storage ? "rotate-180" : ""
                        }`}
                    />
                  </div>

                  {expandedCategories.storage && (
                    <div className="ml-4 mt-2 space-y-2">
                      {products
                        .slice(0, visibleCount)
                        .map((category, index) => (
                          <div
                            key={index}
                            className={`text-sm py-1 cursor-pointer hover:text-blue-600 ${selectedProductFilter === category.name
                              ? "text-blue-600 font-medium"
                              : "text-gray-700"
                              }`}
                            onClick={() =>
                              setSelectedProductFilter((prev) =>
                                prev === category.name ? null : category.name
                              )
                            }
                          >
                            {category.name}
                          </div>
                        ))}

                      {visibleCount < products.length && (
                        <button
                          className="text-blue-600 text-sm font-medium"
                          onClick={() => setVisibleCount((prev) => prev + 8)}
                        >
                          Show {products.length - visibleCount} more
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">PRICE</h3>
                {priceRange[1] !== 10000 && (
                  <button
                    onClick={() => setPriceRange([0, 10000])}
                    className="text-xs font-medium text-blue-600 hover:text-blue-800"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-4">
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select className="border rounded px-3 py-1 text-sm flex-1">
                    <option>Min</option>
                  </select>
                  <span className="text-gray-500">to</span>
                  <select className="border rounded px-3 py-1 text-sm flex-1">
                    <option>{priceRange[1]}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Ratings */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">
                  CUSTOMER RATINGS
                </h3>
                {selectedRating.length > 0 && (
                  <button
                    onClick={() => setSelectedRating([])}
                    className="text-xs font-medium text-blue-600 hover:text-blue-800"
                  >
                    Clear
                  </button>
                )}
              </div>
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                  DISCOUNT
                  <ChevronDown className="w-4 h-4" />
                </h3>
                {selectedDiscount.length > 0 && (
                  <button
                    onClick={() => setSelectedDiscount([])}
                    className="text-xs font-medium text-blue-600 hover:text-blue-800"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {[50, 40, 30, 20, 10].map((discount) => (
                  <label
                    key={discount}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDiscount.includes(discount)}
                      onChange={() => handleDiscountChange(discount)}
                      className="w-4 h-4"
                    />
                    <div className="flex items-center gap-1">
                      <span className="text-sm">{discount}%</span>
                      <span className="text-sm text-gray-600">or more</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>


          {/* Main Content */}
          <div className="flex-1 w-full">

            {/* Filter Button and Results Container */}
            <div className="flex items-start gap-3 mb-6">
              {/* Mobile Filter Button - Left of the box */}
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300 flex items-center justify-center bg-white shadow-sm"
                aria-label="Open Filters"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Results Box */}
              <div className="bg-white rounded-lg shadow-sm p-4 flex-1">
                <h1 className="text-base sm:text-lg font-medium">
                  Showing {filteredProducts.length} results for "{query}"
                </h1>

                {/* Sort options */}
                {/* <div className="flex items-center gap-1 flex-wrap mt-3">
                  <span className="text-sm font-medium text-gray-700">
                    Sort By
                  </span>
                  <button className="px-3 py-1 text-blue-600 border-b-2 border-blue-600 font-medium">
                    Relevance
                  </button>
                  <button className="px-3 py-1 text-gray-600 hover:text-gray-900">
                    Popularity
                  </button>
                  <button className="px-3 py-1 text-gray-600 hover:text-gray-900">
                    Newest First
                  </button>
                </div> */}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white hover:shadow-xl transition-all duration-300 rounded-lg relative group cursor-pointer overflow-hidden border border-gray-100
                  p-3 sm:p-4 flex flex-col"
                  onClick={() =>
                    navigate(`/ProductPage/products/${product.id}`, {
                      state: { product },
                    })
                  }
                >
                  {/* Heart Icon - Visible on hover */}
                  <button
                    className="absolute top-2 right-2 p-1.5 sm:p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to wishlist logic here
                    }}
                  >
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 hover:text-red-500 hover:fill-red-500" />
                  </button>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                    {product.bestseller && (
                      <span className="bg-orange-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-medium">
                        Bestseller
                      </span>
                    )}
                    {product.hotDeal && (
                      <span className="bg-green-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-medium">
                        Hot Deal
                      </span>
                    )}
                  </div>

                  {/* Product Image Container - Larger in 2-col (mobile) layout */}
                  <div className="w-full aspect-square sm:aspect-[4/3] md:aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-2 sm:mb-3 p-2 sm:p-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Details Container */}
                  <div className="flex flex-col flex-grow">
                    {/* Sponsored Tag */}
                    {product.sponsored && (
                      <span className="text-[10px] sm:text-xs text-gray-500 mb-1">
                        Sponsored
                      </span>
                    )}

                    {/* Product Name - More lines visible in 2-col */}
                    <h3 className="text-xs sm:text-sm md:text-base font-medium text-gray-900 mb-1.5 sm:mb-2 line-clamp-2 sm:line-clamp-2 hover:text-blue-600 transition-colors leading-snug">
                      {product.name}
                    </h3>

                    {/* Rating and Reviews */}
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                      <div className="flex items-center gap-0.5 sm:gap-1 bg-green-600 text-white px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium">
                        <span>{product.rating || '4.5'}</span>
                        <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                      </div>
                      <span className="text-[10px] sm:text-xs text-gray-500 font-medium">
                        ({product.reviews || '100'})
                      </span>
                    </div>

                    {/* Price Section - Prominent in 2-col */}
                    <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                      <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                        ₹{product.price?.toLocaleString() || product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[10px] sm:text-xs md:text-sm text-gray-400 line-through">
                          ₹{product.originalPrice?.toLocaleString() || product.originalPrice}
                        </span>
                      )}
                      {product.discount && (
                        <span className="text-[10px] sm:text-xs md:text-sm text-green-600 font-semibold">
                          {product.discount}% off
                        </span>
                      )}
                    </div>

                    {/* Pay Price Info - Show in mobile 2-col */}
                    {product.payPrice && (
                      <p className="text-[10px] sm:text-xs text-gray-600 mb-1 sm:hidden">
                        Or Pay ₹{product.payPrice} + {product.payExtra || '100'}
                      </p>
                    )}

                    {/* Free Delivery Badge */}
                    {product.freeDelivery !== false && (
                      <p className="text-[10px] sm:text-xs text-gray-700 mb-0.5 sm:mb-1 font-medium">
                        Free delivery
                      </p>
                    )}

                    {/* Super Deals / Special Offers */}
                    {product.superDeals && (
                      <p className="text-[10px] sm:text-xs text-green-600 font-semibold mb-0.5 sm:mb-1">
                        Super Deals
                      </p>
                    )}

                    {/* Low Stock Warning */}
                    {product.lowStock && (
                      <span className="text-[10px] sm:text-xs text-orange-600 font-semibold">
                        Only few left
                      </span>
                    )}

                    {/* Delivery Info - More visible in 2-col layout */}
                    {product.deliveryDate && (
                      <p className="text-[10px] sm:text-xs text-gray-600 mt-1 sm:block">
                        <span className="font-semibold text-gray-700">Delivery by</span> {product.deliveryDate}
                      </p>
                    )}

                    {/* Assured Badge - Show in mobile */}
                    {product.assured && (
                      <div className="mt-1 sm:mt-2">
                        <span className="inline-flex items-center text-[10px] sm:text-xs text-blue-600 font-medium">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Assured
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
