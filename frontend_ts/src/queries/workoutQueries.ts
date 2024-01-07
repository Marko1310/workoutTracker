import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import workoutServices from '../services/workoutServices';
import {
  exercisesArrayDto,
  previousWorkoutDetailsDto,
} from '../types/workoutData';
import { previousWorkoutDto } from '../types/workoutData';
import { workoutLogDto } from '../types/workoutData';
import { WorkoutDto } from '../types/workoutData';
import { AddNewWorkoutDto } from '../types/forms';

const useAddNewWorkout = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: { programId: number; workoutData: AddNewWorkoutDto }) =>
      workoutServices.addNewWorkout(data.programId, data.workoutData),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['all-programs'],
      });
      queryClient.invalidateQueries({
        queryKey: ['workoutsForProgram'],
      });
    },
  });
  return { mutate };
};

const useDeleteWorkout = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: number) => workoutServices.deleteWorkout(data),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['all-programs'],
      });
      queryClient.invalidateQueries({
        queryKey: ['workoutsForProgram'],
      });
    },
  });
  return { mutate, isPending };
};

const usePreviousWorkoutWithDetails = (workoutId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['previousWorkoutWithDetails', workoutId],
    queryFn: () => workoutServices.getPreviousWorkoutWithDetails(workoutId),
    enabled: !!workoutId,
  });
  const previousWorkoutWithDetails: previousWorkoutDetailsDto = data?.data;
  return { previousWorkoutWithDetails, isLoading, error };
};

const useWorkoutWithExercises = (workoutId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['workoutWithExercises', workoutId],
    queryFn: () => workoutServices.getWorkoutWithExericses(workoutId),
    enabled: !!workoutId,
  });
  const workoutWithExercises = data?.data;
  return { workoutWithExercises, isLoading, error };
};

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
    queryFn: () => workoutServices.getAllWokoutLogsByYear(year),
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
  usePreviousWorkoutWithDetails,
  useWorkoutWithExercises,
  useDetailsForWorkout,
  useAddNewWorkout,
  useDeleteWorkout,
};
