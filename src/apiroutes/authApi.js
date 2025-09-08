import axiosInstance from "./axiosInstance";

export const login = (data) => axiosInstance.post("/auth/login", data);
export const signup = (data) => axiosInstance.post("/auth/signup", data);
export const VerifyEmail = (data) =>
  axiosInstance.post("/password/verify-email-otp", data);
export const verifyOtp = (data) =>
  axiosInstance.post("/password/verify-otp", data);
export const resetPassword = (data) =>
  axiosInstance.post("/password/reset-password", data);
export const GetSlides = () =>
  axiosInstance.get("/slides/get");
export const ContactEmail = () =>
  axiosInstance.get("/contact/email");
