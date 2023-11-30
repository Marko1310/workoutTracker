import Background from './Background';
import Footer from './Footer';
import Form from './Form';

function Login() {
  return (
    <div className='grid h-screen w-screen overflow-y-hidden bg-white md:grid-cols-[1fr,1fr] lg:grid-cols-[1.5fr,1fr]'>
      <div className='hidden md:block'>
        <Background />
      </div>
      <div className='flex h-full flex-col p-6'>
        <Form />
        <div className='mt-auto'>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Login;
