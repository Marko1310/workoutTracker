import { AddNewWorkoutDto } from '../types/forms';
import { workout_api } from './api_config';

const getAllWorkouts = async (userId: number) => {
  return await workout_api.get(`workouts/${userId}`);
};

const getWorkoutsFromCurrentProgram = async (programId: number) => {
  return await workout_api.get(`workouts/workoutsForProgram/${programId}`);
};

const getPreviousWorkout = async () => {
  return await workout_api.get(`workouts/previous`);
};

const getPreviousWorkoutWithDetails = async (workoutId: number) => {
  return await workout_api.get(`workouts/previous/details/${workoutId}`);
};

const getWorkoutWithExericses = async (workoutId: number) => {
  return await workout_api.get(`workouts/withexercises/${workoutId}`);
};

const getAllWokoutLogsByYear = async (year: number) => {
  return await workout_api.get(`workout-logs/year/${year}`);
};

const getWorkoutLogsByWeek = async (startDate: string, endDate: string) => {
  return await workout_api.get(
    `workout-logs/week?startDate=${startDate}&endDate=${endDate}`,
  );
};

const addNewWorkout = async (
  programId: number,
  workoutData: AddNewWorkoutDto,
) => {
  const { title, exercises } = workoutData;
  return await workout_api.post(`workouts/${programId}`, { title, exercises });
};

const deleteWorkout = async (workoutId: number) => {
  return await workout_api.delete(`workouts/${workoutId}`);
};

const getWorkoutLogCount = async () => {
  return await workout_api.get(`workout-logs/count`);
};

export default {
  getAllWorkouts,
  getWorkoutsFromCurrentProgram,
  getPreviousWorkout,
  getPreviousWorkoutWithDetails,
  getWorkoutWithExericses,
  getAllWokoutLogsByYear,
  getWorkoutLogsByWeek,
  addNewWorkout,
  deleteWorkout,
  getWorkoutLogCount,
};
