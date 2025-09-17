import { Package } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Adminproductses, getAllCategories, getAddedProducts } from "../apiroutes/adminApi";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    rating: "",
    discount: "",
    description: "",
    category: "",
    stock: "",
    image: null,
    imagePreview: null,
  });
  const [categories, setCategories] = useState([]);
  const hasFetched = useRef(false);
  const hasFetches = useRef(false);



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
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      const rawData = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.categories)
          ? response.data.categories
          : [];

      const categoryNames = [...new Set(rawData.map(item => item.productCategory))];

      setCategories(categoryNames);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to fetch categories.");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getAddedProducts();
      const rawData = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.products)
          ? response.data.products
          : [];
      setProducts(rawData);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to fetch categories.");
    }
  };



  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setNewProduct({
        ...newProduct,
        image: files[0],
        imagePreview: URL.createObjectURL(files[0]),
      });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert("Please provide name, price, and image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("rating", newProduct.rating);
    formData.append("discount", newProduct.discount);
    formData.append("description", newProduct.description);
    formData.append("category", newProduct.category);
    formData.append("stock", newProduct.stock);
    formData.append("image", newProduct.image);

    try {
      const response = await Adminproductses(formData);

      setNewProduct({
        name: "",
        price: "",
        rating: "",
        discount: "",
        description: "",
        category: "",
        stock: "",
        image: null,
        imagePreview: null,
      });
      alert("Product added successfully ✅");
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to add product ❌");
    }
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

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
        <form
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          onSubmit={handleAddProduct}
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium">Product Name</label>
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

          <div className="flex flex-col">
            <label htmlFor="price" className="mb-1 font-medium">Price</label>
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

          <div className="flex flex-col">
            <label htmlFor="rating" className="mb-1 font-medium">Rating (0-5)</label>
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

          <div className="flex flex-col">
            <label htmlFor="discount" className="mb-1 font-medium">Discount (%)</label>
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

          <div className="flex flex-col">
            <label htmlFor="category" className="mb-1 font-medium">Category</label>
            <select
              id="category"
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat.toLowerCase()}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="stock" className="mb-1 font-medium">Stock</label>
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

          <div className="flex flex-col sm:col-span-2 lg:col-span-3">
            <label htmlFor="description" className="mb-1 font-medium">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={newProduct.description}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 resize-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="image" className="mb-1 font-medium">Product Image</label>
            <input
              id="image"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
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

          <button
            type="submit"
            className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors col-span-full"
          >
            Add Product
          </button>
        </form>
      </div>


      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between 
                 hover:shadow-xl transition-shadow 
                 sm:bg-gray-50 sm:p-5 sm:rounded-2xl 
                 md:bg-white md:p-6 
                 lg:bg-blue-50 lg:p-8"
          >
            <img
              src={
                product.image
                  ? `http://192.168.0.211:3000/uploads/${product.image}`
                  : "https://via.placeholder.com/300x300.png?text=Product"
              }
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4 
                   sm:h-56 
                   md:h-64 
                   lg:h-72"
            />

            <div>
              <h3 className="text-base font-semibold mb-2 sm:text-lg md:text-xl">{product.name}</h3>
              <p className="text-gray-600 mb-1 text-sm md:text-base">Price: {product.price}</p>
              <p className="text-gray-600 mb-1 text-sm md:text-base">
                Rating: {product.rating || "-"}
              </p>
              <p className="text-gray-600 mb-1 text-sm md:text-base">
                Discount: {product.discount || "-"}
              </p>

              <p className="text-gray-600 mb-1 text-sm md:text-base">
                Stock:{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${product.stock > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                  {product.stock || 0}
                </span>
              </p>
              <p className="text-gray-600 text-sm md:text-base">
                {product.description || "-"}
              </p>
            </div>

            <div className="mt-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <button className="flex-1 bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition-colors text-sm md:text-base">
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors text-sm md:text-base"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-center col-span-full text-gray-500 text-sm sm:text-base md:text-lg">
            No products found.
          </p>
        )}
      </div>

    </div>
  );
}
