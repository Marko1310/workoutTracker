import { SyntheticEvent, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import NavButton from '../../ui/Auth/NavButton';
import { UserDto } from '../../types/applications';
import Avatar from '../../ui/Application/Avatar';

type NavbarProps = UserDto;

function Navbar({ user }: { user: NavbarProps | null }) {
  const { logout } = useAuth()!;

  const handleLogout = (e: SyntheticEvent) => {
    e.preventDefault();
    logout();
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`absolute top-0 z-40 flex h-fit w-screen flex-col overflow-hidden border-2 bg-white transition-all duration-300 md:hidden`}
    >
      <div className='flex h-16 w-full flex-row items-center justify-between gap-4 px-4'>
        <button onClick={handleToggleNavbar}>Icon</button>
        <div className='flex gap-6'>
          <button
            className='transition-all hover:bg-slate-500'
            onClick={handleLogout}
          >
            Logout
          </button>
          <Avatar user={user} />
        </div>
      </div>
      <div
        className={`${
          isOpen ? 'max-h-40' : 'max-h-0'
        } flex h-fit flex-col items-center justify-between transition-all duration-300`}
      >
        <NavButton title='Home' route='home' />
        <NavButton title='Dashboard' route='dashboard' />
        <NavButton title='Routines' route='routines' />
      </div>
    </div>
  );
}

export default Navbar;
