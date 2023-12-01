import FormRow from '../components/Auth/FormRow';
import LoginButton from './LoginButton';
import FormRows from './FormRows';

const handleSubmit = function (e: Event) {
  e.preventDefault();
  // login('email', 'password');
};

function Form({ formType }: { formType: string }) {
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
