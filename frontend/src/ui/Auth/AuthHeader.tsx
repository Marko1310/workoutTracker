import AuthLogo from './AuthLogo';
import AuthTitle from './AuthTitle';

function AuthHeader() {
  return (
    <div className='mb-8 mt-2 flex flex-row items-center justify-center gap-2 text-text'>
      <AuthLogo />
      <AuthTitle />
    </div>
  );
}

export default AuthHeader;
