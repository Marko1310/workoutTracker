import axios from 'axios';

// const API_URL = 'http://localhost:8000';
const API_URL = 'https://workouttracker-api-gjbo.onrender.com';

export default axios.create({
  baseURL: API_URL,
  withCredentials: true
});
