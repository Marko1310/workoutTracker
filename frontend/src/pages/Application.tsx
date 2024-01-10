import Main from '../components/Application/Main';
import Navbar from '../components/Application/Navbar';
import Sidebar from '../components/Application/Sidebar';
import { useAuth } from '../context/AuthContext';

function Application() {
  const { user } = useAuth()!;

  return (
    <div className='flex flex-col bg-background'>
      <Navbar user={user} />
      <div className='flex flex-row'>
        <Sidebar user={user} />
        <Main />
      </div>
    </div>
  );
}

export default Application;
