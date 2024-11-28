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

// Auth Store
export const useAuthStore = create((set) => ({
  token: localStorage.getItem('authCounselor_token') || null,
  counselor: JSON.parse(localStorage.getItem('counselor')) || null,
  isAuthenticated: !!localStorage.getItem('auth_token'),
  isLoading: false,
  error: null,
  isCheckingAuth: false,

  // Helper: Save user and token to localStorage and state
  setAuth: (token, user) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true, isLoading: false, error: null });
  },

  // Signup
      signupUser: async (role, username, password, password_confirmation, state, country, recovery_question, answer, gender, dob) => {
  // signup: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/register-user`, {role, username, password, password_confirmation, state, country, recovery_question, answer, gender, dob});
      const { token, user } = response.data;
      useAuthStore.getState().setAuth(token, user);
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
  loginUser: async ( username, password ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login-user`, {
        username,
        password,
      });
      const { token, user } = response.data;
      useAuthStore.getState().setAuth(token, user);
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
  checkAuthUser: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get(`${API_URL}/auth-check-user`);
      const { token, user } = response.data;
      useAuthStore.getState().setAuth(token, user);
    } catch (error) {
      set({ isAuthenticated: false });
      console.error("Error during auth check:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Logout
  logoutUser: async () => {
    set({ isLoading: true });
    try {
      await axios.get(`${API_URL}/logout-user`);
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      set({ token: null, user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));


