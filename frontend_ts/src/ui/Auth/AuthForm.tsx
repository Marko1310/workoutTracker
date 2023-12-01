import { useState } from 'react';
import FormTitle from './FormTitle';
import Form from './Form';
import SwitchForm from './SwitchForm';

const Forms = {
  Signup: 'signup',
  Login: 'login',
} as const;

export type Formkeys = (typeof Forms)[keyof typeof Forms];

function AuthForm() {
  const [formType, setFormType] = useState<Formkeys>(Forms.Login);

  const changeForm = function () {
    setFormType(formType === 'login' ? 'signup' : 'login');
  };

  const handleSubmit = function (e: Event) {
    e.preventDefault();
    // login('email', 'password');
  };

  return (
    <>
      <FormTitle formType={formType} />
      <Form formType={formType} />
      <SwitchForm formType={formType} changeForm={changeForm} />
    </>
  );
}

export default AuthForm;
