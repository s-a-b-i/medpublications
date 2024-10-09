import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../components/ThemeContext';
import PublicationModule from '../components/PublicationModule';
import MemberModule from '../components/MemberModule';
import LazyLoad from 'react-lazyload';
import Loader from '../components/Loader'; // Import the loader component
import { 
  fetchPublications, 
  addPublication, 
  updatePublication, 
  deletePublication,
  fetchMembers,
  addMember,
  updateMember,
  deleteMember
} from '../utils/apiService';

const Dashboard = () => {
  const [publications, setPublications] = useState([]);
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isOperationLoading, setIsOperationLoading] = useState(false); // New state for loader during operations
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleError = useCallback((error) => {
    console.error('Error:', error);
    if (error?.response?.status === 401) {
      localStorage.removeItem('accessToken');
      navigate('/login');
    }
  }, [navigate]);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [pubs, mems] = await Promise.all([
        fetchPublications(),
        fetchMembers()
      ]);
      setPublications(pubs);
      setMembers(mems);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }, [handleError]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddPublication = useCallback(async (newPub) => {
    setIsOperationLoading(true); // Show loader
    try {
      const addedPub = await addPublication(newPub);
      setPublications(prevPubs => [...prevPubs, addedPub]);
    } catch (error) {
      handleError(error);
    } finally {
      setIsOperationLoading(false); // Hide loader
    }
  }, [handleError]);

  const handleUpdatePublication = useCallback(async (updatedPub) => {
    setIsOperationLoading(true); // Show loader
    try {
      await updatePublication(updatedPub);
      setPublications(prevPubs =>
        prevPubs.map(p => p._id === updatedPub._id ? updatedPub : p)
      );
    } catch (error) {
      handleError(error);
    } finally {
      setIsOperationLoading(false); // Hide loader
    }
  }, [handleError]);

  const handleDeletePublication = useCallback(async (id) => {
    setIsOperationLoading(true); // Show loader
    try {
      await deletePublication(id);
      setPublications(prevPubs => prevPubs.filter(p => p._id !== id));
    } catch (error) {
      handleError(error);
    } finally {
      setIsOperationLoading(false); // Hide loader
    }
  }, [handleError]);

  const handleAddMember = useCallback(async (newMember) => {
    setIsOperationLoading(true); // Show loader
    try {
      const addedMember = await addMember(newMember);
      setMembers(prevMembers => [...prevMembers, addedMember]);
    } catch (error) {
      handleError(error);
    } finally {
      setIsOperationLoading(false); // Hide loader
    }
  }, [handleError]);

  const handleUpdateMember = useCallback(async (updatedMember) => {
    setIsOperationLoading(true); // Show loader
    try {
      const result = await updateMember(updatedMember);
      setMembers(prevMembers =>
        prevMembers.map(m => m._id === result._id ? result : m)
      );
    } catch (error) {
      handleError(error);
    } finally {
      setIsOperationLoading(false); // Hide loader
    }
  }, [handleError]);

  const handleDeleteMember = useCallback(async (id) => {
    setIsOperationLoading(true); // Show loader
    try {
      await deleteMember(id);
      setMembers(prevMembers => prevMembers.filter(m => m._id !== id));
    } catch (error) {
      handleError(error);
    } finally {
      setIsOperationLoading(false); // Hide loader
    }
  }, [handleError]);

  const memoizedPublicationModule = useMemo(() => (
    <PublicationModule 
      publications={publications}
      onAdd={handleAddPublication}
      onUpdate={handleUpdatePublication}
      onDelete={handleDeletePublication}
    />
  ), [publications, handleAddPublication, handleUpdatePublication, handleDeletePublication]);

  const memoizedMemberModule = useMemo(() => (
    <MemberModule 
      members={members}
      onAdd={handleAddMember}
      onUpdate={handleUpdateMember}
      onDelete={handleDeleteMember}
    />
  ), [members, handleAddMember, handleUpdateMember, handleDeleteMember]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-r from-blue-100 to-teal-100 text-gray-800'}`}
    >
      <div className="container mx-auto px-4 py-8 pt-28">
        {isLoading || isOperationLoading ? ( // Show loader if loading or performing operations
          <Loader />
        ) : (
          <>
            <LazyLoad height={200} once>
              {memoizedPublicationModule}
            </LazyLoad>
            <LazyLoad height={200} once>
              {memoizedMemberModule}
            </LazyLoad>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default React.memo(Dashboard);
