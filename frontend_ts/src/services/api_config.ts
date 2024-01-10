import axios from 'axios';
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const workout_api = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

export { workout_api };
