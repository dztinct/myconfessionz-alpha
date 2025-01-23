import { create } from 'zustand';
import axios from 'axios';

const API_URL = "https://myconfessionz.coinancewealth.com/api";
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
  
    postLikeCount: {}, // Store like counts by post ID
    likePost: async (postId) => {
      try {
        const response = await axios.post(`/api/user-like-post/${postId}`);
        set((state) => ({
          postLikeCount: {
            ...state.postLikeCount,
            [postId]: response.data.likeCount,
          },
        }));
        return response.data;
      } catch (error) {
        console.error("Error liking post:", error);
        throw error;
      }
    },
  toggleLike: async (postId) => {
    try {
      const response = await axios.post(`${API_URL}/user-like-post/${ postId }`);

      set({
        postLikeCount: response.data.postLikeCount,
        isLiked: response.data.isLiked,
        error: null,
        likedPost: response.data.likedPost,
      });

      console.log(response.data, postId, response.data.likedPost.post.id);
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.error || "Error while post toggling like" });
      console.error("Error toggling post like:", error);
      throw error;
    }
  },
}));
