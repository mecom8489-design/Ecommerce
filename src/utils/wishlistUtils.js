// wishlistUtils.js
export const getWishlist = () => {
  const saved = localStorage.getItem("wishlist");
  return saved ? JSON.parse(saved) : [];
};

export const addToWishlist = (product) => {
  const wishlist = getWishlist();

  const alreadyExists = wishlist.some((item) => item.id === product.id);
  if (!alreadyExists) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
  return wishlist;
};

export const removeFromWishlist = (id) => {
  const wishlist = getWishlist().filter((item) => item.id !== id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};
