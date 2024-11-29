import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom" 
import Navbar from "./components/Navbar"
import Landing from "./pages/Landing"
import Footer from "./components/Footer"
import Explore from "./pages/Explore"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Error from "./pages/Errors/Error"
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

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthenticatedCounselor = useAuthStoreCounselor((state) => state.isAuthenticated);

  if (!isAuthenticated || !isAuthenticatedCounselor) {
    return <Navigate to="/" replace />;
    
  }

  console.log(isAuthenticated || isAuthenticatedCounselor)

  return children
};

const RedirectAuthenticated = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthenticatedCounselor = useAuthStoreCounselor((state) => state.isAuthenticated);

  if (isAuthenticated || isAuthenticatedCounselor) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

const App = () => {
  const { isCheckingAuth, checkAuthUser } = useAuthStore()
  const { isCheckingAuthCounselor, checkAuthCounselor } = useAuthStoreCounselor()

  useEffect(() => {
    checkAuthUser()
  }, [checkAuthUser])

  useEffect(() => {
    checkAuthCounselor()
  }, [checkAuthCounselor])

if(isCheckingAuth || isCheckingAuthCounselor) return <LoadingSpinner/>

  return (
      <Router>
        <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<RedirectAuthenticated><Landing/></RedirectAuthenticated>}/>
              <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
              <Route path="/explore" element={<ProtectedRoute><Explore/></ProtectedRoute>}/>
              <Route path="/login" element={<RedirectAuthenticated><Login/></RedirectAuthenticated>}/>
              <Route path="/register" element={<RedirectAuthenticated><Register/></RedirectAuthenticated>}/>
              <Route path="/counselor-login" element={<RedirectAuthenticated><CounselorLogin/></RedirectAuthenticated>}/>
              <Route path="/anonymous-login" element={<RedirectAuthenticated><AnonymousLogin/></RedirectAuthenticated>}/>
              <Route path="/counselor-register" element={<RedirectAuthenticated><CounselorRegister/></RedirectAuthenticated>}/>
              <Route path="/anonymous-register" element={<RedirectAuthenticated><AnonymousRegister/></RedirectAuthenticated>}/>
              <Route path="/choose-login-role" element={<RedirectAuthenticated><LoginRoleChoose/></RedirectAuthenticated>}/>
              <Route path="/choose-register-role" element={<RedirectAuthenticated><RegisterRoleChoose/></RedirectAuthenticated>}/>
              <Route path="*" element={<Error/>}/>
            </Routes>
            <Toaster/>
            <Footer />
        </div>
      </Router>
  )
}


export default App;

