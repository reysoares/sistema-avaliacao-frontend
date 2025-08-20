// src/api/apiPrivate.js
import axios from "axios";
import authService from "../services/authService";

const apiPrivate = axios.create({
  baseURL: "http://localhost:8080/api",
});

apiPrivate.interceptors.request.use(
  (config) => {
    const user = authService.getCurrentUser();
    if (user && user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiPrivate;