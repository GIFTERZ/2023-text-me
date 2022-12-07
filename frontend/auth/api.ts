import axios from 'axios';
import { refresh, refreshError } from './refresh';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL,
});

api.interceptors.request.use(refresh, refreshError);

export default api;
