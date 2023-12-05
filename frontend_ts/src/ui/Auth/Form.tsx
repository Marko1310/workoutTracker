import FormRow from '../../components/Auth/FormRow';
import LoginButton from './LoginButton';
import FormRows from './FormRows';
import { useAuth } from '../../context/AuthContext';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

//TODO: export types
const SignupDtoSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 character long'),
  email: z.string().email('Please provide a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type SignupDto = z.infer<typeof SignupDtoSchema>;

function Form({ formType }: { formType: string }) {
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
        {formType === 'signup' && (
          <input
            {...register('name')}
            placeholder='Name'
            className='h-14 w-full rounded-md border-[1px] border-neutral-400 pl-2 font-montserrat text-lg font-light transition-all focus-within:border-2 hover:border-2 hover:border-neutral-400 focus:border-neutral-600 focus:outline-none'
          />
        )}
        {errors.name && (
          <p className='text-red-500'>{`${errors.name.message}`}</p>
        )}

        <input
          {...register('email')}
          placeholder='Email'
          className='h-14 w-full rounded-md border-[1px] border-neutral-400 pl-2 font-montserrat text-lg font-light transition-all focus-within:border-2 hover:border-2 hover:border-neutral-400 focus:border-neutral-600 focus:outline-none'
        />
        {errors.email && (
          <p className='text-red-500'>{`${errors.email.message}`}</p>
        )}

        <input
          {...register('password')}
          placeholder='Password'
          className='h-14 w-full rounded-md border-[1px] border-neutral-400 pl-2 font-montserrat text-lg font-light transition-all focus-within:border-2 hover:border-2 hover:border-neutral-400 focus:border-neutral-600 focus:outline-none'
        />
        {errors.password && (
          <p className='text-red-500'>{`${errors.password.message}`}</p>
        )}
      </div>
      <LoginButton formType={formType} isSubmitting={isSubmitting} />
    </form>
  );
}

export default Form;
