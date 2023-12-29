import { useEffect } from 'react';
import LoginButton from '../Auth/LoginButton';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../Forms/InputField';
import { SignupDto, SignupDtoSchema } from '../../types/auth';

function SignupForm() {
  const { signup, error } = useAuth()!;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignupDto>({
    resolver: zodResolver(SignupDtoSchema),
  });

  const onSubmit = async (data: SignupDto) => {
    await signup(data);
  };

  useEffect(() => {
    if (error) {
      setError('email', {
        message: error.message,
      });
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-2'>
        <InputField
          name='name'
          register={register}
          placeholder='Name'
          errors={errors}
        />

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
      <LoginButton title='Signup' isSubmitting={isSubmitting} />
    </form>
  );
}

export default SignupForm;
