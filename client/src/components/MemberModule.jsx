import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers } from 'react-icons/fa';
import MemberForm from './MemberForm';
import MemberList from './MemberList';

const MemberModule = ({ members, onAdd, onUpdate, onDelete }) => {
  const [editingMember, setEditingMember] = useState(null);

  return (
    <motion.section
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaUsers className="mr-2" /> Manage Members
      </h2>
      <MemberForm onSubmit={onAdd} />
      <MemberList 
        members={members}
        onEdit={setEditingMember}
        onDelete={onDelete}
      />
      {editingMember && (
        <MemberForm
          member={editingMember}
          onSubmit={(updatedMember) => {
            onUpdate(updatedMember);
            setEditingMember(null);
          }}
          onCancel={() => setEditingMember(null)}
        />
      )}
    </motion.section>
  );
};

export default MemberModule;