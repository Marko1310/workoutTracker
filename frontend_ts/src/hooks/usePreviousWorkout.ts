import {
  usePreviousWorkout,
  usePreviousWorkoutWithDetails,
} from '../queries/workoutQueries';

export const usePreviousWorkoutData = () => {
  const {
    previousWorkout,
    isLoading: loadingWorkout,
    error: errorWorkout,
  } = usePreviousWorkout();

  const {
    previousWorkoutWithDetails,
    isLoading: loadingExercises,
    error: errorExercises,
  } = usePreviousWorkoutWithDetails(previousWorkout?.workouts?.workouts_id);

  const isLoading = loadingWorkout || loadingExercises;
  const error = errorWorkout || errorExercises;

  return { previousWorkoutWithDetails, isLoading, error };
};
