import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Auth/ContextProvider';
import { Link, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import useRole from '../../Hooks/useRole';

function Navbar() {
    const { dark, user, LogOut } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [role] = useRole()
    const logoutClick = () => {
        <Navigator to='/' />
        toast.success('Logged Out Successfully')
        LogOut()
        setShow(false)
    }
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='bg-[#302F2A] relative'>
            <div className={`flex justify-between items-center border-2 w-full md:px-20 px-5 py-2   bg-[#302F2A]`}>

                {/* left */}
                <Link to={'/'}><div className='w-16 h-16 rounded-xl'>
                    <img className='w-full h-full rounded-xl' src="https://i.ibb.co/0JfPLPG/main.png" alt="" />
                </div></Link>

                {/* right */}
                <div className={`lg:hidden ${dark ? 'text-white' : "text-black"}`} onClick={toggleMenu}>
                    <button className="text-2xl">&#9776;</button>
                </div>

                {/* Menu for large screens */}
                <div className={`hidden lg:flex ${dark ? 'bg-[#232121] text-white' : 'bg-[#F2f2f2] text-black'}`}>
                    <ul className='flex bg-[#302F2A] justify-center gap-5'>
                        <NavLink to={'/'} className={({ isActive }) => `font-semibold text-lg  cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>Home</NavLink>
                        <NavLink to={'/biodatas'} className={({ isActive }) => `font-semibold text-lg  cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>Biodatas</NavLink>
                        <NavLink to={'/aboutUs'} className={({ isActive }) => `font-semibold text-lg  cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>About Us</NavLink>
                        <NavLink to={'/contactUs'} className={({ isActive }) => `font-semibold text-lg  cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>Contact Us</NavLink>
                        {
                            user ?
                                <>
                                    {
                                        show &&
                                        <div className='flex flex-col absolute bg-[#302F2A] top-[80%] right-8 gap-2  z-50 p-5 rounded-xl border-2 border-white'>
                                            <h1 onClick={logoutClick} className='flex cursor-pointer items-center justify-center font-semibold text-lg text-white border-2 p-2 rounded-xl '>LogOut</h1>
                                            <Link to={role && role === 'admin' ? '/dashboard/adminDashboard' : '/dashboard/biodata'} onClick={() => setShow(false)} className={`font-semibold text-lg  cursor-pointer text-white border-2 p-2 rounded-xl `}>Dashboard</Link>
                                        </div>
                                    }
                                    {/* /dashboard/adminDashboard */}
                                    <div className='w-10 h-10'>
                                        <img
                                            onClick={() => setShow(!show)}
                                            className='rounded-full w-full h-full cursor-pointer'
                                            referrerPolicy='no-referrer'
                                            src={user?.photoURL || 'https://thumbs.dreamstime.com/b/unknown-male-avatar-profile-image-businessman-vector-unknown-male-avatar-profile-image-businessman-vector-profile-179373829.jpg'} alt=""
                                        />
                                    </div>
                                </> :
                                <>
                                    <NavLink to={'/login'} className={({ isActive }) => `font-semibold text-lg  cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>Login</NavLink>

                                </>
                        }
                    </ul>
                </div>

            </div>

            {/* Menu for small screens */}
            <div className={`${isOpen ? 'block transition-all' : 'hidden transition-all'} z-50  absolute transform transition-transform duration-300 ease-in-out px-8 py-5  rounded-xl lg:hidden bg-[#302F2A] border-2`}>
                <ul className='flex flex-col bg-[#302F2A]  gap-2 py-2'>
                    <NavLink onClick={toggleMenu} to={'/'} className={({ isActive }) => `font-semibold text-lg  cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>Home</NavLink>
                    <NavLink onClick={toggleMenu} to={'/biodatas'} className={({ isActive }) => `font-semibold text-lg  cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>Biodatas</NavLink>
                    <NavLink onClick={toggleMenu} to={'/aboutUs'} className={({ isActive }) => `font-semibold text-lg  cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>About Us</NavLink>
                    <NavLink onClick={toggleMenu} to={'/contactUs'} className={({ isActive }) => `font-semibold text-lg  cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>Contact Us</NavLink>
                    {
                        user ?
                            <>
                                <h1 onClick={logoutClick} className='flex cursor-pointer ml-2 font-semibold text-lg text-white'>LogOut</h1>
                                <NavLink onClick={toggleMenu} to={role && role === 'admin' ? '/dashboard/adminDashboard' : '/dashboard/biodata'} className={({ isActive }) => `font-semibold text-lg  cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>Dashboard</NavLink>
                                <div className='w-10 h-10'>
                                    <img
                                        className='rounded-full w-full h-full'
                                        referrerPolicy='no-referrer'
                                        src={user?.photoURL || 'https://thumbs.dreamstime.com/b/unknown-male-avatar-profile-image-businessman-vector-unknown-male-avatar-profile-image-businessman-vector-profile-179373829.jpg'} alt=""
                                    />
                                </div>
                            </> :
                            <>
                                <NavLink onClick={toggleMenu} to={'/login'} className={({ isActive }) => `font-semibold text-lg  cursor-pointer ${isActive ? 'bg-[#C4BA8F] text-black rounded-xl p-2' : 'text-white p-2'}`}>Login</NavLink>

                            </>
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar;
