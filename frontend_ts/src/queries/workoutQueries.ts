import { useQuery } from '@tanstack/react-query';
import workoutServices from '../services/workoutServices';
import { exercisesArrayDto } from '../types/workoutData';
import { previousWorkoutDto } from '../types/workoutData';
import { workoutLogDto } from '../types/workoutData';
import { WorkoutDto } from '../types/workoutData';

const useWorkoutsForProgram = (
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

const useWorkoutLogsByYear = (userId: number | undefined, year: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['workoutLogsByYear', userId],
    queryFn: () => workoutServices.getAllWokoutLogsByYear(userId, year),
    enabled: !!userId,
  });

  const workoutLogsByYear: workoutLogDto = data?.data;

  return { workoutLogsByYear, isLoading, error };
};

const usePreviousWorkout = (userId: number | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['previousWorkout', userId],
    queryFn: () => workoutServices.getPreviousWorkout(userId),
    enabled: !!userId,
  });

  const previousWorkout: previousWorkoutDto = data?.data;

  return { previousWorkout, isLoading, error };
};

const useDetailsForWorkout = (workoutId: number, week: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['detailsForWorkout', workoutId],
    queryFn: () => workoutServices.getDetailsForWorkoutByWeek(workoutId, week),
    enabled: !!workoutId,
  });

  //TODO: preetier
  const workoutExercisesArray: exercisesArrayDto = data?.data[0]?.exercises;

  return { workoutExercisesArray, isLoading, error };
};

export {
  useWorkoutsForProgram,
  useWorkoutLogsByYear,
  usePreviousWorkout,
  useDetailsForWorkout,
};
