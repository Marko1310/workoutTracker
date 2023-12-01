function LoginButton({ formType }: { formType: string }) {
  return (
    <button className='mt-12 h-14 w-full rounded-md bg-slate-400 uppercase text-white transition-all hover:bg-slate-800'>
      {formType === 'login' ? 'Login' : 'Signup'}
    </button>
  );
}

export default LoginButton;
