import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getProductReviews } from "../apiroutes/userApi";

const ProductReviews = () => {
  const { state } = useLocation();
  const productId = state?.product.id;

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!productId) return;

    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchReviews = async () => {
      try {
        const response = await getProductReviews(productId);

        const mapped = (response.data.reviews || []).map((r) => ({
          name: r.user_name,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            r.user_name
          )}&background=random`,
          rating: r.rating,
          date: new Date(r.created_at).toLocaleDateString("en-GB"),
          comment: r.review_text,
          images: r.product_image ? [r.product_image] : [],
        }));

        setReviews(mapped);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching reviews:", error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-10 max-w-2xl text-center">
        Loading reviews...
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-10 max-w-2xl text-center">
        <p className="text-gray-600 font-medium">No reviews available.</p>
      </div>
    );
  }

  const averageRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    return {
      star,
      count,
      percentage: ((count / reviews.length) * 100).toFixed(0),
    };
  });

  const displayedReviews = showAll ? reviews : reviews.slice(0, 2); // <-- changed to 2 here

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-10 max-w-2xl">
      {/* Overall Rating */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900">
            {averageRating.toFixed(1)}/5
          </h2>

          <span className="flex relative justify-center md:justify-start mt-1">
            <div className="flex text-gray-300 text-xl">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>

            <div
              className="flex text-yellow-500 text-xl absolute left-0 top-0 overflow-hidden"
              style={{ width: `${(averageRating / 5) * 100}%` }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </span>

          <p className="text-gray-500 mt-1">{reviews.length} reviews</p>
        </div>

        <div className="flex-1">
          {ratingBreakdown.map(({ star, percentage }) => (
            <div key={star} className="flex items-center gap-3 mb-2">
              <span className="text-gray-600 w-10">{star}★</span>
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="bg-yellow-400 h-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-gray-600 w-12 text-right">
                {percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className={`space-y-6 ${showAll ? "max-h-60 overflow-y-auto" : ""}`}>
        {displayedReviews.map((r, idx) => (
          <div
            key={idx}
            className="border-b border-gray-200 pb-4 last:border-none"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={r.avatar}
                alt={r.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">{r.name}</h4>
                <p className="text-xs text-gray-500">{r.date}</p>
              </div>
            </div>

            <div className="text-sm flex items-center mt-1 mb-2">
              <span className="mr-2">Rating:</span>

              <span className="flex relative">
                <div className="flex text-gray-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <div
                  className="flex text-yellow-500 absolute left-0 top-0 overflow-hidden"
                  style={{ width: `${(Number(r.rating) / 5) * 100}%` }}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </span>

              <span className="ml-2 text-gray-700">
                ({Number(r.rating).toFixed(2)})
              </span>
            </div>

            <p className="text-gray-700 mb-3">{r.comment}</p>
          </div>
        ))}
      </div>

      {reviews.length > 2 &&
        !showAll && ( // <-- changed to 2 here
          <button
            onClick={() => setShowAll(true)}
            className="mt-6 w-full py-2 px-4 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            View all reviews
          </button>
        )}
    </div>
  );
};

export default ProductReviews;
