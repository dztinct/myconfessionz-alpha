import { BrowserRouter as Router, Routes, Route } from "react-router-dom" 
import Navbar from "./components/Navbar"
import Landing from "./pages/Landing"
import Footer from "./components/Footer"
import Explore from "./pages/Explore"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Error from "./pages/Errors/Error"
import Home from "./pages/Home"

const App = () => {

  return (
      <Router>
        <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing/>}/>
              <Route path="/home" element={ <Home/>}/>
              <Route path="/explore" element={<Explore/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="*" element={<Error/>}/>
            </Routes>
            <Footer />
        </div>
      </Router>
  )
}


export default App;

