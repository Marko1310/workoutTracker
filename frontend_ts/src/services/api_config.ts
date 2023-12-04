import axios from 'axios';
//TODO: export to .env
const BASE_API_URL = 'http://localhost:3000';

const workout_api = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

export { workout_api };
