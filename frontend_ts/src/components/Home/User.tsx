import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function User() {
  const { user, isLoading } = useAuth()!;
  const navigate = useNavigate();

  return (
    <div className='flex h-full w-full justify-between rounded-xl border-2 border-sky-500 p-2'>
      <div className='mb-2 flex flex-col gap-2'>
        {isLoading && <p>LOADING</p>}
        <h1 className='text-2xl'>Welcome {user?.name}!</h1>
        <h1>What workout are you doing today?</h1>
        <h1>Start by clicking the button</h1>
      </div>
      <div className='flex h-full items-start'>
        <button
          onClick={() => navigate('/app/programs')}
          className='flex h-16 items-center rounded-lg border-0 bg-orange-300 p-4 text-black transition-all hover:bg-orange-400'
        >
          Start a workout
        </button>
      </div>
    </div>
  );
}

export default User;
