import Main from '../components/Application/Main';
import Navbar from '../components/Application/Navbar';
import Sidebar from '../components/Application/Sidebar';

function Application() {
  return (
    <div className='flex flex-col'>
      <Navbar />
      <div className='flex flex-row'>
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}

export default Application;
