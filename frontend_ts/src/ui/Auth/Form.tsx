import FormRow from '../../components/Auth/FormRow';
import LoginButton from './LoginButton';
import FormRows from './FormRows';
import { useAuth } from '../../context/AuthContext';

function Form({ formType }: { formType: string }) {
  const { login } = useAuth();

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login('email', 'password');
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormRows>
        {formType === 'signup' && <FormRow field={'Name'} />}
        <FormRow field={'Email'} />
        <FormRow field={'Password'} />
      </FormRows>
      <LoginButton formType={formType} />
    </form>
  );
}

export default Form;
