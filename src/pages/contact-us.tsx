import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Contact Us
        </h2>
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <FaPhone className="text-blue-500" />
            <span className="text-gray-700">+123 456 7890</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <FaEnvelope className="text-green-500" />
            <span className="text-gray-700">info@example.com</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <FaMapMarkerAlt className="text-red-500" />
            <span className="text-gray-700">123 Main St, City, Country</span>
          </div>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <textarea
              placeholder="Your Message"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
