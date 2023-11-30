import Background from './Background';
import LoginForm from './LoginForm';

function Login() {
  return (
    <div className='grid h-screen w-screen grid-cols-[1.5fr,1fr] overflow-y-hidden bg-white'>
      <Background />
      <LoginForm />
    </div>
  );
}

export default Login;
