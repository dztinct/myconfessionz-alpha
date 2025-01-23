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
export const postStore = create((set) => ({
  isLoading: false,
  error: null,
  post: null,

  createPost: async (room, post) => {
    set({ isLoading: true })
    try {
      const response = await axios.post(`${API_URL}/create-post`, { room, post })
      console.log('reaches')
      set({isLoading : false})
      console.log('reaches again')
      return response.data
    } catch (error) {
      set({
        error: error.response?.data?.error || "Error while sharing confession",
        isLoading: false,
      });
      throw error;
    }
  },
  
  allPostsHome: async () => {
    console.log("response.data")
    set({ isLoading: true })
    try {
      const response = await axios.get(`${API_URL}/all-posts-home`)
      console.log(response.data)
      const { posts } = response.data
      set({isLoading : false, post: posts})
      return response.data
    } catch (error) {
      set({
        error: error.response?.data?.error || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  allPostsExplore: async () => {
    set({ isLoading: true })
    try {
      const response = await axios.get(`${API_URL}/all-posts-explore`)
      console.log(response.data)
      const { posts } = response.data
      set({isLoading : false, post: posts})
      return response.data
    } catch (error) {
      set({
        error: error.response?.data?.error || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  // requested from room posts component when a room is clicked from the rooms component
  fetchRoom: async (room) => {
    set({ isLoading: true })
    try {
      const response = await axios.get(`${API_URL}/room-posts/${room}`)
      const { posts } = response.data
      set({isLoading : false, post: posts})
      return response.data
    } catch (error) {
      set({
        error: error.response?.data?.error || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },
  
  singlePost: async (id) => {
    set({ isLoading: true })
    try {
      const response = await axios.get(`${API_URL}/single-post/${id}`)
      const { postData } = response.data
      // console.log(response.data)
      set({isLoading : false, post: postData})
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