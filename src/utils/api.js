import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add the token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
