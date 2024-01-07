import { useAuth } from '../../context/AuthContext';
import { usePreviousWorkoutData } from '../../hooks/usePreviousWorkout';

function PreviousWorkout() {
  const { user } = useAuth()!;
  const { previousWorkout, workoutExercisesArray, isLoading, error } =
    usePreviousWorkoutData(user?.id);

  return (
    <div className='h-full w-full rounded-xl border-2 border-sky-500 p-2'>
      <div className='flex max-h-full flex-col overflow-hidden'>
        <div className='mb-2 flex justify-between'>
          <div className='flex gap-2'>
            <h1>Your previous workout:</h1>
            <h2>
              {isLoading ? 'loading' : previousWorkout?.workouts.workout_name}
            </h2>
          </div>
          <h1> Week {previousWorkout?.week}</h1>
        </div>

        <div>
          <h1>Exercises: </h1>
          {isLoading
            ? 'loading'
            : workoutExercisesArray?.map((exercise) => {
                return (
                  <div key={exercise.exercises_id} className='flex gap-2 pl-4 '>
                    <h2 className='items-stretch'>{exercise.exercise_name}:</h2>
                    <div className='flex gap-2'>
                      {exercise?.sessions?.map((session) => {
                        return (
                          <h2 key={session.sessions_id}>
                            {session.weight}x{session.reps} |
                          </h2>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default PreviousWorkout;
