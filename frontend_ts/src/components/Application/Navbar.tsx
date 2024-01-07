import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import NavButton from '../../ui/Auth/NavButton';
import { UserDto } from '../../types/applications';
import AvatarNavbar from '../../ui/Application/AvatarNavbar';
import MenuIcon from '@mui/icons-material/Menu';

type NavbarProps = UserDto;

function Navbar({ user }: { user: NavbarProps | null }) {
  const { logout } = useAuth()!;

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`absolute top-0 z-40 flex h-fit w-screen flex-col overflow-hidden border-2 bg-white transition-all duration-300 md:hidden`}
    >
      <div className='flex h-16 w-full flex-row items-center justify-between gap-4 px-4'>
        <MenuIcon onClick={handleToggleNavbar} />
        <div className='flex gap-6'>
          <AvatarNavbar user={user} logout={logout} />
        </div>
      </div>
      <div
        className={`${
          isOpen ? 'max-h-40 border-t-2' : 'max-h-0'
        } flex h-fit flex-col items-center justify-between pl-4 transition-all duration-300`}
      >
        <NavButton title='Home' route='home' />
        <NavButton title='Dashboard' route='dashboard' />
        <NavButton title='Programs' route='programs' />
      </div>
    </div>
  );
}

export default Navbar;
