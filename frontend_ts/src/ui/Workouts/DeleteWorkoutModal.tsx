import { useEffect } from 'react';
import { useDeleteWorkout } from '../../queries/workoutQueries';

function DeleteWorkoutModal({
  name,
  workoutId,
  closeModal,
}: {
  name: string;
  workoutId: number;
  closeModal: () => void;
}) {
  const { mutate: deleteWorkout, isPending } = useDeleteWorkout();

  useEffect(() => {
    if (!isPending) {
      closeModal();
    }
  }, [isPending, closeModal]);

  return (
    <div className='flex flex-col p-8'>
      <p>{`Are you sure you want to delete Workout ${name} ?`}</p>
      <div className='flex gap-4'>
        <button
          onClick={() => deleteWorkout(workoutId)}
          disabled={isPending}
          className='hover:bg-destructive-foreground mt-6 flex h-14 w-full items-center justify-center rounded-md bg-destructive p-3 transition-all disabled:bg-slate-300'
          type='submit'
        >
          {isPending ? 'Deleting' : 'Delete'}
        </button>
        <button
          disabled={isPending}
          onClick={closeModal}
          className='mt-6 flex h-14 w-full items-center justify-center rounded-md bg-slate-300 p-3 transition-all hover:bg-slate-400 disabled:bg-slate-300'
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
export default DeleteWorkoutModal;
