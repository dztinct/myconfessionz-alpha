import { BrowserRouter as Router, Routes, Route } from "react-router-dom" 
import Navbar from "./components/Navbar"
import Landing from "./pages/Landing"
import Footer from "./components/Footer"
import Explore from "./pages/Explore"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Error from "./pages/Errors/Error"
import Home from "./pages/Home"
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore'; 

const App = () => {
  
  const store = createStore({
    authName:'_auth',
    authType:'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'http'
   })

  return (
    <AuthProvider store={store}>
      <Router>
        <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing/>}/>
              {/* <Route path="/home" element={ <RequireAuth loginPath="/login"><Home/></RequireAuth> }/> */}
              <Route path="/home" element={ <Home/>}/>
              <Route path="/explore" element={<Explore/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="*" element={<Error/>}/>
            </Routes>
            <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}


export default App;

