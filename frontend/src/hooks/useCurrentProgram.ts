import { useCurrentProgram } from '../queries/programQueries';
import { useWorkoutsForProgram } from '../queries/workoutQueries';

export const useCurrentProgramData = () => {
  const {
    currentProgramData,
    isLoading: loadingProgram,
    error: errorProgram,
  } = useCurrentProgram();

  const {
    workoutsForProgramData,
    isLoading: laodingWorkouts,
    error: errorWorkouts,
  } = useWorkoutsForProgram(currentProgramData?.programs_id);

  const isLoading = loadingProgram || laodingWorkouts;
  const error = errorProgram || errorWorkouts;

  return { currentProgramData, workoutsForProgramData, isLoading, error };
};
