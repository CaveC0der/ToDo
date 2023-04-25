import axios from 'axios';
import { IAuthResponse } from '../types/IAuthResponse';

export const BASE_BACKEND_URL = 'http://localhost:5000';

const AxiosAPI = axios.create({
  withCredentials: true,
  baseURL: BASE_BACKEND_URL,
});

AxiosAPI.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN_LOCAL_STORAGE_ID)}`;
  return config;
});

AxiosAPI.interceptors.response.use(config => config, async error => {
  if (error.response.status == 401 && error.config && !error.config._isRetry) {
    error.config._isRetry = true;
    try {
      const res = await axios.get<IAuthResponse>(
        `${BASE_BACKEND_URL}/auth/refresh`,
        { withCredentials: true },
      );
      localStorage.setItem(import.meta.env.VITE_ACCESS_TOKEN_LOCAL_STORAGE_ID, res.data.accessToken);
      return AxiosAPI.request(error.config);
    } catch (e) {
      console.error('UNAUTHORIZED');
    }
  }
});

export default AxiosAPI;
