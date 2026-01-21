import axiosInstance from "./axiosInstance";

export const Contactus = (data) => {
  return axiosInstance.post("/user/contactus", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const orderplace = (data) => {
  return axiosInstance.post("/ordered/create", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getorderplace = (id) => axiosInstance.get(`/ordered/${id}`);

export const addressUpdate = async (userData) => {
  return axiosInstance.put(`/admin/updateUsers/${userData.id}`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}; //working fine

export const cancelUserOrder = async (orderId, reason) => {
  return axiosInstance.put(`/ordered/cancel/${orderId}`, reason, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const addReview = (reviewData) => {
  return axiosInstance.post("/review/add", reviewData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const liveSearchProducts = (query) => {
  return axiosInstance.get(`/search/live-search`, {
    params: { query },
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getProductReviews = (productId) => {
  return axiosInstance.get(`/review/reviews/${productId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const profileData = (id) => axiosInstance.get(`/admin/getUser/${id}`);

export const profileUpdate = async (id, data) => {
  return axiosInstance.put(`/admin/updateUsers/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createRazorpayOrder = (data) => {
  return axiosInstance.post("/RazorpayOrderRoute/RazorpayOrderRoute", data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const verifyRazorpayPayment = (data) => {
  return axiosInstance.post("/RazorpayOrderRoute/verifypayment", data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const addWishlistToDB = (userId, product) => {
  return axiosInstance.post(`/wishlist/addtowishlist/${userId}`, {
    product,
  });
};

export const syncWishlistToDB = (userId, products) => {
  return axiosInstance.post(`/wishlist/sync/${userId}`, {
    products,
  });
};

export const getWishlistFromDB = (userId) => {
  return axiosInstance.get(`/wishlist/getwishlist/${userId}`);
};

export const deleteWishlist = (userId, productId) => {
  return axiosInstance.delete(
    `/wishlist/wishlistdelete/${userId}/${productId}`,
  );
};

export const syncCartToDB = (userId, products) => {
  return axiosInstance.post(`/addtocart/sync/${userId}`, {
    products,
  });
};

export const addCartToDB = (userId, product) => {
  return axiosInstance.post(`/addtocart/${userId}`, {
    product,
  });
};

export const getCartFromDB = (userId) => {
  return axiosInstance.get(`/addtocart/${userId}`);
};

export const deleteCart = (userId, productId) => {
  return axiosInstance.delete(`/addtocart/${userId}/${productId}`);
};

// Email verification endpoints
export const sendEmailVerificationCode = (email) => {
  return axiosInstance.post(
    "/user/send-email-verification",
    { email },
    {
      headers: { "Content-Type": "application/json" },
    },
  );
};

export const verifyEmailCode = (email, code) => {
  return axiosInstance.post(
    "/user/verify-email-code",
    { email, code },
    {
      headers: { "Content-Type": "application/json" },
    },
  );
};
