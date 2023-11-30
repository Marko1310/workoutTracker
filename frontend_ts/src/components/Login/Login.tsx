import Background from './Background';
import LoginForm from './LoginForm';

function Login() {
  return (
    <div className='grid h-screen w-screen overflow-y-hidden bg-white md:grid-cols-[1fr,1fr] lg:grid-cols-[1.5fr,1fr]'>
      <div className='hidden md:block'>
        <Background />
      </div>
      <LoginForm />
    </div>
  );
}

export default Login;
