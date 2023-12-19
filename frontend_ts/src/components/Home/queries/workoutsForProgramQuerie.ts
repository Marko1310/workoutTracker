import { useQuery } from '@tanstack/react-query';
import workoutServices from '../../../services/workoutServices';

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

  return { data, isLoading, error };
};
