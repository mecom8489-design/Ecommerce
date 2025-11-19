import { Package } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import {
  Adminproductses,
  getAllCategories,
  getAddedProducts,
  deleteAdminProducts,
  AdminUpdateproduct,
} from "../apiroutes/adminApi";
import { toast } from "react-toastify";

export default function AdminProducts() {
  const [productAd, setProductAd] = useState([]);
  const [viewMore, setViewMore] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    rating: "",
    discount: "",
    description: "",
    category: "",
    offer: "",
    stock: "",
    image: null,
    imagePreview: null,
  });
  const [categories, setCategories] = useState([]);
  const hasFetched = useRef(false);
  const hasFetches = useRef(false);
  const [deleteProId, setDeleteProId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProductModalOpen, setisProductModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // image preview
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchCategories();
    }
  }, []);

  useEffect(() => {
    if (!hasFetches.current) {
      hasFetches.current = true;
      fetchProducts();
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      const rawData = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.categories)
        ? response.data.categories
        : [];

      const categoryNames = [
        ...new Set(rawData.map((item) => item.productCategory)),
      ];

      setCategories(categoryNames);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to fetch categories.");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getAddedProducts();

      const data = response.data.data;

      setProductAd(data.productAd || []);
      setViewMore(data.viewMore || []);
      setBestSeller(data.bestSeller || []);
      console.log(productAd);
      console.log(viewMore);
      console.log(bestSeller);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to fetch categories.");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Handle image upload
    if (name === "image" && files.length > 0) {
      setNewProduct({
        ...newProduct,
        image: files[0],
        imagePreview: URL.createObjectURL(files[0]),
      });
      return;
    }

    let newValue = value;

    // Allow only numbers for rating and discount
    if (name === "rating" || name === "discount") {
      if (!/^\d*\.?\d*$/.test(value)) return; // Block non-numeric input
    }

    // Apply limits
    if (name === "rating" && value > 5) newValue = 5;
    if (name === "discount" && value > 100) newValue = 100;

    setNewProduct({
      ...newProduct,
      [name]: newValue,
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.image ||
      !newProduct.category
    ) {
      toast.error("Please provide name, price,category and image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("rating", newProduct.rating);
    formData.append("discount", newProduct.discount);
    formData.append("description", newProduct.description);
    formData.append("category", newProduct.category);
    formData.append("offer", newProduct.offer);
    formData.append("stock", newProduct.stock);
    formData.append("image", newProduct.image);

    try {
      setLoading(true);
      const response = await Adminproductses(formData);
      setNewProduct({
        name: "",
        price: "",
        rating: "",
        discount: "",
        description: "",
        category: "",
        offer: "",
        stock: "",
        image: null,
        imagePreview: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast.success("Product added successfully ");
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add product  ");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (userId) => {
    setDeleteProId(userId);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteProduct = async () => {
    if (!deleteProId) return;

    try {
      await deleteAdminProducts(deleteProId);
      toast.success("product deleted successfully ");
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error(error?.response?.data?.message || "Failed to delete user ");
    } finally {
      setIsDeleteModalOpen(false);
      setDeleteProId(null);
    }
  };

  const handleEditClick = (product) => {
    setCurrentProduct({
      ...product,
      name: product.name || "",
      price: product.price || "",
      originalPrice: product.originalPrice || "",
      discount: product.discount || "",
      stock: product.stock || "",
      offer: product.offer,
      description: product.description || "",
      image: product.image || "",
    });
    setisProductModalOpen(true);
  };

  const handleProductInputChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "discount") {
      if (value === "") newValue = ""; // allow empty while typing
      else if (value > 100) newValue = 100; // cap at 100
      else if (value < 0) newValue = 0; // prevent negative
    }

    setCurrentProduct((prevProduct) => ({
      ...prevProduct,
      [name]: newValue,
    }));
  };

  const handleProductSave = async () => {
    try {
      // Prepare updated product object
      const updatedProduct = {
        ...currentProduct,
        price: Number(currentProduct.price) || 0,
        originalPrice: Number(currentProduct.originalPrice) || 0,
        discount: Number(currentProduct.discount) || 0,
        stock: Number(currentProduct.stock) || 0,
        description: currentProduct.description?.trim() || "",
        name: currentProduct.name?.trim() || "",
      };

      // Remove unwanted fields if your backend doesn’t accept them
      delete updatedProduct.created_at;
      delete updatedProduct.updated_at;
      // If image is a File, send as FormData
      let payload;
      if (updatedProduct.image instanceof File) {
        payload = new FormData();
        Object.keys(updatedProduct).forEach((key) => {
          payload.append(key, updatedProduct[key]);
        });
        // Include the product ID
        if (currentProduct.id) {
          payload.append("id", currentProduct.id); // If needed
        }
      } else {
        payload = {
          ...updatedProduct,
          id: currentProduct.id, // If needed
        };
      }

      // API call (replace with your function)
      const response = await AdminUpdateproduct(currentProduct.id, payload);
      toast.success(response?.data?.message);
      setisProductModalOpen(false);
      fetchProducts(); // refresh product list
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update product "
      );
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));

      // If you're also setting it to currentProduct for upload later:
      setCurrentProduct((prev) => ({
        ...prev,
        image: file, // You might need this for form submission
      }));
    }
  };

  const ProductCard = ({ product }) => (
    <div
      key={product.id}
      className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col w-72"
    >
      {product.discount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-br-xl z-10">
          Sale
        </div>
      )}

      <img
        src={
          product.image ||
          "https://via.placeholder.com/300x300.png?text=Product"
        }
        alt={product.name}
        className="w-full h-60 object-contain p-4"
      />

      <div className="p-4 flex flex-col justify-between flex-grow">
        <h3 className="text-lg font-semibold mb-1 truncate flex justify-center items-center">
          {product.name}
        </h3>

        <div className="text-base font-medium text-gray-800 flex justify-center items-center">
          Price: $ {parseInt(product.price)}
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through ml-2">
              Rs.{product.originalPrice}
            </span>
          )}
          {product.discount && (
            <span className="ml-2 text-red-500 text-sm">
              -{parseInt(product.discount)}%
            </span>
          )}
        </div>

        <div className="text-base font-medium text-red-800 flex justify-center items-center">
          Final Price:{" "}
          <span className="text-black"> ${parseInt(product.finalPrice)}</span>
        </div>

        {/* Rating */}
        <div className="text-sm flex items-center mt-1 justify-center">
          Rating:
          <span className="ml-2 flex relative">
            <div className="flex text-gray-300">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>

            <div
              className="flex text-yellow-500 absolute left-0 top-0 overflow-hidden"
              style={{ width: `${(Number(product.rating) / 5) * 100}%` }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </span>
          <span className="ml-2 text-gray-700">
            ({product.rating ? Number(product.rating).toFixed(2) : "-"})
          </span>
        </div>

        {/* Stock */}
        <p className="text-sm text-gray-600 mt-1 flex justify-center items-center">
          Stock:
          <span
            className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
              product.stock > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.stock || 0}
          </span>
        </p>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-1 truncate flex justify-center items-center">
          {product.description || "-"}
        </p>

        {/* Buttons */}
        <div className="mt-4 flex space-x-2">
          <button
            className="flex-1 bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition-colors text-sm cursor-pointer"
            onClick={() => handleEditClick(product)}
          >
            Edit
          </button>

          <button
            className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors text-sm cursor-pointer"
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <Package className="w-6 h-6 text-indigo-500 mr-2" />
          <h1 className="text-2xl font-bold">Products</h1>
        </div>
      </div>

      {/* Add Product Form */}

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Add New Product</h2>

        {/* Removed the <form> tag */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Product Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium">
              Product Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label htmlFor="price" className="mb-1 font-medium">
              Price
            </label>
            <input
              id="price"
              type="text"
              name="price"
              placeholder="Price"
              value={newProduct.price}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Rating */}
          <div className="flex flex-col">
            <label htmlFor="rating" className="mb-1 font-medium">
              Rating (0-5)
            </label>
            <input
              id="rating"
              type="text"
              name="rating"
              placeholder="Rating (0-5)"
              value={newProduct.rating}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Discount */}
          <div className="flex flex-col">
            <label htmlFor="discount" className="mb-1 font-medium">
              Discount (%)
            </label>
            <input
              id="discount"
              type="text"
              name="discount"
              placeholder="Discount (%)"
              value={newProduct.discount}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label htmlFor="category" className="mb-1 font-medium">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 cursor-pointer"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat.toLowerCase()}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Offer */}
          <div className="flex flex-col">
            <label htmlFor="offer" className="mb-1 font-medium">
              Select Offer
            </label>
            <select
              id="offer"
              name="offer"
              value={newProduct.offer}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 cursor-pointer"
            >
              <option value="">Select an Offer</option>
              <option value="productAd">Product Ad</option>
              <option value="bestSeller">BestSeller</option>
            </select>
          </div>

          {/* Stock */}
          <div className="flex flex-col">
            <label htmlFor="stock" className="mb-1 font-medium">
              Stock
            </label>
            <input
              id="stock"
              type="text"
              name="stock"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col sm:col-span-2 lg:col-span-3">
            <label htmlFor="description" className="mb-1 font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={newProduct.description}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 resize-none"
            />
          </div>

          {/* Image */}
          <div className="flex flex-col">
            <label htmlFor="image" className="mb-1 font-medium">
              Product Image
            </label>
            <input
              id="image"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              ref={fileInputRef}
              className="border p-2 rounded-lg"
            />
            {newProduct.imagePreview && (
              <img
                src={newProduct.imagePreview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleAddProduct}
            disabled={loading}
            className={`bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors col-span-full cursor-pointer ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold p-4 rounded-md bg-white text-indigo-800 border-l-4 border-indigo-500 shadow-sm">
        Product Ads
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-6 justify-items-center">
        {productAd.length > 0 ? (
          productAd.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-600 col-span-full text-center">
            No Product Ads available
          </p>
        )}
      </div>

      <h2 className="text-xl font-semibold p-4 rounded-md bg-white text-indigo-800 border-l-4 border-indigo-500 shadow-sm">
        View More
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-6 justify-items-center">
        {viewMore.length > 0 ? (
          viewMore.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-600 col-span-full text-center">
            No View More products available
          </p>
        )}
      </div>

      <h2 className="text-xl font-semibold p-4 rounded-md bg-white text-indigo-800 border-l-4 border-indigo-500 shadow-sm">
        Best Seller
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-6 justify-items-center">
        {bestSeller.length > 0 ? (
          bestSeller.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-600 col-span-full text-center">
            No Best Sellers available
          </p>
        )}
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-gray-300 rounded-lg p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-center text-red-600">
              Confirm Deletion
            </h2>
            <p className="text-center text-gray-700 mb-6">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-black bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteProduct}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isProductModalOpen && currentProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Edit Product
            </h2>

            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentProduct.name}
                  onChange={handleProductInputChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter product name"
                />
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={parseInt(currentProduct.price)}
                  onChange={handleProductInputChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter price"
                />
              </div>

              {/* Discount */}
              <div>
                <label
                  htmlFor="discount"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Discount (%)
                </label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={parseInt(currentProduct.discount) || ""}
                  onChange={handleProductInputChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter discount %"
                />
              </div>

              {/* Stock */}
              <div>
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={currentProduct.stock || ""}
                  onChange={handleProductInputChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter stock quantity"
                />
              </div>

              {/* Offer Dropdown */}
              <div className="flex flex-col">
                <label
                  htmlFor="offer"
                  className="mb-1 font-medium text-gray-700"
                >
                  Select Offer
                </label>
                <select
                  id="offer"
                  name="offer"
                  value={currentProduct.offer || ""}
                  onChange={handleProductInputChange}
                  className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="">Select an Offer</option>
                  <option value="productAd">Product Ad</option>
                  <option value="bestSeller">Best Seller</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={currentProduct.description || ""}
                  onChange={handleProductInputChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Enter product description"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageUpload}
                  className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />

                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded"
                  />
                ) : currentProduct?.image ? (
                  <img
                    src={currentProduct.image}
                    alt="Product"
                    className="mt-2 w-32 h-32 object-cover rounded"
                  />
                ) : null}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setisProductModalOpen(false)}
                className="mr-3 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleProductSave}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
