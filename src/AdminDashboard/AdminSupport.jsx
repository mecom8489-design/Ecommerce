import React, { useState, useRef, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { Ticket } from "lucide-react";
import { getSupportDatas,deletesupportDatas } from "../apiroutes/adminApi";

const SupportPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [modalStatus, setModalStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


   // Delete modal state
   const [deleteEnquiryId, setDeleteEnquiryId] = useState(null);
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchEnquiries();


    }
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await getSupportDatas();
      const usersArray = Array.isArray(response.data)
        ? response.data
        : response.data.supports || [];
      setEnquiries(usersArray);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch enquiries ❌");
    } finally {
      setLoading(false);
    }
  };

 
  const handleDelete = (enquiryId) => {
    console.log(enquiryId);
    setDeleteEnquiryId(enquiryId);
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeleteEnquiryId(null);
  };

  const handleConfirmDelete = async () => {
    console.log(deleteEnquiryId);
    if (!deleteEnquiryId) return;

    try {
      await deletesupportDatas(deleteEnquiryId);
      alert("support Data deleted successfully ✅");
      fetchEnquiries();
      setIsDeleteModalOpen(false);
      setDeleteEnquiryId(null);
    } catch (error) {
      console.error("Delete Error:", error);
      alert(error?.response?.data?.message || "Failed to delete Support Data ❌");
    }
  };

  const handleView = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setModalStatus(enquiry.status || 'Pending');
    setIsModalOpen(true);
  };

  // Save status from modal
  const handleSubmit = () => {
    if (selectedEnquiry) {
      const updated = enquiries.map((entry) =>
        entry.id === selectedEnquiry.id ? { ...entry, status: modalStatus } : entry
      );
      setEnquiries(updated);
      setSelectedEnquiry((prev) => ({ ...prev, status: modalStatus }));
      setIsModalOpen(false);

      // TODO: Call API to save status change if needed
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex items-center gap-2 mb-6">
        <Ticket className="w-7 h-7 text-indigo-500" />
        <h1 className="text-3xl font-bold text-indigo-700">Support Enquiries</h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-gray-200">
        {loading ? (
          <p className="p-6 text-gray-500">Loading enquiries...</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-600 text-white text-sm uppercase">
              <tr>
                <th className="px-6 py-4 text-center font-medium">Sl.no</th>
                <th className="px-6 py-4 text-center font-medium">Customer Name</th>
                <th className="px-6 py-4 text-center font-medium">Email</th>
                <th className="px-6 py-4 text-center font-medium">Phone</th>
                <th className="px-6 py-4 text-center font-medium">Message</th>
                <th className="px-6 py-4 text-center font-medium">Status</th> {/* New status column */}
                <th className="px-6 py-4 text-center font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-700">
              {enquiries.length > 0 ? (
                enquiries.map((entry, index) => (
                  <tr
                    key={entry.id || entry.enquiryId || index}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-6 py-4 font-semibold text-center">{index + 1}</td>
                    <td className="px-6 py-4 text-center">{entry.customerName}</td>
                    <td className="px-6 py-4 text-center">{entry.email}</td>
                    <td className="px-6 py-4 text-center">{entry.mobile}</td>
                    <td className="px-6 py-4 line-clamp-2 text-center">{entry.message}</td>
                    <td className="px-6 py-4 text-center">
                      {/* Display status as badge */}
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full
                          ${
                            entry.status === 'Resolved'
                              ? 'bg-green-100 text-green-800'
                              : entry.status === 'InProgress'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-200 text-gray-800'
                          }
                        `}
                      >
                        {entry.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleView(entry)}
                          className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(entry.enquiryId)}
                          className="text-red-600 hover:text-red-800 flex items-center cursor-pointer gap-1 transition"
                        >
                          <TrashIcon className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-6 text-center text-gray-400">
                    No enquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Popup */}
      {isModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 md:p-8 transition-all">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white cursor-pointer bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold shadow-md transition"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Modal Title */}
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Enquiry Details</h2>

            {/* Enquiry Info */}
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <span className="font-semibold text-gray-900">Enquiry ID:</span> {selectedEnquiry.enquiryId}
              </div>
              <div>
                <span className="font-semibold text-gray-900">Customer Name:</span> {selectedEnquiry.customerName}
              </div>
              <div>
                <span className="font-semibold text-gray-900">Email:</span> {selectedEnquiry.email}
              </div>
              <div>
                <span className="font-semibold text-gray-900">Phone:</span> {selectedEnquiry.mobile}
              </div>
              <div>
                <span className="font-semibold text-gray-900">Status:</span>
                <select
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value)}
                  className="mt-1 px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Message:</span>
                <p className="mt-2 text-gray-600 border rounded-md p-4 bg-gray-50 whitespace-pre-line">
                  {selectedEnquiry.message}
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-md shadow-md transition"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

       {/* Delete Confirmation Modal */}
       {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50  z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this support data?</p>
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

export default SupportPage;
