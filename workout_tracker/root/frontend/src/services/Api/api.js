import axios from 'axios';

// const API_URL = 'http://localhost:8000';
// const API_URL = "https://workouttracker-server.onrender.com";
const API_URL = 'https://delightful-attire-moth.cyclic.app';

export default axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
