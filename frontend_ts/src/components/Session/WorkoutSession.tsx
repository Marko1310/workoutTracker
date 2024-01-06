import { useParams } from 'react-router-dom';
import { useWorkoutData } from '../../hooks/useWorkoutData';
import Exercise from './Exercise';
import { useFieldArray, useForm } from 'react-hook-form';
import { addNewSessionArrayDto } from './types';

function WorkoutSession() {
  const { workoutId } = useParams();
  const numericWorkoutId = parseInt(workoutId!, 10);
  const { workout } = useWorkoutData(numericWorkoutId);

  const {
    control,
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<addNewSessionArrayDto>({
    defaultValues: {
      exerciseData: workout?.exercises?.map((exercise) => ({
        exerciseId: exercise?.exercises_id,
        exercise_name: exercise?.exercise_name,
        sets: exercise?.sessions?.map((session) => ({
          previousWeight: session?.weight,
          previousReps: session?.reps,
          weight: null,
          reps: null,
        })) || [{ weight: 0, reps: 0 }],
      })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'exerciseData',
  });

  const onSubmit = (data: addNewSessionArrayDto) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=' h-fit flex-col'>
        <div className='flex w-full items-center justify-between border-b border-black pb-2'>
          <p className='text-xl font-bold'>{workout?.workout_name}</p>
          <p>{workout?.week ? `# Week ${workout?.week + 1}` : `# Week 1`}</p>
          <button
            disabled={!isValid}
            type='submit'
            className='rounded-lg bg-blue-300 px-3 py-1 hover:bg-blue-400 disabled:bg-slate-400'
          >
            Finish
          </button>
        </div>

        {fields?.map((exercise, index) => {
          return (
            <Exercise
              key={index}
              index={index}
              exercise={exercise}
              control={control}
              register={register}
            />
          );
        })}
      </div>
    </form>
  );
}
export default WorkoutSession;
