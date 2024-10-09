import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlusCircle } from 'react-icons/fa';
import { ThemeContext } from './ThemeContext';
import { useContext } from 'react';

const MemberForm = ({ member, onSubmit, onCancel }) => {
  // Initialize form data based on whether a member is being edited or not
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    twitter: '',
    linkedin: '',
  });
  const [image, setImage] = useState(null);
  const { theme } =  useContext(ThemeContext);

  // Populate form data when editing a member
  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        role: member.role || '',
        description: member.description || '',
        twitter: member.social?.twitter || '',
        linkedin: member.social?.linkedin || '',
      });
    }
  }, [member]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    
    // Append the image file only if it's updated
    if (image) {
      data.append('image', image);
    }

    // Pass the member ID for updating if editing
    if (member && member._id) {
      data.append('_id', member._id);
    }

    // Call the submit handler with the form data
    onSubmit(data);

    // Reset the form if not editing
    if (!member) {
      setFormData({
        name: '',
        role: '',
        description: '',
        twitter: '',
        linkedin: '',
      });
      setImage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        required
        className={`w-full mb-2 p-2 border rounded-3xl ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
      />
      <input
        type="text"
        name="role"
        value={formData.role}
        onChange={handleInputChange}
        placeholder="Role"
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
        type="text"
        name="twitter"
        value={formData.twitter}
        onChange={handleInputChange}
        placeholder="Twitter URL"
        className={`w-full mb-2 p-2 border rounded-3xl ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
      />
      <input
        type="text"
        name="linkedin"
        value={formData.linkedin}
        onChange={handleInputChange}
        placeholder="LinkedIn URL"
        className={`w-full mb-2 p-2 border rounded-3xl ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required={!member}  // Only require image upload when adding a new member
        className="mb-2"
      />
      <div className="flex justify-end">
        <motion.button 
          type="submit" 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-500 text-white px-4 py-2 rounded-3xl flex items-center mr-2"
        >
          <FaPlusCircle className="mr-2" /> {member ? 'Update' : 'Add'} Member
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

export default MemberForm;
  