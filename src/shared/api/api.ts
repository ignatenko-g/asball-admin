import axios from 'axios';
import { API_URL } from 'shared/config/apiConfig';
import { TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);

  if (config.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});
