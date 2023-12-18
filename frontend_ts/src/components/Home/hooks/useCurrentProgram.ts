import { useCurrentProgram } from '../queries/currentProgramQuerie';
import { useWorkoutsForProgram } from '../queries/workoutsForProgramQuerie';

export const useCurrentProgramData = (userId: number | undefined) => {
  const { currentProgram, loadingProgram, errorProgram } =
    useCurrentProgram(userId);

  const { workoutsForProgram, laodingWorkouts, errorWorkouts } =
    useWorkoutsForProgram(userId, currentProgram?.data.id);

  const isLoading = loadingProgram || laodingWorkouts;
  const error = errorProgram || errorWorkouts;

  return { currentProgram, workoutsForProgram, isLoading, error };
};
