import {
  usePreviousWorkoutWithDetails,
  useWorkoutWithExercises,
} from '../queries/workoutQueries';
import { previousWorkoutDetailsDto } from '../types/workoutData';

export const useWorkoutData = (workoutId: number) => {
  const {
    previousWorkoutWithDetails,
    isLoading: loadingWorkoutWithDetails,
    error: errorWorkout,
  } = usePreviousWorkoutWithDetails(workoutId);

  const {
    workoutWithExercises,
    isLoading: loadingWorkoutWithExercises,
    error: errorExercises,
  } = useWorkoutWithExercises(workoutId);

  const isLoading = loadingWorkoutWithDetails || loadingWorkoutWithExercises;
  const error = errorWorkout || errorExercises;

  const objectEmpty = (object: previousWorkoutDetailsDto) => {
    return object && Object.keys(object).length !== 0;
  };

  const workout: previousWorkoutDetailsDto = objectEmpty(
    previousWorkoutWithDetails,
  )
    ? previousWorkoutWithDetails
    : workoutWithExercises;

  return { workout, isLoading, error };
};
