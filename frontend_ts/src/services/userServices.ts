import { workout_api } from './api_config';

type signupDto = {
  name: string;
  email: string;
  password: string;
};

const signup = async (data: signupDto) => {
  return await workout_api.post('/identity/signup', data);
};

export default { signup };
