import React, { useState, useEffect, useRef } from "react";
import { addCategories, getAllCategories, deleteCategories } from "../apiroutes/adminApi";
import { Trash2 } from "lucide-react";
import { toast } from 'react-toastify';


const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Delete modal state
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const hasFetched = useRef(false); // prevents double fetch on mount

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchCategories();
    }
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getAllCategories();
      const data = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.categories)
        ? response.data.categories
        : [];

      setCategories(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategoryClick = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setNewCategory("");
    setError("");
  };

  const handleSubmit = async () => {
    if (!newCategory.trim()) return;

    const newEntry = {
      productCategory: newCategory.trim(),
    };

    try {
      await addCategories(newEntry);
      setShowForm(false);
      setNewCategory("");
      setError("");
      fetchCategories();
      toast.success("Category added successfully ");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add category.");
    }
  };

  const handleDeleteClick = (categoryId) => {
    setDeleteCategoryId(categoryId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteCategoryId) return;

    try {
      await deleteCategories(deleteCategoryId);
      toast.success("Category deleted successfully ");
      setIsDeleteModalOpen(false);
      setDeleteCategoryId(null);
      fetchCategories();
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error(error?.response?.data?.message || "Failed to delete category ");
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeleteCategoryId(null);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Admin Categories
        </h1>
        {!showForm && (
          <button
            onClick={handleAddCategoryClick}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow cursor-pointer"
          >
            + Add Category
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && <div className="mb-4 text-red-600">{error}</div>}

      {/* Add Category Form */}
      {showForm && (
        <div className="mb-4 bg-white p-4 rounded shadow flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter category name"
            className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={!newCategory.trim()}
              className={`px-4 py-2 rounded shadow text-white cursor-pointer ${
                !newCategory.trim()
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Submit
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="text-gray-600">Loading categories...</div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="sm:hidden space-y-4">
            {categories.map((category, index) => (
              <div
                key={category.id || index}
                className="bg-white p-4 rounded shadow space-y-2"
              >
                <div>
                  <strong>ID:</strong> {category.id}
                </div>
                <div>
                  <strong>Product Category:</strong> {category.productCategory}
                </div>
                <div>
                  <strong>Updated By:</strong> {category.updatedBy}
                </div>
                <div>
                  <strong>Last Updated:</strong>{" "}
                  {new Date(category.lastUpdatedDate || category.lastUpdated).toLocaleString()}
                </div>
                <div>
                  <strong>Status:</strong>{" "}
                  {category.isActive ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Inactive</span>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteClick(category.id)}
                  className="flex items-center text-red-500 hover:text-red-700 mt-2 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            ))}
          </div>

          {/* Table View for larger screens */}
          <div className="hidden sm:block overflow-x-auto shadow rounded-lg mt-4">
            <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
              <thead className="bg-indigo-500 text-white uppercase text-sm tracking-wider">
                <tr>
                  <th className="px-4 py-3 text-center font-medium">Sl.no</th>
                  <th className="px-4 py-3 text-center font-medium">Category ID</th>
                  <th className="px-4 py-3 text-center font-medium">Product Category</th>
                  <th className="px-4 py-3 text-center font-medium">Updated By</th>
                  <th className="px-4 py-3 text-center font-medium">Last Updated</th>
                  <th className="px-4 py-3 text-center font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm font-medium">
                {categories.map((category, index) => (
                  <tr
                    key={category.id || index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-200"}
                  >
                    <td className="px-4 py-3 text-center">{index + 1}</td>
                    <td className="px-4 py-3 text-center">{category.id}</td>
                    <td className="px-4 py-3 text-center">{category.productCategory}</td>
                    <td className="px-4 py-3 text-center capitalize">{category.updatedBy}</td>
                    <td className="px-4 py-3 text-center">
                      {new Date(category.lastUpdatedDate ?? category.lastUpdated).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "2-digit", day: "2-digit" }
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        className="flex justify-center items-center mx-auto text-red-500 hover:text-red-700 font-medium cursor-pointer"
                        onClick={() => handleDeleteClick(category.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50  z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this category?</p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={handleCancelDelete}
                className="mr-3 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
