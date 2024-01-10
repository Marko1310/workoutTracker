import { Outlet } from 'react-router-dom';

function Main() {
  return (
    <div className='h-screen w-full overflow-y-auto px-2 pt-24 md:p-10'>
      <Outlet />
    </div>
  );
}

export default Main;
