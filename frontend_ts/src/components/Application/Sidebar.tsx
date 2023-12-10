import { SyntheticEvent } from 'react';
import { useAuth } from '../../context/AuthContext';

function Sidebar() {
  const { logout } = useAuth()!;

  const handleLogout = (e: SyntheticEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      <div className='hidden border border-red-700 md:flex md:h-screen md:w-60 md:flex-col'>
        <div className='h-12 w-full border-2'>User</div>
        <div className='flex h-full flex-col items-start justify-between '>
          <div className='flex w-full flex-col items-start pt-6'>
            <button className='h-14 w-full pl-4 text-left transition-all hover:bg-slate-500'>
              Home
            </button>
            <button className='h-14 w-full pl-4 text-left transition-all hover:bg-slate-500'>
              Dashboard
            </button>
            <button className='h-14 w-full pl-4 text-left transition-all hover:bg-slate-500'>
              Routines
            </button>
          </div>
          <button
            className='h-14 w-full pl-2 text-left transition-all hover:bg-slate-500'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
