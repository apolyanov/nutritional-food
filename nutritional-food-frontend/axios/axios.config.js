import axios from 'axios';

const BASE_URL = '/api/v1/';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.defaults.headers.common['Content-Type'] = 'application/json';
export default api;
