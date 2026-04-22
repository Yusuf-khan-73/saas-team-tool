import api from './api';

export const getProjects = async (params = {}) => {
  const response = await api.get('/auth/projects/', { params });
  return response.data;
};

export const getProject = async (id) => {
  const response = await api.get(`/auth/projects/${id}/`);
  return response.data;
};

export const createProject = async (data) => {
  const response = await api.post('/auth/projects/', data);
  return response.data;
};

export const updateProject = async (id, data) => {
  const response = await api.put(`/auth/projects/${id}/`, data);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/auth/projects/${id}/`);
  return response.data;
};