import axiosInstance from "./axiosInstance";

export const login = (data) => {
    return axiosInstance.post("/auth/login", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};
export const signup = (data) => {
    return axiosInstance.post("/auth/signup",data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};
export const VerifyEmail = (data) => {
    return axiosInstance.post("/password/verify-email-otp", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};
export const verifyOtp = () => {
    return axiosInstance.post("/password/verify-otp", {
        headers: {
            "Content-Type": "application/json",
        },
    });
};
export const resetPassword = () => {
    return axiosInstance.post("/password/reset-password", {
        headers: {
            "Content-Type": "application/json",
        },
    });
};
export const GetSlides = () => axiosInstance.get("/slides/get");
export const ContactEmail = (data) => {
    return axiosInstance.post("/auth/email",data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};


