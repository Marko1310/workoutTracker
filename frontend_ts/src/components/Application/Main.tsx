import { Outlet } from 'react-router-dom';

function Main() {
  return (
    <div className='h-screen w-full border border-blue-700 pt-16 md:pt-0'>
      <Outlet />
    </div>
  );
}

export default Main;
