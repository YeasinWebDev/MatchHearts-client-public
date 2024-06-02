import React from 'react';
import { Helmet } from 'react-helmet';

function AboutUs() {
    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <Helmet>
                <title>MatchHearts || About Us</title>
            </Helmet>
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-[#302F2A] mb-8">About Us</h1>
                <p className="text-lg text-center text-gray-700 mb-10">
                    Welcome to <span className='text-[#302F2A] font-semibold'>MatchHearts</span>, where we believe in the magic of true connections. Our mission is to help you find your perfect match and build meaningful relationships. In today's fast-paced world, finding genuine connections can be challenging. At <span className='text-[#302F2A] font-semibold'>MatchHearts</span>, we use advanced algorithms and expert matchmakers to bring like-minded individuals together. Our platform offers a safe and secure environment for you to meet, learn, and grow with others. Join <span className='text-[#302F2A] font-semibold'>MatchHearts</span> today and start your journey towards finding a meaningful, lasting relationship.
                </p>
                <div className="mb-10">
                    <h2 className="text-3xl font-semibold text-center text-[#302F2A] mb-6">What We Do</h2>
                    <p className="text-lg text-center text-gray-700 mb-4">
                        At MatchHearts, we specialize in connecting individuals who are looking for meaningful relationships. Our platform offers a range of services designed to help you find your perfect match.
                    </p>
                    <ul className="list-disc list-inside text-lg text-gray-700 space-y-3">
                        <li><span className='text-lg font-semibold'>Personalized Matchmaking:</span> Our advanced algorithms and expert matchmakers work together to find the best matches for you based on your preferences and interests.</li>
                        <li><span className='text-lg font-semibold'>Comprehensive Profiles:</span> We provide detailed profiles that give you a better understanding of your potential matches, including their interests, values, and goals.</li>
                        <li><span className='text-lg font-semibold'>Secure Messaging:</span> Communicate with your matches in a safe and secure environment, ensuring your privacy and safety at all times.</li>
                        <li><span className='text-lg font-semibold'>Relationship Advice:</span> Access to expert advice and resources to help you navigate your relationships and build strong, lasting connections.</li>
                        <li><span className='text-lg font-semibold'>Community Events:</span> Join our community events to meet new people, make friends, and have fun in a relaxed and friendly setting.</li>
                    </ul>
                </div>
                <div className="mb-10">
                    <h2 className="text-3xl font-semibold text-center text-[#302F2A] mb-6">Our Team</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
                            <img className="w-full h-56 object-cover" src="https://i.ibb.co/gmwrNqT/taylor-8-Vt2haq8-NSQ-unsplash.jpg" alt="Team Member" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900">John Doe</h3>
                                <p className="text-gray-700 mt-2">CEO & Founder</p>
                                <p className="text-gray-700 mt-2">John is the visionary behind MatchHearts, dedicated to bringing people together and creating lasting connections.</p>
                            </div>
                        </div>
                        <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
                            <img className="w-full h-56 object-cover" src="https://i.ibb.co/K6PZkyV/austin-distel-7uo-Mmz-Pd2-JA-unsplash.jpg" alt="Team Member" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900">Jane Smith</h3>
                                <p className="text-gray-700 mt-2">Chief Technology Officer</p>
                                <p className="text-gray-700 mt-2">Jane is the tech guru ensuring that MatchHearts runs smoothly and efficiently, always improving our platform for better user experience.</p>
                            </div>
                        </div>
                        {/* Add more team members as needed */}
                    </div>
                </div>
                <div className="bg-[#302F2A] text-white p-10 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold text-center mb-6">Contact Us</h2>
                    <p className="text-center mb-4">We'd love to hear from you! Reach out to us for any queries or support.</p>
                    <div className="flex justify-center">
                        <div className="text-center">
                            <p className="text-lg">Email: support@matchhearts.com</p>
                            <p className="text-lg mt-2">Phone: +1 234 567 890</p>
                            <p className="text-lg mt-2">Address: 123 MatchHearts Lane, Love City, LC 12345</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
