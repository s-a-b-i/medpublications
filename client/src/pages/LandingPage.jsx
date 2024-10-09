// // LandingPage.jsx
// import React, { useContext } from 'react';
// import { motion } from 'framer-motion';
// import { ThemeContext } from '../components/ThemeContext';
// import { Link } from 'react-router-dom';
// import MembersSection from '../components/MembersSection';
// import img from '../assets/img.png';

// const LandingPage = () => {
//   const { theme } = useContext(ThemeContext);

//   return (
//     <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
//       <HeroSection theme={theme} />
//       <MembersSection theme={theme} />
//     </div>
//   );
// };

// const HeroSection = ({ theme }) => {
//   return (
//     <section className={`pt-32 md:pt-20 min-h-screen flex flex-col items-center justify-center 
//       bg-gradient-to-br from-teal-800 to-cyan-700 text-white overflow-hidden relative`}
//     >
//       <div className="absolute inset-0 md:hidden">
//         <div className="absolute inset-0 bg-black opacity-60"></div>
//         <img
//           src={img}
//           alt="Hero Background"
//           className="w-full h-full object-cover pt-14"
//         />
//       </div>
//       <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
//         <div className="w-full md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
//           <motion.h1
//             className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-sans"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             From Diagnosis to Treatment
//           </motion.h1>
//           <motion.p
//             className="text-lg md:text-xl mb-8 font-inter"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//            Exploring Degeneration, Neurometrics, Tissue Breakdown, and Bioinformatics
//           </motion.p>
//           <Link to="/Publications">
//             <motion.button
//               className="bg-teal-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-teal-600 transition duration-300 font-sans"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Explore Our Publications
//             </motion.button>
//           </Link>
//         </div>
//         <div className="w-full md:w-1/2 hidden md:block">
//           <motion.div
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <img
//               src={img}
//               alt="Hero Image"
//               className="w-full h-auto "
//             />
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LandingPage;


import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../components/ThemeContext';
import { Link } from 'react-router-dom';
import MembersSection from '../components/MembersSection';
import img from '../assets/img.png';  // Skeleton image

const LandingPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <HeroSection theme={theme} />
      <MembersSection theme={theme} />
    </div>
  );
};

const HeroSection = ({ theme }) => {
  return (
    <section
      className={`pt-32 md:pt-20 min-h-screen flex flex-col items-center justify-center 
        bg-gradient-to-br from-teal-900 to-cyan-800 text-white overflow-hidden relative`}
    >
      {/* Background Image with subtle animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={img}  // Background Skeleton Image
          alt="Background Skeleton"
          className="w-full h-full object-cover opacity-30"
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}  // Subtle breathing animation
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Semi-transparent overlay with animated gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black to-transparent opacity-70"
          animate={{ opacity: [0.7, 0.75, 0.7], backgroundPosition: '0% 50%' }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Centered Hero Text */}
      <div className="container mx-auto px-4 flex flex-col items-center relative z-10">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
        >
          {/* Animate each word separately for extra flare */}
          <span className="inline-block overflow-hidden">
            <motion.span
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="block"
            >
              From
            </motion.span>
          </span>{' '}
          <span className="inline-block overflow-hidden">
            <motion.span
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="block"
            >
              Diagnosis
            </motion.span>
          </span>{' '}
          <span className="inline-block overflow-hidden">
            <motion.span
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="block"
            >
              to
            </motion.span>
          </span>{' '}
          <span className="inline-block overflow-hidden">
            <motion.span
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="block"
            >
              Treatment
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-8 font-light text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Exploring Degeneration, Neurometrics, Tissue Breakdown, and Bioinformatics
        </motion.p>
        <Link to="/Publications">
          <motion.button
            className="bg-teal-500 px-6 py-3 rounded-full text-lg font-semibold hover:bg-teal-600 
                       transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Our Publications
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default LandingPage;
