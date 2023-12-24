import { SyntheticEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import SidebarButton from '../../ui/Application/SidebarButton';
import Avatar from '../../ui/Application/Avatar';
import { UserDto } from '../../types/applications';

type SidebarProps = UserDto;

function Sidebar({ user }: { user: SidebarProps | null }) {
  const { logout } = useAuth()!;

  const handleLogout = (e: SyntheticEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <aside className='hidden border-r border-red-700 bg-white transition-all duration-300 md:flex md:h-screen md:w-64 md:flex-col'>
      <Avatar user={user} />

      <div className='flex h-full w-full flex-col justify-between text-left'>
        <div className='flex w-full flex-col items-start align-baseline'>
          <SidebarButton title='Home' route='home' />
          <SidebarButton title='Dashboard' route='dashboard' />
          <SidebarButton title='Routines' route='routines' />
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
