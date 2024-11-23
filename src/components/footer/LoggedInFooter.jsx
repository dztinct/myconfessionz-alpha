import { FaHome, FaCompass, FaUsers, FaCommentDots, FaUser, FaComments } from 'react-icons/fa';
import { FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom'

const LoggedInFooter = () => {
  return (
    <div>
        <nav className="fixed bottom-0 w-full bg-bRed text-white py-2 px-2">
          <div className="container mx-auto flex justify-between items-center">
            {/* Home */}
            <Link to="/" className="flex flex-col items-center cursor-pointer">
              <FaHome size={24} />
              <span className="text-xs mt-1">Home</span>
            </Link>

            {/* Explore */}
            <div className="flex flex-col items-center cursor-pointer">
              <FaCompass size={24} />
              <span className="text-xs mt-1">Explore</span>
            </div>

            {/* Rooms */}
            <div className="flex flex-col items-center cursor-pointer">
              <FaUsers size={24} />
              <span className="text-xs mt-1">Rooms</span>
            </div>

            {/* Confess - Center Button */}
            <div className="flex flex-col items-center cursor-pointer">
              <FiPlusCircle size={30} className="text-400 animate-zoom" />
              <span className="text-xs mt-1">Confess</span>
            </div>

            {/* Chat */}
            <div className="flex flex-col items-center cursor-pointer">
              <FaCommentDots size={24} />
              <span className="text-xs mt-1">Chat</span>
            </div>

            {/* Profile */}
            <div className="flex flex-col items-center cursor-pointer">
              <FaUser size={24} />
              <span className="text-xs mt-1">Profile</span>
            </div>

            {/* Counselors */}
            <div className="flex flex-col items-center cursor-pointer">
              <FaComments size={24} />
              <span className="text-xs mt-1">Counselors</span>
            </div>
          </div>
        </nav>
    </div>
  )
}

export default LoggedInFooter
