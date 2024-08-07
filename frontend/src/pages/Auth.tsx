import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Image from '../components/Auth/Image';
import AuthPanel from '../components/Auth/AuthPanel';
import { useAuth } from '../context/AuthContext';

function Auth() {
  const { user } = useAuth()!;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/app/home');
  }, [user, navigate]);

  return (
    <div className='grid h-screen w-screen overflow-y-hidden bg-white md:grid-cols-[1fr,1fr] lg:grid-cols-[1.5fr,1fr]'>
      <Image />
      <AuthPanel />
    </div>
  );
}

export default Auth;
