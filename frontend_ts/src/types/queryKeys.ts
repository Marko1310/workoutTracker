const programQueryKeys = {
  ALL_PROGRAMS: 'all-programs',
  CURRENT_PROGRAM: 'current-program',
} as const;

const workoutQueryKeys = {
  WORKOUTS_FOR_PROGRAM: 'workouts-for-program',
  WORKOUTS_WITH_EXERCISES: 'workouts-with-exercises',
  WORKOUT_LOGS_BY_YEAR: 'workout-logs-by-year',
  WORKOUT_LOGS_BY_WEEK: 'workout-logs-by-week',
  PREVIOUS_WORKOUT: 'previous-workout',
  PREVIOUS_WORKOUT_DETAILS: 'previous-workout-details',
  DETAILS_FOR_WORKOUT: 'details-for-workout',
  WORKOUT_LOGS_COUNT: 'workout-logs-count',
} as const;

const sessionQueryKeys = {
  SET_COUNT: 'set-count',
  TOTAL_REPS: 'total-reps',
  TOTAL_WEIGHT: 'total-weight',
};

export { programQueryKeys, workoutQueryKeys, sessionQueryKeys };
