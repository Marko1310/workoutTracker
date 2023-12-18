import { useQuery } from '@tanstack/react-query';
import workoutServices from '../../../services/workoutServices';

export const useCurrentProgram = (userId: number | undefined) => {
  const {
    data: currentProgram,
    isLoading: loadingProgram,
    error: errorProgram,
  } = useQuery({
    queryKey: ['programs', userId],
    queryFn: () => workoutServices.getCurrentProgram(userId),
    enabled: !!userId,
  });

  return { currentProgram, loadingProgram, errorProgram };
};
