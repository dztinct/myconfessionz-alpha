import { create } from 'zustand';
import axios from 'axios';

const API_URL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;

// Axios Interceptor for Token Injection
axios.interceptors.request.use(
  (config) => {
    const counselor_token = localStorage.getItem('counselor_auth_token');
    if (counselor_token) {
      config.headers.Authorization = `Bearer ${counselor_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth Store
export const useAuthStoreCounselor = create((set) => ({
  counselor_token: localStorage.getItem('counselor_auth_token') || null,
  counselor: JSON.parse(localStorage.getItem('counselor')) || null,
  isAuthenticatedCounselor: !!localStorage.getItem('counselor_auth_token'),
  isLoading: false,
  error: null,
  isCheckingAuthCounselor: false,

  // Helper: Save counselor and counselor_token to localStorage and state
  setAuth: (counselor_token, counselor) => {
    localStorage.setItem('counselor_auth_token', counselor_token);
    localStorage.setItem('counselor', JSON.stringify(counselor));
    set({ counselor_token, counselor, isAuthenticated: true, isLoading: false, error: null });
  },

  // Signup
      signup: async (username, password, password_confirmation, state, country, recovery_question, answer, gender, dob, bio, email, counseling_field, realImageData, first_name, last_name) => {
    set({ isLoading: true, error: null });
    try {
        console.log(realImageData)
        const response = await axios.post(`${API_URL}/register-counselor`, {username, password, password_confirmation, state, country, recovery_question, answer, gender, dob, bio, email, counseling_field, realImageData, first_name, last_name}, {
            headers: {
            'Content-Type': 'multipart/form-data',
        }},
        );
        console.log(response.data)
        const { counselor_token, counselor } = response.data;
        useAuthStore.getState().setAuth(counselor_token, counselor);
        return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.error || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  // Login
  login: async ( email, password ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login-counselor`, {
        username,
        password,
      });
      const { counselor_token, counselor } = response.data;
      useAuthStore.getState().setAuth(counselor_token, counselor);
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.error || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  // Check Authentication
  checkAuthCounselor: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get(`${API_URL}/auth-check-counselor`);
      const { counselor_token, counselor } = response.data;
      useAuthStore.getState().setAuth(counselor_token, counselor);
    } catch (error) {
      set({ isAuthenticated: false });
      console.error("Error during auth check:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Logout
  logoutCounselor: async () => {
    set({ isLoading: true });
    try {
      await axios.get(`${API_URL}/logout-counselor`);
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      localStorage.removeItem('counselor_auth_token');
      localStorage.removeItem('counselor');
      set({ counselor_token: null, counselor: null, isAuthenticated: false, isLoading: false });
    }
  },
}));


