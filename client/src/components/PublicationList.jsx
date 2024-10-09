import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ThemeContext } from './ThemeContext';
import { useContext } from 'react';

const PublicationList = ({ publications, onEdit, onDelete }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {publications.map((pub) => (
        <motion.div 
          key={pub._id} 
          className={`border p-4 rounded-3xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <h3 className="font-bold">{pub.title}</h3>
          <p className="text-sm mt-2">{pub.description}</p>
          <div className="mt-4 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="mr-2 text-blue-500"
              onClick={() => onEdit(pub)}
            >
              <FaEdit />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-red-500"
              onClick={() => onDelete(pub._id)}
            >
              <FaTrash />
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PublicationList;