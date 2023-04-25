import api from './Api/api';

const getWorkouts = (split_id) => {
  return api
    .get(`/api/auth/splits/workouts/${split_id}`)
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const workoutServices = { getWorkouts };

export default workoutServices;
