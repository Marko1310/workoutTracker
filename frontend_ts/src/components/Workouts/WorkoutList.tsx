import { useRef } from 'react';
import { WorkoutDto } from '../../types/workoutData';
import useModal from '../../hooks/useModal';
import Modal from '../Shared/Modal';
import NewWorkoutModal from '../../ui/Workouts/NewWorkoutModal';
import WorkoutMenu from './WorkoutMenu';

function WorkoutList({
  workouts,
  programId,
}: {
  workouts: WorkoutDto[];
  programId: number;
}) {
  const addNewWorkoutModalRef = useRef<HTMLDialogElement>(null);
  const { openModal } = useModal(addNewWorkoutModalRef);

  return (
    <div className='w-full'>
      <ul>
        {workouts?.map((workout, index) => {
          return (
            <div
              key={workout?.workouts_id}
              className='border-bg-400 w-full border-2 py-3 pl-6 pr-0'
            >
              <div className='flex items-center justify-between'>
                <li className='flex gap-2 py-4'>
                  <h1>Workout {index + 1}:</h1>
                  <h1>{workout.workout_name}</h1>
                </li>
                <WorkoutMenu workoutId={workout?.workouts_id} />
              </div>
            </div>
          );
        })}
      </ul>
      <div>
        <div className='flex w-full justify-end p-4'>
          <button
            onClick={openModal}
            className='flex rounded-lg bg-blue-300 p-2 transition-all hover:bg-blue-400'
          >
            + Add new workout
          </button>
        </div>
      </div>
      <Modal ref={addNewWorkoutModalRef}>
        <NewWorkoutModal programId={programId} />
      </Modal>
    </div>
  );
}

export default WorkoutList;
