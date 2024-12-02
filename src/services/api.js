import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 35000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        message: 'Server is taking too long to respond. Please try again.',
      });
    }
    if (error.code === 'ERR_NETWORK') {
      return Promise.reject({
        message: 'Network error. Please check your internet connection.',
      });
    }
    return Promise.reject(error);
  }
);

export default api;
