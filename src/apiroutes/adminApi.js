import axiosInstance from "./axiosInstance";


export const getAdminUsers = () => {
    return axiosInstance.get("/admin/getallUsers", {
        headers: {
            "Content-Type": "application/json",
        },
    });
};  //working fine

export const updateAdminUser = async (userData) => {
    return axiosInstance.put(`/admin/updateUsers/${userData.id}`, userData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};//working fine

export const deleteAdminUser = (userId) => {
    return axiosInstance.delete(`/admin/deleteUsers/${userId}`);
};//working fine

export const deleteAdminProducts = (userId) => {
    return axiosInstance.delete(`/admin/products/delete/${userId}`);
};//working fine


export const addCategories = (data) => {
    return axiosInstance.post("/admin/addCategory",data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const getAllCategories = () => {
    return axiosInstance.get("/admin/getAllCategory", {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const getAddedProducts = () => {
    return axiosInstance.get("admin/products/getall", {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const deleteCategories = (userId) => {
    return axiosInstance.delete(`/admin/deleteCategory/${userId}`);
};//working fine


export const Adminproductses = (data) => {
    return axiosInstance.post("/admin/products/add", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};  // working Fine

export const getAdminOrders = () => {
    return axiosInstance.get("/admin/getAllOrders", {
        headers: {
            "Content-Type": "application/json",
        },
    });
}; 

export const getAdminDashboard = () => {
    return axiosInstance.get("/admin/adminsts", {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const getAdminRecentOrders = () => {
    return axiosInstance.get("/admin/recentOrders", {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const AdminUpdateproduct = (productId,data) => {
    return axiosInstance.put(`/admin/products/update/${productId}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}; 

export const getSupportDatas = () => {
    return axiosInstance.get("/admin/getSupportDatas", {
        headers: {
            "Content-Type": "application/json",
        },
    });
}; 

export const deletesupportDatas = (enquiryId) => {
    return axiosInstance.delete(`/admin/removeSupportDatas/${enquiryId}`);
};//working fine

