import { useParams } from 'react-router-dom';
import { useWorkoutData } from '../../hooks/useWorkoutData';
import Exercise from './Exercise';

function WorkoutSession() {
  const { workoutId } = useParams();
  const numericWorkoutId = parseInt(workoutId!, 10);
  const { workout } = useWorkoutData(numericWorkoutId);

  return (
    <div className=' h-fit flex-col'>
      <div className='flex w-full items-center justify-between border-b border-black pb-2'>
        <p className='text-xl font-bold'>{workout?.workout_name}</p>
        <p>{workout?.week ? `# Week ${workout?.week + 1}` : `# Week 1`}</p>
        <button className='rounded-lg bg-blue-300 px-3 py-1'>Finish</button>
      </div>

      {workout?.exercises?.map((exercise) => {
        return <Exercise key={exercise?.exercises_id} exercise={exercise} />;
      })}
    </div>
  );
}
export default WorkoutSession;
