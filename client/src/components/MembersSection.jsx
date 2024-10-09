// MembersSection.jsx
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fetchMembers } from '../utils/apiService'; // Assuming you have an api.js file with this function

const MembersSection = ({ theme }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
    fetchMembers().then(setMembers).catch(console.error);
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`py-16 px-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}
    >
      <div className="container mx-auto">
      <h1 className="text-5xl font-extrabold mb-10 text-center tracking-wide">Our Team</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <MemberCard key={member._id} member={member} theme={theme} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Updated MemberCard component
// Updated MemberCard component
const MemberCard = ({ member, theme }) => {
  return (
    <motion.div
      className={`${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105`} // Smoother card with hover effect
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Circular profile image with glowing border */}
      <div className="relative w-40 h-40 mx-auto mt-6 mb-4 rounded-full overflow-hidden border-4 border-transparent" style={{ boxShadow: '0 0 15px rgba(0, 255, 255, 0.6)' }}>
        <img 
          src={member.imageUrl} 
          alt={member.name} 
          className="w-full h-full object-cover object-center" 
        />
      </div>

      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold">{member.name}</h3>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{member.role}</p>
        <p className="mt-2">{member.description}</p>
        <div className="mt-4 flex justify-center space-x-4">
          {member.social?.twitter && (
            <motion.a
              href={member.social.twitter}
              whileHover={{ scale: 1.2 }}
              className="text-blue-400 hover:text-blue-500"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </motion.a>
          )}
          {member.social?.linkedin && (
            <motion.a
              href={member.social.linkedin}
              whileHover={{ scale: 1.2 }}
              className="text-blue-700 hover:text-blue-800"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};



export default MembersSection;