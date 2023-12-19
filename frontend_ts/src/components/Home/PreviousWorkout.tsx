import { useAuth } from '../../context/AuthContext';
import { usePreviousWorkoutData } from '../../hooks/usePreviousWorkout';

function PreviousWorkout() {
  const { user } = useAuth()!;
  const { previousWorkout, workoutExercisesArray, isLoading, error } =
    usePreviousWorkoutData(user?.id);

  return (
    <div className='h-40 w-full rounded-xl border-2 border-sky-500 p-2'>
      <div className='flex h-full flex-col overflow-hidden'>
        <h1>
          Previous workout:
          {isLoading ? 'loading' : previousWorkout?.result.workout_name}
        </h1>
        <h1> Week {previousWorkout?.week}</h1>

        {isLoading
          ? 'loading'
          : workoutExercisesArray?.map((exercise) => {
              return (
                <div key={exercise.exercises_id} className='flex'>
                  <h1 className='items-stretch'>{exercise.exercise_name}:</h1>
                  <div className='flex gap-2'>
                    {exercise.sessionsData.map((session) => {
                      return (
                        <h1 key={session.sessions_id}>
                          {session.reps}x{session.weight},
                        </h1>
                      );
                    })}
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default PreviousWorkout;
