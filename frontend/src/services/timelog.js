import api from './api';

export const getTimeLogs = async (params = {}) => {
  const response = await api.get('/auth/timelog/', { params });
  return response.data;
};

export const startTimer = async (taskId) => {
  const response = await api.post('/auth/timelog/start/', { task_id: taskId });
  return response.data;
};

export const stopTimer = async (taskId, description = '') => {
  const response = await api.post('/auth/timelog/stop/', { task_id: taskId, description });
  return response.data;
};

export const getActiveTimer = async () => {
  const response = await api.get('/auth/timelog/active/');
  return response.data;
};