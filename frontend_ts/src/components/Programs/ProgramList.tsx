import { useRef, useState } from 'react';
import WorkoutList from '../Workouts/WorkoutList';
import useModal from '../../hooks/useModal';
import DeleteProgramModal from '../../ui/Programs/DeleteProgramModal';
import ProgramMenu from './ProgramMenu';
import Modal from '../Shared/Modal';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { AllProgramsDto } from '../../types/workoutData';

type programListProps = { allProgramsData: AllProgramsDto };

export default function ProgramList({ allProgramsData }: programListProps) {
  const [expandedIndex, setExpandedIndex] = useState<null | number>(null);

  const handleChange = (id: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === id ? null : id));
  };
  const deleteProgramModalRef = useRef<HTMLDialogElement>(null);
  const { openModal, closeModal } = useModal(deleteProgramModalRef);

  return (
    <ul>
      {allProgramsData?.map((program) => {
        return (
          <li
            key={program.programs_id}
            className='my-4 w-full flex-col rounded-md border border-border pb-0 shadow-sm'
          >
            <div className='flex justify-between py-2'>
              <h1 className='text-primary-foreground px-4 text-lg font-semibold uppercase'>
                {program.programs_name}
              </h1>
              <ProgramMenu openModal={openModal} />
            </div>
            <div
              onClick={() => handleChange(program.programs_id)}
              className='flex w-full flex-col items-center justify-center pb-0 pt-4 hover:cursor-pointer'
            >
              <p className='text-xs'>List of workouts</p>
              {expandedIndex === program.programs_id ? (
                <KeyboardArrowUpIcon color='warning' fontSize='medium' />
              ) : (
                <KeyboardArrowDownIcon color='warning' fontSize='medium' />
              )}
            </div>
            <div
              className={`${
                expandedIndex === program.programs_id ? 'max-h-96' : 'max-h-0'
              } flex h-fit overflow-hidden overflow-y-auto transition-all duration-300`}
            >
              <WorkoutList
                workouts={program.workouts}
                programId={program.programs_id}
              />
            </div>
            <Modal ref={deleteProgramModalRef}>
              <DeleteProgramModal
                name={program.programs_name}
                programId={program.programs_id}
                closeModal={closeModal}
              />
            </Modal>
          </li>
        );
      })}
    </ul>
  );
}
