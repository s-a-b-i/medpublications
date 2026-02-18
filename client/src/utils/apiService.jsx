import axios from 'axios';

const API_URL = '/api';
const PROTECTED_API_URL = '/api/protected';

// Create axios instance WITH credentials for all requests
const axiosInstance = axios.create({
  withCredentials: true
});

export const login = async (username, password) => {
  const response = await axiosInstance.post(`${API_URL}/auth/login`, { username, password });
  return response.data;
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post(`${API_URL}/auth/logout`);
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    return response.data;
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

// Use axiosInstance for ALL protected routes
export const fetchPublications = async () => {
  const response = await axiosInstance.get(`${PROTECTED_API_URL}/publications`);
  return response.data;
};

export const addPublication = async (publicationData) => {
  const response = await axiosInstance.post(`${PROTECTED_API_URL}/publications`, publicationData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const updatePublication = async (publicationData) => {
  const response = await axiosInstance.put(`${PROTECTED_API_URL}/publications/${publicationData.get('_id')}`, publicationData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const deletePublication = async (id) => {
  await axiosInstance.delete(`${PROTECTED_API_URL}/publications/${id}`);
};

export const fetchMembers = async () => {
  const response = await axiosInstance.get(`${PROTECTED_API_URL}/members`);
  return response.data;
};

export const addMember = async (memberData) => {
  const response = await axiosInstance.post(`${PROTECTED_API_URL}/members`, memberData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const updateMember = async (memberData) => {
  const response = await axiosInstance.put(`${PROTECTED_API_URL}/members/${memberData.get('_id')}`, memberData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const deleteMember = async (id) => {
  await axiosInstance.delete(`${PROTECTED_API_URL}/members/${id}`);
};