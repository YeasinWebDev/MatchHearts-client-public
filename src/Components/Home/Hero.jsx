import React from 'react';
import {Link} from 'react-router-dom'

function Hero() {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co/dD0cQ8q/drew-coffman-ll-Wjwo200fo-unsplash.jpg')", backgroundPosition:'center' }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Perfect Match</h1>
        <p className="text-center md:text-md max-w-lg pb-10">
          Welcome to <span className='text-orange-400 font-semibold text-lg'>MatchHearts</span>, where love meets destiny. Our platform is dedicated to helping you find your soulmate. With personalized matches and advanced search options, your journey to a blissful partnership begins here.
        </p>
        <Link to={'/bioDatas'}> <button className='bg-[#302F2A] p-3 text-lg font-semibold rounded-xl'>See All</button></Link>
      </div>
    </div>
  );
}

export default Hero;
