import React, { useContext } from 'react';
import { ThemeContext } from '../components/ThemeContext';

const MissionPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`pt-20 min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold mb-10 text-center tracking-wide">Our Mission</h1>
        <p className="mb-8 text-xl leading-relaxed text-center">
          Our mission is to disseminate high-quality, peer-reviewed medical research to healthcare professionals, researchers, and the public. We strive to improve patient care and outcomes by facilitating the exchange of knowledge and promoting evidence-based practice.
        </p>
      </div>
    </div>
  );
};

export default MissionPage;
