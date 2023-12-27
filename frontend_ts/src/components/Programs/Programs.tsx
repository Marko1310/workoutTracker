import ProgramList from './ProgramList';

export default function Programs() {
  return (
    <div className='flex flex-col gap-8'>
      <button className='h-16 w-52 rounded-lg border-0 bg-orange-300 p-4 text-black transition-all hover:bg-orange-400'>
        + Create a new Program
      </button>
      <div className='flex flex-col gap-2'>
        <h1>Select your Program:</h1>
        <div className='flex flex-col px-4'>
          <ProgramList />
        </div>
      </div>
    </div>
  );
}
