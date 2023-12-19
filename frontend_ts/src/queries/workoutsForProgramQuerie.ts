import { useQuery } from '@tanstack/react-query';
import workoutServices from '../services/workoutServices';
import { WorkoutDto } from '../types/workoutData';

export const useWorkoutsForProgram = (
  userId: number | undefined,
  programId: number,
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['workoutsForProgram', programId],
    queryFn: () =>
      workoutServices.getWorkoutsFromCurrentProgram(userId, programId),
    enabled: !!programId,
  });

  const workoutsForProgramData: WorkoutDto[] = data?.data;

  return { workoutsForProgramData, isLoading, error };
};
