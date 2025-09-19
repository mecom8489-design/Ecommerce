import axiosInstance from "./axiosInstance";


export const getAdminUsers = () => {
    return axiosInstance.get("/admin/getUsers", {
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
    return axiosInstance.delete(`/product/adprodelete/${userId}`);
};//working fine


export const addCategories = (data) => {
    return axiosInstance.post("/adminCategories/addCategory",data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const getAllCategories = () => {
    return axiosInstance.get("/adminCategories/getCategories", {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const getAddedProducts = () => {
    return axiosInstance.get("/product/adgetproduct", {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const deleteCategories = (userId) => {
    return axiosInstance.delete(`/adminCategories/deleteCategory/${userId}`);
};//working fine


export const Adminproductses = (data) => {
    return axiosInstance.post("/product/add", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};  // working Fine

export const getAdminOrders = () => {
    return axiosInstance.get("/orders/getOrders", {
        headers: {
            "Content-Type": "application/json",
        },
    });
}; 

export const getAdminDashboard = () => {
    return axiosInstance.get("/dashboard/adstats", {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const getAdminRecentOrders = () => {
    return axiosInstance.get("/orders/adrecentOrders", {
        headers: {
            "Content-Type": "application/json",
        },
    });
};


