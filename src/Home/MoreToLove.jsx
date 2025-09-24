import React, { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";

export default function MoreToLove() {
  const [visibleCount, setVisibleCount] = useState(18); // Show first 18 initially

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 6); // Show 6 more on each click
  };
  const products = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1503449377594-32dd9ac4467c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      title: "Infant Jumpsuit Summer Romper Cart...",
      price: "Rs.142.37",
      originalPrice: "Rs.1,482.78",
      discount: "-90%",
      rating: null,
      sold: null,
      saved: "Rs.40.93",
      sale: true,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      title: "Transparent Computer Glasses F...",
      price: "Rs.54.28",
      originalPrice: null,
      discount: null,
      rating: 4.7,
      sold: "95 sold",
      saved: "Rs.40.93",
      sale: true,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      title: "Original Silicone Earphone Ear C...",
      price: "Rs.159.27",
      originalPrice: null,
      discount: null,
      rating: null,
      sold: "1 sold",
      saved: "Rs.17.8",
      sale: true,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      title: "Kitchen Dish Drainer Towel Rack Perf...",
      price: "Rs.363.03",
      originalPrice: "Rs.605.05",
      discount: "-40%",
      rating: null,
      sold: null,
      saved: null,
      sale: false,
      customizable: true,
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      title: "44*19mm/44*19mm/44*11mm ...",
      price: "Rs.43.6",
      originalPrice: null,
      discount: null,
      rating: 5,
      sold: "15 sold",
      saved: "Rs.5.34",
      sale: true,
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      title: "925 Silver Needle Korean Edition Cry...",
      price: "Rs.72.07",
      originalPrice: "Rs.146.81",
      discount: "-51%",
      rating: null,
      sold: "4 sold",
      saved: null,
      sale: false,
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      title: "Top Brand Men Watch Green Lu...",
      price: "Rs.1,856.07",
      originalPrice: null,
      discount: null,
      rating: null,
      sold: "10 sold",
      saved: "Rs.15,014.05",
      sale: true,
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      title: "LED Flash Double-Row Four-Wheel R...",
      price: "Rs.5,696.56",
      originalPrice: "Rs.9,494.26",
      discount: "-40%",
      rating: null,
      sold: "5 sold",
      saved: null,
      sale: false,
      premiumQuality: true,
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      title: "2023 New Bluetooth 5.2 Wireles...",
      price: "Rs.211.97",
      originalPrice: null,
      discount: null,
      rating: null,
      sold: "1 sold",
      saved: "Rs.135.53",
      sale: true,
    },
    {
      id: 10,
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      title: "Kitchen baking tools, cream flower ba...",
      price: "Rs.1,742.17",
      originalPrice: "Rs.3,484.35",
      discount: "-50%",
      rating: null,
      sold: "1 sold",
      saved: null,
      sale: false,
    },
    {
      id: 11,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      title: "Professional Ultra-fine No. 5 Acn...",
      price: "Rs.44.68",
      originalPrice: null,
      discount: null,
      rating: 5,
      sold: "13 sold",
      saved: "Rs.12.66",
      sale: true,
    },
    {
      id: 12,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80https://www.google.com/search?q=Drone+Night+Flight+LED+Light+Lighting.+image+url&sca_esv=41c54eb164886e82&rlz=1C1CHBF_enIN1144IN1146&udm=2&biw=1920&bih=919&sxsrf=AE3TifO6hV79BLnY35g9OR6jA22LlXRslA%3A1752560379136&ei=-_J1aM-FCMKuseMP5dGG-AE&ved=0ahUKEwiP7-GWnL6OAxVCV2wGHeWoAR8Q4dUDCBE&uact=5&oq=Drone+Night+Flight+LED+Light+Lighting.+image+url&gs_lp=EgNpbWciMERyb25lIE5pZ2h0IEZsaWdodCBMRUQgTGlnaHQgTGlnaHRpbmcuIGltYWdlIHVybEjtGlCzA1iwGHABeACQAQCYAV-gAcAGqgECMTC4AQPIAQD4AQGYAgCgAgCYAwCIBgGSBwCgB8IDsgcAuAcAwgcAyAcA&sclient=img#vhid=8j5M2U4wZtCXBM&vssid=mosaic",
      title: "Drone Night Flight LED Light Lighting...",
      price: "Rs.799.02",
      originalPrice: "Rs.986.76",
      discount: "-19%",
      rating: 5,
      sold: "4 sold",
      saved: null,
      sale: false,
    },{
        id: 13,
        image:
          "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
        title: "2023 New Bluetooth 5.2 Wireles...",
        price: "Rs.211.97",
        originalPrice: null,
        discount: null,
        rating: null,
        sold: "1 sold",
        saved: "Rs.135.53",
        sale: true,
      },
      {
        id: 14,
        image:
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
        title: "Kitchen baking tools, cream flower ba...",
        price: "Rs.1,742.17",
        originalPrice: "Rs.3,484.35",
        discount: "-50%",
        rating: null,
        sold: "1 sold",
        saved: null,
        sale: false,
      },
      {
        id: 15,
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
        title: "Professional Ultra-fine No. 5 Acn...",
        price: "Rs.44.68",
        originalPrice: null,
        discount: null,
        rating: 5,
        sold: "13 sold",
        saved: "Rs.12.66",
        sale: true,
      },
      {
        id: 16,
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80https://www.google.com/search?q=Drone+Night+Flight+LED+Light+Lighting.+image+url&sca_esv=41c54eb164886e82&rlz=1C1CHBF_enIN1144IN1146&udm=2&biw=1920&bih=919&sxsrf=AE3TifO6hV79BLnY35g9OR6jA22LlXRslA%3A1752560379136&ei=-_J1aM-FCMKuseMP5dGG-AE&ved=0ahUKEwiP7-GWnL6OAxVCV2wGHeWoAR8Q4dUDCBE&uact=5&oq=Drone+Night+Flight+LED+Light+Lighting.+image+url&gs_lp=EgNpbWciMERyb25lIE5pZ2h0IEZsaWdodCBMRUQgTGlnaHQgTGlnaHRpbmcuIGltYWdlIHVybEjtGlCzA1iwGHABeACQAQCYAV-gAcAGqgECMTC4AQPIAQD4AQGYAgCgAgCYAwCIBgGSBwCgB8IDsgcAuAcAwgcAyAcA&sclient=img#vhid=8j5M2U4wZtCXBM&vssid=mosaic",
        title: "Drone Night Flight LED Light Lighting...",
        price: "Rs.799.02",
        originalPrice: "Rs.986.76",
        discount: "-19%",
        rating: 5,
        sold: "4 sold",
        saved: null,
        sale: false,
      },{
        id: 17,
        image:
          "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
        title: "2023 New Bluetooth 5.2 Wireles...",
        price: "Rs.211.97",
        originalPrice: null,
        discount: null,
        rating: null,
        sold: "1 sold",
        saved: "Rs.135.53",
        sale: true,
      },
      {
        id: 18,
        image:
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
        title: "Kitchen baking tools, cream flower ba...",
        price: "Rs.1,742.17",
        originalPrice: "Rs.3,484.35",
        discount: "-50%",
        rating: null,
        sold: "1 sold",
        saved: null,
        sale: false,
      },
      {
        id: 19,
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
        title: "Professional Ultra-fine No. 5 Acn...",
        price: "Rs.44.68",
        originalPrice: null,
        discount: null,
        rating: 5,
        sold: "13 sold",
        saved: "Rs.12.66",
        sale: true,
      },
      {
        id: 20,
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80https://www.google.com/search?q=Drone+Night+Flight+LED+Light+Lighting.+image+url&sca_esv=41c54eb164886e82&rlz=1C1CHBF_enIN1144IN1146&udm=2&biw=1920&bih=919&sxsrf=AE3TifO6hV79BLnY35g9OR6jA22LlXRslA%3A1752560379136&ei=-_J1aM-FCMKuseMP5dGG-AE&ved=0ahUKEwiP7-GWnL6OAxVCV2wGHeWoAR8Q4dUDCBE&uact=5&oq=Drone+Night+Flight+LED+Light+Lighting.+image+url&gs_lp=EgNpbWciMERyb25lIE5pZ2h0IEZsaWdodCBMRUQgTGlnaHQgTGlnaHRpbmcuIGltYWdlIHVybEjtGlCzA1iwGHABeACQAQCYAV-gAcAGqgECMTC4AQPIAQD4AQGYAgCgAgCYAwCIBgGSBwCgB8IDsgcAuAcAwgcAyAcA&sclient=img#vhid=8j5M2U4wZtCXBM&vssid=mosaic",
        title: "Drone Night Flight LED Light Lighting...",
        price: "Rs.799.02",
        originalPrice: "Rs.986.76",
        discount: "-19%",
        rating: 5,
        sold: "4 sold",
        saved: null,
        sale: false,
      },{
        id: 21,
        image:
          "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
        title: "2023 New Bluetooth 5.2 Wireles...",
        price: "Rs.211.97",
        originalPrice: null,
        discount: null,
        rating: null,
        sold: "1 sold",
        saved: "Rs.135.53",
        sale: true,
      },
      {
        id:22,
        image:
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
        title: "Kitchen baking tools, cream flower ba...",
        price: "Rs.1,742.17",
        originalPrice: "Rs.3,484.35",
        discount: "-50%",
        rating: null,
        sold: "1 sold",
        saved: null,
        sale: false,
      },
      {
        id: 23,
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
        title: "Professional Ultra-fine No. 5 Acn...",
        price: "Rs.44.68",
        originalPrice: null,
        discount: null,
        rating: 5,
        sold: "13 sold",
        saved: "Rs.12.66",
        sale: true,
      },
      {
        id: 24,
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80https://www.google.com/search?q=Drone+Night+Flight+LED+Light+Lighting.+image+url&sca_esv=41c54eb164886e82&rlz=1C1CHBF_enIN1144IN1146&udm=2&biw=1920&bih=919&sxsrf=AE3TifO6hV79BLnY35g9OR6jA22LlXRslA%3A1752560379136&ei=-_J1aM-FCMKuseMP5dGG-AE&ved=0ahUKEwiP7-GWnL6OAxVCV2wGHeWoAR8Q4dUDCBE&uact=5&oq=Drone+Night+Flight+LED+Light+Lighting.+image+url&gs_lp=EgNpbWciMERyb25lIE5pZ2h0IEZsaWdodCBMRUQgTGlnaHQgTGlnaHRpbmcuIGltYWdlIHVybEjtGlCzA1iwGHABeACQAQCYAV-gAcAGqgECMTC4AQPIAQD4AQGYAgCgAgCYAwCIBgGSBwCgB8IDsgcAuAcAwgcAyAcA&sclient=img#vhid=8j5M2U4wZtCXBM&vssid=mosaic",
        title: "Drone Night Flight LED Light Lighting...",
        price: "Rs.799.02",
        originalPrice: "Rs.986.76",
        discount: "-19%",
        rating: 5,
        sold: "4 sold",
        saved: null,
        sale: false,
      },{
        id: 25,
        image:
          "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
        title: "2023 New Bluetooth 5.2 Wireles...",
        price: "Rs.211.97",
        originalPrice: null,
        discount: null,
        rating: null,
        sold: "1 sold",
        saved: "Rs.135.53",
        sale: true,
      },
      {
        id: 26,
        image:
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
        title: "Kitchen baking tools, cream flower ba...",
        price: "Rs.1,742.17",
        originalPrice: "Rs.3,484.35",
        discount: "-50%",
        rating: null,
        sold: "1 sold",
        saved: null,
        sale: false,
      },
      {
        id: 27,
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
        title: "Professional Ultra-fine No. 5 Acn...",
        price: "Rs.44.68",
        originalPrice: null,
        discount: null,
        rating: 5,
        sold: "13 sold",
        saved: "Rs.12.66",
        sale: true,
      },
      {
        id: 28,
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80https://www.google.com/search?q=Drone+Night+Flight+LED+Light+Lighting.+image+url&sca_esv=41c54eb164886e82&rlz=1C1CHBF_enIN1144IN1146&udm=2&biw=1920&bih=919&sxsrf=AE3TifO6hV79BLnY35g9OR6jA22LlXRslA%3A1752560379136&ei=-_J1aM-FCMKuseMP5dGG-AE&ved=0ahUKEwiP7-GWnL6OAxVCV2wGHeWoAR8Q4dUDCBE&uact=5&oq=Drone+Night+Flight+LED+Light+Lighting.+image+url&gs_lp=EgNpbWciMERyb25lIE5pZ2h0IEZsaWdodCBMRUQgTGlnaHQgTGlnaHRpbmcuIGltYWdlIHVybEjtGlCzA1iwGHABeACQAQCYAV-gAcAGqgECMTC4AQPIAQD4AQGYAgCgAgCYAwCIBgGSBwCgB8IDsgcAuAcAwgcAyAcA&sclient=img#vhid=8j5M2U4wZtCXBM&vssid=mosaic",
        title: "Drone Night Flight LED Light Lighting...",
        price: "Rs.799.02",
        originalPrice: "Rs.986.76",
        discount: "-19%",
        rating: 5,
        sold: "4 sold",
        saved: null,
        sale: false,
      },
  ];
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className=" min-h-screen py-8 mt-10">
      <div className="max-w-8xl mx-auto px-20">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          More to love
        </h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden relative group"
            >
              {product.sale && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                  Sale
                </div>
              )}
              <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10">
                <ShoppingCart className="w-4 h-4 text-gray-600" />
              </div>
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm text-gray-800 mb-2 line-clamp-2 leading-tight">
                  {product.title}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-gray-900">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-sm text-red-500 font-medium">
                      {product.discount}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  {product.rating && (
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                      <span className="text-xs text-gray-600 ml-1">
                        {product.rating}
                      </span>
                    </div>
                  )}
                  {product.sold && (
                    <span className="text-xs text-gray-500">{product.sold}</span>
                  )}
                </div>
                {product.saved && (
                  <div className="text-xs text-red-500 mb-2">
                    💰 Save {product.saved}
                  </div>
                )}
                {product.customizable && (
                  <div className="text-xs text-blue-600 mb-2">Customizable</div>
                )}
                {product.premiumQuality && (
                  <div className="text-xs text-orange-600 mb-2">
                    Premium Quality
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {visibleCount < products.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleViewMore}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full shadow transition-all duration-300"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
