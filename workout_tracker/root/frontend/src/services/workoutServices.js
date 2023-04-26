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

// delete split and after that return all workouts from database
const deleteWorkout = (split_id, workout_id) => {
  return api
    .delete(`/api/auth/split/workout/delete`, { data: { split_id: split_id, workout_id: workout_id } })
    .then(() => {
      return getWorkouts(split_id);
    })
    .catch((error) => {
      console.log(error);
    });
};

// add split and after that return all workouts from database
const addWorkout = (title, split_id) => {
  return api.post(`/api/auth/split/workout/new`, { title, split_id }).then(() => {
    return getWorkouts(split_id);
  });
};

const getCurrentWorkout = (workout_id) => {
  return api
    .get(`/api/auth/splits/workout/${workout_id}`)
    .then((data) => {
      return data.data[0];
    })
    .catch((error) => {
      console.log(error);
    });
};

const getCurrentTrackData = (workout_id) => {
  return api
    .get(`/api/auth/splits/workouts/exercises/currentData/${workout_id}`)
    .then((data) => {
      console.log(data);
      return data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getPrevTrackData = (workout_id) => {
  return api
    .get(`/api/auth/splits/workouts/exercises/prevData/${workout_id}`)
    .then((data) => {
      console.log(data.data);
      return data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const workoutServices = {
  getWorkouts,
  deleteWorkout,
  addWorkout,
  getCurrentWorkout,
  getCurrentTrackData,
  getPrevTrackData,
};

export default workoutServices;
