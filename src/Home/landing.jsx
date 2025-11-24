import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Star,
  ChevronDown,
  Menu,
  X,
  Truck,
  Shield,
  RotateCcw,
  Headphones,
  MapPin,
  Bell,
  Filter,
  ChevronRight,
  Tag,
  Zap,
  Gift,
  Clock,
  TrendingUp,
  Award,
  Camera,
  Smartphone,
  Laptop,
  Gamepad2,
  Watch,
  Shirt,
  Home,
  Book,
  Car,
  Dumbbell,
  Baby,
  Palette,
  Music,
  Plane,
  Coffee,
  Flower2,
  Sparkles,
} from "lucide-react";

const landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [wishlist, setWishlist] = useState(new Set());
  const [cart, setCart] = useState([]);

  const heroSlides = [
    {
      id: 1,
      title: "Mega Sale Up to 80% Off",
      subtitle: "Latest Electronics & Fashion",
      bg: "bg-gradient-to-r from-purple-600 via-pink-600 to-red-600",
      image: "📱",
    },
    {
      id: 2,
      title: "Fashion Week Special",
      subtitle: "Trending Styles & Brands",
      bg: "bg-gradient-to-r from-blue-600 via-teal-600 to-green-600",
      image: "👗",
    },
    {
      id: 3,
      title: "Home & Living Sale",
      subtitle: "Transform Your Space",
      bg: "bg-gradient-to-r from-orange-600 via-red-600 to-pink-600",
      image: "🏠",
    },
  ];

  const categories = [
    {
      name: "Electronics",
      icon: Smartphone,
      color: "bg-blue-500",
      items: "50K+",
    },
    { name: "Fashion", icon: Shirt, color: "bg-pink-500", items: "100K+" },
    { name: "Home & Living", icon: Home, color: "bg-green-500", items: "75K+" },
    { name: "Sports", icon: Dumbbell, color: "bg-orange-500", items: "25K+" },
    { name: "Books", icon: Book, color: "bg-purple-500", items: "1M+" },
    { name: "Automotive", icon: Car, color: "bg-red-500", items: "30K+" },
    { name: "Baby & Kids", icon: Baby, color: "bg-yellow-500", items: "40K+" },
    { name: "Beauty", icon: Palette, color: "bg-indigo-500", items: "60K+" },
    { name: "Music", icon: Music, color: "bg-teal-500", items: "20K+" },
    { name: "Travel", icon: Plane, color: "bg-cyan-500", items: "15K+" },
    { name: "Food", icon: Coffee, color: "bg-amber-500", items: "35K+" },
    { name: "Garden", icon: Flower2, color: "bg-lime-500", items: "12K+" },
  ];

  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 134900,
      originalPrice: 159900,
      rating: 4.8,
      reviews: 2847,
      image: "📱",
      badge: "Bestseller",
      category: "Electronics",
      discount: 16,
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      price: 124999,
      originalPrice: 134999,
      rating: 4.7,
      reviews: 1923,
      image: "📱",
      badge: "Hot Deal",
      category: "Electronics",
      discount: 7,
    },
    {
      id: 3,
      name: "MacBook Pro 14-inch",
      price: 194900,
      originalPrice: 219900,
      rating: 4.9,
      reviews: 856,
      image: "💻",
      badge: "Editor's Choice",
      category: "Electronics",
      discount: 11,
    },
    {
      id: 4,
      name: "Nike Air Max 270",
      price: 12995,
      originalPrice: 16995,
      rating: 4.6,
      reviews: 3421,
      image: "👟",
      badge: "Trending",
      category: "Fashion",
      discount: 24,
    },
    {
      id: 5,
      name: "Sony WH-1000XM5",
      price: 29990,
      originalPrice: 34990,
      rating: 4.8,
      reviews: 1547,
      image: "🎧",
      badge: "Premium",
      category: "Electronics",
      discount: 14,
    },
    {
      id: 6,
      name: "Adidas UltraBoost 22",
      price: 16999,
      originalPrice: 20999,
      rating: 4.7,
      reviews: 2156,
      image: "👟",
      badge: "Sport",
      category: "Sports",
      discount: 19,
    },
    {
      id: 7,
      name: "Dell XPS 13",
      price: 119999,
      originalPrice: 139999,
      rating: 4.6,
      reviews: 743,
      image: "💻",
      badge: "Business",
      category: "Electronics",
      discount: 14,
    },
    {
      id: 8,
      name: "Levi's 501 Jeans",
      price: 3999,
      originalPrice: 5999,
      rating: 4.5,
      reviews: 4832,
      image: "👖",
      badge: "Classic",
      category: "Fashion",
      discount: 33,
    },
  ];

  const dealOfTheDay = {
    name: "Apple Watch Series 9",
    price: 41900,
    originalPrice: 45900,
    rating: 4.8,
    reviews: 1234,
    image: "⌚",
    timeLeft: "23:45:32",
    discount: 9,
    soldPercentage: 68,
  };

  const brands = [
    { name: "Apple", logo: "🍎", discount: "Up to 15% off" },
    { name: "Samsung", logo: "📱", discount: "Up to 20% off" },
    { name: "Nike", logo: "✔️", discount: "Up to 40% off" },
    { name: "Adidas", logo: "🔷", discount: "Up to 35% off" },
    { name: "Sony", logo: "🎵", discount: "Up to 25% off" },
    { name: "LG", logo: "🔴", discount: "Up to 30% off" },
    { name: "HP", logo: "💻", discount: "Up to 45% off" },
    { name: "Dell", logo: "🖥️", discount: "Up to 40% off" },
  ];

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const ProductCard = ({ product, size = "normal" }) => (
    <div
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group ${
        size === "large" ? "p-6" : "p-4"
      }`}
    >
      <div className="relative">
        <div
          className={`${
            size === "large" ? "text-6xl" : "text-4xl"
          } mb-4 text-center`}
        >
          {product.image}
        </div>
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Heart
            size={16}
            className={
              wishlist.has(product.id)
                ? "fill-red-500 text-red-500"
                : "text-gray-400 hover:text-red-500"
            }
          />
        </button>
        {product.badge && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {product.badge}
          </div>
        )}
        {product.discount && (
          <div className="absolute top-8 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {product.discount}% OFF
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3
          className={`font-semibold text-gray-800 group-hover:text-blue-600 transition-colors ${
            size === "large" ? "text-lg" : "text-sm"
          }`}
        >
          {product.name}
        </h3>

        <div className="flex items-center space-x-1">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-center space-x-2">
          <span
            className={`font-bold text-gray-900 ${
              size === "large" ? "text-xl" : "text-lg"
            }`}
          >
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-semibold"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 text-sm border-b">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <MapPin size={14} className="text-gray-600" />
                <span className="text-gray-600">Deliver to 110001</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Download App</span>
              <span className="text-gray-600">Customer Care</span>
              <span className="text-gray-600">Track Order</span>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-xl">
                  <Sparkles size={24} />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ShopVerse
                </h1>
              </div>

              <div className="relative flex-1 max-w-xl">
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search
                  className="absolute left-4 top-3.5 text-gray-400"
                  size={20}
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                <User size={20} />
                <span>Account</span>
                <ChevronDown size={16} />
              </button>

              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                <Heart size={20} />
                <span>Wishlist</span>
              </button>

              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors relative">
                <ShoppingCart size={20} />
                <span>Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              <button className="text-gray-700 hover:text-blue-600 transition-colors">
                <Bell size={20} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-8 py-3 border-t">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <Menu size={16} />
              <span>All Categories</span>
            </button>
            {categories.slice(0, 6).map((category, index) => (
              <button
                key={index}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {category.name}
              </button>
            ))}
            <button className="text-gray-700 hover:text-blue-600 transition-colors">
              More...
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative h-96">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className={`${slide.bg} h-full flex items-center justify-center text-white`}
              >
                <div className="text-center">
                  <div className="text-8xl mb-4">{slide.image}</div>
                  <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-xl mb-8">{slide.subtitle}</p>
                  <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl">
            <Truck size={32} className="mb-2" />
            <h3 className="font-bold">Free Delivery</h3>
            <p className="text-sm opacity-90">On orders above ₹499</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-6 rounded-2xl">
            <Shield size={32} className="mb-2" />
            <h3 className="font-bold">Secure Payment</h3>
            <p className="text-sm opacity-90">100% Protected</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-2xl">
            <RotateCcw size={32} className="mb-2" />
            <h3 className="font-bold">Easy Returns</h3>
            <p className="text-sm opacity-90">7 days return policy</p>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-2xl">
            <Headphones size={32} className="mb-2" />
            <h3 className="font-bold">24/7 Support</h3>
            <p className="text-sm opacity-90">Always here to help</p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
            >
              <div
                className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
              >
                <category.icon size={32} className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600">{category.items} items</p>
            </div>
          ))}
        </div>
      </section>

      {/* Deal of the Day */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-3xl p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Zap size={32} className="text-yellow-300" />
              <div>
                <h2 className="text-3xl font-bold">Deal of the Day</h2>
                <p className="text-xl opacity-90">Limited Time Offer</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-xl">
                <Clock size={20} className="inline mr-2" />
                <span className="font-mono text-xl">
                  {dealOfTheDay.timeLeft}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 text-gray-800">
              <div className="text-center">
                <div className="text-6xl mb-4">{dealOfTheDay.image}</div>
                <h3 className="text-xl font-bold mb-2">{dealOfTheDay.name}</h3>
                <div className="flex items-center justify-center space-x-1 mb-4">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span>{dealOfTheDay.rating}</span>
                  <span className="text-sm text-gray-500">
                    ({dealOfTheDay.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <span className="text-2xl font-bold">
                    {formatPrice(dealOfTheDay.price)}
                  </span>
                  <span className="text-gray-500 line-through">
                    {formatPrice(dealOfTheDay.originalPrice)}
                  </span>
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                    {dealOfTheDay.discount}% OFF
                  </span>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all">
                  Buy Now
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg">Deal Progress</span>
                  <span className="text-lg font-bold">
                    {dealOfTheDay.soldPercentage}% sold
                  </span>
                </div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-4">
                  <div
                    className="bg-yellow-400 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${dealOfTheDay.soldPercentage}%` }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Gift size={20} className="text-yellow-300" />
                  <span>Free gift with purchase</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck size={20} className="text-yellow-300" />
                  <span>Free express delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw size={20} className="text-yellow-300" />
                  <span>Easy 30-day returns</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award size={20} className="text-yellow-300" />
                  <span>1-year warranty included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <TrendingUp size={32} className="text-blue-600" />
            <h2 className="text-3xl font-bold">Trending Now</h2>
          </div>
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <span>View All</span>
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Featured Brands */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Brands</h2>
        <div className="grid grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="text-4xl mb-4">{brand.logo}</div>
              <h3 className="font-bold text-xl mb-2">{brand.name}</h3>
              <p className="text-green-600 font-semibold">{brand.discount}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Electronics Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Smartphone size={32} />
              <h2 className="text-3xl font-bold">Electronics Store</h2>
            </div>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Explore All
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {products
              .filter((p) => p.category === "Electronics")
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section>

      {/* Fashion Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Shirt size={32} />
              <h2 className="text-3xl font-bold">Fashion Hub</h2>
            </div>
            <button className="bg-white text-pink-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Shop Fashion
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {products
              .filter((p) => p.category === "Fashion")
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section>

      {/* Sports Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Dumbbell size={32} />
              <h2 className="text-3xl font-bold">Sports & Fitness</h2>
            </div>
            <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Get Active
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {products
              .filter((p) => p.category === "Sports")
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8">
            Get the latest deals and offers delivered to your inbox
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-l-xl text-gray-900 focus:outline-none"
            />
            <button className="bg-white text-purple-600 px-8 py-4 rounded-r-xl font-bold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default landing;
