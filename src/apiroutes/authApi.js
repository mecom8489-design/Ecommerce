import axiosInstance from "./axiosInstance";

export const login = (data) => {
    return axiosInstance.post("/auth/login", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}; //working fine.

export const signup = (data) => {
    return axiosInstance.post("/auth/signup",data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}; //working fine.

export const VerifyEmail = (data) => {
    return axiosInstance.post("/auth/get-otp", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}; //working fine

export const verifyOtp = (data) => {
    return axiosInstance.post("/auth/verify-otp",data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}; //working fine

export const resetPassword = (data) => {
    return axiosInstance.post("/auth/reset-password",data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}; //working fine


export const GetSlides = () => axiosInstance.get("/slides/get");

export const ContactEmail = (data) => {
    return axiosInstance.post("/auth/email",data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};


