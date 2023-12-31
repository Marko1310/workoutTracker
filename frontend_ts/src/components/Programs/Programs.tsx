import { useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProgramList from './ProgramList';
import Modal from '../Shared/Modal';
import NewProgramModal from '../../ui/Programs/NewProgramModal';
import useModal from '../../hooks/useModal';
import { useAllPrograms } from '../../queries/programQueries';

function Programs() {
  const { user } = useAuth()!;
  const { allProgramsData, isLoading, error } = useAllPrograms(user?.id);
  const addNewWProgramModalRef = useRef<HTMLDialogElement>(null);
  const { openModal } = useModal(addNewWProgramModalRef);

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex w-full justify-end'>
        <button
          onClick={openModal}
          className='rounded-lg border-0 bg-orange-300 p-4 text-black transition-all hover:bg-orange-400'
        >
          + Add new Program
        </button>
      </div>

      <div className='flex flex-col gap-0'>
        <h1>Select your Program:</h1>
        <div className='flex flex-col px-4'>
          <ProgramList allProgramsData={allProgramsData} />
        </div>
      </div>

      <Modal ref={addNewWProgramModalRef}>
        <NewProgramModal />
      </Modal>
    </div>
  );
}

export default Programs;
