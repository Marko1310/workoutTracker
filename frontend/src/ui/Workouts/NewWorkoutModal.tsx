import { ReactNode } from 'react';
import { AddNewWorkoutDto, AddNewWorkoutSchema } from '../../types/forms';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddNewWorkout } from '../../queries/workoutQueries';

function NewProgramModal({ programId }: { programId: number }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<AddNewWorkoutDto>({
    defaultValues: {
      title: '',
      exercises: [{ title: '', goalSets: 1, goalReps: 0 }],
    },
    resolver: zodResolver(AddNewWorkoutSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises',
  });
  const { mutate, isPending } = useAddNewWorkout();
  const onSubmit = (data: AddNewWorkoutDto) =>
    mutate({ programId, workoutData: data });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mt-2 flex w-full flex-col gap-4 p-4'
    >
      <div className='flex justify-between gap-2'>
        <h1 className='text-2xl font-semibold uppercase'>Create Workout</h1>
        <button
          className='hover:bg-primary-foreground w-fit rounded-md bg-primary px-4 py-2 transition-all disabled:bg-slate-300'
          type='submit'
          disabled={!isValid || isPending}
        >
          {isPending ? 'Saving' : 'Save'}
        </button>
      </div>
      <div className='mt-8 flex flex-col gap-1'>
        <div className='flex flex-col gap-0'>
          <input
            {...register('title', { required: true })}
            placeholder='Workout Title*'
            className='h-14 w-full rounded-md border border-border bg-foreground pl-2 font-montserrat text-lg font-light transition-all focus-within:border-2 hover:border-2 hover:border-neutral-400 focus:border-neutral-600 focus:outline-none'
          />
          {errors?.title && (
            <p className='text-red-500'>
              {errors?.title?.message as ReactNode}
            </p>
          )}
        </div>
      </div>

      <div className='w-full py-2 md:w-96'>
        <table className='w-full text-center text-sm font-light'>
          <thead className='border-b-2 border-neutral-500 font-medium'>
            <tr>
              <th scope='col' className='px-1 py-4'>
                <h1 className='w-32 md:w-full'>Exercises</h1>
              </th>
              <th scope='col' className='px-1 py-4'>
                <h1 className='w-16 md:w-full'>Sets</h1>
              </th>
              <th scope='col' className='px-1 py-4'>
                <h1 className='w-16 md:w-full'>Reps</h1>
              </th>
              <th scope='col' className='px-1 py-4'>
                <h1 className='w-4 md:w-full'></h1>
              </th>
            </tr>
          </thead>

          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id} className='border-b border-neutral-500'>
                <td className='py-4'>
                  <input
                    {...register(`exercises.${index}.title`, {
                      required: true,
                    })}
                    placeholder='e.g. Bench press'
                    className='h-10 w-32 rounded-md border border-border bg-foreground text-center focus:border-neutral-600 focus:outline-none md:w-full'
                  />
                </td>
                <td className='py-4'>
                  <input
                    {...register(`exercises.${index}.goalSets`, {
                      required: true,
                      setValueAs: (value) => Number(value),
                    })}
                    type='number'
                    placeholder='3'
                    className='h-10 w-16 rounded-md border border-border bg-foreground text-center focus:border-neutral-600 focus:outline-none'
                  />
                </td>
                <td className='py-4'>
                  <input
                    {...register(`exercises.${index}.goalReps`, {
                      required: true,
                      setValueAs: (value) => Number(value),
                    })}
                    type='number'
                    placeholder='12'
                    className='h-10 w-16 rounded-md border border-border bg-foreground  text-center focus:border-neutral-600 focus:outline-none'
                  />
                </td>
                <td className='flex py-4 md:w-full'>
                  {index !== 0 && (
                    <div
                      className='text-destructive-foreground flex h-10 w-4 items-center justify-end font-bold hover:cursor-pointer'
                      onClick={() => remove(index)}
                    >
                      X
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => append({ title: '', goalSets: 1, goalReps: 0 })}
        className='hover:bg-accent-foreground w-full rounded-md bg-accent p-2 transition-all'
      >
        + Add Exercise
      </button>
    </form>
  );
}

export default NewProgramModal;
