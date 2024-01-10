import AuthHeader from '../../ui/Auth/AuthHeader';
import AuthForm from '../../ui/Auth/AuthForm';
import Footer from './Footer';

function AuthPanel() {
  return (
    <div className='flex h-full flex-col bg-foreground p-6'>
      <AuthHeader />
      <AuthForm />
      <Footer />
    </div>
  );
}

export default AuthPanel;
