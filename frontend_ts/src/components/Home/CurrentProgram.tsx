import { useCurrentProgramData } from '../../hooks/useCurrentProgram';
import Skeleton from '@mui/material/Skeleton';
import HomeWrapper from '../../ui/Home/HomeWrapper';

function CurrentProgram() {
  const { currentProgramData, workoutsForProgramData, isLoading } =
    useCurrentProgramData();

  return (
    <HomeWrapper>
      {isLoading ? (
        <div className='w-1/2'>
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
        </div>
      ) : (
        <div className='flex max-h-full flex-col overflow-hidden'>
          <div className='mb-6 flex items-center gap-2'>
            <h1 className='text-xl'>Current Program:</h1>
            <h1 className=' text-primary-foreground text-xl'>
              {currentProgramData?.programs_name}
            </h1>
          </div>

          <h1 className='text-base'>Workouts: </h1>
          {workoutsForProgramData?.map((workout, index) => {
            return (
              <div key={workout.workouts_id} className='flex gap-2 pl-4'>
                <h1 className='text-sm'>{`Day ${index + 1}:`}</h1>
                <h1 className='text-sm'>{workout.workout_name}</h1>
              </div>
            );
          })}
        </div>
      )}
    </HomeWrapper>
  );
}

export default CurrentProgram;
