import React from 'react'
import logo from '../images/myconfessionz.png'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { text: `"I've had 5 abortions for my husband's dad!, my husband is not aware, now I'm carrying another baby and it's still not my husband's"`, author: "anonymous32210" },
        { text: "Share your dark confessions anonymously!" },
        { text: `"I like to be beaten in a relationship, if you don't beat me, I believe you don't love me, am I not normal?"`, author: "anonymous52126" },
        { text: "Share your dark confessions anonymously!" },
        { text: `"I already lost my womb to one of my abortions in the university. I've been married for close to 7 years now and I don't have a child and my husband does not know why"`, author: "anonymous225379" },
        { text: "Explore divers pool of dark and deep confessions!" },
        { text: `"Had a one-night stand with this guy, now I've been diagnosed with a disease only found in dead bodies, later asked where he works, turns out to be a morgue! I feel so disgusted!"`, author: "anonymous5573698" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // 5 seconds per slide
        return () => clearInterval(interval);
    }, [slides.length]);

  return (
    <div className='bg-black text-white text-center h-screen pt-24'>
    <div className="w-16 h-12 lg:w-20 lg:h-20 md:w-16 md:h-16 object-cover mt-5 mx-auto">
        <img src={logo} alt="logo" className="w-full h-full" />
    </div>
        <h1 className=" text-5xl py-8">Welcome to <span className="text-bRed">MyConfessionz</span></h1>
        <div className="flex justify-center">
</div>

<div className="flex justify-center items-center text-white h-40">
            <div className="text-center w-11/12 lg:w-2/3 p-6 rounded-lg">
                <div className="carousel-inner transition duration-700 ease-in-out">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`${
                                index === currentSlide ? "block" : "hidden"
                            }`}>
                            <h4 className="mb-4 md:w-[60%] mx-auto">{slide.text}</h4>
                            {slide.author && (
                                <p className="italic">- {slide.author} -</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>


        </div>

            <div className="flex gap-4 justify-center mt-5 mx-8">
  <Link to="/anonymous-login" className="w-full md:w-auto px-6 py-2 bg-white text-black font-semibold rounded-md hover:bg-black hover:text-white hover:border-2 transition-colors mr-2">
    Anonymous Login
  </Link>
  <Link to="/counselor-login" className="w-full md:w-auto px-6 py-2 bg-black text-white font-semibold rounded-md hover:bg-white hover:text-black transition-colors border-2 border-dotted border-gray-500 ml-2">
    Counselor Login
  </Link>
</div>
   
    </div>
  )
}

export default Home
