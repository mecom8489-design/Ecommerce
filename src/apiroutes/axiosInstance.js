import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "e-commerce-backend-production-6fa0.up.railway.app/api",
});

// Optional: Add interceptors for token auth
axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

