import { useState } from 'react';
import { FaUser, FaSignInAlt } from 'react-icons/fa'; // Icons for Login and Register
import { FiMenu, FiX } from 'react-icons/fi'; // Hamburger and Close Icons
import logo from '../../images/myconfessionz.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore';
import { useAuthStoreCounselor } from '../../store/authStoreCounselor'; 
import { FaCommentDots } from 'react-icons/fa';
import { FaSearch } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";



const LoggedInNav = () => {

    // const [isOpen, setIsOpen] = useState(false);
  
    // Handler to close the menu when a link is clicked
    // const handleLinkClick = () => {
    //   setIsOpen(false);
    // };
  
    // log user out and redirect to login page
    const navigate = useNavigate()
    const { logoutUser, user } = useAuthStore()
    const { logoutCounselor } = useAuthStoreCounselor()
  
    const logOutUser = async () => {
      
      try {
          await logoutUser()
          setTimeout(() => window.location.href = '/', 500); // Adding a slight delay
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };  

const logOutCounselor = async () => {
      
      try {
        await logoutCounselor()
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
            <a href="/" className="text-xl font-bold flex items-center">
                <span>
                <img src={logo} alt="brand-logo" width={25} height={25} />
                </span>
                <span>Myconfessionz</span>
            </a>

            {/* Desktop Menu */}
            <div className="flex space-x-6">
                <a
                href="/"
                className="flex items-center space-x-1 hover:text-gray-200 transition duration-300"
                >
                <FaSearch size={24}/>
                <span className="text-xs mt-1">search</span>
                </a>
                <a
                href="/"
                className="flex items-center space-x-1 hover:text-gray-200 transition duration-300"
                >
                  <IoChatbubbleEllipses size={24}/>
                <span className="text-xs mt-1">Chat</span>
                </a>

                            {/* Chat */}
            {/* <a href="/user-chat" className="flex flex-col items-center cursor-pointer">
              <span className="text-xs mt-1">Chat</span>
            </a> */}
                            {/* Search */}
            {/* <a href="/user-chat" className="flex flex-col items-center cursor-pointer">
            <FaSearch size={24}/>
              <span className="text-xs mt-1">Search</span>
            </a> */}
                            {/* Chat */}
            {/* <a href="/user-chat" className="flex flex-col items-center cursor-pointer">
            <IoChatbubbleEllipses size={24}/>
              <span className="text-xs mt-1">Chat</span>
            </a> */}
                {/* <a
                href="/register"
                className="flex items-center space-x-1 hover:text-gray-200 transition duration-300"
                >
                <FaSignInAlt />
                <span onClick={user ? logOutUser : logOutCounselor}>Logout</span>
                </a> */}
            </div>

            {/* Mobile Menu Toggle Button */}
            {/* <button
                className="md:hidden flex items-center text-4xl"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                {isOpen ? <FiX /> : <FiMenu />}
            </button> */}
            </div>

            {/* Mobile Menu */}
            {/* {isOpen && ( */}
            {/* <div className="md:hidden mt-3 space-y-2 bg-red-700 p-4 rounded-lg"> */}
                {/* <a */}
                {/* href="/profile" */}
                {/* className="flex items-center space-x-2 text-white hover:bg-red-800 p-2 rounded transition duration-300" */}
                {/* onClick={handleLinkClick} // Close menu on click */}
                {/* > */}
                {/* <FaUser /> */}
                {/* <span>{user ? user.username : ""}</span> */}
                {/* </a> */}
                {/* <span
                onClick={user ? logOutUser : logOutCounselor}
                className="flex items-center space-x-2 text-white hover:bg-red-800 p-2 rounded transition duration-300"
                >
                <FaSignInAlt />
                <span>Logout</span>
                </span> */}
                {/* &nbsp;&nbsp; 💸 <span>Deposit</span> */}
                {/* <br />&nbsp;&nbsp; B <span>N12000</span> */}
                {/* <a href="/dashboard">Dashboard</a> */}
                {/* <a href="/profile">Profile</a> */}
                {/* <button onClick={logOut}>Logout</button> */}
            {/* </div> */}
            {/* )} */}
        </nav>
    </div>
)}

export default LoggedInNav