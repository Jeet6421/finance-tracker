// services/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Define public endpoints that do not require authentication
const AUTH_PREFIX = "/api/v1/auth";
const PUBLIC_ENDPOINTS = [
  `${AUTH_PREFIX}/register`,
  `${AUTH_PREFIX}/login`,
  `${AUTH_PREFIX}/confirm_email`,
  `${AUTH_PREFIX}/password-reset`,
];

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    
  },
  // withCredentials: true, // Uncomment if using cookies for session management
});

// Normalize paths to improve public endpoint detection
const normalizePath = (url) => {
  try {
    return new URL(url, API_URL).pathname; // Avoid additional replacing unless necessary
  } catch (err) {
    console.warn("Invalid URL passed to normalizePath:", url);
    return url;
  }
};

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    const requestPath = normalizePath(config.url);

    const isPublic = PUBLIC_ENDPOINTS.some(
      (publicPath) => normalizePath(publicPath) === requestPath
    );

    if (!isPublic && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    switch (status) {
      case 401:
        console.warn("401 Unauthorized - Token may be missing or expired.");
        break;
      case 403:
        console.error("403 Forbidden - You do not have access.");
        break;
      case 404:
        console.error("404 Not Found - The resource does not exist.");
        break;
      case 500:
        console.error("500 Internal Server Error.");
        break;
      default:
        console.error(`Error ${status}:`, error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
