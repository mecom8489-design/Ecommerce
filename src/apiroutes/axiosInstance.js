import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
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

