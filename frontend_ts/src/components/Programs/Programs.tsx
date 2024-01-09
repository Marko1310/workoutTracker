import { useRef } from 'react';
import ProgramList from './ProgramList';
import Modal from '../Shared/Modal';
import NewProgramModal from '../../ui/Programs/NewProgramModal';
import useModal from '../../hooks/useModal';
import { useAllPrograms } from '../../queries/programQueries';
import CircularProgress from '@mui/material/CircularProgress';

function Programs() {
  const { allProgramsData, isLoading, isFetching } = useAllPrograms();
  const addNewWProgramModalRef = useRef<HTMLDialogElement>(null);
  const { openModal, closeModal } = useModal(addNewWProgramModalRef);

  return (
    <>
      {isLoading || isFetching ? (
        <div className='flex h-full w-full items-center justify-center'>
          <CircularProgress size={80} />
        </div>
      ) : (
        <div className='flex flex-col gap-6'>
          <div className='flex w-full justify-end'>
            <button
              onClick={openModal}
              className='hover:bg-primary-foreground rounded-lg border border-border bg-primary p-4 transition-all'
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
            <NewProgramModal closeModal={closeModal} />
          </Modal>
        </div>
      )}
    </>
  );
}

export default Programs;
