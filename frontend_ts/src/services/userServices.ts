import { LoginDto, SignupDto } from '../types/auth';
import { workout_api } from './api_config';

const signup = async (data: SignupDto) => {
  return await workout_api.post('/identity/signup', data);
};

const login = async (data: LoginDto) => {
  return await workout_api.post('/identity/login', data);
};

export default { signup, login };
