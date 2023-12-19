import { useCurrentProgram } from '../queries/currentProgramQuerie';
import { useWorkoutsForProgram } from '../queries/workoutsForProgramQuerie';

export const useCurrentProgramData = (userId: number | undefined) => {
  const {
    currentProgramData,
    isLoading: loadingProgram,
    error: errorProgram,
  } = useCurrentProgram(userId);

  const {
    workoutsForProgramData,
    isLoading: laodingWorkouts,
    error: errorWorkouts,
  } = useWorkoutsForProgram(userId, currentProgramData?.programs_id);

  const isLoading = loadingProgram || laodingWorkouts;
  const error = errorProgram || errorWorkouts;

  return { currentProgramData, workoutsForProgramData, isLoading, error };
};
