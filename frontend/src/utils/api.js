import axios from 'axios';
import useStore from '../store/useStore';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_BASEURL}`, 
});

// Interceptor to inject the token into headers
api.interceptors.request.use((config) => {
  const user = useStore.getState().user;
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;