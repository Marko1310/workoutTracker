import { SyntheticEvent, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { logout } = useAuth()!;

  const handleLogout = (e: SyntheticEvent) => {
    e.preventDefault();
    logout();
  };

  const [isOpen, setIsOpen] = useState(true);

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
          <div>User</div>
        </div>
      </div>
      <div
        className={`${
          isOpen ? 'max-h-40' : 'max-h-0'
        } justify-betweentransition-all flex h-fit flex-col items-center duration-300`}
      >
        <button className='h-14 w-full transition-all duration-300 hover:bg-slate-500'>
          Home
        </button>
        <button className='h-14 w-full transition-all duration-300 hover:bg-slate-500'>
          Dashboard
        </button>
        <button className='h-14 w-full transition-all duration-300 hover:bg-slate-500'>
          Routines
        </button>
      </div>
    </div>
  );
}

export default Navbar;
