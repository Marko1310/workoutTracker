import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Exercise from './Exercise';
import { useWorkoutData } from '../../hooks/useWorkoutData';
import { useAddNewSession } from '../../queries/sessionQueries';
import { useFieldArray, useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import { addNewSessionArrayDto } from './types';

function WorkoutSession() {
  const { workoutId } = useParams();
  const workout_id = parseInt(workoutId!, 10);
  const { workout, isLoading } = useWorkoutData(workout_id);
  const [formData, setFormData] = useState<addNewSessionArrayDto | undefined>(
    undefined,
  );

  useEffect(() => {
    if (workout && !isLoading) {
      const defaultValues: addNewSessionArrayDto = {
        exercisesData: workout?.exercises?.map((exercise) => ({
          exerciseId: exercise?.exercises_id,
          exercise_name: exercise?.exercise_name,
          sets: exercise?.sessions?.map((session) => ({
            previousWeight: session?.weight,
            previousReps: session?.reps,
            weight: '',
            reps: '',
          })) || [{ previousWeight: 0, previousReps: 0, weight: '', reps: '' }],
        })),
      };
      setFormData(defaultValues);
    }
  }, [workout, isLoading]);

  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { isValid },
  } = useForm<addNewSessionArrayDto>();

  useEffect(() => {
    if (formData) {
      setValue('exercisesData', formData.exercisesData);
    }
  }, [formData, setValue]);

  const { fields } = useFieldArray({
    control,
    name: 'exercisesData',
  });

  const { mutate, isPending } = useAddNewSession();
  const onSubmit = (data: addNewSessionArrayDto) =>
    mutate({ workout_id, workoutData: data });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=' h-fit flex-col lg:px-16'>
          <div className='flex w-full items-center justify-between border-b border-black pb-2'>
            <p className='text-primary-foreground text-xl font-bold'>
              {workout?.workout_name}
            </p>
            <p>{workout?.week ? `# Week ${workout?.week + 1}` : `# Week 1`}</p>
            <button
              disabled={!isValid || isPending}
              type='submit'
              className='hover:bg-accent-foreground rounded-lg bg-accent px-4 py-3 transition-all disabled:bg-slate-400'
            >
              {isPending ? 'Saving...' : 'Finish Workout'}
            </button>
          </div>

          {isLoading || isPending ? (
            <div className='w-ful mt-8 flex h-full items-center justify-center'>
              <CircularProgress color='warning' size={80} />
            </div>
          ) : (
            fields?.map((exercise, index) => {
              return (
                <Exercise
                  key={index}
                  index={index}
                  exercise={exercise}
                  control={control}
                  register={register}
                />
              );
            })
          )}
        </div>
      </form>
    </>
  );
}
export default WorkoutSession;
