import { useQuery } from '@tanstack/react-query';
import workoutServices from '../../../services/workoutServices';

export const useCurrentProgram = (userId: number | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['currentProgram', userId],
    queryFn: () => workoutServices.getCurrentProgram(userId),
    enabled: !!userId,
  });

  return { data, isLoading, error };
};
