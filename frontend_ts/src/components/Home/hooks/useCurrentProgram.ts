import { ProgramDto, WorkoutDto } from '../../../types/workoutData';
import { useCurrentProgram } from '../queries/currentProgramQuerie';
import { useWorkoutsForProgram } from '../queries/workoutsForProgramQuerie';

export const useCurrentProgramData = (userId: number | undefined) => {
  const {
    data: currentProgram,
    isLoading: loadingProgram,
    error: errorProgram,
  } = useCurrentProgram(userId);
  const currentProgramData: ProgramDto = currentProgram?.data;

  const {
    data,
    isLoading: laodingWorkouts,
    error: errorWorkouts,
  } = useWorkoutsForProgram(userId, currentProgramData?.programs_id);
  const workoutsForProgramData: WorkoutDto[] = data?.data;

  const isLoading = loadingProgram || laodingWorkouts;
  const error = errorProgram || errorWorkouts;

  return { currentProgramData, workoutsForProgramData, isLoading, error };
};
