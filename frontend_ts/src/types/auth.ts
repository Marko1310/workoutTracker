import { z } from 'zod';

export const LoginDtoSchema = z.object({
  email: z.string().min(1, 'Email field can not be empty'),
  password: z.string().min(1, 'Password field can not be empty'),
});

export type LoginDto = z.infer<typeof LoginDtoSchema>;

export const SignupDtoSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 character long'),
  email: z.string().email('Please provide a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type SignupDto = z.infer<typeof SignupDtoSchema>;
