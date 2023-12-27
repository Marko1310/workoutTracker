import { useQuery } from '@tanstack/react-query';
import workoutServices from '../services/workoutServices';
import { AllProgramsDto } from '../types/workoutData';

export const useAllPrograms = (userId: number | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['all-programs', userId],
    queryFn: () => workoutServices.getAllPrograms(userId),
    enabled: !!userId,
  });

  const allProgramsData: AllProgramsDto = data?.data;

  return { allProgramsData, isLoading, error };
};
