import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Hero() {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Create refs for DOM elements
  const textRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    // Text Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
      },
    });

    tl.fromTo(
      textRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.5,
      }
    );

    // Images Animation
    gsap.fromTo(
      imageRefs.current,
      { scale: 0.2, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.3,
        delay: 0.5,
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <div className='flex items-center justify-center gap-20 my-20 flex-col lg:flex-row px-10 md:px-0 lg:px-10'>
      <div ref={textRef} className="card">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
          Find Your Perfect Match
        </h1>
        <p className="text-md md:text-lg max-w-lg mb-8 text-gray-700">
          Welcome to{' '}
          <span className='text-[#302F2A] font-bold text-xl'>MatchHearts</span>,
          where love meets destiny. Our platform is dedicated to helping you
          find your soulmate. With personalized matches and advanced search
          options, your journey to a blissful partnership begins here.
        </p>
        <Link to={'/bioDatas'}>
          <button className='bg-[#302F2A] hover:bg-[#1e1d1a] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300'>
            See All
          </button>
        </Link>
      </div>
      <div ref={imageContainerRef} className='img w-fit relative'>
        <img
          ref={(el) => (imageRefs.current[1] = el)}
          className='rounded-full xl:w-[80%] w-[60%] absolute lg:-right-5 xl:-right-28 right-0 -top-10'
          src={'/icon2.svg'}
          alt=""
        />
        <img
          ref={(el) => (imageRefs.current[0] = el)}
          className='rounded-full xl:w-[80%] w-[60%]'
          src="https://i.ibb.co/MgHggNX/marrage.jpg"
          alt=""
        />
        <img
          ref={(el) => (imageRefs.current[2] = el)}
          className='rounded-full xl:w-[80%] w-[60%] absolute lg:-left-44 2xl:-left-38 md:-left-40 -left-16 -bottom-20'
          src={'/icon1.svg'}
          alt=""
        />
      </div>
    </div>
  );
}

export default Hero;
