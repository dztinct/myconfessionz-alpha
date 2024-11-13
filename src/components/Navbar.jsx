import { useState } from 'react';
import { FaUser, FaSignInAlt } from 'react-icons/fa'; // Icons for Login and Register
import { FiMenu, FiX } from 'react-icons/fi'; // Hamburger and Close Icons
import logo from '../images/myconfessionz.png';
import { Link } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import cookies from 'js-cookie'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Check if user is authenticated
  const isAuthenticated = useIsAuthenticated()

  // Handler to close the menu when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // log user out and redirect to login page
  const signOut = useSignOut()
  const navigate = useNavigate()

  const logOut = async () => {
    
    try {
        // Send request to backend to log out the user
        await axios.post('http://localhost:8000/api/logout-user', {}, { withCredentials: true });
  
        // Clear the auth cookie (adjust the name if necessary)
        cookies.remove('auth_token'); // Only if token is set in a cookie
  
        // Sign out on the frontend
        signOut();
  
        // Optionally navigate to the login page or home
        // window.location.href = '/';
        setTimeout(() => navigate('/home'), 200); // Adding a slight delay
      } catch (error) {
        console.error("Error logging out:", error);
      }
  };  


    // Handle registration form submission
    const onSubmit = async (data) => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/register-user', data);
        // withCredentials: false
        signIn({
          token: response.data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { username: data.username },
          auth: {
            type: "http"
          }
      });
      console.log(data)
      setTimeout(() => navigate('/home'), 200); // Adding a slight delay
      } catch (error) {
        console.error("Error registering user:", error);
      }
    };

  return (
    <div>
      {isAuthenticated ? (<>
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
            <span>Login</span>
          </Link>
          <Link
            to="/register"
            className="flex items-center space-x-1 hover:text-gray-200 transition duration-300"
          >
            <FaSignInAlt />
            <span>Register</span>
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
            to="/login"
            className="flex items-center space-x-2 text-white hover:bg-red-800 p-2 rounded transition duration-300"
            onClick={handleLinkClick} // Close menu on click
          >
            <FaUser />
            <span>Login</span>
          </Link>
          <Link
            to="/register"
            className="flex items-center space-x-2 text-white hover:bg-red-800 p-2 rounded transition duration-300"
            onClick={handleLinkClick} // Close menu on click
          >
            <FaSignInAlt />
            <span>Register</span>
          </Link>
        </div>
      )}
    </nav>
    </>
    ) : (
    <>
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
            to="/login"
            className="flex items-center space-x-2 text-white hover:bg-red-800 p-2 rounded transition duration-300"
            onClick={handleLinkClick} // Close menu on click
          >
            <FaUser />
            <span>Your name</span>
          </Link>
          <Link
            to="/register"
            className="flex items-center space-x-2 text-white hover:bg-red-800 p-2 rounded transition duration-300"
            onClick={handleLinkClick} // Close menu on click
          >
            <FaSignInAlt />
            <span>Logout</span>
          </Link>
          <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={logOut}>Logout</button>
        </div>
      )}
    </nav>
    </>
    )
    }
    </div>
  );
};

export default Navbar;
