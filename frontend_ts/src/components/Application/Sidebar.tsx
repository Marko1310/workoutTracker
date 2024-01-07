import { SyntheticEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import SidebarButton from '../../ui/Application/SidebarButton';
import Avatar from '../../ui/Application/Avatar';
import { UserDto } from '../../types/applications';
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboard';
import HomeRounded from '@mui/icons-material/Home';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenter';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

type SidebarProps = UserDto;

function Sidebar({ user }: { user: SidebarProps | null }) {
  const { logout } = useAuth()!;

  const handleLogout = (e: SyntheticEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <aside className='hidden border-r border-red-700 bg-white transition-all duration-300 md:flex md:h-screen md:w-80 md:flex-col'>
      <Avatar user={user} />

      <div className='flex h-full w-full flex-col justify-between text-left'>
        <div className='flex w-full flex-col items-start align-baseline'>
          <SidebarButton title='Home' route='/app/home' icon={HomeRounded} />
          <SidebarButton
            title='Dashboard'
            route='/app/dashboard'
            icon={SpaceDashboardRoundedIcon}
          />
          <SidebarButton
            title='Programs'
            route='/app/programs'
            icon={FitnessCenterRoundedIcon}
          />
        </div>
        <div className='flex items-center justify-start pl-2'>
          <LogoutRoundedIcon />
          <button className='h-14 pl-2 text-left' onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
