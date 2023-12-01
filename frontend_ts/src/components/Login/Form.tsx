import InputField from './InputField';
import logo from '../../assets/images/login/workout-icon.jpg';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Forms = {
  Signup: 'signup',
  Login: 'login',
} as const;

export type Formkeys = (typeof Forms)[keyof typeof Forms];

function Form() {
  const [formType, setFormType] = useState<Formkeys>(Forms.Login);

  const changeForm = function () {
    setFormType(formType === 'login' ? 'signup' : 'login');
  };

  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = function (e: Event) {
    e.preventDefault();
    login('email', 'password');
  };

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  });

  return (
    <div>
      <div className='flex h-full flex-col'>
        <div className='mb-6 mt-10 flex flex-row items-center justify-center gap-2'>
          <img src={logo} alt='logo' className='h-16 w-16' />
          <h1 className='text-2xl font-semibold text-gray-700'>
            Workout Tracker
          </h1>
        </div>
        <h3 className='mb-14 flex justify-center text-4xl font-thin'>
          {formType === 'login' ? 'Login' : 'Signup'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
            {formType === 'signup' && <InputField field={'Name'} />}
            <InputField field={'Email'} />
            <InputField field={'Password'} />
          </div>
          <button className='mt-12 h-14 w-full rounded-md bg-slate-400 uppercase text-white transition-all hover:bg-slate-800'>
            {formType === 'login' ? 'Login' : 'Signup'}
          </button>
        </form>
        <div className='mt-2 flex justify-center gap-2 text-slate-500'>
          <p>{formType === 'login' ? 'Not a member?' : 'Already a member?'}</p>
          <p className='underline hover:cursor-pointer' onClick={changeForm}>
            {formType === 'login' ? 'Signup' : 'Login'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Form;
