import { LoginDto, SignupDto } from '../types/auth';
import { workout_api } from './api_config';

const signup = async (data: SignupDto) => {
  return await workout_api.post('/identity/signup', data);
};

const login = async (data: LoginDto) => {
  return await workout_api.post('/identity/login', data);
};

const logout = async () => {
  return await workout_api.get('/identity/logout');
};

const getCurrentUser = async () => {
  return await workout_api.get('identity/me');
};

const addUserToLocalStorage = (response: string) => {
  localStorage.setItem('user', response);
};

const removeUserFromLocalStorage = () => {
  localStorage.clear();
};

export default {
  signup,
  login,
  logout,
  getCurrentUser,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
};
