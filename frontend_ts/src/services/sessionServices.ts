import { addNewSessionArrayDto } from '../components/Session/types';
import { workout_api } from './api_config';

const addNewSession = async (
  workoutId: number,
  sessionData: addNewSessionArrayDto,
) => {
  return await workout_api.post(`sessions/${workoutId}`, sessionData);
};

const getSetCount = async () => {
  return await workout_api.get(`sessions/count/sets`);
};

const getTotalReps = async () => {
  return await workout_api.get(`sessions/count/reps`);
};

const getTotalWeight = async () => {
  return await workout_api.get(`sessions/count/weight`);
};

export default {
  addNewSession,
  getSetCount,
  getTotalReps,
  getTotalWeight,
};
