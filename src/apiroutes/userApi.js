import axiosInstance from "./axiosInstance";

export const Contactus = (data) => {
    return axiosInstance.post("/user/contactus",data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};