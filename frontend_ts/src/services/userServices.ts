import { UserDto } from '../types/applications';
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

const getUser = async () => {
  return await workout_api.get('identity/user');
};

const addUserToLocalStorage = (response: UserDto) => {
  const user = JSON.stringify(response);

  localStorage.setItem('user', user);
};

const removeUserFromLocalStorage = () => {
  localStorage.clear();
};

export default {
  signup,
  login,
  logout,
  getUser,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
};
