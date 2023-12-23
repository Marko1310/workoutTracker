import { useQuery } from '@tanstack/react-query';
import workoutServices from '../services/workoutServices';
import { workoutLogDto } from '../types/workoutData';

export const useWorkoutLogsByYear = (
  userId: number | undefined,
  year: number,
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['workoutLogsByYear', userId],
    queryFn: () => workoutServices.getAllWokoutLogsByYear(userId, year),
    enabled: !!userId,
  });

  const workoutLogsByYear: workoutLogDto = data?.data;

  return { workoutLogsByYear, isLoading, error };
};
