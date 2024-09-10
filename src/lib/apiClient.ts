import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

apiClient.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem('access_token');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});
