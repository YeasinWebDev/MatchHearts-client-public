import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Auth/ContextProvider';
import { NavLink } from 'react-router-dom';

function Navbar() {
    const { dark } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='bg-[#302F2A]'>
            <div className={`flex justify-between items-center border-2 w-full md:px-20 px-5 py-2 rounded-xl  bg-[#302F2A]`}>

                {/* left */}
                <div className='w-16 h-16 rounded-xl'>
                    <img className='w-full h-full rounded-xl' src="https://i.ibb.co/0JfPLPG/main.png" alt="" />
                </div>

                {/* right */}
                <div className={`lg:hidden ${dark ? 'text-white' : "text-black"}`} onClick={toggleMenu}>
                    <button className="text-2xl">&#9776;</button>
                </div>

                {/* Menu for large screens */}
                <div className={`hidden lg:flex ${dark ? 'bg-[#232121] text-white' : 'bg-[#F2f2f2] text-black'}`}>
                    <ul className='flex bg-[#302F2A] justify-center gap-5'>
                        <NavLink to={'/'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>Home</NavLink>
                        <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>Biodatas</NavLink>
                        <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>About Us</NavLink>
                        <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>Contact Us</NavLink>
                        <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>Login</NavLink>
                        <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>Dashboard</NavLink>
                    </ul>
                </div>

            </div>

            {/* Menu for small screens */}
            <div className={`${isOpen ? 'block transition-all' : 'hidden transition-all'} z-50  absolute transform transition-transform duration-300 ease-in-out px-8 py-5  rounded-xl lg:hidden bg-[#302F2A] border-2`}>
                <ul className='flex flex-col bg-[#302F2A]  gap-2 py-2'>
                    <NavLink to={'/'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>Home</NavLink>
                    <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>Biodatas</NavLink>
                    <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>About Us</NavLink>
                    <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>Contact Us</NavLink>
                    <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>Login</NavLink>
                    <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>Dashboard</NavLink>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;
