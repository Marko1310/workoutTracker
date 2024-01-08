import { workout_api } from './api_config';

type AddNewProgramDto = {
  title: string;
  days: number;
};

const getAllPrograms = async () => {
  return await workout_api.get(`programs/all`);
};

const getCurrentProgram = async () => {
  return await workout_api.get(`programs/current`);
};

const addNewProgram = async (newProgram: AddNewProgramDto) => {
  const { title, days } = newProgram;
  return await workout_api.post(`programs/program`, { title, days });
};

const deleteProgram = async (programId: number) => {
  return await workout_api.delete(`programs/${programId}`);
};

export default {
  getAllPrograms,
  getCurrentProgram,
  addNewProgram,
  deleteProgram,
};
