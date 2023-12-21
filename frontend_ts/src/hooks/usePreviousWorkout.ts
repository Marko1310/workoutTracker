import { useDetailsForWorkout } from '../queries/detailsForWorkout';
import { usePreviousWorkout } from '../queries/previousWorkoutQuerie';

export const usePreviousWorkoutData = (userId: number | undefined) => {
  const {
    previousWorkout,
    isLoading: loadingWorkout,
    error: errorWorkout,
  } = usePreviousWorkout(userId);

  const {
    workoutExercisesArray,
    isLoading: loadingExercises,
    error: errorExercises,
  } = useDetailsForWorkout(
    previousWorkout?.workouts.workouts_id,
    previousWorkout?.week,
  );

  const isLoading = loadingWorkout || loadingExercises;
  const error = errorWorkout || errorExercises;

  return { previousWorkout, workoutExercisesArray, isLoading, error };
};
