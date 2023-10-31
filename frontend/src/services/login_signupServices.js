import api from './Api/api';

const login_signup = (form, data) => {
  return api.post(`/api/auth/${form}`, data);
};

const login_signupServices = { login_signup };

export default login_signupServices;
