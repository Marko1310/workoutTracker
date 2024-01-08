import { useParams } from 'react-router-dom';
import { useWorkoutData } from '../../hooks/useWorkoutData';
import Exercise from './Exercise';
import { useFieldArray, useForm } from 'react-hook-form';
import { addNewSessionArrayDto } from './types';
import { useAddNewSession } from '../../queries/sessionQueries';
import { useEffect, useState } from 'react';

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
      {isLoading || isPending ? (
        <p>Loading</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=' h-fit flex-col'>
            <div className='flex w-full items-center justify-between border-b border-black pb-2'>
              <p className='text-xl font-bold'>{workout?.workout_name}</p>
              <p>
                {workout?.week ? `# Week ${workout?.week + 1}` : `# Week 1`}
              </p>
              <button
                disabled={!isValid}
                type='submit'
                className='rounded-lg bg-blue-300 px-4 py-3 transition-all hover:bg-blue-400 disabled:bg-slate-400'
              >
                Finish Workout
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
      )}
    </>
  );
}
export default WorkoutSession;
