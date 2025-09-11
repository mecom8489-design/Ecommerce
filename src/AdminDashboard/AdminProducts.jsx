import { Package } from "lucide-react";
import { useState } from "react";
import { Adminproductses } from "../apiroutes/adminApi";

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
      console.log("Product Added:", response.data);

      const addedProduct = {
        ...newProduct,
        id: products.length ? products[products.length - 1].id + 1 : 1,
        imagePreview: URL.createObjectURL(newProduct.image),
      };

      setProducts([...products, addedProduct]);

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
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="text"
            name="rating"
            placeholder="Rating (0-5)"
            value={newProduct.rating}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="discount"
            placeholder="Discount (%)"
            value={newProduct.discount}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full sm:col-span-2 lg:col-span-3 focus:ring-2 focus:ring-indigo-400"
          />
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Product Image</label>
            <input
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
            className="bg-white rounded-lg shadow p-4 flex flex-col justify-between hover:shadow-lg transition-shadow"
          >
            <img
              src={
                product.imagePreview ||
                "https://via.placeholder.com/300x300.png?text=Product"
              }
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <div>
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-1">Price: {product.price}</p>
              <p className="text-gray-600 mb-1">Rating: {product.rating || "-"}</p>
              <p className="text-gray-600 mb-1">Discount: {product.discount || "-"}</p>
              <p className="text-gray-600 mb-1">Category: {product.category || "-"}</p>
              <p className="text-gray-600 mb-1">
                Stock:{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    product.stock > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {product.stock || 0}
                </span>
              </p>
              <p className="text-gray-600">{product.description || "-"}</p>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition-colors">
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-center col-span-full text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}
