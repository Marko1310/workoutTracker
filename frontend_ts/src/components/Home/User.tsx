import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import HomeWrapper from '../../ui/Home/HomeWrapper';

function User() {
  const { user } = useAuth()!;
  const navigate = useNavigate();

  return (
    <HomeWrapper>
      <div className='mb-2 flex flex-col gap-2'>
        <div className='flex gap-2'>
          <h1 className='mb-4 text-3xl'>Welcome</h1>
          <h1 className='text-primary-foreground mb-4 text-3xl'>
            {user?.name}!
          </h1>
        </div>
        <h1 className='text-sm'>What workout are you doing today?</h1>
        <h1 className='text-sm'>Start by clicking the button</h1>
      </div>
      <div className='flex h-full items-start'>
        <button
          onClick={() => navigate('/app/programs')}
          className='hover:bg-primary-foreground flex h-16 items-center rounded-lg border border-border bg-primary p-4 text-black transition-all'
        >
          Start a workout
        </button>
      </div>
    </HomeWrapper>
  );
}

export default User;
