import axios from 'axios';

// Use relative paths since your frontend and backend are on the same Render service
const API_URL = '/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This ensures cookies are sent every time
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username, password) => {
  const response = await axiosInstance.post('/auth/login', { username, password });
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post('/auth/logout');
  localStorage.removeItem('user');
  return response.data;
};

// PUBLICATIONS
export const fetchPublications = async () => {
  const response = await axiosInstance.get('/protected/publications');
  return response.data;
};

export const addPublication = async (formData) => {
  const response = await axiosInstance.post('/protected/publications', formData);
  return response.data;
};

export const updatePublication = async (formData) => {
  const id = formData.get('_id');
  const response = await axiosInstance.put(`/protected/publications/${id}`, formData);
  return response.data;
};

export const deletePublication = async (id) => {
  await axiosInstance.delete(`/protected/publications/${id}`);
};

// MEMBERS
export const fetchMembers = async () => {
  const response = await axiosInstance.get('/protected/members');
  return response.data;
};

export const addMember = async (formData) => {
  const response = await axiosInstance.post('/protected/members', formData);
  return response.data;
};

export const updateMember = async (formData) => {
  const id = formData.get('_id');
  const response = await axiosInstance.put(`/protected/members/${id}`, formData);
  return response.data;
};

export const deleteMember = async (id) => {
  await axiosInstance.delete(`/protected/members/${id}`);
};


// import axios from 'axios';

// const API_URL = '/api';
// const PROTECTED_API_URL = '/api/protected';

// const axiosInstance = axios.create({
//   withCredentials: true
// });

// export const login = async (username, password) => {
//   const response = await axiosInstance.post(`${API_URL}/auth/login`, { username, password });
//   return response.data;
// };

// export const logout = async () => {
//   try {
//     const response = await axiosInstance.post(`${API_URL}/auth/logout`);
//     localStorage.removeItem('user');
//     sessionStorage.removeItem('user');
//     return response.data;
//   } catch (error) {
//     console.error('Logout failed:', error);
//     throw error;
//   }
// };

// export const fetchPublications = async () => {
//   const response = await axios.get(`${PROTECTED_API_URL}/publications`);
//   return response.data;
// };

// export const addPublication = async (publicationData) => {
//   const response = await axios.post(`${PROTECTED_API_URL}/publications`, publicationData, {
//     'Content-Type': 'multipart/form-data'
//   });
//   return response.data;
// };

// export const updatePublication = async (publicationData) => {
//   const response = await axios.put(`${PROTECTED_API_URL}/publications/${publicationData.get('_id')}`, publicationData, {
//     'Content-Type': 'multipart/form-data'
//   });
//   return response.data;
// };

// export const deletePublication = async (id) => {
//   await axios.delete(`${PROTECTED_API_URL}/publications/${id}`);
// };

// export const fetchMembers = async () => {
//   const response = await axios.get(`${PROTECTED_API_URL}/members`);
//   return response.data;
// };

// export const addMember = async (memberData) => {
//   const response = await axios.post(`${PROTECTED_API_URL}/members`, memberData, {
//     'Content-Type': 'multipart/form-data'
//   });
//   return response.data;
// };

// export const updateMember = async (memberData) => {
//   const response = await axios.put(`${PROTECTED_API_URL}/members/${memberData.get('_id')}`, memberData, {
//     'Content-Type': 'multipart/form-data'
//   });
//   return response.data;
// };

// export const deleteMember = async (id) => {
//   await axios.delete(`${PROTECTED_API_URL}/members/${id}`);
// };