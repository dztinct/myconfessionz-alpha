import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom" 
import Navbar from "./components/Navbar"
import Landing from "./pages/Landing"
import Footer from "./components/Footer"
import Login from "./pages/auth/Login"
import Explore from "./pages/Explore"
import Register from "./pages/auth/Register"
// import Error from "pages/errors/Error"
import Home from "./pages/Home"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authStore"
import { useEffect } from "react"
import LoadingSpinner from "./components/LoadingSpinner"
import AnonymousLogin from "./pages/auth/AnonymousLogin"
import CounselorLogin from "./pages/auth/CounselorLogin"
import RegisterRoleChoose from "./pages/RegisterRoleChoose"
import LoginRoleChoose from "./pages/LoginRoleChoose"
import AnonymousRegister from "./pages/auth/AnonymousRegister"
import CounselorRegister from "./pages/auth/CounselorRegister"
import { useAuthStoreCounselor } from "./store/authStoreCounselor"
import AnonymousForgotPassword from "./pages/auth/AnonymousForgotPassword"
import AnonymousForgotPasswordQuestion from "./pages/auth/AnonymousForgotPasswordQuestion"
import AnonymousResetPassword from "./pages/auth/AnonymousResetPassword"
import CounselorForgotPassword from "./pages/auth/CounselorForgotPassword"
import CounselorForgotPasswordQuestion from "./pages/auth/CounselorForgotPasswordQuestion"
import CounselorResetPassword from "./pages/auth/CounselorResetPassword"
import Rooms from "./pages/Posts/Rooms"
import CreatePost from "./pages/Posts/CreatePost"
import RoomPosts from "./pages/Posts/RoomPosts"
import UserProfile from "./pages/UserProfile"
import ChangeUsername from "./pages/ChangeUsername"
import SinglePost from "./pages/Posts/SinglePost"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  const isAuthenticatedCounselor = useAuthStoreCounselor((state) => state.isAuthenticated);

  if (!isAuthenticated && !isAuthenticatedCounselor) {
    return <Navigate to="/" replace />;
  }

  return children;
};


const RedirectAuthenticated = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  const isAuthenticatedCounselor = useAuthStoreCounselor((state) => state.isAuthenticated);

  if (isAuthenticated || isAuthenticatedCounselor) {
    return <Navigate to="/home" replace />;
  }

  return children;
};


const App = () => {
  const { isCheckingAuth, checkAuthUser } = useAuthStore();
  const { isCheckingAuthCounselor, checkAuthCounselor } = useAuthStoreCounselor();

  useEffect(() => {
    checkAuthUser();
  }, [checkAuthUser]);

  useEffect(() => {
    checkAuthCounselor();
  }, [checkAuthCounselor]);

  if (isCheckingAuth || isCheckingAuthCounselor) return <LoadingSpinner />;

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <RedirectAuthenticated>
                <Landing />
              </RedirectAuthenticated>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rooms"
            element={
              <ProtectedRoute>
                <Rooms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/room/:room"
            element={
              <ProtectedRoute>
                <RoomPosts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-username"
            element={
              <ProtectedRoute>
                <ChangeUsername />
              </ProtectedRoute>
            }
          />
          <Route
            path="/single-post/:id"
            element={
              <ProtectedRoute>
                <SinglePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticated>
                <Login />
              </RedirectAuthenticated>
            }
          />
          <Route
            path="/register"
            element={
              <RedirectAuthenticated>
                <Register />
              </RedirectAuthenticated>
            }
          />
          <Route
            path="/counselor-login"
            element={
              <RedirectAuthenticated>
                <CounselorLogin />
              </RedirectAuthenticated>
            }
          />
          <Route
            path="/anonymous-login"
            element={
              <RedirectAuthenticated>
                <AnonymousLogin />
              </RedirectAuthenticated>
            }
          />
          <Route
            path="/counselor-register"
            element={
              <RedirectAuthenticated>
                <CounselorRegister />
              </RedirectAuthenticated>
            }
          />
          <Route
            path="/anonymous-register"
            element={
              <RedirectAuthenticated>
                <AnonymousRegister />
              </RedirectAuthenticated>
            }
          />
          <Route
            path="/choose-login-role"
            element={
              <RedirectAuthenticated>
                <LoginRoleChoose />
              </RedirectAuthenticated>
            }
          />
          <Route
            path="/choose-register-role"
            element={
              <RedirectAuthenticated>
                <RegisterRoleChoose />
              </RedirectAuthenticated>
            }
          />
          <Route
            path="/anonymous-forgot-password"
            element={
              <RedirectAuthenticated>
                <AnonymousForgotPassword />
              </RedirectAuthenticated>
            }
          />
          <Route
            path="/anonymous-forgot-password-question"
            element={
              <RedirectAuthenticated>
                <AnonymousForgotPasswordQuestion />
              </RedirectAuthenticated>
            }
          />
          <Route
            path="/anonymous-reset-password"
            element={
              <RedirectAuthenticated>
                <AnonymousResetPassword />
              </RedirectAuthenticated>
            }
          />
          <Route
            path="/counselor-forgot-password"
            element={
              <RedirectAuthenticated>
                <CounselorForgotPassword />
              </RedirectAuthenticated>
            }
          />
          <Route
            path="/counselor-forgot-password-question"
            element={
              <RedirectAuthenticated>
                <CounselorForgotPasswordQuestion />
              </RedirectAuthenticated>
            }
          />
          <Route
            path="/counselor-reset-password"
            element={
              <RedirectAuthenticated>
                <CounselorResetPassword />
              </RedirectAuthenticated>
            }
          />

          {/* <Route path="*" element={<Error />} /> */}
        </Routes>
        <Toaster />
        <Footer />
      </div>
    </Router>
  );
};



export default App;

