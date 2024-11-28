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

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
    
  }

  console.log(isAuthenticated)

  return children
};

const RedirectAuthenticatedUser = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

// //protect routes that needs authentication
// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuthStore()

//   if(!isAuthenticated){
//     return <Navigate to="/login" replace />
//   }

//   return children
// }

//redirect authenticated users to the home page
// const RedirectAuthenticatedUser = ({ children }) => {
//   const { isAuthenticated } = useAuthStore()

//   if(isAuthenticated){
//     return <Navigate to='/home' replace/>
//   }

//   return children
// }

const App = () => {
  const { isCheckingAuth, checkAuthUser } = useAuthStore()

  useEffect(() => {
    checkAuthUser()
  }, [checkAuthUser])

if(isCheckingAuth) return <LoadingSpinner/>
  return (
      <Router>
        <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<RedirectAuthenticatedUser><Landing/></RedirectAuthenticatedUser>}/>
              <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
              <Route path="/explore" element={<ProtectedRoute><Explore/></ProtectedRoute>}/>
              <Route path="/login" element={<RedirectAuthenticatedUser><Login/></RedirectAuthenticatedUser>}/>
              <Route path="/register" element={<RedirectAuthenticatedUser><Register/></RedirectAuthenticatedUser>}/>
              <Route path="*" element={<Error/>}/>
            </Routes>
            <Toaster/>
            <Footer />
        </div>
      </Router>
  )
}


export default App;

