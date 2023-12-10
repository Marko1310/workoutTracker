import { SyntheticEvent } from 'react';
import { useAuth } from '../../context/AuthContext';

function Sidebar() {
  const { logout } = useAuth()!;

  const handleLogout = (e: SyntheticEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <aside className='hidden border-r border-red-700 bg-white transition-all duration-300 md:flex md:h-screen md:w-80 md:flex-col'>
      <div className='h-16 w-full border-b-2'>User</div>
      <div className='flex h-full flex-col items-start justify-between '>
        <div className='flex w-full flex-col items-start'>
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
    </aside>
  );
}

export default Sidebar;
