import { useAuth } from '../../context/AuthContext';
import { WorkoutDto } from '../../types/workoutData';
import { useCurrentProgramData } from './hooks/useCurrentProgram';

function CurrentProgram() {
  const { user } = useAuth()!;

  const { currentProgram, workoutsForProgram, isLoading, error } =
    useCurrentProgramData(user?.id);

  return (
    <div className='h-32 w-full rounded-xl border-2 border-sky-500 p-2'>
      <div className='flex gap-2'>
        <div className='flex flex-col'>
          <h1>
            Your current Program:
            {isLoading ? 'loading' : currentProgram?.data.workout_split_name}
          </h1>

          {isLoading
            ? 'loading'
            : workoutsForProgram?.data.map((el: WorkoutDto) => {
                return <h1>{el.workout_name}</h1>;
              })}
        </div>
      </div>
    </div>
  );
}

export default CurrentProgram;
