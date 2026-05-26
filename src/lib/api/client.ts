import axios from "axios";
import { toApiError } from "./errors";

const baseURL = import.meta.env.VITE_COINGECKO_API_BASE_URL;
const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;

console.log(baseURL, apiKey);

export const coingeckoClient = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    ...(apiKey ? { "x-cg-demo-api-key": apiKey } : {}),
  },
  timeout: 15000,
});

coingeckoClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(toApiError(error)),
);
