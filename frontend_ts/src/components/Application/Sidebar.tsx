import { SyntheticEvent } from 'react';
import { useAuth } from '../../context/AuthContext';

function Sidebar() {
  const { logout } = useAuth()!;

  const handleLogout = (e: SyntheticEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className='hidden h-screen flex-col border border-red-700 md:block md:w-60'>
      <div>Sidebar</div>
      <button onClick={handleLogout}>Logout</button>{' '}
    </div>
  );
}

export default Sidebar;
