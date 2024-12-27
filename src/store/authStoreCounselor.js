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
  isAuthenticated: !!localStorage.getItem('counselor_auth_token'),
  isLoading: false,
  error: null,
  isCheckingAuthCounselor: false,

  // Helper: Save counselor and counselor_token to localStorage and state
  setAuth: (counselor_token, counselor) => {
    localStorage.setItem('counselor_auth_token', counselor_token);
    console.log("it is here")
    localStorage.setItem('counselor', JSON.stringify(counselor));
    set({ counselor_token, counselor, isAuthenticated: true, isLoading: false, error: null });
  },

  // Signup
      signup: async (username, password, password_confirmation, state, country, recovery_question, answer, gender, dob, bio, email, counseling_field, first_name, last_name) => {
    set({ isLoading: true, error: null });
    try {
        const response = await axios.post(`${API_URL}/register-counselor`, {username, password, password_confirmation, state, country, recovery_question, answer, gender, dob, bio, email, counseling_field, first_name, last_name},
        );
        console.log(response.data)
        const { counselor_token, counselor } = response.data;
        useAuthStoreCounselor.getState().setAuth(counselor_token, counselor);
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
        email,
        password,
      });
      const { counselor_token, counselor } = response.data;
      useAuthStoreCounselor.getState().setAuth(counselor_token, counselor);
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
      useAuthStoreCounselor.getState().setAuth(counselor_token, counselor);
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

  forgotPassword: async (username) => {
    set({isLoading : true})
    try {
      const response = await axios.post(`${API_URL}/forgot-password-counselor`, {
        username
      });
      console.log("Data: ", response.data);
      const { counselor } = response.data;
      localStorage.setItem('counselor', JSON.stringify(counselor));
      set({isLoading : false})
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.error || "Error during processing",
        isLoading: false,
      });
      throw error;
    }
  },

  forgotPasswordQuestion: async (username,recovery_question, answer) => {
    set({isLoading : true})
    try {
      const response = await axios.post(`${API_URL}/forgot-password-question-counselor`, {
        username, recovery_question, answer
      });
      console.log("Data: ", response.data);
      const { token, counselor } = response.data;
      localStorage.setItem('recovery_token', token);
      console.log("Token saved to localStorage:", token);
      localStorage.setItem('counselor', JSON.stringify(counselor));
      set({isLoading : false})
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.error || "Error during processing",
        isLoading: false,
      });
      throw error;
    }
  },

  resetPassword: async (username, password, password_confirmation) => {
    set({isLoading : true})
    try {
      const authorized = localStorage.getItem('recovery_token');
      if(authorized){
      const response = await axios.post(`${API_URL}/reset-password-counselor`, {
        username, password, password_confirmation
      });
      localStorage.removeItem('auth_token');
      localStorage.removeItem('recovery_token');
      localStorage.removeItem('user');
      localStorage.removeItem('counselor_auth_token');
      localStorage.removeItem('counselor');
      set({ token: null, counselor: null, isAuthenticated: false, isLoading: false });
      }
    } catch (error) {
      set({
        error: error.response?.data?.error || "Error during processing",
        isLoading: false,
      });
      throw error;
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      localStorage.removeItem('counselor_auth_token');
      localStorage.removeItem('counselor');
      set({ token: null, counselor: null, isAuthenticated: false, isLoading: false });
    }
  }
}));


