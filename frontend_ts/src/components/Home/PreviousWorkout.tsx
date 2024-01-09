import { usePreviousWorkoutData } from '../../hooks/usePreviousWorkout';
import { Skeleton } from '@mui/material';
import HomeWrapper from '../../ui/Home/HomeWrapper';

function PreviousWorkout() {
  const { previousWorkoutWithDetails, isLoading } = usePreviousWorkoutData();

  return (
    <HomeWrapper>
      {isLoading ? (
        <div className='w-3/4'>
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
        </div>
      ) : (
        <div className='flex max-h-full w-full flex-col overflow-hidden'>
          <div className='mb-2 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <h1 className='text-lg'>Your previous workout:</h1>
              <h2 className='text-primary-foreground text-lg'>
                {previousWorkoutWithDetails?.workout_name}
              </h2>
            </div>
            <h1 className='text-primary-foreground'>
              Week {previousWorkoutWithDetails?.week}
            </h1>
          </div>

          <div>
            <h1>Exercises: </h1>
            {previousWorkoutWithDetails?.exercises?.map((exercise) => {
              return (
                <div
                  key={exercise.exercises_id}
                  className='flex items-center gap-3 pl-4 '
                >
                  <h2 className='items-stretch text-sm'>
                    {exercise.exercise_name}:
                  </h2>
                  <div className='flex gap-2 text-sm'>
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
    </HomeWrapper>
  );
}

export default PreviousWorkout;
