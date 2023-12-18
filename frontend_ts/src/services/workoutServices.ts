import { workout_api } from './api_config';

const getAllWorkouts = async (userId: number) => {
  return await workout_api.get(`workouts/${userId}`);
};

const getCurrentProgram = async (userId: number | undefined) => {
  return await workout_api.get(`workout-splits/currentWorkoutSplit/${userId}`);
};

const getWorkoutsFromCurrentProgram = async (
  userId: number | undefined,
  programId: number,
) => {
  return await workout_api.get(`workouts/${userId}/${programId}`);
};

export default {
  getAllWorkouts,
  getCurrentProgram,
  getWorkoutsFromCurrentProgram,
};
