import api from './Api/api';

const getSplits = () => {
  return api
    .get(`/api/auth/splits/current`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

// delete split and after that return all splits from database
const deleteSplit = (split_id) => {
  return api
    .delete(`/api/auth/split/delete`, { data: { split_id } })
    .then(() => {
      return getSplits();
    })
    .catch((error) => {
      console.log(error);
    });
};

// add split and after that return all splits from database
const addSplit = (title, days) => {
  return api.post(`/api/auth/split/new`, { title, days }).then(() => {
    return getSplits();
  });
};

const splitServices = { getSplits, deleteSplit, addSplit };

export default splitServices;
