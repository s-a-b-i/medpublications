import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { ThemeContext } from './ThemeContext';
import { useContext } from 'react';

const MemberList = ({ members, onEdit, onDelete }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((member) => (
        <motion.div 
          key={member._id} 
          className={`border p-4 rounded-3xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {/* Adjusted Image Style */}
          <div className="w-full h-48 mb-4 overflow-hidden rounded-3xl">
            <img 
              src={member.imageUrl} 
              alt={member.name} 
              className="w-full h-full object-cover" // object-cover ensures the image fills without distortion
            />
          </div>
          <h3 className="font-bold text-lg">{member.name}</h3>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{member.role}</p>
          <p className="text-sm mt-2">{member.description}</p>
          <div className="mt-2 flex justify-between items-center">
            <div>
              {member.twitter && (
                <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="mr-2 text-blue-400">
                  <FaTwitter />
                </a>
              )}
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700">
                  <FaLinkedin />
                </a>
              )}
            </div>
            <div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mr-2 text-blue-500"
                onClick={() => onEdit(member)}
              >
                <FaEdit />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-red-500"
                onClick={() => onDelete(member._id)}
              >
                <FaTrash />
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MemberList;
