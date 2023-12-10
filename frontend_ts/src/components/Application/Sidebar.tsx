import { SyntheticEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import NavButton from '../../ui/Auth/NavButton';
import SidebarButton from '../../ui/Auth/SidebarButton';

function Sidebar() {
  const { logout } = useAuth()!;

  const handleLogout = (e: SyntheticEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <aside className='hidden border-r border-red-700 bg-white transition-all duration-300 md:flex md:h-screen md:w-80 md:flex-col'>
      <div className='h-16 w-full border-b-2'>User</div>
      <div className='flex h-full flex-col justify-between text-left'>
        <div className='flex flex-col items-start align-baseline'>
          <SidebarButton title='Home' route='home' />
          <SidebarButton title='Dashboard' route='dashboard' />
          <SidebarButton title='Routines' route='routine' />
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
