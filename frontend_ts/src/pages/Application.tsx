import { useEffect, useState } from 'react';
import Main from '../components/Application/Main';
import Navbar from '../components/Application/Navbar';
import Sidebar from '../components/Application/Sidebar';
import userServices from '../services/userServices';
import { AxiosResponse } from 'axios';
import { UserDto } from '../types/applications';

function Application() {
  const [user, setUser] = useState<UserDto | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const res: AxiosResponse = await userServices.getUser();
      setUser(res.data);
    };
    getUser();
  }, []);

  return (
    <div className='flex flex-col'>
      <Navbar user={user} />
      <div className='flex flex-row'>
        <Sidebar user={user} />
        <Main />
      </div>
    </div>
  );
}

export default Application;
