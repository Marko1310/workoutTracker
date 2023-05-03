import api from './Api/api';

const getSplitName = (split_id) => {
  return api
    .get(`/api/auth/splits/${split_id}/name`)
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getWorkoutName = (split_id, workout_id) => {
  return api
    .get(`/api/auth/splits/${split_id}/workouts/${workout_id}/name`)
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const navigationServices = {
  getSplitName,
  getWorkoutName,
};

export default navigationServices;
