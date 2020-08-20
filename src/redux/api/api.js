// axiosconfig.js
import axios from 'axios';
import store from '../store.js';

// configure base url
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 60000
});

// intercept requests and add authorization token
api.interceptors.request.use((config) => {
  const { token } = store.getState().auth;
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

// Export API object
export default api;
