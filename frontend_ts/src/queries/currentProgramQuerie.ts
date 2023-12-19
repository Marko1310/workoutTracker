import { useQuery } from '@tanstack/react-query';
import workoutServices from '../services/workoutServices';
import { ProgramDto } from '../types/workoutData';

export const useCurrentProgram = (userId: number | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['programs', userId],
    queryFn: () => workoutServices.getCurrentProgram(userId),
    enabled: !!userId,
  });

  const currentProgramData: ProgramDto = data?.data;

  return { currentProgramData, isLoading, error };
};
