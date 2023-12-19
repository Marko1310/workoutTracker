import { useAuth } from '../../context/AuthContext';
import { useCurrentProgramData } from '../../hooks/useCurrentProgram';

function CurrentProgram() {
  const { user } = useAuth()!;

  const { currentProgramData, workoutsForProgramData, isLoading, error } =
    useCurrentProgramData(user?.id);

  return (
    <div className='h-full w-full rounded-xl border-2 border-sky-500 p-2'>
      <div className='flex max-h-full flex-col overflow-hidden'>
        <div className='mb-2 flex gap-2'>
          <h1>Your current Program:</h1>
          {isLoading ? 'loading' : <h1>{currentProgramData?.programs_name}</h1>}
        </div>

        <h1>Workouts: </h1>
        {isLoading
          ? 'loading'
          : workoutsForProgramData?.map((workout, index) => {
              return (
                <div key={workout.workouts_id} className='flex gap-2 pl-4'>
                  <h1>{`Day ${index + 1}:`}</h1>
                  <h1>{workout.workout_name}</h1>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default CurrentProgram;
