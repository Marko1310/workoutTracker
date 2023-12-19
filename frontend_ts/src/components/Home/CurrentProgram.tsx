import { useAuth } from '../../context/AuthContext';
import { useCurrentProgramData } from '../../hooks/useCurrentProgram';

function CurrentProgram() {
  const { user } = useAuth()!;

  const { currentProgramData, workoutsForProgramData, isLoading, error } =
    useCurrentProgramData(user?.id);

  return (
    <div className='h-32 w-full rounded-xl border-2 border-sky-500 p-2'>
      <div className='flex gap-2'>
        <div className='flex flex-col'>
          <h1>
            Your current Program:
            {isLoading ? 'loading' : currentProgramData?.programs_name}
          </h1>

          {isLoading
            ? 'loading'
            : workoutsForProgramData?.map((workout) => {
                return (
                  <h1 key={workout.workouts_id}>{workout.workout_name}</h1>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default CurrentProgram;
