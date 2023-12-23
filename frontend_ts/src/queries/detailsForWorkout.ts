import { useQuery } from '@tanstack/react-query';
import workoutServices from '../services/workoutServices';
import { exercisesArrayDto } from '../types/workoutData';

export const useDetailsForWorkout = (workoutId: number, week: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['detailsForWorkout', workoutId],
    queryFn: () => workoutServices.getDetailsForWorkoutByWeek(workoutId, week),
    enabled: !!workoutId,
  });

  //TODO: preetier
  const workoutExercisesArray: exercisesArrayDto = data?.data[0]?.exercises;

  return { workoutExercisesArray, isLoading, error };
};
