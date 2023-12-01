import AuthHeader from '../../ui/AuthHeader';
import AuthForm from '../../ui/AuthForm';
import Footer from './Footer';

function AuthPanel() {
  return (
    <div className='flex h-full flex-col p-6'>
      <AuthHeader />
      <AuthForm />
      <Footer />
    </div>
  );
}

export default AuthPanel;
