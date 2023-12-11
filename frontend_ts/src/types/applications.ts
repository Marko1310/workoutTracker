import { z } from 'zod';

const UserSchema = z.object({
  email: z.string(),
  name: z.string(),
});

export type UserDto = z.infer<typeof UserSchema>;
