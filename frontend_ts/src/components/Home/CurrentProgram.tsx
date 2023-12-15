import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import workoutServices from '../../services/workoutServices';

function CurrentProgram() {
  const { user } = useAuth()!;

  const {
    data: currentProgram,
    laoding,
    error,
  } = useQuery({
    queryKey: ['programs', user?.id],
    queryFn: () => workoutServices.getCurrentProgram(user?.id),
    enabled: !!user?.id,
  });

  return (
    <div className='h-32 w-full rounded-xl border-2 border-sky-500 p-2'>
      <div className='flex gap-2'>
        <h1> Your current Program:</h1>
        <h1>{currentProgram?.data.workout_split_name} </h1>
      </div>
    </div>
  );
}

export default CurrentProgram;
