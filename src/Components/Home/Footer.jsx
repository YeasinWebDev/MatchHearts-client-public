import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-[#302f2a]  text-white py-10">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                {/* Logo */}
                <div className="flex items-center mb-4 md:mb-0">
                    <img src="https://i.ibb.co/0JfPLPG/main.png" alt="Logo" className="w-16 h-16 rounded-xl mr-4" />
                    <h2 className="text-2xl font-semibold">MatchHearts</h2>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-center md:text-left">
                    <a href="#" className="hover:text-orange-500 transition-colors duration-300">Home</a>
                    <a href="#" className="hover:text-orange-500 transition-colors duration-300">Biodatas</a>
                    <a href="#" className="hover:text-orange-500 transition-colors duration-300">About Us</a>
                    <a href="#" className="hover:text-orange-500 transition-colors duration-300">Contact Us</a>
                </div>

                {/* Social Media Icons */}
                <div className="flex gap-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-orange-500 transition-colors duration-300"><FaFacebook size={24} /></a>
                    <a href="#" className="hover:text-orange-500 transition-colors duration-300"><FaTwitter size={24} /></a>
                    <a href="#" className="hover:text-orange-500 transition-colors duration-300"><FaInstagram size={24} /></a>
                    <a href="#" className="hover:text-orange-500 transition-colors duration-300"><FaLinkedin size={24} /></a>
                </div>
            </div>
            <div className="text-center mt-8 text-gray-400">
                <p>&copy; {new Date().getFullYear()} MatchHearts. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
