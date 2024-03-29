import { SyntheticEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../../ui/Application/Avatar';
import SidebarButton from '../../ui/Application/SidebarButton';
import DarkModeToggle from '../../ui/Application/DarkModeToggle';
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboard';
import HomeRounded from '@mui/icons-material/Home';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenter';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { UserDto } from '../../types/applications';

type SidebarProps = UserDto;

function Sidebar({ user }: { user: SidebarProps | null }) {
  const { logout } = useAuth()!;

  const handleLogout = (e: SyntheticEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <aside className='hidden rounded-r-2xl border-r border-border bg-foreground transition-all duration-300 md:flex md:h-screen md:w-80 md:flex-col md:shadow-xl'>
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
        <div className='flex w-full justify-between px-4 py-2'>
          <div
            onClick={handleLogout}
            className='flex cursor-pointer items-center '
          >
            <LogoutRoundedIcon color='warning' />
            <button className='h-14 pl-2 text-left'>Logout</button>
          </div>
          <DarkModeToggle />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
