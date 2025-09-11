import React, { useState } from "react";

const initialCategories = [
  {
    id: 1,
    fkProductId: 1,
    productSubCategory: "Mobile Phones",
    description: "This sub category will hold mobile phones",
    updatedBy: "System Admin",
    lastUpdatedDate: "2016-04-10 02:11:42.913",
    isActive: 1,
  },
  {
    id: 2,
    fkProductId: 1,
    productSubCategory: "Laptops",
    description: "This sub category will hold Laptops",
    updatedBy: "System Admin",
    lastUpdatedDate: "2016-04-10 02:11:42.913",
    isActive: 1,
  },
];

const AdminCategories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [showForm, setShowForm] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategoryClick = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setNewCategory("");
  };

  const handleSubmit = () => {
    if (!newCategory.trim()) return;

    const newEntry = {
      id: categories.length + 1,
      fkProductId: 0,
      productSubCategory: newCategory,
      description: `This sub category will hold ${newCategory}`,
      updatedBy: "System Admin",
      lastUpdatedDate: new Date().toISOString(),
      isActive: 1,
    };

    setCategories([newEntry, ...categories]);
    setNewCategory("");
    setShowForm(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Admin Categories</h1>
        {!showForm && (
          <button
            onClick={handleAddCategoryClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow"
          >
            + Add Category
          </button>
        )}
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="mb-4 bg-white p-4 rounded shadow flex flex-col sm:flex-row gap-3 items-center">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter category name"
            className="w-full sm:w-auto px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
            >
              Submit
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">FK Product ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Product Sub Category</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Description</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Updated By</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Last Updated</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category, index) => (
              <tr
                key={category.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}
              >
                <td className="px-4 py-3 text-sm text-gray-700">{category.id}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{category.fkProductId}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{category.productSubCategory}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{category.description}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{category.updatedBy}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{category.lastUpdatedDate}</td>
                <td className="px-4 py-3 text-center">
                  {category.isActive ? (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                      Inactive
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategories;
