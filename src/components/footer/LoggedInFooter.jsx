import { FaHome, FaCompass, FaUsers, FaCommentDots, FaUser, FaComments } from 'react-icons/fa';
import { FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom'

const LoggedInFooter = () => {
  return (
    <div>
        <nav className="fixed bottom-0 w-full bg-bRed text-white py-2 px-4">
          <div className="container mx-auto flex justify-between items-center">
            {/* Home */}
            <a href="/" className="flex flex-col items-center cursor-pointer">
              <FaHome size={24} />
              <span className="text-xs mt-1">Home</span>
            </a>

            {/* Explore */}
            <a href="/explore" className="flex flex-col items-center cursor-pointer">
              <FaCompass size={24} />
              <span className="text-xs mt-1">Explore</span>
            </a>

            {/* Rooms */}
            <a href="/rooms" className="flex flex-col items-center cursor-pointer">
              <FaUsers size={24} />
              <span className="text-xs mt-1">Rooms</span>
            </a>

            {/* Confess - Center Button */}
            <a href="/create-post" className="flex flex-col items-center cursor-pointer">
              <FiPlusCircle size={30} className="text-400 animate-zoom" />
              <span className="text-xs mt-1">Confess</span>
            </a>

            {/* Chat */}
            <a href="/user-chat" className="flex flex-col items-center cursor-pointer">
              <FaCommentDots size={24} />
              <span className="text-xs mt-1">Chat</span>
            </a>

            {/* Profile */}
            <a href="/user-profile" className="flex flex-col items-center cursor-pointer">
              <FaUser size={24} />
              <span className="text-xs mt-1">Profile</span>
            </a>

            {/* Counselors */}
            <a href="" className="flex flex-col items-center cursor-pointer">
              <FaComments size={24} />
              <span className="text-xs mt-1">Counselors</span>
            </a>
          </div>
        </nav>
    </div>
  )
}

export default LoggedInFooter
