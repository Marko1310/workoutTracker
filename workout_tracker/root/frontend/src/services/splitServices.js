import api from './Api/api';

const getSplits = () => {
  return api
    .get(`/api/auth/splits/current`)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteSplit = (split_id) => {
  console.log(split_id);
  return api
    .delete(`/api/auth/split/delete`, { data: { split_id } })
    .then(() => {
      return getSplits();
    })
    .catch((error) => {
      console.log(error);
    });
};

export default { getSplits, deleteSplit };
