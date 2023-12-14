import { workout_api } from './api_config';

const getAllWorkouts = async (id: number) => {
  return await workout_api.get(`workouts/${id}`);
};

export default {
  getAllWorkouts,
};
