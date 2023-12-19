import { useQuery } from '@tanstack/react-query';
import workoutServices from '../services/workoutServices';
import { previousWorkoutDto } from '../types/workoutData';

export const usePreviousWorkout = (userId: number | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['previousWorkout', userId],
    queryFn: () => workoutServices.getPreviousWorkout(userId),
    enabled: !!userId,
  });

  const previousWorkout: previousWorkoutDto = data?.data;

  return { previousWorkout, isLoading, error };
};
