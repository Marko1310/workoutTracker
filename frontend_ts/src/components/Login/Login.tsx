import { useEffect, useState } from 'react';
import { images } from './images';
import logo from '../../../public/images/login/workout-icon.jpg';
import InputField from './InputField';

function Login() {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    setBackgroundImage(images[Math.floor(Math.random() * 7)].img);
  }, []);

  return (
    <div className='grid h-screen w-screen grid-cols-[1.5fr,1fr] overflow-y-hidden bg-white'>
      <div className='p-0'>
        <img
          alt=''
          className='h-full w-full bg-cover bg-center'
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
      </div>
      <div className='p-6'>
        <div className='flex flex-col'>
          <div className='mb-6 mt-12 flex flex-row items-center justify-center gap-2'>
            <img src={logo} alt='logo' className='h-16 w-16' />
            <h1 className='text-2xl font-semibold text-gray-700'>
              Workout Tracker
            </h1>
          </div>
          <h3 className='mb-14 flex justify-center text-4xl font-thin'>
            Login
          </h3>
          <div className='flex flex-col gap-2'>
            <InputField field={'Name'} />
            <InputField field={'Email'} />
            <InputField field={'Password'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
