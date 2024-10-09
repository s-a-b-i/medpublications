import React, { useContext } from 'react';
import { ThemeContext } from '../components/ThemeContext';

const CommunityPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`pt-20 min-h-screen ${theme === 'dark' 
      ? 'bg-gray-900 text-white' 
      : 'bg-gradient-to-r from-blue-100 to-teal-100 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold mb-10 text-center tracking-wide">Join Our Community</h1>
        <p className="mb-8 text-xl text-center leading-relaxed">
          Stay up-to-date with the latest medical research and publications. Subscribe to our newsletter and become part of our growing community of healthcare professionals and researchers.
        </p>
        <form className="flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className={`flex-grow px-6 py-3 rounded-lg shadow-md ${
              theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-300'
            }`}
          />
          <button
            type="submit"
            className={`px-8 py-3 rounded-lg shadow-md font-semibold ${
              theme === 'dark' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
            } text-white transition duration-300 ease-in-out`}
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommunityPage;
