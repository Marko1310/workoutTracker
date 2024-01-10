import { useEffect } from 'react';
import LoginButton from './LoginButton';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../Forms/InputField';
import { LoginDto, LoginDtoSchema } from '../../types/auth';

function LoginForm() {
  const { login, error } = useAuth()!;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginDto>({
    resolver: zodResolver(LoginDtoSchema),
  });

  const onSubmit = async (data: LoginDto) => {
    await login(data);
  };

  useEffect(() => {
    if (error && error.message !== 'Unauthorized') {
      setError('password', {
        message: error.message,
      });
    }
  }, [error, setError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-2'>
        <InputField
          name='email'
          register={register}
          placeholder='Email'
          errors={errors}
          type='email'
        />

        <InputField
          name='password'
          register={register}
          placeholder='Password'
          errors={errors}
          type='password'
        />
      </div>
      <LoginButton title={'Login'} isSubmitting={isSubmitting} />
    </form>
  );
}

export default LoginForm;
