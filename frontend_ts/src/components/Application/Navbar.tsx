import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AvatarNavbar from '../../ui/Application/AvatarNavbar';
import NavButton from '../../ui/Auth/NavButton';
import MenuIcon from '@mui/icons-material/Menu';
import { UserDto } from '../../types/applications';
import DarkModeToggle from '../../ui/Application/DarkModeToggle';

type NavbarProps = UserDto;

function Navbar({ user }: { user: NavbarProps | null }) {
  const { logout } = useAuth()!;
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`absolute top-0 z-40 flex h-fit w-screen flex-col overflow-hidden rounded-b-lg border border-border  bg-foreground shadow-lg transition-all duration-300 md:hidden`}
    >
      <div className='flex h-16 w-full flex-row items-center justify-between gap-4 px-4'>
        <MenuIcon onClick={handleToggleNavbar} />
        <div className='flex gap-2'>
          <AvatarNavbar user={user} logout={logout} />
          <DarkModeToggle />
        </div>
      </div>
      <div
        className={`${
          isOpen ? 'max-h-40 ' : 'max-h-0'
        } flex h-fit flex-col items-center justify-between pl-4 transition-all duration-300`}
      >
        <NavButton title='Home' route='home' toggle={handleToggleNavbar} />
        <NavButton
          title='Dashboard'
          route='dashboard'
          toggle={handleToggleNavbar}
        />
        <NavButton
          title='Programs'
          route='programs'
          toggle={handleToggleNavbar}
        />
      </div>
    </div>
  );
}

export default Navbar;
