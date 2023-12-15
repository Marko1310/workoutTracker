import { workout_api } from './api_config';

const getAllWorkouts = async (id: number) => {
  return await workout_api.get(`workouts/${id}`);
};

const getCurrentProgram = async (id: number) => {
  return await workout_api.get(`workout-splits/currentWorkoutSplit/${id}`);
};

export default {
  getAllWorkouts,
  getCurrentProgram,
};
