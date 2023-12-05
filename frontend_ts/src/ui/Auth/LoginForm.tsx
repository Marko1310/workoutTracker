import { useEffect } from 'react';
import LoginButton from './LoginButton';
import { useAuth } from '../../context/AuthContext';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputField from './InputField';

//TODO: export types
const LoginDtoSchema = z.object({
  email: z.string().min(1, 'Email field can not be empty'),
  password: z.string().min(1, 'Password field can not be empty'),
});

type LoginDto = z.infer<typeof LoginDtoSchema>;

function LoginForm() {
  const { login, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginDto>({
    resolver: zodResolver(LoginDtoSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    await login(data);
  };

  useEffect(() => {
    if (error) {
      setError('password', {
        message: error.message,
      });
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-2'>
        <InputField
          name='email'
          register={register}
          placeholder='Email'
          errors={errors}
        />

        <InputField
          name='password'
          register={register}
          placeholder='Password'
          errors={errors}
        />
      </div>
      <LoginButton title={'Login'} isSubmitting={isSubmitting} />
    </form>
  );
}

export default LoginForm;
