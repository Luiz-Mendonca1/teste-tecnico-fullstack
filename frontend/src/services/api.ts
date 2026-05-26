import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/api',
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