import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlusCircle } from 'react-icons/fa';
import { ThemeContext } from './ThemeContext';
import { useContext } from 'react';

const PublicationForm = ({ publication, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(publication || { title: '', description: '' });
  const [file, setFile] = useState(null);
  const { theme } = useContext(ThemeContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (file) data.append('file', file);
    onSubmit(data);
    if (!publication) {
      setFormData({ title: '', description: '' });
      setFile(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Title"
        required
        className={`w-full mb-2 p-2 border rounded-3xl ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Description"
        required
        className={`w-full mb-2 p-2 border rounded-3xl ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
      ></textarea>
      <input
        type="file"
        accept=".pdf,image/*"
        onChange={handleFileChange}
        required={!publication}
        className="mb-2"
      />
      <div className="flex justify-end">
        <motion.button 
          type="submit" 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white px-4 py-2 rounded-3xl flex items-center mr-2"
        >
          <FaPlusCircle className="mr-2" /> {publication ? 'Update' : 'Add'} Publication
        </motion.button>
        {onCancel && (
          <motion.button
            type="button"
            onClick={onCancel}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-500 text-white px-4 py-2 rounded-3xl"
          >
            Cancel
          </motion.button>
        )}
      </div>
    </form>
  );
};

export default PublicationForm;