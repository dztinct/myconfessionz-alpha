import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../../images/myconfessionz.png';
import '../../css/ErrorPage.css'; // Assuming you save the CSS in this file

const ErrorPage = () => {
  return (
    <div className="bg-black h-screen flex flex-col justify-center items-center">
        <div className="w-16 h-12 lg:w-20 lg:h-20 md:w-16 md:h-16 object-cover mb-8 emoji-404 text-black">
            <img src={logo} alt="logo" className="w-full h-full" />
        </div>
        
      <div className="tracking-widest mt-4 text-center">
        <span className="text-white text-6xl block">404</span>
        <span className="text-white text-xl">
          Sorry, We couldn't find what you are looking for!
        </span>
      </div>
      <Link
        to="/"
        className="w-full md:w-auto px-6 py-2 bg-black text-white font-semibold rounded-md hover:bg-white hover:text-black transition-colors border-2 border-dotted border-gray-500 mt-8 text-center"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
