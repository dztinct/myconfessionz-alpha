import { useState } from 'react';
import { FaUser, FaSignInAlt } from 'react-icons/fa'; // Icons for Login and Register
import { FiMenu, FiX } from 'react-icons/fi'; // Hamburger and Close Icons
import logo from '../../images/myconfessionz.png';
import { Link } from 'react-router-dom';
import cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuthStore } from '../../store/authStore';

const LoggedInNav = () => {

    const [isOpen, setIsOpen] = useState(false);
  
    // Handler to close the menu when a link is clicked
    const handleLinkClick = () => {
      setIsOpen(false);
    };
  
    // log user out and redirect to login page
    const navigate = useNavigate()
    const { logoutUser } = useAuthStore()
  
    const logOut = async () => {
      
      try {
        await logoutUser()
          navigate('/');
    } catch (error) {
      console.error("Error logging out:", error);
    }
};  
  
  return (
    <div>
        <nav className="fixed top-0 left-0 w-full bRed bg-bRed text-white px-4 py-5 z-10">
            <div className="container mx-auto flex justify-between items-center">
            {/* Brand Logo */}
            <Link to="/" className="text-xl font-bold flex items-center">
                <span>
                <img src={logo} alt="brand-logo" width={25} height={25} />
                </span>
                <span>Myconfessionz</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
                <Link
                to="/login"
                className="flex items-center space-x-1 hover:text-gray-200 transition duration-300"
                >
                <FaUser />
                <span>Your name</span>
                </Link>
                <Link
                to="/register"
                className="flex items-center space-x-1 hover:text-gray-200 transition duration-300"
                >
                <FaSignInAlt />
                <span onClick={logOut}>Logout</span>
                </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
                className="md:hidden flex items-center text-4xl"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                {isOpen ? <FiX /> : <FiMenu />}
            </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
            <div className="md:hidden mt-3 space-y-2 bg-red-700 p-4 rounded-lg">
                <Link
                to="/profile"
                className="flex items-center space-x-2 text-white hover:bg-red-800 p-2 rounded transition duration-300"
                onClick={handleLinkClick} // Close menu on click
                >
                <FaUser />
                <span>Profile</span>
                </Link>
                <span
                onClick={logOut}
                className="flex items-center space-x-2 text-white hover:bg-red-800 p-2 rounded transition duration-300"
                >
                <FaSignInAlt />
                <span>Logout</span>
                </span>
                {/* <Link to="/dashboard">Dashboard</Link> */}
                {/* <Link to="/profile">Profile</Link> */}
                {/* <button onClick={logOut}>Logout</button> */}
            </div>
            )}
        </nav>
    </div>
)}

export default LoggedInNav