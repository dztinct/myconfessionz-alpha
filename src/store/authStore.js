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

// Auth Store
export const useAuthStore = create((set) => ({
  token: localStorage.getItem('auth_token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('auth_token'),
  isLoading: false,
  error: null,
  isCheckingAuth: false,

  // Helper: Save user and token to localStorage and state
  setAuth: (token, user) => {
    localStorage.setItem('auth_token', token);
    console.log("Token saved to localStorage:", token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true, isLoading: false, error: null });
  },

  // Signup
      signup: async (username, password, password_confirmation, state, country, recovery_question, answer, gender, dob) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/register-user`, {username, password, password_confirmation, state, country, recovery_question, answer, gender, dob});
      const { token, user } = response.data;
      useAuthStore.getState().setAuth(token, user);
      return response.data;
    } catch (error) {
      set({
        // error: error.response?.data?.error || "Error signing up",
        error: error.response?.data?.error || error,
        isLoading: false,
      });
      throw error;
    }
  },

  // Login
  login: async ( username, password ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login-user`, {
        username,
        password,
      });
      console.log("Login response:", response.data);
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
      localStorage.removeItem('counselor_auth_token');
      localStorage.removeItem('counselor');
      set({ token: null, user: null, isAuthenticated: false, isLoading: false });
    }
  },

  forgotPassword: async (username) => {
    set({isLoading : true})
    try {
      const response = await axios.post(`${API_URL}/forgot-password-user`, {
        username
      });
      console.log("Data: ", response.data);
      const { user } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
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
      const response = await axios.post(`${API_URL}/forgot-password-question-user`, {
        username, recovery_question, answer
      });
      console.log("Data: ", response.data);
      const { token, user } = response.data;
      localStorage.setItem('recovery_token', token);
      console.log("Token saved to localStorage:", token);
      localStorage.setItem('user', JSON.stringify(user));
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
      const response = await axios.post(`${API_URL}/reset-password-user`, {
        username, password, password_confirmation
      });
      localStorage.removeItem('auth_token');
      localStorage.removeItem('recovery_token');
      localStorage.removeItem('user');
      localStorage.removeItem('counselor_auth_token');
      localStorage.removeItem('counselor');
      set({ token: null, user: null, isAuthenticated: false, isLoading: false });
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
      set({ token: null, user: null, isAuthenticated: false, isLoading: false });
    }
  },

  changeUsername: async ( username, password ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/change-username`, {
        username,
        password,
      });
      const { user, error } = response.data
      console.log(user, error)
      set({isLoading : false, user, error })

      return response.data
    } catch (error) {
      set({
        error: error.response?.data?.error || "Error changing username",
        isLoading: false,
      });
      throw error;
    }
  },
}));























// import { create } from 'zustand'
// import axios from 'axios'

// const API_URL = "http://localhost:8000/api"
// axios.defaults.withCredentials = true

// // Axios Interceptor for Token Injection
// axios.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('auth_token');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

// export const useAuthStore = create((set) => ({
//     token: localStorage.getItem('auth_token'), // Load token from localStorage
//     setToken: (token) => {
//       localStorage.setItem('auth_token', token); // Save token to localStorage
//       set({ token });
//     },
//     // user: JSON.parse(localStorage.getItem('user')),
//     user: localStorage.getItem('user'),
//     isAuthenticated: () => !!localStorage.getItem('auth_token'), // Check if token exists in localStorage
//     isLoading: false,
//     error: null,
//     isCheckingAuth: true,

//     signup: async (username, password, password_confirmation, state, country, recovery_question, answer, gender, dob) => {
//         set({ isLoading: true, error: null})
//         try {
//             const response = await axios.post(`${API_URL}/register-user`, {username, password, password_confirmation, state, country, recovery_question, answer, gender, dob})
//             localStorage.setItem('auth_token', response.data.token);
//             localStorage.setItem('user', JSON.stringify(response.data.user));
//             set({
//                 token: response.data.token,
//                 user: response.data.user,
//                 isLoading: false,
//                 isAuthenticated: () => true
//             })
//             return response.data
//         } catch (error) {
//             set({ error: error.response?.data?.error || "Error signing up", isLoading: false })
//             throw error
//         }
//     },
    
//     login: async (username, password) => {
//         set({ isLoading: true, error: null })

//         try {
//             const response = await axios.post(`${API_URL}/login-user`, { username, password })
//             localStorage.setItem('auth_token', response.data.token);
//             localStorage.setItem('user', JSON.stringify(response.data.user));
//             set({
//                 token: response.data.token,
//                 user: response.data.user,
//                 isLoading: false,
//                 error: null,
//                 isAuthenticated: () => true
//             });
//             return response.data
//         } catch (error) {
//             set({ error: error.response?.data?.error || "Error logging in", isLoading: false })
//             throw error
//         }
//     },

//     checkAuth: async () => {
//         set({ isCheckingAuth: true });
//         try {
//           const response = await axios.get(`${API_URL}/auth-check`, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
//             },
//           });
//           const { token, user } = response.data;
      
//           localStorage.setItem('auth_token', token);
//           localStorage.setItem('user', JSON.stringify(user));
      
//           set({
//             user,
//             token,
//             isAuthenticated: () => !!token,
//             isCheckingAuth: false,
//           });
//         } catch (error) {
//           set({ isAuthenticated: () => false, isCheckingAuth: false });
//           console.error("Error during auth check:", error);
//         }
//       },
      
      
//       logoutUser: async () => {
//           try {
//             const response = await axios.get(`${API_URL}/logout-user`);
//             localStorage.removeItem('auth_token');
//             localStorage.removeItem('user');
//             set({
//                 token: null,
//                 user: null,
//                 isAuthenticated: () => false
//             });
//             console.log(response.data.message);
//         } catch (error) {
//             set({ token: null, user: null, isAuthenticated: () => false });
//             console.error("Error during auth check:", error);
            
//         }
//       }
// }))







// // 6. Access User Info
// // Retrieve user information from localStorage for display purposes (e.g., in a Navbar).

// // javascript
// // Copy code
// // const user = JSON.parse(localStorage.getItem('user')); // Parse JSON string
// // console.log(user?.username);