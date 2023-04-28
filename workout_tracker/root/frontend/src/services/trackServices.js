import api from './Api/api';

const getCurrentTrackData = (workout_id) => {
  return api
    .get(`/api/auth/splits/workouts/exercises/currentData/${workout_id}`)
    .then((data) => {
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
      return data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const addTrackData = async (workout_id, currentTrackData) => {
  return api
    .post(`/api/auth/split/workout/exercise/track`, { workout_id, currentTrackData })
    .then(() => {
      return getPrevTrackData(workout_id);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getHistoryTrackData = async (workout_id, exercise_id) => {
  return api
    .post(`/api/auth/splits/workouts/history/${workout_id}`, { exercise_id })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const trackServices = {
  getCurrentTrackData,
  getPrevTrackData,
  addTrackData,
  getHistoryTrackData,
};

export default trackServices;
