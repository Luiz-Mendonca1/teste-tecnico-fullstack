import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333/api';

export const api = axios.create({
  baseURL: apiBaseUrl,
});

// Interceptor automático para injetar o Token JWT em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@todo:token');
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});