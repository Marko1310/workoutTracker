import { workout_api } from './api_config';

type AddNewProgramDto = {
  title: string;
  days: number;
};

const getAllPrograms = async (userId: number | undefined) => {
  return await workout_api.get(`programs/${userId}`);
};

const addNewProgram = async (data: AddNewProgramDto) => {
  const { title, days } = data;
  return await workout_api.post(`programs/program`, { title, days });
};

export default {
  getAllPrograms,
  addNewProgram,
};
