import { useState } from 'react';
import AuthFormTitle from './AuthFormTitle';
import SwitchForm from './SwitchForm';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useAuth } from '../../context/AuthContext';
import Note from './Note';

const Forms = {
  Signup: 'signup',
  Login: 'login',
} as const;

export type Formkeys = (typeof Forms)[keyof typeof Forms];

function AuthForm() {
  const { clearError } = useAuth()!;
  const [formType, setFormType] = useState<Formkeys>(Forms.Login);

  const changeForm = function () {
    clearError();
    setFormType(formType === 'login' ? 'signup' : 'login');
  };

  return (
    <>
      <AuthFormTitle formType={formType} />
      {formType === 'signup' ? <SignupForm /> : <LoginForm />}
      <SwitchForm formType={formType} changeForm={changeForm} />
      <Note />
    </>
  );
}

export default AuthForm;
