import { useEffect } from 'react';
import LoginButton from './LoginButton';
import { useAuth } from '../../context/AuthContext';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputField from './InputField';

//TODO: export types
const SignupDtoSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 character long'),
  email: z.string().email('Please provide a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type SignupDto = z.infer<typeof SignupDtoSchema>;

function SignupForm() {
  const { signup, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignupDto>({
    resolver: zodResolver(SignupDtoSchema),
  });

  const onSubmit = async (data: FieldValues) => {
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
