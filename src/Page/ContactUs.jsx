import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';

function ContactUs() {
    const formRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        toast.success("Thank you for your Massage")
        formRef.current.reset();
    };

    return (
        <div className="w-full min-h-screen mx-auto py-10 px-5 bg-[#FEFBF0]">
            <Helmet>
                <title>MatchHearts || Contact Us</title>
            </Helmet>
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Contact Us</h1>

            <p className="text-lg text-center text-gray-700 mb-10">
                We would love to hear from you! Whether you have a question about our services, need assistance, or just want to share your experience, please don't hesitate to reach out.
            </p>

            <div className="flex flex-col lg:flex-row lg:justify-center lg:gap-10 lg:mx-20">
                <div className="mb-10 lg:mb-0 lg:w-1/2">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-5">Contact Information</h2>
                    <p className="text-lg text-gray-700 mb-5">
                        Email: support@matchhearts.com
                    </p>
                    <p className="text-lg text-gray-700 mb-5">
                        Phone: +1 800 123 4567
                    </p>
                    <p className="text-lg text-gray-700">
                        Address: 123 Love Lane, Heartsville, HS 45678
                    </p>
                </div>

                <div className="lg:w-1/2">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-5">Send Us a Message</h2>
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-600">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Your Name"
                                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 "
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Your Email"
                                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 "
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-600">Message</label>
                            <textarea
                                name="message"
                                id="message"
                                rows="5"
                                placeholder="Your Message"
                                className="w-full px-3 py-2 h-32 resize-none border rounded-md border-gray-300 focus:outline-none focus:ring-2 "
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#302F2A] text-white px-4 py-2 rounded-md  focus:outline-none focus:ring-2 "
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
