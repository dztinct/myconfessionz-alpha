import { create } from 'zustand';
import axios from 'axios';

const API_URL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;

// Axios Interceptor for Token Injection
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    console.log("Token in interceptor:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// app Store
export const commentStore = create((set) => ({
  isLoading: false,
  error: null,
  comment: null,

  createComment: async (comment, postId) => {
    set({ isLoading: true })
    try {
      const response = await axios.post(`${API_URL}/create-comment/${postId}`, { comment })
      const { commentData } = response.data
      // console.log(response.data)
      set({isLoading : false, comment: commentData})
      return response.data
    } catch (error) {
      set({
        error: error.response?.data?.error || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  allComments: async () => {
    console.log("response.data")
    set({ isLoading: true })
    try {
      const response = await axios.get(`${API_URL}/all-comments`)
      console.log("New comments", response.data)
      const { comments } = response.data
      set({isLoading : false, comment: comments})
      
      return response.data
    } catch (error) {
      set({
        error: error.response?.data?.error || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },
}))