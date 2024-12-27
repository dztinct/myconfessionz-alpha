import { create } from 'zustand';
import axios from 'axios';

const API_URL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;

// Axios Interceptor for Token Injection
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Zustand Store
export const useActionStore = create((set) => ({
    postLikeCount: 0,
    isLiked: false,
    error: null,
    likedPost: null,
    // postIdentifier:0,
  
  toggleLike: async (postId) => {
    try {
      const response = await axios.post(`${API_URL}/user-like-post/${ postId }`);

      set({
        postLikeCount: response.data.postLikeCount,
        isLiked: response.data.isLiked,
        error: null,
        likedPost: response.data.likedPost,
        // postIdentifier: response.data.postIdentifier
      });

    //   console.log(response.data, postId);
      console.log(response.data, postId, response.data.likedPost.post.id);
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.error || "Error while post toggling like" });
      console.error("Error toggling post like:", error);
      throw error;
    }
  },
}));
