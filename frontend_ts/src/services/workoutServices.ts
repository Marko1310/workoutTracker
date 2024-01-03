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

const getDetailsForWorkoutByWeek = async (workoutId: number, week: number) => {
  return await workout_api.get(`workouts/details/${workoutId}/${week}`);
};

const getAllWokoutLogsByYear = async (
  userId: number | undefined,
  year: number,
) => {
  return await workout_api.get(`workout-logs/${userId}/${year}`);
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
  getDetailsForWorkoutByWeek,
  getAllWokoutLogsByYear,
  addNewWorkout,
  deleteWorkout,
};
