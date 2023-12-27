import { useAuth } from '../../context/AuthContext';
import { useAllPrograms } from '../../queries/allPrograms';
import ProgramList from './ProgramList';

function Programs() {
  const { user } = useAuth()!;
  const { allProgramsData, isLoading, error } = useAllPrograms(user?.id);

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex w-full justify-end'>
        <button className='h-16 rounded-lg border-0 bg-orange-300 p-4 px-4 text-black transition-all hover:bg-orange-400'>
          + Add new Program
        </button>
      </div>

      <div className='flex flex-col gap-0'>
        <h1>Select your Program:</h1>
        <div className='flex flex-col px-4'>
          <ProgramList allProgramsData={allProgramsData} />
        </div>
      </div>
    </div>
  );
}

export default Programs;
