import { useRef } from 'react';
import { WorkoutDto } from '../../types/workoutData';
import useModal from '../../hooks/useModal';
import Modal from '../Shared/Modal';
import NewWorkoutModal from '../../ui/Workouts/NewWorkoutModal';

function WorkoutList({ workouts }: { workouts: WorkoutDto[] }) {
  const addNewWorkoutModalRef = useRef<HTMLDialogElement>(null);
  const { openModal } = useModal(addNewWorkoutModalRef);

  return (
    <div className='w-full'>
      <ul>
        {workouts?.map((workout, index) => {
          return (
            <div
              key={workout?.workouts_id}
              className='border-bg-400 w-full border-2 px-6 py-3'
            >
              <div className='flex justify-between'>
                <li className='flex gap-2 py-4'>
                  <h1>Workout {index + 1}:</h1>
                  <h1>{workout.workout_name}</h1>
                </li>
                <button className='w-fit rounded-lg bg-red-300 p-2 transition-all hover:bg-red-400'>
                  Start workout
                </button>
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
        <NewWorkoutModal />
      </Modal>
    </div>
  );
}

export default WorkoutList;
