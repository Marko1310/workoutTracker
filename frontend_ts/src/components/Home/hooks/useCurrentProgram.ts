import { useCurrentProgram } from '../queries/currentProgramQuerie';
import { useWorkoutsForProgram } from '../queries/workoutsForProgramQuerie';

export const useCurrentProgramData = (userId: number | undefined) => {
  const {
    data: currentProgram,
    isLoading: loadingProgram,
    error: errorProgram,
  } = useCurrentProgram(userId);
  // const currentProgramData = currentProgram?.data;

  const { workoutsForProgram, laodingWorkouts, errorWorkouts } =
    useWorkoutsForProgram(userId, currentProgram?.data.workout_split_id);

  const isLoading = loadingProgram || laodingWorkouts;
  const error = errorProgram || errorWorkouts;

  return { currentProgram, workoutsForProgram, isLoading, error };
};
