import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
});

export type UserDto = z.infer<typeof UserSchema>;
