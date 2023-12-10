import { SyntheticEvent, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

function Sidebar() {
  const { logout } = useAuth()!;

  const handleLogout = (e: SyntheticEvent) => {
    e.preventDefault();
    logout();
  };

  const [isOpen, setIsOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside
      className={`absolute left-0 z-40 flex h-screen flex-col overflow-hidden border-r border-red-700 bg-white transition-all duration-300 md:relative md:w-80 ${
        !isOpen ? 'w-20' : 'w-full'
      }`}
    >
      <div className='h-16 w-full border-b-2'>User</div>
      <div
        onClick={handleToggleSidebar}
        className='flex h-full flex-col items-start justify-between '
      >
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
        {/* <div className='mt-20'> */}
        <button
          className='h-14 w-full pl-2 text-left transition-all hover:bg-slate-500'
          onClick={handleLogout}
        >
          Logout
        </button>
        {/* </div> */}
      </div>
    </aside>
  );
}

export default Sidebar;
