import api from './api';

export const login = async (email, password) => {
  const response = await api.post('/auth/login/', { email, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register/', userData);
  return response.data;
};

export const logout = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (refreshToken) {
    try {
      // Logout URL comment karde (kyunki backend mein abhi nahi hai)
      // await api.post('/auth/logout/', { refresh: refreshToken });
      console.log('Logged out');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  // Clear tokens anyway
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/profile/');
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  const response = await api.post('/auth/change-password/', {
    old_password: oldPassword,
    new_password: newPassword,
  });
  return response.data;
};