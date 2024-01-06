import { useParams } from 'react-router-dom';
import { useWorkoutData } from '../../hooks/useWorkoutData';
import Exercise from './Exercise';
import { useFieldArray, useForm } from 'react-hook-form';
import { addNewSessionArrayDto } from './types';
import { useAddNewSession } from '../../queries/sessionQueries';

function WorkoutSession() {
  const { workoutId } = useParams();
  const workout_id = parseInt(workoutId!, 10);
  const { workout } = useWorkoutData(workout_id);

  const {
    control,
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<addNewSessionArrayDto>({
    defaultValues: {
      exercisesData: workout?.exercises?.map((exercise) => ({
        exerciseId: exercise?.exercises_id,
        exercise_name: exercise?.exercise_name,
        sets: exercise?.sessions?.map((session) => ({
          previousWeight: session?.weight,
          previousReps: session?.reps,
          weight: null,
          reps: null,
        })) || [
          { previousWeight: 0, previousReps: 0, weight: null, reps: null },
        ],
      })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'exercisesData',
  });

  const { mutate } = useAddNewSession();
  const onSubmit = (data: addNewSessionArrayDto) =>
    mutate({ workout_id, workoutData: data });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=' h-fit flex-col'>
        <div className='flex w-full items-center justify-between border-b border-black pb-2'>
          <p className='text-xl font-bold'>{workout?.workout_name}</p>
          <p>{workout?.week ? `# Week ${workout?.week + 1}` : `# Week 1`}</p>
          <button
            disabled={!isValid}
            type='submit'
            className='rounded-lg bg-blue-300 px-4 py-2 hover:bg-blue-400 disabled:bg-slate-400'
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
