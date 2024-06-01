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
        <>
            <div className={`flex justify-between items-center border-2 w-full md:px-20 px-5 py-2 rounded-xl ${dark ? 'bg-[#232121]' : 'bg-[#F2f2f2]'}`}>

                {/* left */}
                <div className='w-16 h-16 rounded-xl'>
                    <img className='w-full h-full rounded-xl' src="https://i.ibb.co/0JfPLPG/main.png" alt="" />
                </div>

                {/* right */}
                <div className={`lg:hidden ${dark ? 'text-white' : "text-black"}`} onClick={toggleMenu}>
                    <button className="text-2xl">&#9776;</button>
                </div>

                {/* Menu for large screens */}
                <div className={`hidden lg:flex ${dark ? 'bg-[#232121] text-white' : 'bg-[#FFFFFF] text-black'}`}>
                    <ul className='flex justify-center gap-5'>
                        <NavLink to={'/'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#FF6F61] rounded-xl p-2' : 'p-2'}`}><li>Home</li></NavLink>
                        <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#FF6F61] rounded-xl p-2' : 'p-2'}`}><li>Biodatas</li></NavLink>
                        <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#FF6F61] rounded-xl p-2' : 'p-2'}`}><li>About Us</li></NavLink>
                        <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#FF6F61] rounded-xl p-2' : 'p-2'}`}><li>Contact Us</li></NavLink>
                        <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#FF6F61] rounded-xl p-2' : 'p-2'}`}><li>Login</li></NavLink>
                        <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#FF6F61] rounded-xl p-2' : 'p-2'}`}><li>Dashboard</li></NavLink>
                    </ul>
                </div>

            </div>

            {/* Menu for small screens */}
            <div className={`${isOpen ? 'block transition-all' : 'hidden transition-all'} z-50 absolute transform transition-transform duration-300 ease-in-out px-8 py-5  rounded-xl lg:hidden ${dark ? 'bg-[#232121] text-white' : 'bg-[#FFFFFF] text-black'} border-2`}>
                <ul className='flex flex-col  gap-2 py-2'>
                    <NavLink to={'/'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#FF6F61] rounded-xl p-2' : 'p-2'}`}><li>Home</li></NavLink>
                    <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#FF6F61] rounded-xl p-2' : 'p-2'}`}><li>Biodatas</li></NavLink>
                    <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#FF6F61] rounded-xl p-2' : 'p-2'}`}><li>About Us</li></NavLink>
                    <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#FF6F61] rounded-xl p-2' : 'p-2'}`}><li>Contact Us</li></NavLink>
                    <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#FF6F61] rounded-xl p-2' : 'p-2'}`}><li>Login</li></NavLink>
                    <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-[#FF6F61] rounded-xl p-2' : 'p-2'}`}><li>Dashboard</li></NavLink>
                </ul>
            </div>
        </>
    )
}

export default Navbar;
