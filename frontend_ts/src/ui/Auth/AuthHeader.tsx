import AuthLogo from './AuthLogo';
import AuthTitle from './AuthTitle';

function AuthHeader() {
  return (
    <div className='text-text mb-12 mt-10 flex flex-row items-center justify-center gap-2'>
      <AuthLogo />
      <AuthTitle />
    </div>
  );
}

export default AuthHeader;
