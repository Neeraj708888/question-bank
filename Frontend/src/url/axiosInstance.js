
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: "https://question-bank-backend-three.vercel.app" || import.meta.env.VITE_API_URL,
  withCredentials: true, 
});

// Automatically attach token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
(error) => {
    return Promise.reject(error); // Handling any interceptor errors
  }
);
