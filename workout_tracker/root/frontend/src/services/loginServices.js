import api from './Api/api';

const login_signup = (form, data) => {
  return api.post(`/api/auth/${form}`, data);
};

export default { login_signup };
