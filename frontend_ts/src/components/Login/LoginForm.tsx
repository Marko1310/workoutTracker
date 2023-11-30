import InputField from './InputField';
import logo from '../../../public/images/login/workout-icon.jpg';

function LoginForm() {
  return (
    <div className='p-6'>
      <div className='flex h-full flex-col'>
        <div className='mb-6 mt-12 flex flex-row items-center justify-center gap-2'>
          <img src={logo} alt='logo' className='h-16 w-16' />
          <h1 className='text-2xl font-semibold text-gray-700'>
            Workout Tracker
          </h1>
        </div>
        <h3 className='mb-14 flex justify-center text-4xl font-thin'>Login</h3>
        <div className='flex flex-col gap-2'>
          <InputField field={'Name'} />
          <InputField field={'Email'} />
          <InputField field={'Password'} />
        </div>
        <button className='mt-12 h-14 w-full rounded-md bg-slate-400 uppercase text-white transition-all hover:bg-slate-800'>
          login
        </button>
        <p className='mb-2 mt-auto flex w-full justify-center align-bottom text-sm text-slate-400 '>
          © 2023 Marko Čabo. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
