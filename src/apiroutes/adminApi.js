import axiosInstance from "./axiosInstance";


export const getAdminUsers = () => {
    return axiosInstance.get("/auth/users", {
        headers: {
            "Content-Type": "application/json",
        },
    });
};
export const Adminproductses = (data) => {
    return axiosInstance.post("/product/add",data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};


