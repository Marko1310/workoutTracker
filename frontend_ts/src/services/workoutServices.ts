import { AddNewWorkoutDto } from '../types/forms';
import { workout_api } from './api_config';

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

const getPreviousWorkoutWithDetails = async (workoutId: number) => {
  return await workout_api.get(`workouts/previous/details/${workoutId}`);
};

const getWorkoutWithExericses = async (workoutId: number) => {
  return await workout_api.get(`workouts/${workoutId}`);
};

const getDetailsForWorkoutByWeek = async (workoutId: number, week: number) => {
  return await workout_api.get(`workouts/details/${workoutId}/${week}`);
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

export default {
  getAllWorkouts,
  getCurrentProgram,
  getWorkoutsFromCurrentProgram,
  getPreviousWorkout,
  getPreviousWorkoutWithDetails,
  getWorkoutWithExericses,
  getDetailsForWorkoutByWeek,
  getAllWokoutLogsByYear,
  getWorkoutLogsByWeek,
  addNewWorkout,
  deleteWorkout,
};
