import { usePreviousWorkoutData } from '../../hooks/usePreviousWorkout';
import { Skeleton } from '@mui/material';

function PreviousWorkout() {
  const { previousWorkout, workoutExercisesArray, isLoading } =
    usePreviousWorkoutData();

  return (
    <div className='h-full w-full rounded-xl border-2 border-sky-500 px-2 py-4'>
      {isLoading ? (
        <div className='w-3/4'>
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
        </div>
      ) : (
        <div className='flex max-h-full flex-col overflow-hidden'>
          <div className='mb-2 flex justify-between'>
            <div className='flex gap-2'>
              <h1>Your previous workout:</h1>
              <h2>{previousWorkout?.workouts?.workout_name}</h2>
            </div>
            <h1> Week {previousWorkout?.week}</h1>
          </div>

          <div>
            <h1>Exercises: </h1>
            {workoutExercisesArray?.map((exercise) => {
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
      )}
    </div>
  );
}

export default PreviousWorkout;
