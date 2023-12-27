import { workout_api } from './api_config';

const getAllPrograms = async (userId: number | undefined) => {
  return await workout_api.get(`programs/${userId}`);
};

const getAllWorkouts = async (userId: number) => {
  return await workout_api.get(`workouts/${userId}`);
};

const getCurrentProgram = async (userId: number | undefined) => {
  return await workout_api.get(`programs/currentProgram/${userId}`);
};

const getWorkoutsFromCurrentProgram = async (
  userId: number | undefined,
  programId: number,
) => {
  return await workout_api.get(
    `workouts/workoutsForProgram/${userId}/${programId}`,
  );
};

const getPreviousWorkout = async (userId: number | undefined) => {
  return await workout_api.get(`workouts/previous/${userId}`);
};

const getDetailsForWorkoutByWeek = async (workoutId: number, week: number) => {
  return await workout_api.get(`workouts/details/${workoutId}/${week}`);
};

const getAllWokoutLogsByYear = async (
  userId: number | undefined,
  year: number,
) => {
  return await workout_api.get(`workout-logs/${userId}/${year}`);
};

export default {
  getAllPrograms,
  getAllWorkouts,
  getCurrentProgram,
  getWorkoutsFromCurrentProgram,
  getPreviousWorkout,
  getDetailsForWorkoutByWeek,
  getAllWokoutLogsByYear,
};
