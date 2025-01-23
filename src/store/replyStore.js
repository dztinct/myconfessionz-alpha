import { create } from 'zustand';
import axios from 'axios';

const API_URL = "https://myconfessionz.coinancewealth.com/api";
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
export const replyStore = create((set) => ({
  isLoadingReply: false,
  errorReply: null,
  reply: null,

  createReply: async (reply, postId, commentId) => {
    set({ isLoadingReply: true })
    try {
      const response = await axios.post(`${API_URL}/create-reply/${postId}/${commentId}`, { reply })
      const { replyData } = response.data
      set({isLoadingReply : false, reply: replyData})
      return response.data
    } catch (error) {
      set({
        errorReply: error.response?.data?.error || "Error logging in",
        isLoadingReply: false,
      });
      throw error;
    }
  },

  allReplies: async () => {
    console.log("response.data")
    set({ isLoadingReply: true })
    try {
      const response = await axios.get(`${API_URL}/all-replies`)
      console.log("New replies", response.data)
      const { replies } = response.data
      set({isLoadingReply : false, reply: replies})

      return response.data
    } catch (error) {
      set({
        errorReply: error.response?.data?.error || "Error logging in",
        isLoadingReply: false,
      });
      throw error;
    }
  },
}))