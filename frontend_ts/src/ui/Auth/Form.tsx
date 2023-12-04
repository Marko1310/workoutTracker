import FormRow from '../../components/Auth/FormRow';
import LoginButton from './LoginButton';
import FormRows from './FormRows';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

function Form({ formType }: { formType: string }) {
  const { signup } = useAuth();
  const [name, setName] = useState<string | null>('');
  const [email, setEmail] = useState<string | null>('');
  const [password, setPassword] = useState<string | null>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup({
      name,
      email,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormRows>
        {formType === 'signup' && (
          <FormRow
            type={'Name'}
            id={'name'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <FormRow
          type={'Email'}
          id={'email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormRow
          type={'Password'}
          id={'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRows>
      <LoginButton formType={formType} />
    </form>
  );
}

export default Form;
