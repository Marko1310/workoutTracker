import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import workoutServices from '../services/workoutServices';
import {
  exercisesArrayDto,
  previousWorkoutDetailsDto,
  workoutLogsByWeekDto,
} from '../types/workoutData';
import { previousWorkoutDto } from '../types/workoutData';
import { workoutLogDto } from '../types/workoutData';
import { WorkoutDto } from '../types/workoutData';
import { AddNewWorkoutDto } from '../types/forms';
import { toast } from 'react-hot-toast';
import { programQueryKeys, workoutQueryKeys } from '../types/queryKeys';

const useAddNewWorkout = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { programId: number; workoutData: AddNewWorkoutDto }) =>
      workoutServices.addNewWorkout(data.programId, data.workoutData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [programQueryKeys.ALL_PROGRAMS],
      });
      queryClient.invalidateQueries({
        queryKey: [workoutQueryKeys.WORKOUTS_FOR_PROGRAM],
      });
      toast.success('Workout successfully added');
    },
  });
  return { mutate, isPending };
};

const useDeleteWorkout = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: number) => workoutServices.deleteWorkout(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [programQueryKeys.ALL_PROGRAMS],
      });
      queryClient.invalidateQueries({
        queryKey: [workoutQueryKeys.WORKOUTS_FOR_PROGRAM],
      });
      toast.success('Workout successfully deleted');
    },
    onError: () => {
      toast.error('Workout could not be deleted');
    },
  });
  return { mutate, isPending };
};

const usePreviousWorkoutWithDetails = (workoutId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [workoutQueryKeys.PREVIOUS_WORKOUT_DETAILS, workoutId],
    queryFn: () => workoutServices.getPreviousWorkoutWithDetails(workoutId),
    enabled: !!workoutId,
  });
  const previousWorkoutWithDetails: previousWorkoutDetailsDto = data?.data;
  return { previousWorkoutWithDetails, isLoading, error };
};

const useWorkoutWithExercises = (workoutId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [workoutQueryKeys.WORKOUTS_WITH_EXERCISES, workoutId],
    queryFn: () => workoutServices.getWorkoutWithExericses(workoutId),
    enabled: !!workoutId,
  });
  const workoutWithExercises = data?.data;
  return { workoutWithExercises, isLoading, error };
};

const useWorkoutsForProgram = (programId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [workoutQueryKeys.WORKOUTS_FOR_PROGRAM, programId],
    queryFn: () => workoutServices.getWorkoutsFromCurrentProgram(programId),
    enabled: !!programId,
  });

  const workoutsForProgramData: WorkoutDto[] = data?.data;
  return { workoutsForProgramData, isLoading, error };
};

const useWorkoutLogsByYear = (year: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [workoutQueryKeys.WORKOUT_LOGS_BY_YEAR, year],
    queryFn: () => workoutServices.getAllWokoutLogsByYear(year),
  });
  const workoutLogsByYear: workoutLogDto = data?.data;
  return { workoutLogsByYear, isLoading, error };
};

const useWorkoutLogsByWeek = (startDate: string, endDate: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [workoutQueryKeys.WORKOUT_LOGS_BY_WEEK],
    queryFn: () => workoutServices.getWorkoutLogsByWeek(startDate, endDate),
  });
  const workoutLogsByWeek: workoutLogsByWeekDto = data?.data;
  return { workoutLogsByWeek, isLoading, error };
};

const usePreviousWorkout = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [workoutQueryKeys.PREVIOUS_WORKOUT],
    queryFn: () => workoutServices.getPreviousWorkout(),
  });

  const previousWorkout: previousWorkoutDto = data?.data;
  return { previousWorkout, isLoading, error };
};

const useDetailsForWorkout = (workoutId: number, week: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [workoutQueryKeys.DETAILS_FOR_WORKOUT, workoutId],
    queryFn: () => workoutServices.getDetailsForWorkoutByWeek(workoutId, week),
    enabled: !!workoutId,
  });

  //TODO: preetier
  const workoutExercisesArray: exercisesArrayDto = data?.data[0]?.exercises;
  return { workoutExercisesArray, isLoading, error };
};

const useGetWorkoutLogCount = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [workoutQueryKeys.WORKOUT_LOGS_COUNT],
    queryFn: () => workoutServices.getWorkoutLogCount(),
  });
  const workoutLogCount = data?.data?.workoutLogCount;
  return { workoutLogCount, isLoading, error };
};

export {
  useWorkoutsForProgram,
  useWorkoutLogsByYear,
  useWorkoutLogsByWeek,
  usePreviousWorkout,
  usePreviousWorkoutWithDetails,
  useWorkoutWithExercises,
  useDetailsForWorkout,
  useAddNewWorkout,
  useDeleteWorkout,
  useGetWorkoutLogCount,
};
