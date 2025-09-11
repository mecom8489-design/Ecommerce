import axiosInstance from "./axiosInstance";


export const getAdminUsers = () => {
    return axiosInstance.get("/auth/users", {
        headers: {
            "Content-Type": "application/json",
        },
    });
};
export const Adminproductses = () => {
    return axiosInstance.post("/auth/users", {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};


