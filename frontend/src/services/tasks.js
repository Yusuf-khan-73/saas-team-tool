import api from './api';

export const getTasks = async (params = {}) => {
  const response = await api.get('/auth/tasks/', { params });
  return response.data;
};

export const getTask = async (id) => {
  const response = await api.get(`/auth/tasks/${id}/`);
  return response.data;
};

export const createTask = async (data) => {
  const response = await api.post('/auth/tasks/', data);
  return response.data;
};

export const updateTask = async (id, data) => {
  const response = await api.put(`/auth/tasks/${id}/`, data);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/auth/tasks/${id}/`);
  return response.data;
};

export const assignTask = async (taskId, userId) => {
  const response = await api.post(`/auth/tasks/${taskId}/assign/`, { user_id: userId });
  return response.data;
};