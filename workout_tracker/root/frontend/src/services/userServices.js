import api from './Api/api';

const getCurrentUser = () => {
  return api
    .get('/api/auth/current')
    .then((response) => {
      if (!response) {
        return null;
      } else {
        return response.data;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const logout = () => {
  return api.get('/api/auth/logout');
};

export default {
  getCurrentUser,
  logout,
};
