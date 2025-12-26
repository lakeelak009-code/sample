import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
export const BASE_URL = "http://127.0.0.1:8000/api";

// API Endpoints for payment flow
export const API_ENDPOINTS = {
  CREATE_ORDER: 'orders/create/',
  VERIFY_PAYMENT: 'orders/verify/',
  GET_ORDER_DETAILS: (orderId) => `orders/${orderId}/`,
  GET_ORDER_HISTORY: 'orders/history/',
};
