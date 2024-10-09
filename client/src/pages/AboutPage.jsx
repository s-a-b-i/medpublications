import React, { useContext } from 'react';
import { ThemeContext } from '../components/ThemeContext';

const AboutPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`pt-20 min-h-screen ${theme === 'dark' 
      ? 'bg-gray-900 text-white' 
      : 'bg-gradient-to-r from-blue-100 to-teal-100 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold mb-10 text-center tracking-wide">About Us</h1>
        <p className="mb-8 text-xl leading-relaxed text-center">
          We are dedicated to advancing medical knowledge through cutting-edge research and publications. Our team of expert researchers and medical professionals work tirelessly to bring you the latest insights and breakthroughs in the field of medicine.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
