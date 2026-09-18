import axios from 'axios';
import { toApiError } from './errors';

export const coingeckoClient = axios.create({
  baseURL: '/api/coingecko',
  headers: {
    Accept: 'application/json',
  },
  timeout: 15000,
});

coingeckoClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(toApiError(error))
);
