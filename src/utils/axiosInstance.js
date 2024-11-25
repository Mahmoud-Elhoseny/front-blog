import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://back-blog-2-gdeh.onrender.com',
});
axiosInstance.interceptors.request.use((config) => {
  if (config.url?.startsWith('http://')) {
    config.url = config.url.replace('http://', 'https://');
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data && typeof response.data === 'object') {
      const convertUrlsToHttps = (obj) => {
        for (let key in obj) {
          if (typeof obj[key] === 'string' && obj[key].startsWith('http://')) {
            obj[key] = obj[key].replace('http://', 'https://');
          } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            convertUrlsToHttps(obj[key]);
          }
        }
      };
      convertUrlsToHttps(response.data);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
