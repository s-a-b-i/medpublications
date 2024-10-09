import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt } from 'react-icons/fa';
import PublicationForm from './PublicationForm';
import PublicationList from './PublicationList';

const PublicationModule = ({ publications, onAdd, onUpdate, onDelete }) => {
  const [editingPublication, setEditingPublication] = useState(null);

  return (
    <motion.section 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaFileAlt className="mr-2" /> Manage Publications
      </h2>
      <PublicationForm onSubmit={onAdd} />
      <PublicationList 
        publications={publications}
        onEdit={setEditingPublication}
        onDelete={onDelete}
      />
      {editingPublication && (
        <PublicationForm
          publication={editingPublication}
          onSubmit={(updatedPub) => {
            onUpdate(updatedPub);
            setEditingPublication(null);
          }}
          onCancel={() => setEditingPublication(null)}
        />
      )}
    </motion.section>
  );
};

export default PublicationModule;