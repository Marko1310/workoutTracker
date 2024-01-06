import { addNewSessionArrayDto } from '../components/Session/types';
import { workout_api } from './api_config';

const addNewSession = async (
  workoutId: number,
  sessionData: addNewSessionArrayDto,
) => {
  return await workout_api.post(`sessions/${workoutId}`, sessionData);
};

export default {
  addNewSession,
};
