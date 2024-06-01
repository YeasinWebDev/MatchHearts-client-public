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
        <div className='w-full border-2 border-red-800 h-full'>
            <div className={`flex justify-between items-center border-2 w-full md:px-20 px-5 py-2 ${dark ? 'bg-[#121212]' : 'bg-[#FFFFFF]'}`}>

                {/* left */}
                <div className='w-10 h-10 bg-red-800'></div>

                {/* right */}
                <div className={`lg:hidden ${dark? 'text-white' :"text-black"}`} onClick={toggleMenu}>
                    <button className="text-2xl">&#9776;</button>
                </div>

                {/* Menu for large screens */}
                <div className={`hidden lg:flex ${dark ? 'bg-[#121212] text-white' : 'bg-[#FFFFFF] text-black'}`}>
                    <ul className='flex justify-center gap-5'>
                        <NavLink to={'/'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-orange-500 rounded-xl p-2' : 'p-2'}`}><li className=''>Home</li></NavLink>
                        <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-orange-500 rounded-xl p-2' : 'p-2'}`}><li className=''>Biodatas</li></NavLink>
                        <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-orange-500 rounded-xl p-2' : 'p-2'}`}><li className=''>About Us</li></NavLink>
                        <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-orange-500 rounded-xl p-2' : 'p-2'}`}><li className=''>Contact Us</li></NavLink>
                        <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-orange-500 rounded-xl p-2' : 'p-2'}`}><li className=''>Login</li></NavLink>
                        <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-orange-500 rounded-xl p-2' : 'p-2'}`}><li className=''>Dashboard</li></NavLink>
                    </ul>
                </div>

            </div>

            {/* Menu for small screens */}
            <div className={`${isOpen ? 'block transition-all' : 'hidden transition-all'} absolute transform transition-transform duration-300 ease-in-out px-8 py-5  rounded-xl lg:hidden ${dark ? 'bg-[#121212] text-white' : 'bg-[#FFFFFF] text-black'} border-2`}>
                <ul className='flex flex-col  gap-2 py-2'>
                    <NavLink to={'/'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-orange-500 rounded-xl p-2' : 'p-2'}`}><li className=''>Home</li></NavLink>
                    <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-orange-500 rounded-xl p-2' : 'p-2'}`}><li className=''>Biodatas</li></NavLink>
                    <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-orange-500 rounded-xl p-2' : 'p-2'}`}><li className=''>About Us</li></NavLink>
                    <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-orange-500 rounded-xl p-2' : 'p-2'}`}><li className=''>Contact Us</li></NavLink>
                    <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-orange-500 rounded-xl p-2' : 'p-2'}`}><li className=''>Login</li></NavLink>
                    <NavLink to={'#'} className={({ isActive }) => `font-semibold text-lg border-b-2 cursor-pointer ${isActive ? 'bg-orange-500 rounded-xl p-2' : 'p-2'}`}><li className=''>Dashboard</li></NavLink>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;
