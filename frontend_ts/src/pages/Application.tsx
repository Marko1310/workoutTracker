import Main from '../components/Application/Main';
import Sidebar from '../components/Application/Sidebar';

function Application() {
  return (
    <div className='flex flex-row'>
      <Sidebar />
      <Main />
    </div>
  );
}

export default Application;
