import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Shared/Modal';
import useModal from '../../hooks/useModal';
import NewWorkoutModal from '../../ui/Workouts/NewWorkoutModal';
import DeleteWorkoutModal from '../../ui/Workouts/DeleteWorkoutModal';
import WorkoutMenu from './WorkoutMenu';
import { WorkoutDto } from '../../types/workoutData';

type workoutListProps = {
  workouts: WorkoutDto[];
  programId: number;
};

function WorkoutList({ workouts, programId }: workoutListProps) {
  const addNewWorkoutModalRef = useRef<HTMLDialogElement>(null);
  const deleteWorkoutModalRef = useRef<HTMLDialogElement>(null);
  const { openModal: openNewWorkoutModal } = useModal(addNewWorkoutModalRef);
  const {
    openModal: openDeleteWorkoutModal,
    closeModal: closeDeleteWorkoutModal,
  } = useModal(deleteWorkoutModalRef);

  const navigate = useNavigate();

  return (
    <div className='w-full'>
      <ul>
        {workouts?.map((workout, index) => {
          return (
            <div
              key={workout?.workouts_id}
              className='border-bg-400 w-full rounded-lg border border-border py-3 pl-2 pr-0'
            >
              <div className='flex items-center justify-between'>
                <li className='flex items-center gap-2 py-2'>
                  <button
                    onClick={() =>
                      navigate(`/app/session/${workout?.workouts_id}`)
                    }
                    className='hover:bg-primary-foreground rounded-lg bg-primary px-6 py-2 transition-all'
                  >
                    Start
                  </button>
                  <h1>Workout {index + 1}:</h1>
                  <h1 className='font-semibold'>{workout.workout_name}</h1>
                  <Modal ref={deleteWorkoutModalRef}>
                    <DeleteWorkoutModal
                      name={workout.workout_name}
                      workoutId={workout.workouts_id}
                      closeModal={closeDeleteWorkoutModal}
                    />
                  </Modal>
                </li>
                <div className='flex'>
                  <WorkoutMenu openModal={openDeleteWorkoutModal} />
                </div>
              </div>
            </div>
          );
        })}
      </ul>
      <div>
        <div className='flex w-full justify-end p-4'>
          <button
            onClick={openNewWorkoutModal}
            className='hover:bg-disabled-foreground bg-disabled flex rounded-lg px-4 py-2 transition-all'
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
